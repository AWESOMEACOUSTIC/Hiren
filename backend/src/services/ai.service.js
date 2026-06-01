const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require('puppeteer')
const pdfParse = require('pdf-parse')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this technical question"),
        answer: z.string().describe("The candidate's answer to the technical question. How to answer this question well? What are the key points that should be covered in the answer in a paragraphed format?")
    })).describe("A list of technical questions asked during the interview, along with the intention behind each question and an ideal answer."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this behavioral question"),
        answer: z.string().describe("The candidate's answer to the behavioral question. How to answer this question well? What are the key points that should be covered in the answer in a paragraphed format?")
    })).describe("A list of behavioral questions asked during the interview, along with the intention behind each question and an ideal answer."),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill gap identified during the interview"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap")
    })).describe("A list of skill gaps identified during the interview, along with their severity."),
    preparationResources: z.array(z.object({
        day: z.number().describe("The day number for which the preparation resource is recommended"),
        resource: z.string().describe("The preparation resource recommended for the candidate to fill the skill gap")
    })).describe("A list of preparation resources recommended for the candidate to fill the identified skill gaps, along with the day number for which each resource is recommended."),
    title: z.string().describe("A concise title summarizing the overall assessment of the candidate's fit for the role, such as 'Strong Fit', 'Good Fit with Some Gaps', 'Needs Improvement', etc.")
})

const DEFAULT_INTENTION = 'Explain the purpose behind the question.'
const DEFAULT_ANSWER =
    'Provide a structured response covering context, approach, and impact.'

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '')

const ensureArray = (value) => {
    if (Array.isArray(value)) {
        return value
    }
    if (value === null || value === undefined) {
        return []
    }
    return [value]
}

const normalizeQuestionItem = (item) => {
    if (typeof item === 'string') {
        const question = normalizeText(item)
        if (!question) {
            return null
        }
        return {
            question,
            intention: DEFAULT_INTENTION,
            answer: DEFAULT_ANSWER,
        }
    }

    if (!item || typeof item !== 'object') {
        return null
    }

    const question = normalizeText(item.question || item.prompt || item.text)
    if (!question) {
        return null
    }

    const intention =
        normalizeText(item.intention || item.intent || item.why) || DEFAULT_INTENTION
    const answer =
        normalizeText(item.answer || item.response || item.solution) || DEFAULT_ANSWER

    return {
        question,
        intention,
        answer,
    }
}

const normalizeQuestions = (value) =>
    ensureArray(value).map(normalizeQuestionItem).filter(Boolean)

const normalizeSkillGapItem = (item) => {
    let skill = ''
    let severity = ''

    if (typeof item === 'string') {
        skill = normalizeText(item)
    } else if (item && typeof item === 'object') {
        skill = normalizeText(item.skill || item.name)
        severity = normalizeText(item.severity || item.level)
    }

    if (!skill) {
        return null
    }

    const normalizedSeverity = ['low', 'medium', 'high'].includes(
        severity.toLowerCase()
    )
        ? severity.toLowerCase()
        : 'medium'

    return {
        skill,
        severity: normalizedSeverity,
    }
}

const normalizeSkillGaps = (value) =>
    ensureArray(value).map(normalizeSkillGapItem).filter(Boolean)

const normalizePreparationResourceItem = (item, index) => {
    let day = null
    let resource = ''

    if (typeof item === 'string') {
        resource = normalizeText(item)
        day = index + 1
    } else if (item && typeof item === 'object') {
        day = Number(item.day)
        resource = normalizeText(item.resource || item.title || item.link)
    }

    if (!resource) {
        return null
    }

    const normalizedDay = Number.isFinite(day) && day > 0 ? Math.round(day) : index + 1

    return {
        day: normalizedDay,
        resource,
    }
}

const normalizePreparationResources = (value) =>
    ensureArray(value)
        .map((item, index) => normalizePreparationResourceItem(item, index))
        .filter(Boolean)

const normalizeMatchScore = (value) => {
    const score = Number(value)
    if (!Number.isFinite(score)) {
        return undefined
    }

    return Math.max(0, Math.min(100, Math.round(score)))
}

