package com.CoolioCoders.LMS.modelTests;

import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.models.AssignmentSubmission;
import com.CoolioCoders.LMS.models.Course;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

public class AssignmentTest {
    // Tests for the assignment model methods

    static Assignment assignment;
    static List<AssignmentSubmission> submissions;
    static Course course;


    @BeforeAll
    static void initialize() {
        course = new Course("iOS development", "3260", "1", 4);
        submissions = new ArrayList<>();
        assignment = new Assignment("iOS Lab #1", course.getId(), submissions);
    }

    @Test
    public void assignmentAssignedToCourse() {
        assertTrue(assignment.getCourseId().equals(course.getId()));
    }

    @Test
    public void submissionsAddedToList() {

    }
}