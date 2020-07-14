package com.CoolioCoders.LMS.serviceTests;

import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.services.CourseService;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


import static org.junit.jupiter.api.Assertions.*;

public class CourseServiceTest {

//    static CourseService courseService; //TODO Fix null
//    static Course course;
//    static User student;
//
//    @BeforeAll
//    static void initialize() {
//        student = new User("123studentid123", "Student", "1", "student@mail.com");
//        course = new Course("Intro to Databases", "2250", "104", 3);
//
//        try{
//            courseService.saveCourse(course);
//            courseService.enrollUserInCourse(student, course);
//        }
//        catch(Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Test
//    public void userRegisteredToCourse() {
//        boolean studentFound = false;
//        List<User> studentList = courseService.findStudentsInCourse(course);
//
//        for(int i = 0; i < studentList.size(); i++)
//        {
//            if(studentList.get(i) == student)
//                studentFound = true;
//        }
//
//        assertTrue(studentFound);
//    }
//
//    @AfterAll
//    static void cleanUp() {
//        courseService.deleteCourse(course);
//    }
}
