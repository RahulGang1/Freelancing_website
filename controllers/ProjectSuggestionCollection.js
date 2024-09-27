import ProjectSuggestion from '../models/ProgectSuggestion.js';

// Submit Project Suggestion
export const submitProjectSuggestion = async (req, res) => {
    try {
        const suggestion = new ProjectSuggestion(req.body);
        await suggestion.save();
        res.status(201).json({ message: "Suggestion submitted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Suggestions (Admin Only)
export const getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await ProjectSuggestion.find();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
