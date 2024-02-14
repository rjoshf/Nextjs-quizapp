import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id") as string;

        if (!process.env.MONGODB_URI) {
            throw new Error('URI is not defined');
        }        

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        if (ObjectId.isValid(id)) {
            const quizzesCollection = db.collection('Quizzes');

            await quizzesCollection.deleteOne({_id: new ObjectId(id)});
            client.close();

            return new Response("Deleted Quiz");
        } else {
            throw new Error('Invalid quiz ID');
        }
    } catch (error) {
        console.error('Error:', error);
        return new Response("An error occurred", { status: 500 });
    }
}