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
        res.status(400);
        throw new Error('User already exists');
    }

    try {
        // Create a new user
        const user = await User.create({ name, email, password, isAdmin: isAdmin || false });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400);
            throw new Error('Invalid user data: ' + error.message);
        } else {
            res.status(500);
            throw new Error('Server error: ' + error.message);
        }
    }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Get User Profile
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password'); // Fetch all users and exclude passwords

    if (users) {
        res.json(users); // Return the list of users
    } else {
        res.status(404);
        throw new Error('No users found');
    }
});


// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password; // Make sure to hash the password in the User model's pre-save hook
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id); // Delete user by ID directly

        if (user) {
            res.json({ message: `User ${user.name} removed successfully` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error while deleting user' });
    }
});

