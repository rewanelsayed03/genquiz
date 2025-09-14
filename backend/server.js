const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const Question = require("./models/Question");


app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const Result = require("./models/Result");

app.use(express.json()); 

app.post("/submit", async (req, res) => {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "Answers are required and must be an array." });
    }

    
    const score = answers.length; 

    try {
        const result = new Result({ answers, score });
        await result.save();

        // You can customize the message based on answers
        let message = "Thank you for completing the quiz!";
        if (score > 2) message = "You have great skin care habits!";
        else message = "You might want to focus more on skincare.";

        res.json({ message, score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
