import dotenv from "dotenv"
dotenv.config();
// AI
import OpenAI from "openai";
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import UserActivity from "../models/userActivity.js";
import Book from "../models/book.js";


// POST /recommendations -> Create a new recommendations
/**
* @swagger
* /recommendations:
*   post:
*       summary: Create a new recommendations
*       description: Creates a new recommendations in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                               userId:
*                                   type: string
*                               bookId:
*                                   type: string
*                               category:
*                                   type: string
*                               timestamp:
*                                   type: string
*                                   format: date-time
*                               action:
*                                   type: string
*                                   enum:
*                                       - search
*                                       - click
*       responses:
*           201:
*               description: Availability created successfully
*/
router.post("/", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { userId, bookId,category,timestamp,action} = req.body;
        // TODO: Validate the task data
        if (!userId) {
            return res.status(400).json({ message: "bookid is required"
            });
        }
        // TODO: Save the new task to the database
        const newRecommendation = new UserActivity({
            userId,
            bookId,
            category,
            timestamp,
            action
        });
        // TODO: Return a success response or error
        const savedRecommendation = await newRecommendation.save();

        // Return success response
        res.status(201).json(savedRecommendation);
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /recommendations -> Retrieve all book
/**
* @swagger
* /recommendations:
*   get:
*       summary: Retrieve all recommendations
*       description: Returns a list of all recommendations
*       responses:
*           200:
*               description: A list of recommendations
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               type: object
*                       properties:
*                               userId:
*                                   type: string
*                               bookId:
*                                   type: string
*                               category:
*                                   type: string
*                               timestamp:
*                                   type: string
*                                   format: date-time
*                               action:
*                                   type: string
*                                   enum:
*                                       - search
*                                       - click
*/
router.get("/", async (req, res) => {
   try {
    //  TODO: Fetch all tasks from the database and populate the "items" field
     const books = await UserActivity.find();
    //  const bookswithId = books.map(b => ({...b.doc,id:b._id}))
     res.status(200).json(books);// TODO: Return books as JSON
     
    //  res.json({
    //      message: "GET /book - Retrieve all tasks endpoint hit successfully",
    //  });
   } catch (error) {
    console.error(error);
   }
});

// GET /recommendations/:userId -> Retrieve a task by userId
/**
* @swagger
* /recommendations/{userId}:
*   get:
*       summary: Retrieve a specific recommendations by userId
*       description: Returns a list of book recomendations for the given user based on their activity
*       parameters:
*           - in: path
*             name: userId
*             schema:
*                 type: string
*             required: true
*
*       responses:
*           200:
*               description: A single book
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                           _id:
*                               type: string
*                           title:
*                               type: string
*                           Language:
*                               type: string
*                           Description:
*                               type: string
*                           author:
*                               type: string
*                           published_date:
*                               type: string
*                               format: date-time
*                           reservationid:
*                               type: string
*                           Reservation_availablity:
*                               type: string
*                               enum:
*                                   - Reservation Available
*                                   - No Reservation Available
*                           Location_id:
*                               type: string
*                           Availability_id:
*                               type: string
*/
router.get("/:userId", async (req, res) => {
   try {
    // TODO: Fetch the specific task from the database
    const userId = req.params.userId
    const activities = await UserActivity.find({userId});

    // if (!activites.length) {
    //     return res.json([]) // no activity, returns empty array
    // }

    // const categories
    const categories = activities.map(a => a.category).filter(Boolean)
    if (categories.length === 0){
      const fallbackBooks = await Book.find().limit(5);
      return res.json({recommendations:fallbackBooks});
    }
    const prompt = `Based on user readings categories ${categories.join(" ")}, Recommended 5 availble library books by title.`;

    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{role:"user",content:prompt}]
    });
   //  Parse Ai responses into titles
    const recommendedTitles = aiResponse.choices[0].message.content
    .split("\n")
    .map(t => t.replace(/^\d+\.\s*/,"").trim())
    .filter(Boolean);
    
    const recommendedBooks = await Book.find({title: {$in: recommendedTitles}}).limit(5);
//      // Return the task
   res.json({recommendations: recommendedBooks});
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})


export default router;