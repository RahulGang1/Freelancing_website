import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import mongoose from 'mongoose';

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Check if the email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        // Create a new user
        const user = await User.create({ name, email, password, isAdmin: isAdmin || false });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Get all users (Admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    return res.json(users);
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        return res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

// Delete User (Admin only)// Delete User (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
    console.log("Deleting user with ID:", req.params.id); 

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
        return res.json({ message: `User ${user.name} removed` });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

