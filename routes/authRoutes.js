import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUserProfile,deleteUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete("/user/:id",deleteUser)
router.get('/profiles', protect, getAllUsers);
router.put('/profile', protect, updateUserProfile);

export default router;
 