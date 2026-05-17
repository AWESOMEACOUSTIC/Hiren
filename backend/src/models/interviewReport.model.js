const mongoose = require('mongoose');

/**
 * InterviewReport Schema
 * - job description schema
 * - resume text schema
 * - self description schema
 * 
 * - Technical questions asked: []
 * - HR questions asked: []
 * - Behavioral questions asked: []
 * 
 * - Skill gaps identified: []
 * - preparation resources recommended: []
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
     question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required']
    }
}, {
    _id: false
})

const preparationResourceSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'Day is required']
    },
    resource: {
        type: String,
        required: [true, 'Resource is required']
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: { 
        type: String, 
        required: true 
    },
    resumeText: { 
        type: String, 
        required: true 
    },
    selfDescription: { 
        type: String, 
        required: true 
    },
    matchScore: { 
        type: Number, 
        min: 0, 
        max: 100 
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationResources: [preparationResourceSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true

})

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema)

module.exports = interviewReportModel