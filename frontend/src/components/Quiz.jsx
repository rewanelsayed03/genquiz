import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [started, setStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [resultMessage, setResultMessage] = useState("");

    // Fetch questions from backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("https://genquiz-production.up.railway.app/questions");
                const data = await res.json();
                setQuestions(data);
            } catch (err) {
                console.error("Error fetching questions:", err);
            }
        };

        fetchQuestions();
    }, []);

    // Apply dark mode to body
    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? "#2f2f2f" : "#fff";
        document.body.style.color = darkMode ? "#fff" : "#000";
    }, [darkMode]);

    if (!questions || questions.length === 0) return <p>No questions available.</p>;

    const handleOptionClick = (option) => {
        const newAnswers = [...answers];
        newAnswers[current] = option;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://genquiz-production.up.railway.app/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers }),
            });

            const data = await res.json();
            console.log("Backend response:", data);

            if (data.message) {
                setResultMessage(data.message);
            } else {
                setResultMessage("Thank you for completing the quiz!");
            }
        } catch (err) {
            console.error("Error submitting quiz:", err);
            setResultMessage("Something went wrong. Please try again.");
        }

        setSubmitted(true);
    };

    const handleNext = () => {
        if (current < questions.length - 1) setCurrent(current + 1);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    const handleReturn = () => {
        setStarted(false);
        setCurrent(0);
        setAnswers([]);
        setSubmitted(false);
        setResultMessage("");
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // Styling
    const pageStyles = {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "background-color 0.3s, color 0.3s",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        width: "100%",
    };

    const buttonStyles = {
        padding: "10px 20px",
        margin: "10px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        backgroundColor: darkMode ? "#006400" : "#4caf50",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        transition: "background-color 0.3s, transform 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const iconStyles = {
        marginLeft: "10px",
        transition: "transform 0.5s",
        transform: darkMode ? "rotate(180deg)" : "rotate(0deg)",
    };

    const resultBarStyles = {
        padding: "20px 40px",
        borderRadius: "30px",
        backgroundColor: "#4caf50",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "22px",
        textAlign: "center",
        transition: "all 0.5s",
        transform: submitted ? "scale(1)" : "scale(0)",
        opacity: submitted ? 1 : 0,
    };

    const progressBarContainer = {
        width: "100%",
        backgroundColor: darkMode ? "#555" : "#ddd",
        borderRadius: "20px",
        marginBottom: "20px",
    };

    const progressBarFill = {
        width: `${((current + 1) / questions.length) * 100}%`,
        height: "10px",
        backgroundColor: darkMode ? "#006400" : "#4caf50",
        borderRadius: "20px",
        transition: "width 0.3s",
    };

    const toggleButtonStyles = {
        ...buttonStyles,
        position: "absolute",
        top: "20px",
        right: "20px",
        borderRadius: "50px",
        padding: "10px 15px",
    };

    return (
        <div style={pageStyles}>
            {/* Dark mode toggle */}
            <button style={toggleButtonStyles} onClick={toggleDarkMode}>
                {darkMode ? "Light" : "Dark"}
                <span style={iconStyles}>{darkMode ? <FaSun /> : <FaMoon />}</span>
            </button>

            {/* Start button */}
            {!started && !submitted && (
                <button style={buttonStyles} onClick={() => setStarted(true)}>
                    Start Quiz
                </button>
            )}

            {/* Quiz */}
            {started && !submitted && (
                <div style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>
                    {/* Progress bar */}
                    <div style={progressBarContainer}>
                        <div style={progressBarFill}></div>
                    </div>

                    <h3>
                        Question {current + 1}/{questions.length}
                    </h3>
                    <p>{questions[current].question}</p>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {questions[current].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(option)}
                                style={{
                                    ...buttonStyles,
                                    margin: "5px 0",
                                    width: "60%",
                                    backgroundColor:
                                        answers[current] === option
                                            ? darkMode
                                                ? "#004d00"
                                                : "#388e3c"
                                            : buttonStyles.backgroundColor,
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                        {current > 0 && (
                            <button style={buttonStyles} onClick={handlePrev}>
                                Previous
                            </button>
                        )}

                        {current < questions.length - 1 && (
                            <button
                                style={{
                                    ...buttonStyles,
                                    opacity: answers[current] ? 1 : 0.5,
                                    cursor: answers[current] ? "pointer" : "not-allowed",
                                }}
                                onClick={handleNext}
                                disabled={!answers[current]}
                            >
                                Next
                            </button>
                        )}

                        {current === questions.length - 1 && (
                            <button
                                style={{
                                    ...buttonStyles,
                                    opacity: answers[current] ? 1 : 0.5,
                                    cursor: answers[current] ? "pointer" : "not-allowed",
                                }}
                                onClick={handleSubmit}
                                disabled={!answers[current]}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Result popup */}
            {submitted && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50vh",
                    }}
                >
                    <div style={resultBarStyles}>{resultMessage}</div>
                    <button style={{ ...buttonStyles, marginTop: "20px" }} onClick={handleReturn}>
                        Return
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
