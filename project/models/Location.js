import mongoose from "mongoose";

const Location  = new mongoose.Schema({
    // add schema fields
    // field: Location, data type: string, validation rules: required
    Location: {
        type: String,
        required: true,
    },
    // field: level, data type: string
    level: String,

    shelf: String,

    shelfId : String,
    // field: Location_image, data type: string [default: location_image_1.png],
    Location_image: {
        type: String,
        enum: ["location_image_1.png", "location_image_2.png","location_image_3.png"], // Validation
        default: "location_image_1.png",
    },

});
// export task model
export default mongoose.model("Location", Location);
