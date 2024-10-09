import Stripe from 'stripe';
import Payment from '../models/Payment.js';

const stripe = new Stripe("sk_test_your_secret_key_here");

// Create a new project
export const createProject = async (req, res) => {
    const { name, amount } = req.body;
    const payment = new Payment({ name, amount });
    await payment.save();
    res.status(201).json(payment);
};

/// Partial Payment
export const partialPayment = async (req, res) => {
    const { name } = req.params; // Get project name from URL parameters
    const { amount } = req.body; // Get payment amount from request body

    // Find the project by name
    const payment = await Payment.findOne({ name }); // Use findOne to search by name
    if (!payment) return res.status(404).send('Project not found');

    // Check if the new payment exceeds the total amount
    if (payment.paidAmount + amount > payment.amount) {
        return res.status(400).send('Cannot exceed total amount');
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
    });

    // Update the paid amount and save the project
    payment.paidAmount += amount;
    await payment.save();

    // Send back the client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

// Full Payment
export const fullPayment = async (req, res) => {
    const { id } = req.params;
    const payment = await Project.findById(id);
    if (!payment) return res.status(404).send('Project not found');

    const remainingAmount = payment.amount - payment.paidAmount;

    if (remainingAmount <= 0) {
        return res.status(400).send('Project is already fully paid');
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: remainingAmount * 100, // Convert to cents
        currency: 'usd',
    });

    payment.paidAmount = payment.amount; // Mark as fully paid
    payment.status = 'completed';
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
