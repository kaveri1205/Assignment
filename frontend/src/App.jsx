import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    section: "",
    title: "",
    github: "",
    frontend: "",
    backend: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
      particlesContainer.appendChild(particle);
    }

    return () => {
      document.body.removeChild(particlesContainer);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/projects", formData);

      if (response.status === 200 || response.status === 201) {
        setSuccess("Project submitted successfully!");

        setFormData({
          name: "",
          rollNumber: "",
          section: "",
          title: "",
          github: "",
          frontend: "",
          backend: ""
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit project. Server error.");
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Project Management System</h1>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="classic-form">

            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Frontend URL</label>
                <input
                  type="url"
                  name="frontend"
                  value={formData.frontend}
                  onChange={handleChange}
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Backend URL</label>
                <input
                  type="url"
                  name="backend"
                  value={formData.backend}
                  onChange={handleChange}
                  className="classic-input"
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" className="classic-button">
                Submit Project
              </button>

              <button
                type="button"
                onClick={goToDashboard}
                className="classic-button secondary"
              >
                View Dashboard
              </button>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;