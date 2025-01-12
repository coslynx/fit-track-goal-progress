// Import the jsonwebtoken library for JWT handling.
import jwt from 'jsonwebtoken';
// Import dotenv to load environment variables
import dotenv from 'dotenv';

// Load environment variables from the .env file.
dotenv.config();

/**
 * Middleware to verify user authorization via JWT.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>}
 */
const verifyToken = async (req, res, next) => {
    console.log('Middleware: Verify JWT Token');
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;


    // Check if the authorization header is missing
    if (!authHeader) {
         console.error('Authorization header missing');
        return res.status(401).json({ message: 'Authorization header missing' });
    }


    // Extract the token from the authorization header, it should be formatted as 'Bearer <token>'
    const token = authHeader.split(' ')[1];


    // Check if the token is missing or undefined
    if (!token) {
        console.error('Token is missing or undefined');
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    try {
        // Verify the token using the secret key from the environment variables.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // If the token is valid, add the user info to the request object for subsequent routes to access.
         req.user = {
            userId: decoded.userId,
            username: decoded.username,
        };

        // Call next middleware
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        console.error('Error verifying token:', error.name, error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


export { verifyToken };