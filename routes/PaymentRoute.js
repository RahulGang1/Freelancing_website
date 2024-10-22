import express from 'express';
import {
    createProject,
    partialPayment,
    fullPayment
} from '../controllers/PaymentController.js';


const router = express.Router();

// Create a new project
router.post('/projects', createProject);

// Partial Payment
router.post('/pay/partial/:name', partialPayment);

// Full Payment
router.post('/pay/full/:id', fullPayment);

export default router;
