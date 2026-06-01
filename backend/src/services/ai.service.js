const { OpenAI } = require("openai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");
const pdfParse = require("pdf-parse");

// Initialize the OpenAI SDK to use OpenRouter's endpoint
const ai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL || "http://localhost",
    "X-Title": process.env.YOUR_SITE_NAME || "Interview AI Service",
  },
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question asked during the interview"),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this technical question"
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question well, covering the key points in a paragraphed format."
          ),
      })
    )
    .describe("A list of technical questions with intention and ideal answer."),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question asked during the interview"),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this behavioral question"
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question well, covering the key points in a paragraphed format."
          ),
      })
    )
    .describe(
      "A list of behavioral questions with intention and ideal answer."
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill gap identified"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      })
    )
    .describe("A list of skill gaps with their severity."),
  preparationResources: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number for which the resource is recommended"),
        resource: z
          .string()
          .describe("The preparation resource to fill the skill gap"),
      })
    )
    .describe("A list of preparation resources with day numbers."),
  title: z
    .string()
    .describe(
      "A concise title summarizing the overall assessment, e.g. 'Strong Fit', 'Good Fit with Some Gaps', 'Needs Improvement'."
    ),
});

const DEFAULT_INTENTION = "Explain the purpose behind the question.";
const DEFAULT_ANSWER =
  "Provide a structured response covering context, approach, and impact.";

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value];
};

// Recursively convert snake_case / kebab-case keys to camelCase so the
// downstream normalizers can find the expected fields regardless of the
// casing the model decided to emit.
const toCamelCase = (key) =>
  key.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());

const camelizeKeys = (value) => {
  if (Array.isArray(value)) return value.map(camelizeKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [toCamelCase(k), camelizeKeys(v)])
    );
  }
  return value;
};

const normalizeQuestionItem = (item) => {
  if (typeof item === "string") {
    const question = normalizeText(item);
    if (!question) return null;
    return { question, intention: DEFAULT_INTENTION, answer: DEFAULT_ANSWER };
  }

  if (!item || typeof item !== "object") return null;

  const question = normalizeText(item.question || item.prompt || item.text);
  if (!question) return null;

  const intention =
    normalizeText(item.intention || item.intent || item.why) ||
    DEFAULT_INTENTION;
  const answer =
    normalizeText(
      item.answer || item.idealAnswer || item.response || item.solution
    ) || DEFAULT_ANSWER;

  return { question, intention, answer };
};

const normalizeQuestions = (value) =>
  ensureArray(value).map(normalizeQuestionItem).filter(Boolean);

const normalizeSkillGapItem = (item) => {
  let skill = "";
  let severity = "";

  if (typeof item === "string") {
    skill = normalizeText(item);
  } else if (item && typeof item === "object") {
    skill = normalizeText(item.skill || item.name);
    severity = normalizeText(item.severity || item.level);
  }

  if (!skill) return null;

  const normalizedSeverity = ["low", "medium", "high"].includes(
    severity.toLowerCase()
  )
    ? severity.toLowerCase()
    : "medium";

  return { skill, severity: normalizedSeverity };
};

const normalizeSkillGaps = (value) =>
  ensureArray(value).map(normalizeSkillGapItem).filter(Boolean);

const normalizePreparationResourceItem = (item, index) => {
  let day = null;
  let resource = "";

  if (typeof item === "string") {
    resource = normalizeText(item);
    day = index + 1;
  } else if (item && typeof item === "object") {
    day = Number(item.day);
    resource = normalizeText(item.resource || item.title || item.link);
  }

  if (!resource) return null;

  const normalizedDay =
    Number.isFinite(day) && day > 0 ? Math.round(day) : index + 1;

  return { day: normalizedDay, resource };
};

const normalizePreparationResources = (value) =>
  ensureArray(value)
    .map((item, index) => normalizePreparationResourceItem(item, index))
    .filter(Boolean);

const normalizeMatchScore = (value) => {
  const score = Number(value);
  if (!Number.isFinite(score)) return undefined;
  return Math.max(0, Math.min(100, Math.round(score)));
};

const resolveTitle = (value, matchScore) => {
  const title = normalizeText(value);
  if (title) return title;

  if (typeof matchScore !== "number") return "Interview Report";

  if (matchScore >= 85) return "Strong Fit";
  if (matchScore >= 70) return "Good Fit with Some Gaps";
  if (matchScore >= 50) return "Potential Fit";

  return "Needs Improvement";
};

