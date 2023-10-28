import { Contestant } from "../models/Contestant.js";
import { Vote } from "../models/Vote.js";

// Post a vote
const createVote =  async(req, res) =>{
    try {
        if (
            !req.body.contestant||
            !req.body.user
            ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }

        // check if user has voted
        const userVoted = await Vote.findOne({user:req.body.user})
        if (userVoted) {
            return res.send({message: 'User already voted'});
        }

        // create new vote
        const newVote = {
            contestant: req.body.contestant,
            user: req.body.user
        };


        const createdVote = await Vote.create(newVote);
        await Contestant.findByIdAndUpdate(createdVote.contestant, {$addToSet: {'votes': createdVote._id}})
        const allVotes = await Vote.find({})

        return res.status(201).send({
            message: 'New Vote recorded',
            totalVotes: allVotes.length
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get all votes
const getAllVotes =  async(req, res) =>{
    try {
        const votes = await Vote.find({});
        return res.status(200).json({
            count: votes.length,
            data: votes
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

// Get one vote
const getVote = async(req, res) =>{
    try {
        const {_id} = req.params;
        const vote = await Vote.findById({_id});
        if(!vote){
            return res.status(404).json({
                message: "Vote not found"
            })
        }
        return res.status(200).json({
            data: vote
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

// Update a vote
const updateVote = async(req, res) => {
    try {
        const {_id} = req.params;  
        const vote = await Vote.findById(_id);
        if(!vote){
            return res.status(404).json({
                message: "Vote not found"
            })
        }
        const result = await Vote.findByIdAndUpdate(_id, req.body)
        if(!result){
            return res.status(404).json({
                message: "Error occured, please try again"
            })
        }
        return res.status(202).json({
            message: "Update successful"
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

// Delete a Vote
const deleteVote = async(req, res) =>{
    try {
        const {_id} = req.params;
        const vote = await Vote.findById({_id});
        if(!vote){
            return res.status(404).json({
                message: "Vote not found"
            })
        }
        await Vote.findByIdAndDelete({_id})
        return res.status(200).json({
            message: "Delete successful"
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

export {createVote, getVote, getAllVotes, updateVote, deleteVote}