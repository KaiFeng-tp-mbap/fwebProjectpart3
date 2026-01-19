// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

import { authMiddleware } from "../middleware/authMiddleware.js";
// POST /user -> Create a new user
/**
* @swagger
* /user:
*   post:
*       summary: Create a new user
*       description: Creates a new user in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                           password:
*                               type: string
*                           repassword:
*                               type: string
*                           email:
*                               type: string
*                           role:
*                               type: string
*                               enum:
*                                   - librarian
*                                   - user
*       responses:
*           201:
*               description: user created successfully
*/
router.post("/", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { name, password,repassword,email,role} = req.body;
        // TODO: Validate the task data
        if (!name) {
            return res.status(400).json({ message: "name is required"
            });
        }
        // TODO: Save the new task to the database
        const newUser = new User({
            name,
            password,
            repassword,
            email,
            role
        });
        // TODO: Return a success response or error
        const savedUser = await newUser.save();

        // Return success response
        res.status(201).json(savedUser);
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /user -> Retrieve all users
/**
* @swagger
* /user:
*   get:
*       summary: Retrieve all users
*       description: Returns a list of all users
*       responses:
*           200:
*               description: A list of users
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   name:
*                                       type: string
*                                   password:
*                                       type: string
*                                   repassword:
*                                       type: string
*                                   email:
*                                       type: string
*                                   role:
*                                       type: string
*                                       enum:
*                                           - librarian
*                                           - user
*/
router.get("/", async (req, res) => {
   try {
    //  TODO: Fetch all users from the database and populate the "items" field
     const users = await User.find();
     
     res.status(200).json(users);// TODO: Return reservations as JSON
     
    //  res.json({
    //      message: "GET /book - Retrieve all tasks endpoint hit successfully",
    //  });
   } catch (error) {
    console.error(error);
   }
});

// GET /user/:id -> Retrieve a user by ID
/**
* @swagger
* /user/{id}:
*   get:
*       summary: Retrieve a specific user by ID
*       description: Returns a single reservation based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*
*       responses:
*           200:
*               description: A single reservation
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               name:
*                                   type: string
*                               password:
*                                   type: string
*                               repassword:
*                                   type: string
*                               email:
*                                   type: string
*                               role:
*                                   type: string
*                                   enum:
*                                       - librarian
*                                       - user
*/
router.get("/:id", async (req, res) => {
   try {
//      // TODO: Get task ID from req.params.id
     const userId = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const user = await User.findById(userId);
 
//      // TODO: Return the task or an error if not found
     if (!user) {
     return res.status(404).json({ message: "user not found" });
     }
//      // Return the task
     res.json(user);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})

// PUT /user/:id -> Update a user's details
/**
* @swagger
* /user/{id}:
*   put:
*       summary: Update a specific user by ID
*       description: Updates the details of a user based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                               name:
*                                   type: string
*                               password:
*                                   type: string
*                               repassword:
*                                   type: string
*                               email:
*                                   type: string
*                                   format: date-time
*                               role:
*                                   type: string
*                                   enum:
*                                      - librarian
*                                      - user
*       responses:
*           200:
*               description: user updated successfully
*/
router.put("/:id", async (req, res) => {
    try {
    //     // TODO: Get task ID from req.params.id
        const userId = req.params.id;
    //     // TODO: Get updated data from req.body
        const updatedData = req.body;
    //     // TODO: Update the task in the database
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true, runValidators: true }// TODO: Return the updated book or an error
        
        );
    //     // If book not found, return 404
        if (!updatedUser) {
        return res.status(404).json({ message: "user not found"
        });
        }
    //     // Return the updated task
        res.json(updatedUser);

        // res.json({
        //     message: `PUT /tasks/${req.params.id} - Update book endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /user/:id -> Delete a user
/**
* @swagger
* /user/{id}:
*   delete:
*       summary: Delete a specific user by ID
*       description: Deletes a reservation from the database based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*       responses:
*           200:
*               description: user deleted successfully
*/
router.delete("/:id", async (req, res) => {
    try {
        // TODO: Get task ID from req.params.id
        const userId = req.params.id;
        // // TODO: Remove the task from the database
        const deletedUser = await User.findByIdAndDelete(userId);
        // // TODO: Return a success message or error if not found
        if (!deletedUser) {
            return res.status(404).json({ message: "user not found"
            });
        }
        // // Return success message
        res.json({ message: "reservation deleted successfully", task:deletedUser });
        // res.json({
        //     message: `DELETE /book/${req.params.id} - Delete task endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})
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
*                       required:
*                           - email
*                           - password
*                       properties:
*                           email:
*                               type: string
*                           password:
*                               type: string
*       responses:
*           200:
*               description: login successful
*           401:
*               description: login failed
*           500:
*               description: server error
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