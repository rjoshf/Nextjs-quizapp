// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Define the API route handler
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();

        if (!process.env.MONGODB_URI) {
            throw new Error('URI is not defined');
        }
        

        // Connect to MongoDB
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        // Access the Quizzes collection
        const quizzesCollection = db.collection('Quizzes');

        // Insert data into the collection
        await quizzesCollection.insertOne(data);

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