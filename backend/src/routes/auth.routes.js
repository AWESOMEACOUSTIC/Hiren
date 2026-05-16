const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

const authRouter = Router()


/** 

@route POST /api/auth/register
@description Register a new user
@access Public
*/

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookies and add the token to the blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/profile
 * @description Get the profile of the logged-in user
 * @access Private
 */
authRouter.get("/profile", authMiddleware, authController.getProfileController)

module.exports = authRouter