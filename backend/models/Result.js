const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    answers: { type: [String], required: true },
    score: { type: Number, required: true }, // optional, or any result metric
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);
