import express from 'express';
import UserModel from "../Models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router=express.Router();
router.post('/login', async (req, res) => {
    if (!process.env.JWT_SECRET_KEY) {
        res.sendStatus(500);
        return;
    }
    try {

        const {email, password}: { email: string, password: string } = req.body;
        if(!email||!password){
            res.sendStatus(400);
            return;
        }
        const user = await UserModel.findOne({email});
        if (!user) {
            res.sendStatus(401);
            return;
        }
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            res.sendStatus(401);
            return;
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        if (!token) {
            res.sendStatus(400);
            return;
        }
        res.cookie("jwt", token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 100,secure:true});
        res.sendStatus(200);
    } catch (e) {
        res.send(500)
    }
})
router.post('/signup', async (req, res) => {
    if (!process.env.JWT_SECRET_KEY) {
        res.sendStatus(500);
        return;
    }
    try {
        const {
            email, password, firstName, lastName
        }: { email: string, password: string, firstName: string, lastName: string | undefined } = req.body;
        console.log(req.body)
        if(!email||!password||!firstName){
            res.sendStatus(400);
            return;
        }
        const hash = await bcrypt.hash(password, 10);
        if (!hash) {
            res.sendStatus(500);
            return;
        }
        const newUser = new UserModel({email, password, firstName, lastName});
        await newUser.save();
        const token=jwt.sign({email}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        if (!token) {
            res.sendStatus(400);
            return;
        }
        res.cookie("jwt", token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 100,secure:true});
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);
        return;
    }
})
export const AuthRouter=router;