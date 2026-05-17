const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interViewReportModel= require('../models/interviewReport.model')

async function generateInterviewReport (req, res){
    const pdfData = await ((new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText())

    const {selfDescription, jobDescription} = req.body

    try {
        const interviewReportByAi = await generateInterviewReport({ 
            resume: pdfData.text, 
            selfDescription, 
            jobDescription })


            const interviewReport = await interviewReportModel.create({ 
                user: req.user.id,
                resume: pdfData.text,
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