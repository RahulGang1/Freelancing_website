import Testimonial from '../models/Testimonial.js';


export const createTestimonial = async (req, res) => {
    const { message } = req.body;
    try {
        const testimonial = await Testimonial.create({ message, user: req.user._id });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().populate('user', 'name');
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }); 
    }
};
