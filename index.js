import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import projectSuggestions from './routes/ProjectSuggestionRoutes.js';
import paymentRoutes from "./routes/PaymentRoute.js"
import Testimonial from './models/Testimonial.js';
import { isAdmin } from './middlewares/authmiddlerware.js';
import authoRoutes from "./routes/authRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://paras22:BB2orhb1NHhtvT0J@cluster0.gejab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/projects', projectSuggestions);
app.use('/api/payment', paymentRoutes);
app.use('/api/testimonial',Testimonial);
app.use("/api/auth",authoRoutes)
app.use('/api/isAdmin',isAdmin)




app.listen(process.env.PORT, ()=>{
    console.log("Server is runnig on port 4000");
    
})
