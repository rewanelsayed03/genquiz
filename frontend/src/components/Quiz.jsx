import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Quiz = ({ questions }) => {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [started, setStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

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

    const res = await axios.post("/api/submit", { answers });

    const handleNext = () => {
        if (current < questions.length - 1) setCurrent(current + 1);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    const handleSubmit = () => setSubmitted(true);

    const handleReturn = () => {
        setStarted(false);
        setCurrent(0);
        setAnswers([]);
        setSubmitted(false);
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // --- CONDITION ADDED ---
    const isResultWarning =
        (answers[0] && answers[0].toLowerCase() === "dry") ||
        (answers[1] && answers[1].toLowerCase() === "always");

    const resultMessage = isResultWarning
        ? "You might want to focus more on skincare."
        : "You have great skin care habits!";

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
        backgroundColor: isResultWarning ? "#ff4d4d" : "#4caf50",
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
                        {current > 0 && <button style={buttonStyles} onClick={handlePrev}>Previous</button>}
                        {current < questions.length - 1 && <button style={buttonStyles} onClick={handleNext}>Next</button>}
                        {current === questions.length - 1 && <button style={buttonStyles} onClick={handleSubmit}>Submit</button>}
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
