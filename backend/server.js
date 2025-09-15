import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // allows JSON bodies

// Import models
const Question = require("./models/Question");
const Result = require("./models/Result");

// --- Test Route ---
app.get("/", (req, res) => {
    res.send("✅ Backend is running on Railway!");
});

// --- Quiz Questions Route ---
app.get("/api/quiz", async (req, res) => {
    try {
        const questions = await Question.find(); // fetch from DB
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Submit Route ---
app.post("/api/submit", async (req, res) => {
    const { answers } = req.body;
    console.log("📩 Received answers:", answers);

    const isWarning =
        (answers[0] && answers[0].toLowerCase() === "dry") ||
        (answers[1] && answers[1].toLowerCase() === "always");

    const resultMessage = isWarning
        ? "You might want to focus more on skincare."
        : "You have great skin care habits!";

    res.json({ success: true, message: resultMessage });
});

// --- Start server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