const extractJsonPayload = (rawText) => {
  if (!rawText) return "";
  const trimmed = rawText.trim();

  if (trimmed.startsWith("```")) {
    const fenceEnd = trimmed.lastIndexOf("```");
    if (fenceEnd > 0) {
      const fenceBody = trimmed.slice(trimmed.indexOf("\n") + 1, fenceEnd);
      return fenceBody.trim();
    }
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
};

// Detects when the model echoed the JSON schema instead of producing data.
const looksLikeSchema = (payload) => {
  if (!payload || typeof payload !== "object") return false;
  if (payload.$schema || payload.properties || payload.definitions) return true;
  return payload.type === "object" && !!payload.properties;
};

const normalizeInterviewReport = (payload) => {
  const safePayload =
    payload && typeof payload === "object" ? camelizeKeys(payload) : {};
  const matchScore = normalizeMatchScore(safePayload.matchScore);

  return {
    matchScore,
    technicalQuestions: normalizeQuestions(safePayload.technicalQuestions),
    behavioralQuestions: normalizeQuestions(
      safePayload.behavioralQuestions || safePayload.behaviouralQuestions
    ),
    skillGaps: normalizeSkillGaps(safePayload.skillGaps),
    preparationResources: normalizePreparationResources(
      safePayload.preparationResources
    ),
    title: resolveTitle(safePayload.title, matchScore),
  };
};

// Tries json_schema first; falls back to json_object if the model rejects it.
async function createStructuredCompletion({ model, prompt, schema, schemaName }) {
  const messages = [{ role: "user", content: prompt }];

  try {
    const response = await ai.chat.completions.create({
      model,
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: schemaName,
          strict: true,
          schema: zodToJsonSchema(schema, { target: "openApi3" }),
        },
      },
    });
    return response;
  } catch (error) {
    // Model/provider may not support json_schema — fall back gracefully.
    console.warn(
      `json_schema not supported for ${model}, falling back to json_object:`,
      error.message
    );
    return ai.chat.completions.create({
      model,
      messages,
      response_format: { type: "json_object" },
    });
  }
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const basePrompt = `You are an expert interviewer and career coach. Based on the candidate's resume, self description and the job description, generate a comprehensive interview report that includes:
1. A match score between 0 and 100 indicating how well the candidate's profile matches the job description.
2. A list of technical questions likely to be asked, with the intention behind each and an ideal answer.
3. A list of behavioral questions likely to be asked, with the intention behind each and an ideal answer.
4. A list of skill gaps identified, with their severity (low, medium, high).
5. A list of preparation resources to fill the skill gaps, with the day number for each.
6. A concise title summarizing the overall fit, e.g. 'Strong Fit', 'Good Fit with Some Gaps', 'Needs Improvement'.`;

  const fullPrompt = `${basePrompt}

Job Description:
${jobDescription}

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

CRITICAL INSTRUCTION: Return ONLY a single JSON object using EXACTLY these camelCase keys: "matchScore", "technicalQuestions" (each item with "question", "intention", "answer"), "behavioralQuestions" (same item shape), "skillGaps" (each item with "skill", "severity"), "preparationResources" (each item with "day", "resource"), and "title". Do NOT use snake_case keys (e.g. "match_score" or "ideal_answer"). Do NOT return a JSON schema, type definitions, comments, or explanatory text. Every field must be fully populated with real, concrete values (at least 4 technical questions, 3 behavioral questions, and relevant skill gaps and resources).`;

  const response = await createStructuredCompletion({
    model: "minimax/minimax-m2.1",
    prompt: fullPrompt,
    schema: interviewReportSchema,
    schemaName: "interview_report",
  });

  const responseText = response.choices[0]?.message?.content;

  if (!responseText) {
    throw new Error("AI response did not contain JSON text");
  }

  let parsedPayload;
  try {
    const rawText = extractJsonPayload(responseText);
    parsedPayload = JSON.parse(rawText);
  } catch (error) {
    error.message = `Failed to parse AI JSON response: ${error.message}. Raw: ${responseText.slice(
      0,
      500
    )}`;
    throw error;
  }

  if (looksLikeSchema(parsedPayload)) {
    throw new Error(
      `AI returned a JSON schema instead of report data. Raw: ${JSON.stringify(
        parsedPayload
      ).slice(0, 500)}`
    );
  }

  const report = normalizeInterviewReport(parsedPayload);

  const isEmpty =
    report.matchScore === undefined &&
    report.technicalQuestions.length === 0 &&
    report.behavioralQuestions.length === 0 &&
    report.skillGaps.length === 0 &&
    report.preparationResources.length === 0;

  if (isEmpty) {
    throw new Error(
      `AI returned no usable report data. Raw payload: ${JSON.stringify(
        parsedPayload
      ).slice(0, 500)}`
    );
  }

  return report;
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

async function generateResumePdf({ resumeText, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The complete, well-formatted and styled HTML content of the resume, ready to be converted to PDF."
      ),
  });

  const prompt = `You are an expert resume writer. Based on the candidate's self description, job description and resume text, generate well formatted and styled HTML content for a professional resume that can be converted to PDF.

Resume: ${resumeText}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

CRITICAL INSTRUCTION: Return ONLY a single JSON object with an "html" field containing the ACTUAL complete HTML document as a string. Do NOT return a JSON schema or explanatory text. Include inline CSS styling.`;

  const response = await createStructuredCompletion({
    model: "minimax/minimax-m2.1",
    prompt,
    schema: resumePdfSchema,
    schemaName: "resume_pdf",
  });

  const responseText = response.choices[0]?.message?.content;

  if (!responseText) {
    throw new Error("AI response did not contain JSON text");
  }

  let jsonContent;
  try {
    const rawText = extractJsonPayload(responseText);
    jsonContent = camelizeKeys(JSON.parse(rawText));
  } catch (error) {
    error.message = `Failed to parse AI JSON response: ${error.message}. Raw: ${responseText.slice(
      0,
      500
    )}`;
    throw error;
  }

  const html = normalizeText(jsonContent.html);
  if (!html || looksLikeSchema(jsonContent)) {
    throw new Error(
      `AI did not return usable HTML. Raw: ${JSON.stringify(jsonContent).slice(
        0,
        500
      )}`
    );
  }

  return generatePdfFromHtml(html);
}

module.exports = { generateInterviewReport, generateResumePdf };