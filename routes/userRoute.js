import express from 'express';
import { register, login } from '../controllers/UserController.js';

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/auth', login);

export default router;