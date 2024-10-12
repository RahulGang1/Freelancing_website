import express from 'express';
import { 
    submitProjectSuggestion, 
    getAllSuggestions, 
    getProjectSuggestionById, 
    deleteProjectSuggestion 
} from '../controllers/ProjectSuggestionCollection.js';

const router = express.Router();

// Route for submitting a project suggestion
router.post('/submit', submitProjectSuggestion);

// Route for getting all project suggestions
router.get('/suggestions', getAllSuggestions);

// Route for getting a single project suggestion by ID
router.get('/suggestions/:id', getProjectSuggestionById);

// Route for deleting a project suggestion by ID
router.delete('/suggestions/:id', deleteProjectSuggestion);

export default router;