const resolveTitle = (value, matchScore) => {
    const title = normalizeText(value)
    if (title) {
        return title
    }

    if (typeof matchScore !== 'number') {
        return 'Interview Report'
    }

    if (matchScore >= 85) {
        return 'Strong Fit'
    }

    if (matchScore >= 70) {
        return 'Good Fit with Some Gaps'
    }

    if (matchScore >= 50) {
        return 'Potential Fit'
    }

    return 'Needs Improvement'
}

const extractJsonPayload = (rawText) => {
    const trimmed = rawText.trim()
    if (trimmed.startsWith('```')) {
        const fenceEnd = trimmed.lastIndexOf('```')
        if (fenceEnd > 0) {
            const fenceBody = trimmed.slice(trimmed.indexOf('\n') + 1, fenceEnd)
            return fenceBody.trim()
        }
    }

    const firstBrace = trimmed.indexOf('{')
    const lastBrace = trimmed.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return trimmed.slice(firstBrace, lastBrace + 1)
    }

    return trimmed
}

const normalizeInterviewReport = (payload) => {
    const safePayload = payload && typeof payload === 'object' ? payload : {}
    const matchScore = normalizeMatchScore(safePayload.matchScore)

    return {
        matchScore,
        technicalQuestions: normalizeQuestions(safePayload.technicalQuestions),
        behavioralQuestions: normalizeQuestions(
            safePayload.behavioralQuestions || safePayload.behaviouralQuestions
        ),
        skillGaps: normalizeSkillGaps(safePayload.skillGaps),
        preparationResources: normalizePreparationResources(safePayload.preparationResources),
        title: resolveTitle(safePayload.title, matchScore),
    }
}


async function generateInterviewReport({resume, selfDescription, jobDescription}){
    
    const prompt = `You are an expert interviewer and career coach. Based on the candidate's resume, self description and the job description, you have to generate a comprehensive interview report that includes:
1. A match score between 0 and 100 indicating how well the candidate's profile matches the job description.
2. A list of technical questions that are likely to be asked in the interview, along with the intention behind each question and an ideal answer.
3. A list of behavioral questions that are likely to be asked in the interview, along with the intention behind each question and an ideal answer.
4. A list of skill gaps identified during the interview, along with their severity (low, medium, high).
5. A list of preparation resources recommended for the candidate to fill the identified skill gaps, along with the day number for which each resource is recommended.
6. A concise title summarizing the overall assessment of the candidate's fit for the role, such as 'Strong Fit', 'Good Fit with Some Gaps', 'Needs Improvement', etc.`
    
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt + "\n\n" + `Job Description:\n${jobDescription}\n\nCandidate Resume:\n${resume}\n\nCandidate Self Description:\n${selfDescription}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    if (!response || !response.text) {
        throw new Error('AI response did not contain JSON text')
    }

    try {
        const rawText = extractJsonPayload(response.text)
        const parsedPayload = JSON.parse(rawText)
        return normalizeInterviewReport(parsedPayload)
    } catch (error) {
        error.message = `Failed to parse AI JSON response: ${error.message}`
        throw error
    }
}

async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent, { 
        waitUntil: 'networkidle0' 
    })
    const pdfBuffer = await page.pdf({ format: 'A4' })
    await browser.close()
    return pdfBuffer
}


async function generateResumePdf({resumeText, selfDescription, jobDescription}) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML contet of the resume which can be converted to PDF format using any library like puppeteer. The HTML should be well formatted and styled to look like a professional resume.")

    })
    const prompt = `You are an expert resume writer. Based on the candidate's self description, job description and the resume text, you have to generate a well formatted and styled HTML content of the resume which can be converted to PDF format using any library like puppeteer. The HTML should be well formatted and styled to look like a professional resume.
                    Resume: ${resumeText}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
                    The response should be a JSON object with a single key "html" which contains the HTML content of the resume.`
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })

    if (!response || !response.text) {
        throw new Error('AI response did not contain JSON text')
    }

    try {
        const jsonContent = JSON.parse(response.text)
        const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
        return pdfBuffer
    } catch (error) {
        error.message = `Failed to parse AI JSON response: ${error.message}`
        throw error
    }
}

module.exports = { generateInterviewReport, generateResumePdf }