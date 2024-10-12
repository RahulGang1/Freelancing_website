import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // user is a required field
  message: { type: String, required: true },  // message is a required field
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;