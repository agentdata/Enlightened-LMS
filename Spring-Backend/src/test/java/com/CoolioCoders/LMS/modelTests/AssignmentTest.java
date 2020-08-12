package com.CoolioCoders.LMS.modelTests;

import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.models.AssignmentSubmission;
import com.CoolioCoders.LMS.models.Course;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

public class AssignmentTest {
    // Tests for the assignment model methods

    static Assignment assignment;
    static AssignmentSubmission submission1;
    static AssignmentSubmission submission2;
    static List<AssignmentSubmission> submissions;
    static Course course;
    static String mockCourseId = "mockCourseId";

    @BeforeAll
    static void initialize() {
        course = new Course("iOS development", "3260", "1", 4);
        course.setId(mockCourseId);
        submissions = new ArrayList<>();
        submission1 = new AssignmentSubmission();
        submission2 = new AssignmentSubmission();
        assignment = new Assignment("iOS Lab #1", course.getId(), submissions);
    }

    // course ID for assignment is the same as the retrieved course's ID
    @Test
    public void assignmentAssignedToCourse() {
        assertEquals(assignment.getCourseId(), mockCourseId);
    }

    // assignment submissions are added to the assignment
    @Test
    public void submissionsAddedToList() {
        submissions.add(submission1);
        submissions.add(submission2);

        assignment.setSubmissions(submissions);

        for (AssignmentSubmission submission : submissions) {
            assertTrue(assignment.getSubmissions().contains(submission));
        }
    }
}