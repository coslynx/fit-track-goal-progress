import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import { validateUserRegistration, validateUserLogin } from '../utils/validators.js';

const authRoutes = express.Router();

authRoutes.post('/api/auth/register', async (req, res) => {
    console.log('POST /api/auth/register');
    try {
        const { error } = validateUserRegistration(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const result = await register(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


authRoutes.post('/api/auth/login', async (req, res) => {
    console.log('POST /api/auth/login');
    try {
        const { error } = validateUserLogin(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const result = await login(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


authRoutes.get('/api/auth/me', async (req, res) => {
    console.log('GET /api/auth/me');
    try {
         const result = await me(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default authRoutes;