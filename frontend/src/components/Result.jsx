import React from "react";

const Result = ({ answers }) => {
    return (
        <div style={{ marginTop: "30px" }}>
            <h2>Your Answers:</h2>
            <ul>
                {answers.map((ans, index) => (
                    <li key={index}>{ans}</li>
                ))}
            </ul>
            <h3>Thanks for taking the quiz!</h3>
        </div>
    );
};

export default Result;
