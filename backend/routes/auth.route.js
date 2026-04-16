import express from 'express'
import { login, logout, signup, refreshToken, getProfile } from '../controllers/auth.controller.js'
import protectedRoute from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.post("/refreshToken", refreshToken)
router.get("/profile", protectedRoute, getProfile)

export default router