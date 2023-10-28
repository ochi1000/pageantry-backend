import mongoose, { Schema } from "mongoose"; 

export const User = mongoose.model('User', mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        }
    }, {timestamps: true}
))