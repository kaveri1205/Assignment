package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "roll_number")
    private String rollNumber;

    @Column(name = "section")
    private String section;

    @Column(name = "title")
    private String title;

    @Column(name = "github", columnDefinition = "TEXT")
    private String github;

    @Column(name = "frontend", columnDefinition = "TEXT")
    private String frontend;

    @Column(name = "backend", columnDefinition = "TEXT")
    private String backend;

    public Project() {}

    public Project(String name, String title, String github, String rollNumber, String section, String frontend, String backend) {
        this.name = name;
        this.title = title;
        this.github = github;
        this.rollNumber = rollNumber;
        this.section = section;
        this.frontend = frontend;
        this.backend = backend;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getFrontend() {
        return frontend;
    }

    public void setFrontend(String frontend) {
        this.frontend = frontend;
    }

    public String getBackend() {
        return backend;
    }

    public void setBackend(String backend) {
        this.backend = backend;
    }
}
