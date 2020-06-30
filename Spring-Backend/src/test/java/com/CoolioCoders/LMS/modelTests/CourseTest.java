package com.CoolioCoders.LMS.modelTests;

import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CourseTest {
    // Tests for the course model methods
    // may not be necessary if they are default getters and setters

    static Course course;
    static User student;
    static Set<String> studentIds = new HashSet<>();

    @BeforeAll
    static void initialize() {
        student = new User("123studentid123", "Student", "1", "student@mail.com");
        course = new Course("Intro to Databases", "2250", "104", 3);
        studentIds.add(student.getId());

        course.setStudentIds(studentIds);
    }

    @Test
    public void userRegisteredToCourse() {
        Set<String> studentsInCourse = course.getStudentIds();

        assertTrue(studentIds.contains(student.getId()));
    }
}
