import express from 'express';
import { addGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateGoal } from '../utils/validators.js';

const goalRoutes = express.Router();

goalRoutes.post('/api/goals', verifyToken, async (req, res) => {
    console.log('POST /api/goals');
    try {
        const { error } = validateGoal(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const result = await addGoal(req,req.body);
         res.status(201).json(result);
    } catch (error) {
        console.error("Error during goal creation:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


goalRoutes.get('/api/goals', verifyToken, async (req, res) => {
     console.log('GET /api/goals');
    try {
        const result = await getGoals(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


goalRoutes.put('/api/goals/:id', verifyToken, async (req, res) => {
    console.log('PUT /api/goals/:id');
    try {
        const { error } = validateGoal(req.body);
         if (error) {
             return res.status(400).json({ message: error.details[0].message });
         }
        const result = await updateGoal(req,req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


goalRoutes.delete('/api/goals/:id', verifyToken, async (req, res) => {
    console.log('DELETE /api/goals/:id');
    try {
        const result = await deleteGoal(req,req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default goalRoutes;