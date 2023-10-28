import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import voteRoute from "./routes/voteRoute.js"
import contestantRoute from "./routes/contestantRoute.js"
import userRoute from "./routes/userRoute.js"
import cors from 'cors';
const app = express();

//middleware for parsing request body
app.use(express.json());

// Middleware for handling CORs Policy
// Allow all origins
app.use(cors())

app.get('/', (req, res) =>{
    console.log(req);
    return res.status(200).send('Welcome Home')
});

app.use('/votes', voteRoute);
app.use('/contestants', contestantRoute);
app.use('/', userRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('Database connection successful')
    app.listen(PORT, () => {
        console.log(`App is listening on: ${PORT}`)
    });
})
.catch((error) => {
    console.error(error)
})