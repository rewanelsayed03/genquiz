import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // allows JSON bodies

<<<<<<< HEAD

const Question = require("./models/Question");


app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
=======
// --- Test Route ---
app.get("/", (req, res) => {
    res.send("✅ Backend is running on Railway!");
>>>>>>> 1e8005d (Updated backend/server.js, frontend Quiz component, deleted obsolete files, added new API folder)
});

// --- Quiz Questions Route ---
app.get("/api/quiz", (req, res) => {
    const questions = [
        {
            question: "What is your skin type?",
            options: ["Oily", "Dry", "Normal"],
        },
        {
            question: "How often do you wash your face?",
            options: ["Once a day", "Twice a day", "Always"],
        },
    ];
    res.json(questions);
});

<<<<<<< HEAD
const Result = require("./models/Result");

app.use(express.json()); 

app.post("/submit", async (req, res) => {
=======
// --- Submit Route ---
app.post("/api/submit", (req, res) => {
>>>>>>> 1e8005d (Updated backend/server.js, frontend Quiz component, deleted obsolete files, added new API folder)
    const { answers } = req.body;
    console.log("📩 Received answers:", answers);

    const isWarning =
        (answers[0] && answers[0].toLowerCase() === "dry") ||
        (answers[1] && answers[1].toLowerCase() === "always");

<<<<<<< HEAD
    
    const score = answers.length; 
=======
    const resultMessage = isWarning
        ? "You might want to focus more on skincare."
        : "You have great skin care habits!";
>>>>>>> 1e8005d (Updated backend/server.js, frontend Quiz component, deleted obsolete files, added new API folder)

    res.json({ success: true, message: resultMessage });
});

// --- Start server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
