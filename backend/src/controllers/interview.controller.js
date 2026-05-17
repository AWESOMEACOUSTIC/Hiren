const pdfParse = require('pdf-parse')
const { generateInterviewReport: generateInterviewReportAi, generateResumePdf } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


/**
 * @desc  Generate an interview report based on the provided job description, candidate resume, and self-description.
 * @route POST /api/interview/
 * @access Private
 * @body multipart/form-data: { jobDescription: string, selfDescription: string, resume: file }
 * @response { matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: 'low' | 'medium' | 'high' }], preparationResources: [{ day: number, resource: string }] }
 */
async function generateInterviewReport (req, res){
    const { selfDescription, jobDescription } = req.body

    if (!req.file) {
        return res.status(400).json({ message: 'Resume file is required' })
    }

    if (!selfDescription || !jobDescription) {
        return res.status(400).json({ message: 'Self description and job description are required' })
    }

    try {
        // Parse the uploaded PDF buffer into plain text for AI processing.
        const pdfData = await pdfParse(req.file.buffer)
        const resumeText = (pdfData.text || '').trim()

        const interviewReportByAi = await generateInterviewReportAi({ 
            resume: resumeText, 
            selfDescription, 
            jobDescription
        })

        if (!interviewReportByAi) {
            throw new Error('AI response was empty')
        }

        const interviewReport = await interviewReportModel.create({ 
            user: req.user.id,
            resumeText,
            jobDescription,
            selfDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        })
    } catch (error) {
        console.error('Error generating interview report:', error)
        res.status(500).json({ error: 'Failed to generate interview report' })
    }
}


/**
 * @desc  Retrieve a previously generated interview report by its ID.
 * @route GET /api/interview/reports/:interviewId
 * @access Private
 * @response { interviewReport: { matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: 'low' | 'medium' | 'high' }], preparationResources: [{ day: number, resource: string }] } }
 */

async function getInterviewReportById(req, res){
    try {
        const {interviewId} = req.params
        if (!interviewId) {
            return res.status(400).json({ message: 'Interview ID is required' })
        }
        const interviewReport = await interviewReportModel.findById(interviewId).populate('user', 'name email')
        if (!interviewReport) {
            return res.status(404).json({ message: 'Interview report not found' })
        }
        res.status(200).json({ interviewReport })
    } catch (error) {
        console.error('Error fetching interview report:', error)
        res.status(500).json({ error: 'Failed to fetch interview report' })
    }
}

/**
 * @desc  Retrieve all interview reports for the authenticated user.
 * @route GET /api/interview/
 * @access Private
 * @response { interviewReports: [{ id: string, matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: 'low' | 'medium' | 'high' }], preparationResources: [{ day: number, resource: string }] }] }
 */

async function getAllInterviewReportsForUser(req, res) {
    try {
        const interviewReports = await (await interviewReportModel.find({ 
            user: req.user.id 
        }).populate('user', 'name email')).sort({ createdAt: -1 }).select("-resumeText -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationResources") // Exclude large text fields for the list view
        res.status(200).json({ interviewReports })
    } catch (error) {
        console.error('Error fetching interview reports:', error)
        res.status(500).json({ error: 'Failed to fetch interview reports' })
    }
}

/**
 * @description Generate a PDF version of the candidate's resume based on the original resume text, job description, and self-description.
 */

async function generateResumePdf(req, res){
    const {interviewId} = req.params

    if (!interviewId) {
        return res.status(400).json({ message: 'Interview ID is required' })
    }

    const interviewReport = await interviewReportModel.findById(interviewId).populate('user', 'name email')

    if (!interviewReport) {
        return res.status(404).json({ message: 'Interview report not found' })
    }

    const { resumeText, jobDescription, selfDescription } = interviewReport

    try {
        const pdfBuffer = await generateResumePdf({ resumeText, jobDescription, selfDescription })
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${interviewId}.pdf`,
        })
        res.send(pdfBuffer)
    }catch (error) {
        console.error('Error generating resume PDF:', error)
        res.status(500).json({ error: 'Failed to generate resume PDF' })
    }
}

module.exports = {generateInterviewReport, getInterviewReportById, getAllInterviewReportsForUser, generateResumePdf}