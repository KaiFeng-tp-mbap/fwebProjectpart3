// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import Availability from "../models/Availability.js";
// POST /Availability -> Create a new Availability
/**
* @swagger
* /Availability:
*   post:
*       summary: Create a new Availability
*       description: Creates a new Availability in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           bookid:
*                               type: string
*                           Location_id:
*                               type: string
*                           status:
*                               type: string
*                               enum:
*                                   - Available
*                                   - No copies Available
*       responses:
*           201:
*               description: Availability created successfully
*/
router.post("/", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { bookid, Location_id,status} = req.body;
        // TODO: Validate the task data
        if (!bookid) {
            return res.status(400).json({ message: "bookid is required"
            });
        }
        // TODO: Save the new task to the database
        const newAvailability = new Availability({
            bookid,
            Location_id,
            status,
        });
        // TODO: Return a success response or error
        const savedAvailability = await newAvailability.save();

        // Return success response
        res.status(201).json(savedAvailability);
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /Availability -> Retrieve all Availability
/**
* @swagger
* /Availability:
*   get:
*       summary: Retrieve all Availability
*       description: Returns a list of all Availability
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
*                           bookid:
*                               type: string
*                           Location_id:
*                               type: string
*                           status:
*                               type: string
*                               enum:
*                                   - Available
*                                   - No copies Available
*/
router.get("/", async (req, res) => {
   try {
    const filter = req.query.bookid ? {bookid:req.query.bookid} :{}
    //  TODO: Fetch all tasks from the database and populate the "items" field
     const availability = await Availability.find(filter);
     res.status(200).json(availability);// TODO: Return books as JSON
     
    //  res.json({
    //      message: "GET /book - Retrieve all tasks endpoint hit successfully",
    //  });
   } catch (error) {
    console.error(error);
   }
});

// GET /Availability/:id -> Retrieve a Availability by ID
/**
* @swagger
* /Availability/{id}:
*   get:
*       summary: Retrieve a specific Availability by ID
*       description: Returns a single Availability based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*
*       responses:
*           200:
*               description: A single Availability
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                           bookid:
*                               type: string
*                           Location_id:
*                               type: string
*                               description: Item ObjectId
*                           status:
*                               type: string
*                               enum:
*                                   - Available
*                                   - No copies Available
*/
router.get("/:id", async (req, res) => {
   try {
    
//      // TODO: Get task ID from req.params.id
     const AvailabilityId = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const availability = await Availability.findById(AvailabilityId);
 
//      // TODO: Return the task or an error if not found
     if (!availability) {
     return res.status(404).json({ message: "Task not found" });
     }
//      // Return the task
     res.json(availability);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})

router.get("/:id", async (req, res) => {
   try {
    // const filter = req.query.bookid ? {bookid:req.query.bookid} :{}
//      // TODO: Get task ID from req.params.id
     const AvailabilityId = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const availability = await Availability.find(AvailabilityId).populate("Location_id");
 
//      // TODO: Return the task or an error if not found
     if (!availability) {
     return res.status(404).json({ message: "Task not found" });
     }
//      // Return the task
     res.json(availability);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})
router.get("/Availability", async (req, res) => {
   try {
    const filter = req.query.bookid ? {bookid:req.query.bookid} :{}
//      // TODO: Get task ID from req.params.id
     const AvailabilityId = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const availability = await Availability.find(filter).populate("Location_id");
 
//      // TODO: Return the task or an error if not found
     if (!availability) {
     return res.status(404).json({ message: "Task not found" });
     }

     const formatted = availability.map(a => ({
        ...a._doc,
        location: a.Location_id
     }));
//      // Return the task
     res.json(formatted);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})
// PUT /Availability/:id -> Update a Availability's details
/**
* @swagger
* /Availability/{id}:
*   put:
*       summary: Update a specific Availability by ID
*       description: Updates the details of a Availability based on the provided ID
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
*                           bookid:
*                               type: string
*                           Location_id:
*                               type: string
*                           status:
*                               type: string
*                               enum:
*                                   - Available
*                                   - No copies Available
*       responses:
*           200:
*               description: Task updated successfully
*/
router.put("/:id", async (req, res) => {
    try {
    //     // TODO: Get task ID from req.params.id
        const AvailabilityId = req.params.id;
    //     // TODO: Get updated data from req.body
        const updatedData = req.body;
    //     // TODO: Update the task in the database
        const updatedAvailability = await Availability.findByIdAndUpdate(
        AvailabilityId,
        updatedData,
        { new: true, runValidators: true }// TODO: Return the updated book or an error
        
        );
    //     // If book not found, return 404
        if (!updatedAvailability) {
        return res.status(404).json({ message: "book not found"
        });
        }
    //     // Return the updated task
        res.json(updatedAvailability);

        // res.json({
        //     message: `PUT /tasks/${req.params.id} - Update book endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /Availability/:id -> Delete a book
/**
* @swagger
* /Availability/{id}:
*   delete:
*       summary: Delete a specific Availability by ID
*       description: Deletes a book from the database based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*       responses:
*           200:
*               description: Availability deleted successfully
*/
router.delete("/:id", async (req, res) => {
    try {
        // TODO: Get task ID from req.params.id
        const AvailabilityId = req.params.id;
        // // TODO: Remove the task from the database
        const deletedAvailability = await Availability.findByIdAndDelete(AvailabilityId);
        // // TODO: Return a success message or error if not found
        if (!deletedAvailability) {
            return res.status(404).json({ message: "Availability not found"
            });
        }
        // // Return success message
        res.json({ message: "book deleted successfully", task:deletedAvailability });
        // res.json({
        //     message: `DELETE /book/${req.params.id} - Delete task endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;