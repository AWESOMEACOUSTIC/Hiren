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


/**
 * @route GET /api/interview/reports/:interviewId
 * @desc  Retrieve a previously generated interview report by its ID.
 * @access Private
 * @response { interviewReport: { matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: 'low' | 'medium' | 'high' }], preparationResources: [{ day: number, resource: string }] } }
 */
interviewRouter.get('/reports/:interviewId', authUSer.authMiddleware, interviewController.getInterviewReportById)

/**
 * @route GET /api/interview/
 * @desc  Retrieve all interview reports for the authenticated user.
 * @access Private
 * @response { interviewReports: [{ id: string, matchScore: number, technicalQuestions: [{ question: string, intention: string, answer: string }], behavioralQuestions: [{ question: string, intention: string, answer: string }], skillGaps: [{ skill: string, severity: 'low' | 'medium' | 'high' }], preparationResources: [{ day: number, resource: string }] }] }
 */
interviewRouter.get('/', authUSer.authMiddleware, interviewController.getAllInterviewReportsForUser)

/**
 * @route POST /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume and job description
 * @access Private
 */
interviewRouter.post('/resume/pdf/:interviewId', authUSer.authMiddleware, upload.single('resume'), interviewController.generateResumePdf)






module.exports = interviewRouter