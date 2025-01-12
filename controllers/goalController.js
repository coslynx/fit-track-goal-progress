// Import the Goal model.
import Goal from '../models/Goal.js';
// Import the verifyToken middleware.
import { verifyToken } from '../middlewares/authMiddleware.js';
// Import database connection
import db from '../config/database.js';


/**
 * Handles creation of new goals.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} body - Request body object.
 * @returns {Promise<void>}
 */
const addGoal = async (req, body) => {
    console.log('Controller: Add new goal');
    
    if (db.readyState !== 1) {
        console.error("Database connection is not active.");
        const error = new Error("Database connection is not active.");
        error.statusCode = 500;
        throw error;
    }


    try {
        const { description, target, progress } = body;
        const sanitizedDescription = description.trim();

         const userId = req.user.userId;


        const newGoal = new Goal({
            user: userId,
            description: sanitizedDescription,
            target: target,
            progress: progress
        });

        const savedGoal = await newGoal.save();


        return savedGoal;
    } catch (error) {
          console.error("Error creating goal:", error);

          if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
              error.statusCode = 400;
              error.message = `Validation failed: ${validationErrors.join(', ')}`;
             throw error;
          } else {
              error.statusCode = 500;
              error.message = 'Internal server error'
             throw error;
          }


    }
};


/**
 * Fetches all goals for the authenticated user.
 * @async
 * @param {Object} req - Express request object.
 * @returns {Promise<void>}
 */
const getGoals = async (req) => {
    console.log('Controller: Get all goals');
    if (db.readyState !== 1) {
        console.error("Database connection is not active.");
        const error = new Error("Database connection is not active.");
        error.statusCode = 500;
        throw error;
    }

    try {
         const userId = req.user.userId;
        const goals = await Goal.find({ user: userId });

        return goals;
    } catch (error) {
          console.error("Error fetching goals:", error);
        error.statusCode = 500;
        error.message = "Error fetching goals";
        throw error;
    }
};


/**
 * Updates an existing goal with the provided ID.
 * @async
 * @param {Object} req - Express request object.
 * @param {string} id - Goal ID.
 * @param {Object} body - Request body object.
 * @returns {Promise<void>}
 */
const updateGoal = async (req, id, body) => {
    console.log('Controller: Update a goal');
     if (db.readyState !== 1) {
         console.error("Database connection is not active.");
        const error = new Error("Database connection is not active.");
         error.statusCode = 500;
         throw error;
     }


    try {
        const { description, target, progress } = body;
        const sanitizedDescription = description.trim();
         const userId = req.user.userId;


        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: id, user: userId },
            {
                description: sanitizedDescription,
                target: target,
                progress: progress
            },
            { new: true, runValidators: true }
        );

        if (!updatedGoal) {
            const error = new Error('Goal not found');
            error.statusCode = 404;
            throw error;
        }

        return updatedGoal;
    } catch (error) {
          console.error("Error updating goal:", error);
          if(error.name === 'ValidationError'){
             const validationErrors = Object.values(error.errors).map(err => err.message);
             error.statusCode = 400;
            error.message = `Validation failed: ${validationErrors.join(', ')}`;
           throw error;
        } else if (error.message === 'Goal not found') {
            error.statusCode = 404;
            throw error
        }
         else {
             error.statusCode = 500;
             error.message = 'Internal server error'
             throw error;
         }
    }
};


/**
 * Deletes a goal with the provided ID.
 * @async
 * @param {Object} req - Express request object.
 * @param {string} id - Goal ID.
 * @returns {Promise<void>}
 */
const deleteGoal = async (req, id) => {
    console.log('Controller: Delete a goal');
     if (db.readyState !== 1) {
          console.error("Database connection is not active.");
          const error = new Error("Database connection is not active.");
           error.statusCode = 500;
           throw error;
      }


    try {
         const userId = req.user.userId;

        const deletedGoal = await Goal.findOneAndDelete({ _id: id, user: userId });

         if (!deletedGoal) {
            const error = new Error('Goal not found');
             error.statusCode = 404;
             throw error;
        }

        return { message: 'Goal deleted successfully' };
    } catch (error) {
        console.error("Error deleting goal:", error);
        if (error.message === 'Goal not found') {
            error.statusCode = 404;
            throw error;
        } else {
           error.statusCode = 500;
            error.message = "Internal server error";
           throw error
        }
    }
};


export { addGoal, getGoals, updateGoal, deleteGoal };