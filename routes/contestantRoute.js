import express from 'express';
import { Contestant } from '../models/Contestant.js';
import { createContestant, getContestant, getAllContestants, updateContestant, deleteContestant } from '../controllers/ContestantController.js';

const router = express.Router();

// Post a ccontestant
router.post('', createContestant);

// Get all ccontestants
router.get('', getAllContestants)

// Get one ccontestant
router.get('/:_id', getContestant)

// Update a ccontestant
router.put('/:_id', updateContestant)

// Delete a Contestant
router.delete('/:_id', deleteContestant)

export default router;