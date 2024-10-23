import express from 'express';
import { createContact, getContacts, deleteContact } from '../controllers/contactController.js';

const router = express.Router();

// Route to create a new contact
router.post('/create', createContact);

// Route to get all contacts
router.get('/getcontact', getContacts);

// Route to delete a contact by ID
router.delete('/delete/:id', deleteContact);

export default router;
