// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }
        
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        const quizzesCollection = db.collection('Quizzes');

        await quizzesCollection.insertOne(data);

        client.close();

        return NextResponse.json({
            message: 'Quiz created successfully',
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            message: 'Error creating quiz',
        }, {
            status: 500,
        });
    }
}