import express from 'express';
import { submitProjectSuggestion, getAllSuggestions } from '../controllers/ProjectSuggestionCollection.js';
import { isAdmin } from '../middlewares/authmiddlerware.js';

const router = express.Router();

router.post('/suggest', submitProjectSuggestion);
router.get('/suggestions', isAdmin, getAllSuggestions);

export default router;



