
// Import necessary modules
// Import necessary modules
import { NextRequest } from 'next/server';
import { NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Define the MongoDB connection string
const mongoURI = 'mongodb+srv://joshW:football101@cluster0.cwcph8s.mongodb.net/quizzes?retryWrites=true&w=majority';

// Define the API route handler
export async function POST(req: NextRequest, res: NextApiResponse) {
    const data = await req.json()

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

    return res.status(201).json({ message: 'Quiz added!' });
}