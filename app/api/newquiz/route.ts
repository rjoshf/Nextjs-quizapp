import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
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

        return new Response(JSON.stringify({message: 'Quiz created successfully'}), {
            status: 200,
        })

    } catch (error) {
        console.error(error);

        return new Response(JSON.stringify({message: 'Error creating quiz'}), {
            status: 500,
        })
    }
}