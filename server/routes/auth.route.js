import express from 'express'
// Controller
import { register,login } from '../controllers/auth.controller.js';
import { loginSchema, registerSchema, validate } from '../utils/validate.js';

const router = express.Router()


// ENDPOINT http://localhost:8000/auth/register
router.post('/register',validate(registerSchema),register);
// ENDPOINT http://localhost:8000/auth/login
router.post('/login',validate(loginSchema),login);




export default router