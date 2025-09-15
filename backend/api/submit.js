import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
let cachedClient = null;

router.post("/submit", async (req, res) => {
    try {
        const client = cachedClient || await MongoClient.connect(process.env.MONGODB_URI);
        cachedClient = client;

        const db = client.db("genquiz");
        const answers = req.body;

        await db.collection("submissions").insertOne({
            ...answers,
            createdAt: new Date()
        });

        res.status(200).json({ success: true, message: "Answers saved!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
