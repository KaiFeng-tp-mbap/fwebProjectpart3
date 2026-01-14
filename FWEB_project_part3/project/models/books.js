import mongoose from "mongoose";
// import Item from "./item.js"; // Import the Item model

const Book  = new mongoose.Schema({
    // add schema fields
    // field: title, data type: string, validation rules: required
    title: {
        type: String,
        required: true,
    },
    // field: Language, data type: string
    Language: String,

    // field: Description, data type: string
    Description: String,

    // field: Description, data type: string
    author: String,

    // field: dueDate, data type: Date,
    // validation rules: Date Value > Date.now() future date
    published_date: {
        type: Date,
        validate: {
            validator: (value) => !value || value > new Date(),
            message: "Due date must be in the future",
        },
    },
    // field: Reservation_availablity, data type: string [default: Reservation Available],
    // validation rules: enum: ["Reservation Available", "No Reservation  Available"]
    Reservation_availablity: {
        type: String,
        enum: ["Reservation Available", "No Reservation  Available"], // Validation
        default: "Reservation Available",
    },

    // field: Location_id, data type: string
    Location_id: String,
    
    // field: Availability_id, data type: string
    Availability_id: String,
});
// export task model
export default mongoose.model("book", Book);
