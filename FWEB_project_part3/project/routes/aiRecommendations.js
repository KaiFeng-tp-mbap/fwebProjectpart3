// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import UserActivity from "../models/userActivity.js";
import Book from "../models/book.js";

// AI
import OpenAI from "openai";



// GET /book -> Retrieve all book
/**
* @swagger
* /book:
*   get:
*       summary: Retrieve all book
*       description: Returns a list of all book
*       responses:
*           200:
*               description: A list of book
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

// GET /book/:id -> Retrieve a task by ID
/**
* @swagger
* /book/{id}:
*   get:
*       summary: Retrieve a specific book by ID
*       description: Returns a single task based on the provided ID
*       parameters:
*           - in: path
*             name: id
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
router.get("/recommendations/:userId", async (req, res) => {
   try {
    // TODO: Fetch the specific task from the database
    // const activites = await UserActivity.findById({userId: req.params.userId});

    // if (!activites.length) {
    //     return res.json([]) // no activity, returns empty array
    // }

    // const categories
    // const categories = activites.map(a => a.category)
    const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    // if (categories.lenth === 0){
    //     return res.json([]);
    // }
    const prompt = `Recommended 5 availble library books.`;

    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{role:"user",content:prompt}]
    });
    // const recommendations = await Book.find({
    //     Language: {$in: categories}
    // }).limit(5);
//      // Return the task
     res.json({recommendations: aiResponse.choices[0].message.content});
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})


export default router;