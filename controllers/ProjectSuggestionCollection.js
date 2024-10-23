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

// Get All Project Suggestions
export const getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await ProjectSuggestion.find();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Project Suggestion by ID
export const getProjectSuggestionById = async (req, res) => {
    try {
        const suggestion = await ProjectSuggestion.findById(req.params.id);
        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Project Suggestion

export const deleteProjectSuggestion = async (req, res) => {
    try {
        const suggestion = await ProjectSuggestion.findById(req.params.id);
        
        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        
        await suggestion.deleteOne(); // Use deleteOne() instead of remove()
        res.status(200).json({ message: 'Suggestion removed' });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

