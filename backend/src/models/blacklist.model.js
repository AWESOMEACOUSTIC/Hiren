const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Token is required']
    },
},{
    timestamps: true  // Automatically add createdAt and updatedAt fields
})

const tokenBlackListModel = mongoose.model('TokenBlacklist', blackListSchema)

module.exports = tokenBlackListModel