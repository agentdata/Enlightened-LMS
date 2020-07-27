package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "assignments")
public class Assignment {

    @Id
    private String id;
    private String title;
    private String description;
    private SubmissionType submissionType;
    private LocalDateTime dueDate;
    private int maxPoints;
    private Map<String, Double> analytics;
    private String courseId;
    private List<AssignmentSubmission> submissions;

    public Assignment(){}

    public Assignment(String title, String courseId, List<AssignmentSubmission> submissions) {
        this.title = title;
        this.courseId = courseId;
        this.submissions = submissions;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubmissionType getSubmissionType() {
        return submissionType;
    }

    public void setSubmissionType(SubmissionType submissionType) {
        this.submissionType = submissionType;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public int getMaxPoints() {
        return maxPoints;
    }

    public void setMaxPoints(int maxPoints) {
        this.maxPoints = maxPoints;
    }

    public Map<String, Double> getAnalytics() {
        if(analytics == null) { analytics = new HashMap<>(); }
        return analytics;
    }

    public void setAnalytics(Map<String, Double> analytics) {
        this.analytics = analytics;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public List<AssignmentSubmission> getSubmissions() {
        if(submissions != null)
            return submissions;
        return new ArrayList<>();
    }

    public AssignmentSubmission getStudentSubmission(String studentId){
        if(submissions !=null) {
            for (AssignmentSubmission submission : submissions) {
                if (submission.studentId.compareTo(studentId) == 0) {
                    return submission;
                }
            }
        }
        return null;
    }

    public void setSubmissions(List<AssignmentSubmission> submissions) {
        this.submissions = submissions;
    }
}
