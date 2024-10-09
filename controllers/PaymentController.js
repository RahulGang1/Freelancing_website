import Stripe from 'stripe';
import Payment from '../models/Payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new project payment
export const createProject = async (req, res) => {
    const { name, amount } = req.body;
    const payment = new Payment({ name, amount });
    await payment.save();
    res.status(201).json(payment);
};

// Partial Payment
export const partialPayment = async (req, res) => {
    const { name } = req.params;
    const { amount } = req.body;

    const payment = await Payment.findOne({ name });
    if (!payment) return res.status(404).send('Project not found');

    if (payment.paidAmount + amount > payment.amount) {
        return res.status(400).send('Cannot exceed total amount');
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
    });

    payment.paidAmount += amount;
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

// Full Payment
export const fullPayment = async (req, res) => {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).send('Project not found');

    const remainingAmount = payment.amount - payment.paidAmount;

    if (remainingAmount <= 0) {
        return res.status(400).send('Project is already fully paid');
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: remainingAmount * 100,
        currency: 'usd',
    });

    payment.paidAmount = payment.amount;
    payment.status = 'completed';
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
