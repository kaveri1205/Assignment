import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";   // use centralized API
import "./App.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Particle animation
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

  // Fetch projects on load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching projects from server");
    }
  };

  // CSV Download
  const downloadCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Roll Number",
      "Section",
      "Title",
      "GitHub",
      "Frontend",
      "Backend"
    ];

    const rows = projects.map((p) => [
      p.id,
      p.name,
      p.rollNumber,
      p.section,
      p.title,
      p.github,
      p.frontend,
      p.backend
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((field) => `"${field || ""}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `projects_${new Date().toISOString().split("T")[0]}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Download
  const downloadPDF = () => {
    if (!window.jspdf) {
      alert("jsPDF library not loaded");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Project Details Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    let y = 50;

    projects.forEach((p, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.text(`${index + 1}. ${p.name} (${p.rollNumber})`, 20, y);
      y += 8;

      doc.setFontSize(10);
      doc.text(`Section: ${p.section}`, 20, y);
      y += 8;

      doc.text(`Title: ${p.title}`, 20, y);
      y += 8;

      doc.text(`GitHub: ${p.github || "N/A"}`, 20, y);
      y += 8;

      doc.text(`Frontend: ${p.frontend || "N/A"}`, 20, y);
      y += 8;

      doc.text(`Backend: ${p.backend || "N/A"}`, 20, y);
      y += 12;
    });

    doc.save(`projects_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="app">
      <div className="container">

        <div className="dashboard-header">
          <h1>Project Dashboard</h1>
          <button onClick={goBack} className="classic-button secondary">
            Back to Form
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {projects.length > 0 ? (
          <div className="results-container">

            <div className="results-header">
              <h2>All Projects ({projects.length})</h2>

              <div className="download-buttons">
                <button onClick={downloadCSV} className="download-btn csv">
                  Download Excel
                </button>

                <button onClick={downloadPDF} className="download-btn pdf">
                  Download PDF
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="classic-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Section</th>
                    <th>Title</th>
                    <th>GitHub</th>
                    <th>Frontend</th>
                    <th>Backend</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.rollNumber}</td>
                      <td>{p.section}</td>
                      <td>{p.title}</td>

                      <td>
                        {p.github ? (
                          <a href={p.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        ) : "N/A"}
                      </td>

                      <td>
                        {p.frontend ? (
                          <a href={p.frontend} target="_blank" rel="noopener noreferrer">
                            Visit
                          </a>
                        ) : "N/A"}
                      </td>

                      <td>
                        {p.backend ? (
                          <a href={p.backend} target="_blank" rel="noopener noreferrer">
                            API
                          </a>
                        ) : "N/A"}
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
            <button onClick={goBack} className="classic-button">
              Go to Form
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;