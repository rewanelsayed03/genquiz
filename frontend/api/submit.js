
import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri, dbName = "genquiz") {
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

export default async function handler(req, res) {
   
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) return res.status(500).json({ error: "No DB configured" });

    try {
        const { db } = await connectToDatabase(MONGO_URI, "genquiz");
        const payload = req.body; 

   
        const answers = (payload.answers || []).map(a => (typeof a === "string" ? a.toLowerCase().trim() : a));
        const score = answers.reduce((acc, a) => (a === "correct" ? acc + 1 : acc), 0);

       
        const isWarning = (answers[0] && answers[0] === "dry") || (answers[1] && answers[1] === "always");
        const message = isWarning ? "You might want to focus more on skincare." : "You have great skin care habits!";

      
        const submissions = db.collection("submissions");
        await submissions.insertOne({
            answers,
            score,
            message,
            createdAt: new Date(),
        });

        return res.json({ message, score });
    } catch (err) {
        console.error("API submit error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
