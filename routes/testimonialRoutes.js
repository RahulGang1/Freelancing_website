import express from 'express';
import { createTestimonial, getTestimonials } from '../controllers/testimonialController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createTestimonial).get(getTestimonials);

export default router;
