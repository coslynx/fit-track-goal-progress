// Import the jsonwebtoken library for JWT handling.
import jwt from 'jsonwebtoken';
// Import the bcrypt library for password hashing.
import bcrypt from 'bcrypt';
// Import dotenv to load environment variables
import dotenv from 'dotenv';
// Import the User model to interact with the database.
import User from '../models/User.js';
// Import database connection
import db from '../config/database.js';

dotenv.config();

/**
 * Registers a new user.
 * @async
 * @param {Object} userData - User data including username, email, and password.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<{id: string, username: string, email: string, token: string}>} - A promise that resolves with the user's ID, username, email, and JWT token.
 * @throws {Error} - If database connection fails, or user registration fails.
 */
const registerUser = async (userData) => {
    if (db.readyState !== 1) {
         throw new Error("Database connection is not active.");
    }

    try {
        const { username, email, password } = userData;
        const user = new User({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password,
        });

        await user.save();

        const payload = {
            userId: user._id,
            username: user.username,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

       return {
            id: user._id,
            username: user.username,
            email: user.email,
            token: token,
        };
    } catch (error) {
        if (error.message.includes('username already exists')) {
            throw new Error('Username already exists');
        }
        else if (error.message.includes('email already exists')) {
             throw new Error('Email already exists');
         }
        else{
            console.error("Error registering user:", error);
            throw new Error('Error registering user');
        }
    }
};

/**
 * Logs in an existing user.
 * @async
 * @param {Object} userData - User data including username/email and password.
 * @param {string} userData.username - The username or email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<{id: string, username: string, email: string, token: string}>} - A promise that resolves with the user's ID, username, email and JWT token.
 * @throws {Error} - If database connection fails, or login fails due to incorrect credentials.
 */
const loginUser = async (userData) => {
    if (db.readyState !== 1) {
        throw new Error("Database connection is not active.");
    }

    try {
        const { username, password } = userData;
        const user = await User.findOne({
            $or: [{ username: username.trim() }, { email: username.trim().toLowerCase() }],
        });

        if (!user) {
           throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
           throw new Error('Invalid credentials');
        }

        const payload = {
            userId: user._id,
            username: user.username,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return {
             id: user._id,
             username: user.username,
             email: user.email,
             token: token,
         };

    } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error(error.message || 'Invalid credentials');
    }
};


/**
 * Verifies a JWT token.
 * @async
 * @param {string} token - The JWT token to verify.
 * @returns {Promise<{userId: string, username: string}>} - A promise that resolves with the user ID and username from the token payload.
 * @throws {Error} - If the token is invalid or expired.
 */
const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            userId: decoded.userId,
            username: decoded.username,
        };
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error('Invalid or expired token');
    }
};


export { registerUser, loginUser, verifyToken };