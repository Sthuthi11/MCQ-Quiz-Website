import React from "react";
import { Link } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function SubjectsPage() {
  const subjects = Object.keys(quizData);

  return (
    <>
      <div className="container">
        <h1>SUBJECTS</h1>
        <div className="grid-container">
          {subjects.map((subj) => (
            <Link
              key={subj}
              to={`/subject/${encodeURIComponent(subj)}`}
              className="box"
            >
              {subj}
            </Link>
          ))}
        </div>
      </div>
      <marquee behavior="scroll" direction="left" className="ticker-footer">
        This quiz is prepared referring to the 2024-25 MCQ question banks and is meant for practice only. Please verify the questions and answers as there may be some mistakes.
      </marquee>
    </>
  );
}
