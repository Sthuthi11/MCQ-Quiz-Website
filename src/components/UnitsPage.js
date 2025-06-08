import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function UnitsPage() {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const navigate = useNavigate();

  const units = quizData[subject] ? Object.keys(quizData[subject]) : [];

  if (!quizData[subject]) {
    return (
      <div className="container">
        <h2>Subject not found</h2>
        <button onClick={() => navigate("/")}>Back to Subjects</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{subject}</h1>
      <h2>Units</h2>

      <div className="grid-container">
        {units.map((unit) => (
          <Link
            key={unit}
            to={`/subject/${encodeURIComponent(subject)}/unit/${encodeURIComponent(unit)}`}
            className="box"
          >
            {unit}
          </Link>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Subjects
      </button>
    </div>
  );
}
