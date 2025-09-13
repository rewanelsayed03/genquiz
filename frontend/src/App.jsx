import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import axios from "axios";

function App() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/questions");
                console.log("Fetched questions:", res.data);
                setQuestions(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching questions:", err);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <h2>Loading questions...</h2>;

    return (
        <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>GenQuiz - Skincare Quiz</h1>
            <Quiz questions={questions} />
        </div>
    );
}

export default App;
