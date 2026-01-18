import mongoose from "mongoose";

const Availability  = new mongoose.Schema({
    // add schema fields
    // field: title, data type: string, validation rules: required
    bookid: {
        type: String,
        required: true,
    },
    // field: Location_id, data type: string
    Location_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location", // References the Item model
            },
        ],
    


    // field: status, data type: string [default: Reservation Available],
    // validation rules: enum: ["Available", "No copies Available"]
    status: {
        type: String,
        enum: ["Available", "No copies Available"], // Validation
        default: "Available",
    },

});
// export task model
export default mongoose.model("Availability", Availability);
