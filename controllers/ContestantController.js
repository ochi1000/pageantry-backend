import { Contestant } from "../models/Contestant.js";
import { Vote } from "../models/Vote.js";

// Post a contestant
const createContestant =  async(req, res) =>{
    try {
        if (
            !req.body.full_name
            ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }
        const newContestant = {
            full_name: req.body.full_name,
        };
        const contestant = await Contestant.create(newContestant);
        const img_url = contestant._id+'.jpeg'

        await Contestant.findByIdAndUpdate(contestant._id, {img_url})

        return res.status(201).send({message: 'New Contestant recorded'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get all contestants
const getAllContestants =  async(req, res) =>{
    var votes = []
    try {
        var contestants = await Contestant.find({});
        const allVotes = await Vote.find({})


        return res.status(200).json({
            count: contestants.length,
            data: contestants,
            totalVotes: allVotes.length
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

// Get one contestant
const getContestant = async(req, res) =>{
    try {
        const {_id} = req.params;
        const contestant = await Contestant.findById({_id});
        if(!contestant){
            return res.status(404).json({
                message: "Contestant not found"
            })
        }
        return res.status(200).json({
            data: contestant
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

// Update a contestant
const updateContestant = async(req, res) => {
    try {
        const {_id} = req.params;  
        const contestant = await Contestant.findById(_id);
        if(!contestant){
            return res.status(404).json({
                message: "Contestant not found"
            })
        }
        const result = await Contestant.findByIdAndUpdate(_id, req.body)
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

// Delete a Contestant
const deleteContestant = async(req, res) =>{
    try {
        const {_id} = req.params;
        const contestant = await Contestant.findById({_id});
        if(!contestant){
            return res.status(404).json({
                message: "Contestant not found"
            })
        }
        await Contestant.findByIdAndDelete({_id})
        return res.status(200).json({
            message: "Delete successful"
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
};

export {createContestant, getContestant, getAllContestants, updateContestant, deleteContestant}