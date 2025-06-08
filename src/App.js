import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectsPage from "./components/SubjectsPage";
import UnitsPage from "./components/UnitsPage";
import QuizPage from "./components/QuizPage";
import Navbar from "./components/Navbar";
import './App.css';

import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<SubjectsPage />} />
          <Route path="/subject/:subjectName" element={<UnitsPage />} />
          <Route path="/subject/:subjectName/unit/:unitName" element={<QuizPage />} />
        </Routes>
      </>
    </Router>
  );
}
