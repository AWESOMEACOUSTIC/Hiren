const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blacklist.model')

/**
 * @name authMiddleware
 * @description Middleware to protect routes, checks for the presence of a valid JWT token in the cookies and verifies it, if valid, adds the decoded user information to the request object and calls the next middleware, if invalid or not present, returns a 401 Unauthorized response
 * @access Private
 */

async function authMiddleware(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isTokenBlackListed = await tokenBlackListModel.findOne({ token })

    if(isTokenBlackListed){
        return res.status(401).json({ message: 'Token is invalid' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = {authMiddleware}