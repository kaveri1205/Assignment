import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:7070/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Name', 'Roll Number', 'Section', 'Title', 'GitHub Profile', 'Frontend URL', 'Backend URL'];
    const csvContent = [
      headers.join(','),
      ...projects.map(project => [
        project.id,
        project.name,
        project.rollNumber,
        project.section,
        project.title,
        project.github,
        project.frontend,
        project.backend
      ].map(field => `"${field || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `projects_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Project Details Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    
    doc.setFontSize(14);
    doc.text('Projects:', 20, 45);
    
    doc.setFontSize(10);
    let yPosition = 55;
    const lineHeight = 10;
    
    projects.forEach((project, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(`${index + 1}. ${project.name} (${project.rollNumber} - ${project.section})`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`   Title: ${project.title}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`   GitHub: ${project.github || 'N/A'}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`   Frontend: ${project.frontend || 'N/A'}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`   Backend: ${project.backend || 'N/A'}`, 20, yPosition);
      yPosition += lineHeight + 5;
    });
    
    doc.save(`projects_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="app">
      <div className="container">
        <div className="dashboard-header">
          <h1>Project Dashboard</h1>
          <button onClick={goBack} className="classic-button secondary">Back to Form</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {projects.length > 0 ? (
          <div className="results-container">
            <div className="results-header">
              <h2>All Projects ({projects.length})</h2>
              <div className="download-buttons">
                <button onClick={downloadCSV} className="download-btn csv">Download Excel</button>
                <button onClick={downloadPDF} className="download-btn pdf">Download PDF</button>
              </div>
            </div>
            
            <div className="table-wrapper">
              <table className="classic-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Section</th>
                    <th>Title</th>
                    <th>GitHub</th>
                    <th>Frontend</th>
                    <th>Backend</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.name}</td>
                      <td>{project.rollNumber}</td>
                      <td>{project.section}</td>
                      <td>{project.title}</td>
                      <td>
                        {project.github ? (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="table-link">
                            View GitHub
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td>
                        {project.frontend ? (
                          <a href={project.frontend} target="_blank" rel="noopener noreferrer" className="table-link">
                            Visit Site
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td>
                        {project.backend ? (
                          <a href={project.backend} target="_blank" rel="noopener noreferrer" className="table-link">
                            View API
                          </a>
                        ) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-projects">
            <h2>No Projects Found</h2>
            <p>Start by submitting some projects from the form!</p>
            <button onClick={goBack} className="classic-button">Go to Form</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
