import mongoose from "mongoose";
import Location from "./Location.js"; // Import the Item model

const Reservation  = new mongoose.Schema({
    // add schema fields
    // field: title, data type: string, validation rules: required
    userId: {
        type: String,
        required: true,
    },
    // field: description, data type: string
    reserved_user: String,

    // field: statusValue, data type: string [default: Pending],
    // validation rules: enum: ["Pending", "In Progress", "Completed"]
    bookid: {
        type: String,
    },

    // field: dueDate, data type: Date,
    // validation rules: Date Value > Date.now() future date
    Reservation_expiry_date: {
        type: Date,
        validate: {
            validator: (value) => !value || value > new Date(),
            message: "Due date must be in the future",
        },
    },
    Reservation_date: {
        type: Date,
    },

    // Reference array to link items from the Item collection
    // field: items array, data type: ObjectId [Reference: Item model]
    Location_id: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location", // References the Item model
        },
    ],
});
// export task model
export default mongoose.model("reservation", Reservation);
