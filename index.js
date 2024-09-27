import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes); 
app.use('/api/projects', projectRoutes); 
app.use('/api/testimonials', testimonialRoutes); 
app.use('/api/payments', paymentRoutes); 


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas Cluster connected'))
    .catch(err => console.log('Error: ' + err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
