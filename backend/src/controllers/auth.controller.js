const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blacklist.model')

/**
 * @name registerUserController
 * @description Controller to handle user registration, register a new user, expects username, email and password in the request body
 * @route POST /api/auth/register
 * @access Public
 *  */

async function registerUserController(req, res) {

    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: 'Username, email and password are required' 
        })
    }

    const isUserExists = await userModel.findOne({ $or: [{ username }, { email }] })
    
    if(isUserExists) {
        return res.status(400).json({ 
            message: 'Username or email already exists' 
        })
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        { id: newUser._id, username: newUser.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    )

    res.cookie('token', token)

    res.status(201).json({ 
        message: 'User registered successfully',
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        },
        token
    })

} 

/**
 * @name loginUserController
 * @description Controller to handle user login, expects email and password in the request body
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('token', token)

    res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, username: user.username, email: user.email },
        token
    })
}

/**
 * @name logoutUserController
 * @description Controller to handle user logout, expects the token in the request header, 
 * adds the token to the blacklist
 * @route GET /api/auth/logout
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({ token })
    }
    res.clearCookie('token')

    res.status(200).json({ message: 'Logout successful' })
}

/**
 * @name getProfileController
 * @description Controller to get the profile of the logged-in user
 * @route GET /api/auth/profile
 * @access Private
 */

async function getProfileController(req, res) {
    const user = await userModel.findById(req.user.id).select('-password')

    if(!user){
        return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ 
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        message: 'Profile fetched successfully'
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getProfileController
}
