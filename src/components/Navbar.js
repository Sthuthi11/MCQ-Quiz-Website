import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu and navigate
  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Close menu if click outside menu and hamburger
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" onClick={() => setMenuOpen(false)}>V SEM MCQs QUIZ</Link>
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          ref={hamburgerRef}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        {menuOpen && (
          <div className="dropdown-menu" ref={menuRef}>
          <button
            className="home-link-button"
            style={{ marginBottom: "12px" }}
            onClick={() => handleNavigation("/")}
          >
            All Subjects
          </button>

            {Object.keys(quizData).map((subject) => (
              <div key={subject} className="dropdown-subject">
                <div className="subject-name">{subject}</div>
                <div className="units-list">
                  {Object.keys(quizData[subject]).map((unit) => (
                    <button
                      key={unit}
                      className="unit-link-button"
                      onClick={() =>
                        handleNavigation(
                          `/subject/${encodeURIComponent(subject)}/unit/${encodeURIComponent(unit)}`
                        )
                      }
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
