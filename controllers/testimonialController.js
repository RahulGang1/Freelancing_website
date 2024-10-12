import Testimonial from '../models/Testimonial.js';

    // Create Testimonial
    export const createTestimonial = async (req, res) => {
    const { message, user } = req.body;

    // Validation
    if (!message || !user) {
        return res.status(400).json({ message: 'Message and User are required' });
    }

    try {
        const testimonial = new Testimonial({ message, user });
        await testimonial.save();  // Save to MongoDB
        res.status(201).json(testimonial);  // Send back created testimonial
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating testimonial', error: error.message });
    }
    };

    // Get All Testimonials
    export const getTestimonials = async (req, res) => {
    try {
        // Fetch all testimonials and populate user name
        const testimonials = await Testimonial.find().populate('user', 'name');
        res.status(200).json(testimonials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
    }
    };

    // Get Testimonial by ID
    export const getTestimonialById = async (req, res) => {
    const { id } = req.params;

    try {
        const testimonial = await Testimonial.findById(id).populate('user', 'name');
        if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(testimonial);  // Send the found testimonial
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching testimonial', error: error.message });
    }
    };

    // Update Testimonial
    export const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { message, user } = req.body;

    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
        id,
        { message, user }, 
        { new: true } // Return the updated testimonial
        );

        if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.status(200).json(testimonial);  // Return updated testimonial
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating testimonial', error: error.message });
    }
    };

    // Delete Testimonial
    export const deleteTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.status(200).json({ message: 'Testimonial deleted' });  // Return success message
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
    }
    };