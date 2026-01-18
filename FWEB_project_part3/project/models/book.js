import mongoose from "mongoose";

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

    // field: author, data type: string
    author: String,

    // field: published_date, data type: Date,
    published_date: {
        type: Date,
        
    },

    // field: author, data type: string
    reservationid: String,

    // field: Reservation_availablity, data type: string [default: Reservation Available],
    // validation rules: enum: ["Reservation Available", "No Reservation Available"]
    Reservation_availablity: {
        type: String,
        enum: ["Reservation Available", "No Reservation Available"], // Validation
        default: "Reservation Available",
    },

    
    // field: Description, data type: string
    Location_id: String,

    Availability_id: String
});
// export task model
export default mongoose.model("book", Book);
