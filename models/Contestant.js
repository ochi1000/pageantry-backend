import mongoose, { Schema } from "mongoose"; 

const contestantSchema = mongoose.Schema({
        full_name:{
            type: String,
            required: true,
        },
        img_url:{
            type:String,
        },
        votes:[{
            type: Schema.Types.ObjectId,
            ref: 'Vote',
        }]
    }, { timestamp:true }
);



export const Contestant = mongoose.model('Contestant', contestantSchema)