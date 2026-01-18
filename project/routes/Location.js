// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import location from "../models/Location.js";
// POST /Location -> Create a new Location
/**
* @swagger
* /Location:
*   post:
*       summary: Create a new Location
*       description: Creates a new Location in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           Location:
*                               type: string
*                           level:
*                               type: string
*                           shelf:
*                               type: string
*                           shelfId:
*                               type: string
*                           Location_image:
*                               type: string
*                               enum:
*                                   - location_image_1.png
*                                   - location_image_2.png
*                                   - location_image_3.png
*       responses:
*           201:
*               description: Location created successfully
*/
router.post("/", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { Location, level,shelf,shelfId,Location_image} = req.body;
        // TODO: Validate the task data
        if (!Location) {
            return res.status(400).json({ message: "Location is required"
            });
        }
        // TODO: Save the new task to the database
        const newLocation = new location({
            Location,
            level,
            shelf,
            shelfId,
            Location_image,
        });
        // TODO: Return a success response or error
        const savedLocation = await newLocation.save();

        // Return success response
        res.status(201).json(savedLocation);
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /Location -> Retrieve all Location
/**
* @swagger
* /Location:
*   get:
*       summary: Retrieve all Location
*       description: Returns a list of all Location
*       responses:
*           200:
*               description: A list of Location
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   Location:
*                                       type: string
*                                   level:
*                                       type: string
*                                   shelf:
*                                       type: string
*                                   shelfId:
*                                       type: string
*                                   Location_image:
*                                       type: string
*                                       enum:
*                                           - location_image_1.png
*                                           - location_image_2.png
*                                           - location_image_3.png
*/
router.get("/", async (req, res) => {
   try {
    //  TODO: Fetch all tasks from the database and populate the "items" field
     const locations = await location.find();
     res.status(200).json(locations);// TODO: Return books as JSON
     
    //  res.json({
    //      message: "GET /book - Retrieve all tasks endpoint hit successfully",
    //  });
   } catch (error) {
    console.error(error);
   }
});

// GET /Location/:id -> Retrieve a Location by ID
/**
* @swagger
* /Location/{id}:
*   get:
*       summary: Retrieve a specific Location by ID
*       description: Returns a single Location based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*
*       responses:
*           200:
*               description: A single location
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               Location:
*                                   type: string
*                               level:
*                                   type: string
*                               Description:
*                                   type: string
*                               shelf:
*                                   type: string
*                               shelfId:
*                                   type: string
*                               Location_image:
*                                   type: string
*                                   enum:
*                                       - location_image_1.png
*                                       - location_image_2.png
*                                       - location_image_3.png
*/
router.get("/:id", async (req, res) => {
   try {
    
    const filter = req.query.bookid ? {bookid:req.query.bookid} :{}
//      // TODO: Get task ID from req.params.id
     const Location_id = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const locations = await location.findById(Location_id,filter);
 
//      // TODO: Return the task or an error if not found
     if (!locations) {
     return res.status(404).json({ message: "Location not found" });
     }
//      // Return the task
     res.json(locations);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})

// PUT /Location/:id -> Update a book's details
/**
* @swagger
* /Location/{id}:
*   put:
*       summary: Update a specific Location by ID
*       description: Updates the details of a Location based on the provided ID
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
*                               Location:
*                                   type: string
*                               level:
*                                   type: string
*                               shelf:
*                                   type: string
*                               shelfId:
*                                   type: string
*                               Location_image:
*                                   type: string
*                                   enum:
*                                       - location_image_1.png
*                                       - location_image_2.png
*                                       - location_image_3.png

*       responses:
*           200:
*               description: Location updated successfully
*/
router.put("/:id", async (req, res) => {
    try {
    //     // TODO: Get task ID from req.params.id
        const Location_id = req.params.id;
    //     // TODO: Get updated data from req.body
        const updatedData = req.body;
    //     // TODO: Update the task in the database
        const updatedLocation = await location.findByIdAndUpdate(
        Location_id,
        updatedData,
        { new: true, runValidators: true }// TODO: Return the updated book or an error
        
        );
    //     // If book not found, return 404
        if (!updatedLocation) {
        return res.status(404).json({ message: "book not found"
        });
        }
    //     // Return the updated task
        res.json(updatedLocation);

        // res.json({
        //     message: `PUT /tasks/${req.params.id} - Update book endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /Location/:id -> Delete a Location
/**
* @swagger
* /Location/{id}:
*   delete:
*       summary: Delete a specific Location by ID
*       description: Deletes a Location from the database based on the provided ID
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
        const Location_id = req.params.id;
        // // TODO: Remove the task from the database
        const deletedLocation = await location.findByIdAndDelete(Location_id);
        // // TODO: Return a success message or error if not found
        if (!deletedLocation) {
            return res.status(404).json({ message: "location not found"
            });
        }
        // // Return success message
        res.json({ message: "location deleted successfully", task:deletedLocation });
        // res.json({
        //     message: `DELETE /book/${req.params.id} - Delete task endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;