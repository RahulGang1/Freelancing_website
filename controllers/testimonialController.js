import Testimonial from '../models/Testimonial.js';

// Create Testimonial
export const createTestimonial = async (req, res) => {
    const { message } = req.body;
    try {
        const testimonial = await Testimonial.create({ message, user: req.user._id });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get All Testimonials
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().populate('user', 'name');
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Testimonial by ID
export const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id).populate('user', 'name');
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Testimonial
export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        await testimonial.remove();
        res.json({ message: 'Testimonial removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
