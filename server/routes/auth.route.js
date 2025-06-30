import express from 'express'
import { register,login } from '../controllers/auth.controller.js';
const router = express.Router()


// ENDPOINT http://localhost:8000/auth/register
router.post('/register',register)
// ENDPOINT http://localhost:8000/auth/login
router.post('/login', login)




export default router