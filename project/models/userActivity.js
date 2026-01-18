import mongoose from "mongoose";

const UserActivity  = new mongoose.Schema({
    // add schema fields
    // field: title, data type: string, validation rules: required
    
    userId: {
        type: String,
        required: true,
    },
    // field: Language, data type: string
    action: {
        type: String,
        enum: ["search", "click"], // Validation

        required: true,
    },

    // field: category, data type: string
    category: String,

    // field: bookId, data type: string
    bookId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

    
});
// export task model
export default mongoose.model("recommendations", UserActivity);
