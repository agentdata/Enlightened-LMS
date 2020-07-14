package com.CoolioCoders.LMS.models;

import java.time.LocalDateTime;

public class AssignmentSubmission { //Embed within the assignment object

    String studentId;
    LocalDateTime submittedTimestamp;
    String submissionContent;
    FileUpload submittedFile;
    boolean isGraded;
    double pointsAwarded;

    public AssignmentSubmission() {}

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public LocalDateTime getSubmittedTimestamp() {
        return submittedTimestamp;
    }

    public void setSubmittedTimestamp(LocalDateTime submittedTimestamp) {
        this.submittedTimestamp = submittedTimestamp;
    }

    public String getSubmissionContent() {
        return submissionContent;
    }

    public void setSubmissionContent(String submissionContent) {
        this.submissionContent = submissionContent;
    }

    public FileUpload getSubmittedFile() {
        return submittedFile;
    }

    public void setSubmittedFile(FileUpload submittedFile) {
        this.submittedFile = submittedFile;
    }

    public boolean isGraded() {
        return isGraded;
    }

    public void setGraded(boolean graded) {
        isGraded = graded;
    }

    public double getPointsAwarded() {
        return pointsAwarded;
    }

    public void setPointsAwarded(double pointsAwarded) {
        this.pointsAwarded = pointsAwarded;
    }
}
