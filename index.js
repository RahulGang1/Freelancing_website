import express from 'express';
<<<<<<< HEAD
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import projectSuggestions from './routes/ProjectSuggestionRoutes.js';
import paymentRoutes from "./routes/PaymentRoute.js"

=======
>>>>>>> 219703adb1ba3b2b998bd576c76ef3a4d7742800
const app = express();

<<<<<<< HEAD
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://paras22:BB2orhb1NHhtvT0J@cluster0.gejab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/projects', projectSuggestions);
app.use('/api', paymentRoutes);

=======
app.get('/', (req,res)=>{
    res.send("Server is running.")
})

>>>>>>> 219703adb1ba3b2b998bd576c76ef3a4d7742800

app.listen(4000, ()=>{
    console.log("Server is runnig on port 4000");
    
})
