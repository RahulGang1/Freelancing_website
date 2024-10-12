import mongoose from 'mongoose';

const projectSuggestionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectTitle: { type: String, required: true },
    projectType: { type: String, required: true },
    projectDescription: { type: String, required: true },
    budget: { type: Number, required: true },
    deadline: { type: String },
    additionalNotes: { type: String },
});

const ProjectSuggestion = mongoose.model('ProjectSuggestion', projectSuggestionSchema);
export default ProjectSuggestion;
