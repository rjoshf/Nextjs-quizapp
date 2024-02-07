import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const mongoURI = 'mongodb+srv://joshW:football101@cluster0.cwcph8s.mongodb.net/quizzes?retryWrites=true&w=majority';

export async function DELETE(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id") as string;

    const client = await MongoClient.connect(mongoURI);
    const db = client.db();

    if (ObjectId.isValid(id)) {
        const quizzesCollection = db.collection('Quizzes');

        await quizzesCollection.deleteOne({_id: new ObjectId(id)});
    }

    client.close();

    return new Response("Deleted Quiz");
}