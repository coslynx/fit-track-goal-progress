// Import the mongoose library for MongoDB interaction.
import mongoose from 'mongoose';
// Import the dotenv library to load environment variables from a .env file.
import dotenv from 'dotenv';

// Load environment variables from the .env file.
dotenv.config();

// Extract the MongoDB connection URI from the environment variables.
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is defined, otherwise throw an error.
if (!MONGO_URI) {
    console.error('MONGO_URI environment variable is not defined.');
    process.exit(1); // Exit the process if the URI is not defined to prevent further issues.
}


// Attempt to connect to the MongoDB database using the provided URI and connection options.
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, // Use the new URL parser.
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine.
})
    .then(() => {
        // Log a message to the console if the database connection is successful.
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        // Log an error message to the console if there is an issue connecting to the database.
        console.error('MongoDB connection error:', error);
        process.exit(1); // Terminate the application process if a connection error occurs.
    });


// Export the Mongoose connection object.
export default mongoose.connection;