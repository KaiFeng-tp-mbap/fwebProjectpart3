import mongoose from "mongoose";

const User  = new mongoose.Schema({
    // add schema fields
    // field: title, data type: string, validation rules: required
    name: {
        type: String,
        required: true,
        trim: true
    },
    // field: Language, data type: string
    password: {
        type:String,
        required: true,
        select: false
    },

    // field: Description, data type: string
    repassword: {
        type: String,
    },

    // field: author, data type: string
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },

    // field: Reservation_availablity, data type: string [default: Reservation Available],
    // validation rules: enum: ["Reservation Available", "No Reservation Available"]
    role: {
        type: String,
        enum: ["librarian", "user"], // Validation
        default: "user",
    },

});
// export task model
export default mongoose.model("user", User);
