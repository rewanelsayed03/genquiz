const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    answers: { type: [String], required: true },
    score: { type: Number, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);
