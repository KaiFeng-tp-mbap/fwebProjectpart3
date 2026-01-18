// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import Book from "../models/book.js";
// POST /book -> Create a new task
/**
* @swagger
* /book:
*   post:
*       summary: Create a new book
*       description: Creates a new book in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
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
*       responses:
*           201:
*               description: Task created successfully
*/
router.post("/", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { title, Language,Description,author,published_date,Availability_id, reservationid,Reservation_availablity, Location_id} = req.body;
        // TODO: Validate the task data
        if (!title) {
            return res.status(400).json({ message: "Title is required"
            });
        }
        // TODO: Save the new task to the database
        const newBook = new Book({
            title,
            Language,
            Description,
            author,
            published_date,
            Availability_id,
            reservationid,
            Reservation_availablity,
            Location_id
        });
        // TODO: Return a success response or error
        const savedBook = await newBook.save();

        // Return success response
        res.status(201).json(savedBook);
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

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
router.get("/", async (req, res) => {
   try {
    //  TODO: Fetch all tasks from the database and populate the "items" field
     const books = await Book.find();
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
*                               title:
*                                   type: string
*                               Language:
*                                   type: string
*                               Description:
*                                   type: string
*                               author:
*                                   type: string
*                               published_date:
*                                   type: string
*                                   format: date-time
*                               reservationid:
*                                   type: string
*                               Reservation_availablity:
*                                   type: string
*                                   enum:
*                                       - Reservation Available
*                                       - No Reservation Available
*                               Location_id:
*                                   type: string
*                               Availability_id:
*                                   type: string
*/
router.get("/:id", async (req, res) => {
   try {
//      // TODO: Get task ID from req.params.id
     const bookid = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const book = await Book.findById(bookid);
 
//      // TODO: Return the task or an error if not found
     if (!book) {
     return res.status(404).json({ message: "Book not found" });
     }
//      // Return the task
    //  res.json({...book._doc,id:book._id});
     res.json(book);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})

// PUT /book/:id -> Update a book's details
/**
* @swagger
* /book/{id}:
*   put:
*       summary: Update a specific book by ID
*       description: Updates the details of a book based on the provided ID
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
*                               title:
*                                   type: string
*                               Language:
*                                   type: string
*                               Description:
*                                   type: string
*                               author:
*                                   type: string
*                               published_date:
*                                   type: string
*                                   format: date-time
*                               reservationid:
*                                   type: string
*                               Reservation_availablity:
*                                   type: string
*                                   enum:
*                                       - Reservation Available
*                                       - No Reservation Available
*                               Location_id:
*                                   type: string
*                               Availability_id:
*                                   type: string
*       responses:
*           200:
*               description: Task updated successfully
*/
router.put("/:id", async (req, res) => {
    try {
    //     // TODO: Get task ID from req.params.id
        const bookid = req.params.id;
    //     // TODO: Get updated data from req.body
        const updatedData = req.body;
    //     // TODO: Update the task in the database
        const updatedBook = await Book.findByIdAndUpdate(
        bookid,
        updatedData,
        { new: true, runValidators: true }// TODO: Return the updated book or an error
        
        );
    //     // If book not found, return 404
        if (!updatedBook) {
        return res.status(404).json({ message: "book not found"
        });
        }
    //     // Return the updated task
        res.json(updatedBook);

        // res.json({
        //     message: `PUT /tasks/${req.params.id} - Update book endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /book/:id -> Delete a book
/**
* @swagger
* /book/{id}:
*   delete:
*       summary: Delete a specific book by ID
*       description: Deletes a book from the database based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*       responses:
*           200:
*               description: book deleted successfully
*/
router.delete("/:id", async (req, res) => {
    try {
        // TODO: Get task ID from req.params.id
        const bookid = req.params.id;
        // // TODO: Remove the task from the database
        const deletedBook = await Book.findByIdAndDelete(bookid);
        // // TODO: Return a success message or error if not found
        if (!deletedBook) {
            return res.status(404).json({ message: "book not found"
            });
        }
        // // Return success message
        res.json({ message: "book deleted successfully", task:deletedBook });
        // res.json({
        //     message: `DELETE /book/${req.params.id} - Delete task endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;