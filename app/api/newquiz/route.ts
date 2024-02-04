// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Define the MongoDB connection string
const mongoURI = 'mongodb+srv://joshW:football101@cluster0.cwcph8s.mongodb.net/quizzes?retryWrites=true&w=majority';

// Define the API route handler
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();

        // Connect to MongoDB
        const client = await MongoClient.connect(mongoURI);
        const db = client.db();

        // Access the Quizzes collection
        const quizzesCollection = db.collection('Quizzes');

        // Insert data into the collection
        const result = await quizzesCollection.insertOne(data);

        console.log(result);

        // Close the MongoDB connection
        client.close();

        // Return success response
        return NextResponse.json({
            message: 'Quiz created successfully',
        });
    } catch (error) {
        console.error(error);

        // Return error response
        return NextResponse.json({
            message: 'Error creating quiz',
        }, {
            status: 500, // Internal Server Error
        });
    }
}