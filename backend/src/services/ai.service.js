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


async function generateInterviewReport({resume, selfDescription, jobDescription}){
    
    const prompt = `You are an expert interviewer and career coach. Based on the candidate's resume, self description and the job description, you have to generate a comprehensive interview report that includes:
1. A match score between 0 and 100 indicating how well the candidate's profile matches the job description.
2. A list of technical questions that are likely to be asked in the interview, along with the intention behind each question and an ideal answer.
3. A list of behavioral questions that are likely to be asked in the interview, along with the intention behind each question and an ideal answer.
4. A list of skill gaps identified during the interview, along with their severity (low, medium, high).
5. A list of preparation resources recommended for the candidate to fill the identified skill gaps, along with the day number for which each resource is recommended.`
    
    
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
        return JSON.parse(response.text)
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