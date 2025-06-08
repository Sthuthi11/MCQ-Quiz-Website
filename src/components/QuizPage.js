import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function QuizPage() {
  const { subjectName, unitName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const unit = decodeURIComponent(unitName);
  const navigate = useNavigate();

  const questions = quizData[subject]?.[unit] || [];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedOptions(Array(questions.length).fill(null));
    setAnswered(Array(questions.length).fill(false));
    setSubmitted(false);
  }, [subject, unit, questions.length]);

  const handleOptionClick = (qIndex, option) => {
    if (submitted || answered[qIndex]) return;

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[qIndex] = option;
    setSelectedOptions(newSelectedOptions);

    const newAnswered = [...answered];
    newAnswered[qIndex] = true;
    setAnswered(newAnswered);
  };

  const score = selectedOptions.reduce((acc, option, idx) => {
    if (option === questions[idx]?.answer) return acc + 1;
    return acc;
  }, 0);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedOptions(Array(questions.length).fill(null));
    setAnswered(Array(questions.length).fill(false));
    setSubmitted(false);
  };

  if (!questions.length) {
    return (
      <div className="container">
        <h2>No questions found for {subject} - {unit}</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{subject} - {unit} Quiz</h1>
      {!submitted ? (
        <>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">
              <b>Question {qIndex + 1} of {questions.length}</b>
              <p>{q.question}</p>
              {q.options.map((option) => {
                let className = "option-btn";
                if (answered[qIndex]) {
                  if (option === q.answer) className += " correct";
                  else if (option === selectedOptions[qIndex]) className += " wrong";
                }
                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => handleOptionClick(qIndex, option)}
                    disabled={answered[qIndex]}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ))}
          <button className="next-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </>
      ) : (
        <>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={resetQuiz}>Retake Quiz</button>
          <button className="back-btn" onClick={() => navigate(`/subject/${encodeURIComponent(subject)}`)}>
            Back to Units
          </button>
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Subjects
          </button>
        </>
      )}
    </div>
  );
}