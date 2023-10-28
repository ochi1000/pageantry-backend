import mongoose, { Schema } from "mongoose";

const VoteSchema = mongoose.Schema(
    {
        contestant:{
            type: Schema.Types.ObjectId,
            ref: 'Contestant',
            required: true,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        } 
    }, 
    {
        timestamps: true,
    }
);

export const Vote = mongoose.model('Vote', VoteSchema);