import { MongoClient, ObjectId } from 'mongodb';

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id") as string;

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }        

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        if (ObjectId.isValid(id)) {
            const quizzesCollection = db.collection('Quizzes');

            await quizzesCollection.deleteOne({_id: new ObjectId(id)});
            client.close();

            return new Response(JSON.stringify({message: "Deleted Quiz"}), {status: 200});
        } else {
            throw new Error('Invalid quiz ID');
        }
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({message: "An error occurred"}), { status: 500 });
    }
}