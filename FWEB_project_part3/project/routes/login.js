// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

import { authMiddleware } from "../middleware/authMiddleware.js";

// POST /login -> login in a user
/**
* @swagger
* /login:
*   post:
*       summary: login a user
*       description: login a user in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           email:
*                               type: string
*                           password:
*                               type: string
*       responses:
*           200:
*               description: login successful
*/

router.post("/login", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { email, password} = req.body;
        // TODO: Validate the task data
        if (!email || !password) {
            return res.status(400).json({ message: "email and password is required"
            });
        }
        // find user
        const user = await User.findOne({email}).select("+password");
        if (!user){
            return res.status(401).json({ message: "Login failed" });
        }
        
        // compare password
        const valid = await bcrypt.compare(password,user.password)
        if (!valid){
            return res.status(401).json({ message: "Login failed" });
        }

        // Generate JWT token
        const token = jwt.sign({id: user._id,role: user.role},JWT_SECRET,{expiresIn:"1h"});

        // Return success response
        res.status(200).json({
            message: "Login successful",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },token,
        });
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
export default router;