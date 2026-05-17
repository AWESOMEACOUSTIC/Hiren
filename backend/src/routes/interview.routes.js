const express = require('express')
const authUSer = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')

const interviewRouter   = express.Router()

/**
 * @route POST /api/interview/
 * @desc  Generate an interview report based on the provided job description, candidate resume, and self-description.
 * @access Private
 * @body multipart/form-data: { jobDescription: string, selfDescription: string, resume: file }
 * @response { matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: 'low' | 'medium' | 'high' }], preparationResources: [{ day: number, resource: string }] }
 */
interviewRouter.post('/', authUSer.authMiddleware, upload.single('resume'), interviewController.generateInterviewReport)

module.exports = interviewRouter