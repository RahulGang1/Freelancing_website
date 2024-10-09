import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { timestamps: true });

const Payment = mongoose.model('Project', PaymentSchema);
export default Payment;
