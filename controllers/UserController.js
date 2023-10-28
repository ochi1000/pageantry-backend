import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import { Vote } from "../models/Vote.js";

// Post a user
const register =  async(req, res) =>{
    try {
        if (
            !req.body.username||
            !req.body.password
            ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }
        // check username
        const usernameUsed = await User.findOne({username:req.body.username})
        if(usernameUsed){
            return res.send({message: 'Username already used'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        var newUser = {
            username: req.body.username,
            password: hashedPassword
        };

        newUser = await User.create(newUser);

        return res.status(201).send({data:newUser, message: 'User has registered & logged in successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

const login = async(req, res) =>{
    try {
        if (
            !req.body.username||
            !req.body.password
            ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }
        const username = req.body.username; 
        const user = await User.findOne({username});

        if(!user){
            return res.send({
                message: "User not found"
            });
        }
        const validCredentials = await bcrypt.compare(req.body.password, user.password)
        if(!validCredentials){
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }

        // check if user has voted
        const userVoted = await Vote.findOne({user:req.body.user})
        const allVotes = await Vote.find({})
        const voted = userVoted ? true : false;

        return res.status(200).json({
            data: user, 
            message: "Login successful",
            status: "success",
            voted: voted,
            totalVotes: allVotes.length
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
    }
}



export {register, login}