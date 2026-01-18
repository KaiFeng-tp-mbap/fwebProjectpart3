// Import the Express framework
import express from "express";
// Create a new router instance to define API routes
const router = express.Router();
import Reservation from "../models/reservation.js";
// POST /reservation-list -> Create a new task
/**
* @swagger
* /reservation-list:
*   post:
*       summary: Create a new reservation
*       description: Creates a new reservation in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           userId:
*                               type: string
*                           reserved_user:
*                               type: string
*                           bookid:
*                               type: string
*                           Reservation_expiry_date:
*                               type: string
*                               format: date-time
*                           Reservation_date:
*                               type: string
*                               format: date-time
*                           Location_id:
*                               type: string
*                               description: Item ObjectId
*       responses:
*           201:
*               description: Task created successfully
*/
router.post("/", async (req, res) => {
    try {
        // TODO: Get task data from req.body
        const { userId, reserved_user,bookid,Reservation_expiry_date,Reservation_date,Location_id} = req.body;
        // TODO: Validate the task data
        if (!userId || bookid || Location_id) {
            return res.status(400).json({ message: "userId, bookid and Location_id are required"
            });
        }
        // TODO: Save the new task to the database
        const newReservation = new Reservation({
            userId,
            reserved_user,
            bookid,
            Reservation_expiry_date,
            Reservation_date,
            Location_id
        });
        // TODO: Return a success response or error
        const savedReservation = await newReservation.save();

        // Return success response
        res.status(201).json(savedReservation);
        // res.json({
        //     message: "POST /book - Create a new book endpoint hit successfully",
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /reservation-list -> Retrieve all reservation
/**
* @swagger
* /reservation-list:
*   get:
*       summary: Retrieve all reservation
*       description: Returns a list of all reservation
*       responses:
*           200:
*               description: A list of reservation
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               type: object
*                       properties:
*                           userId:
*                               type: string
*                           reserved_user:
*                               type: string
*                           bookid:
*                               type: string
*                           Reservation_expiry_date:
*                               type: string
*                               format: date-time
*                           Reservation_date:
*                               type: string
*                               format: date-time
*                           Location_id:
*                               type: string
*                               description: Item ObjectId
*/
router.get("/", async (req, res) => {
   try {
    const filter = req.query.bookid ? {bookid:req.query.bookid} :{}
    //  TODO: Fetch all tasks from the database and populate the "items" field
     const reservations = await Reservation.find(filter);
     res.status(200).json(reservations);// TODO: Return reservations as JSON
     
    //  res.json({
    //      message: "GET /book - Retrieve all tasks endpoint hit successfully",
    //  });
   } catch (error) {
    console.error(error);
   }
});

// GET /reservation-list/:id -> Retrieve a reservation by ID
/**
* @swagger
* /reservation-list/{id}:
*   get:
*       summary: Retrieve a specific reservation by ID
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
*                               userId:
*                                   type: string
*                               reserved_user:
*                                   type: string
*                               bookid:
*                                   type: string
*                               Reservation_expiry_date:
*                                   type: string
*                                   format: date-time
*                               Reservation_date:
*                                   type: string
*                                   format: date-time
*                               Location_id:
*                                   type: string
*                                   description: Item ObjectId
*/
router.get("/:id", async (req, res) => {
   try {
//      // TODO: Get task ID from req.params.id
     const reservationid = req.params.id;
 
//      // TODO: Fetch the specific task from the database
     const reservation = await Reservation.findById(reservationid).populate("Location_id");
 
//      // TODO: Return the task or an error if not found
     if (!reservation) {
     return res.status(404).json({ message: "Reservation not found" });
     }
//      // Return the task
     res.json(reservation);
    //  res.json({
    //      message: `GET /book/${req.params.id} - Retrieve a specific task endpoint hit successfully`,
    //  });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }

})

// PUT /reservation-list/:id -> Update a reservation's details
/**
* @swagger
* /reservation-list/{id}:
*   put:
*       summary: Update a specific reservation by ID
*       description: Updates the details of a reservation based on the provided ID
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
*                               userId:
*                                   type: string
*                               reserved_user:
*                                   type: string
*                               bookid:
*                                   type: string
*                               Reservation_expiry_date:
*                                   type: string
*                                   format: date-time
*                               Reservation_date:
*                                   type: string
*                                   format: date-time
*                               Location_id:
*                                   type: string
*                                   description: Item ObjectId
*       responses:
*           200:
*               description: reservation updated successfully
*/
router.put("/:id", async (req, res) => {
    try {
    //     // TODO: Get task ID from req.params.id
        const reservationid = req.params.id;
    //     // TODO: Get updated data from req.body
        const updatedData = req.body;
    //     // TODO: Update the task in the database
        const updatedReservation = await Reservation.findByIdAndUpdate(
        reservationid,
        updatedData,
        { new: true, runValidators: true }// TODO: Return the updated book or an error
        
        );
    //     // If book not found, return 404
        if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found"
        });
        }
    //     // Return the updated task
        res.json(updatedReservation);

        // res.json({
        //     message: `PUT /tasks/${req.params.id} - Update book endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /reservation-list/:id -> Delete a book
/**
* @swagger
* /reservation-list/{id}:
*   delete:
*       summary: Delete a specific reservation by ID
*       description: Deletes a reservation from the database based on the provided ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*       responses:
*           200:
*               description: reservation deleted successfully
*/
router.delete("/:id", async (req, res) => {
    try {
        // TODO: Get task ID from req.params.id
        const reservationid = req.params.id;
        // // TODO: Remove the task from the database
        const deletedReservation = await Reservation.findByIdAndDelete(reservationid);
        // // TODO: Return a success message or error if not found
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found"
            });
        }
        // // Return success message
        res.json({ message: "reservation deleted successfully", task:deletedReservation });
        // res.json({
        //     message: `DELETE /book/${req.params.id} - Delete task endpoint hit successfully`,
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;