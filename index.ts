import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import {GraphqlHTTP} from "./GraphQL/schema";
import {AuthRouter} from "./ExpressRouters/Auth";

const app = express();
app.use(cookieParser());

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/auth',AuthRouter);
app.use('/graphql', GraphqlHTTP);

mongoose.connect("mongodb://localhost:27017/prs").then(() => {
    console.log("Database Connected!")
    app.listen(4000, ()=>{
        console.log("Server Started!")
    });
})