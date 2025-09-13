import React from "react";

const Question = ({ question, onAnswer }) => {
    return (
        <div style={{ margin: "20px 0" }}>
            <h2>{question.question}</h2>
            <div>
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "10px 20px",
                            cursor: "pointer",
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
