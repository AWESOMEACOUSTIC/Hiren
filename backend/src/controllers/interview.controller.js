const pdfParse = require('pdf-parse')
const { generateInterviewReport: generateInterviewReportAi } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

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

module.exports = {generateInterviewReport}