import express from "express";
import cors from "cors";

// Import and use the task routes defined in routes/task.js
import book from "./routes/books.js";

// Import Swagger UI libraries
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import dotenv from "dotenv";
import mongoose from "mongoose";

// MongoDB Connection
// Access MongoDB URI from the environment variable

dotenv.config(); // Load environment variables from .env

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// Define swagger options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation for my project",
        },
    },
    apis: ["./routes/*.js"], // Path to your API route files
};
const app = express();
// Enables CORS so your front-end can access your backend API without browser blocking it.
app.use(cors());
// Allows Express to parse JSON data from incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount all the task-related API endpoints under a specific base path
app.use("/book", book);
// Initial route to test if your backend server is running properly
app.get("/", async (req, res) => {
res.send("<h1>Welcome to my API! The server is running successfully.</h1>");
});
// Set port
const PORT = process.env.PORT || 5050;
// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});

// Generate swagger documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// // Use app.use() to mount the Swagger UI to /api-docs:
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
