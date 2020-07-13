package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

public class SimplifiedAssignment {

    private String id;
    private String title;
    private LocalDateTime dueDate;
    private String courseId;

    public SimplifiedAssignment() {}

    public SimplifiedAssignment(String id, String title, LocalDateTime dueDate, String courseId) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.courseId = courseId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
}
