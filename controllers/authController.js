// Import the registerUser, loginUser, and verifyToken functions from the auth service.
import { registerUser, loginUser, verifyToken } from '../services/auth.js';
// Import the User model.
import User from '../models/User.js';
// Import the database connection object
import db from '../config/database.js';


/**
 * Registers a new user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    console.log('Controller: Register user');
    res.setHeader('Content-Type', 'application/json');

    if (db.readyState !== 1) {
      console.error("Database connection is not active.");
       return res.status(500).json({ message: "Database connection is not active." });
    }

    try {
        const { username, email, password } = req.body;
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim().toLowerCase();

        const result = await registerUser({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: password,
        });

        res.status(201).json({
            id: result.id,
            username: result.username,
            email: result.email,
            token: result.token,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        if (error.message === 'Username already exists' || error.message === 'Email already exists') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Logs in an existing user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    console.log('Controller: Login user');
      res.setHeader('Content-Type', 'application/json');

      if (db.readyState !== 1) {
        console.error("Database connection is not active.");
        return res.status(500).json({ message: "Database connection is not active." });
     }

    try {
        const { username, password } = req.body;
          const sanitizedUsername = username.trim();
        const result = await loginUser({
            username: sanitizedUsername,
            password: password,
        });

        res.status(200).json({
            id: result.id,
            username: result.username,
            email: result.email,
            token: result.token,
        });
    } catch (error) {
         console.error("Error logging in user:", error);
        if(error.message === 'Invalid credentials'){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Retrieves the current user's profile.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const me = async (req, res) => {
    console.log('Controller: Get current user');
      res.setHeader('Content-Type', 'application/json');

    if (db.readyState !== 1) {
        console.error("Database connection is not active.");
        return res.status(500).json({ message: "Database connection is not active." });
    }


    const authHeader = req.headers.authorization;

      if (!authHeader) {
          console.error("Authorization header missing");
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

    try {
        const result = await verifyToken(token);
        res.status(200).json({
            id: result.userId,
            username: result.username,
        });
    } catch (error) {
         console.error("Error verifying token:", error);
         if(error.message === 'Invalid or expired token'){
             return res.status(401).json({ message: 'Invalid or expired token' });
         }
        res.status(401).json({ message: 'Unauthorized' });
    }
};


export { register, login, me };