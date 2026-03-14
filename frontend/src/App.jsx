import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    section: '',
    title: '',
    github: '',
    frontend: '',
    backend: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Create floating particles
  useEffect(() => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
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
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:7070/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Project submitted successfully!');
        setFormData({
          name: '',
          rollNumber: '',
          section: '',
          title: '',
          github: '',
          frontend: '',
          backend: ''
        });
      } else {
        setError('Failed to submit project');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Project Management System</h1>
        
        <div className="form-container">
          <form onSubmit={handleSubmit} className="classic-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="section">Section</label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="github">GitHub Profile</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="frontend">Frontend URL</label>
                <input
                  type="url"
                  id="frontend"
                  name="frontend"
                  value={formData.frontend}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="backend">Backend URL</label>
                <input
                  type="url"
                  id="backend"
                  name="backend"
                  value={formData.backend}
                  onChange={handleChange}
                  placeholder="https://api.example.com"
                  className="classic-input"
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" className="classic-button">Submit Project</button>
              <button type="button" onClick={goToDashboard} className="classic-button secondary">View Dashboard</button>
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
