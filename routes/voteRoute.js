import express from 'express';
import { Vote } from '../models/Vote.js';
import { createVote, getVote, getAllVotes, updateVote, deleteVote } from '../controllers/VoteController.js';

const router = express.Router();

// Post a vote
router.post('', createVote);

// Get all votes
router.get('', getAllVotes)

// Get one vote
router.get('/:_id', getVote)

// Update a vote
router.put('/:_id', updateVote)

// Delete a Vote
router.delete('/:_id', deleteVote)

export default router;