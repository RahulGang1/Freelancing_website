import express from 'express';
import { createTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

// Create a testimonial
router.post('/create', createTestimonial);

// Get all testimonials
router.get('/', getTestimonials);

// Get a testimonial by ID
router.get('/:id', getTestimonialById);

// Update a testimonial by ID
router.put('/:id', updateTestimonial);

// Delete a testimonial by ID
router.delete('/:id', deleteTestimonial);

export default router;