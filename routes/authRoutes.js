import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUserProfile, deleteUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/authmiddlerware.js'; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.delete("/user/:id", protect,isAdmin, deleteUser);
router.get('/profiles', protect, isAdmin, getAllUsers); 
router.put('/profile', protect, updateUserProfile);

export default router;
