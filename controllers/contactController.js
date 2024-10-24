import asyncHandler from 'express-async-handler';
import Contact from '../models/ContactModel.js';
import nodemailer from 'nodemailer';

// Create a new contact// Create a new contact
export const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({ name, email, phone, message });
    
    if (contact) {
        // Send email notification
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Use 465 for SSL/TLS
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'collaboratex7@gmail.com', // Your Gmail address
              pass: 'paras208017', // Use app password if 2FA enabled
            },
          });
        
        // Mail options
        const mailOptions = {
            from:  process.env.EMAIL_USERNAME,
            to: 'collaboratex7@gmail.com', 
            subject: 'New Contact Form Submission',
            text: `You have received a new message from:
        
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}`,
        };
        
        // Send email function
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            _id: contact._id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            message: contact.message,
        });
    } else {
        res.status(400);
        throw new Error('Invalid contact data');
    }
});


export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.json(contacts);
});

// Delete a contact
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.status(200).json({ message: 'Contact removed' });
});