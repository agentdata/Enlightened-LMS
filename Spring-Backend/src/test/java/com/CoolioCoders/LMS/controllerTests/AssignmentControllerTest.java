package com.CoolioCoders.LMS.controllerTests;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.*;

import java.net.HttpURLConnection;
import java.net.URL;

// REMEMBER TO RUN 'LmsApplication' when testing API calls
// To run your tests, simply run this file (Ctrl+Shift+F10)
public class AssignmentControllerTest {

    // Global variables if needed

    static String TOKEN;
    static MultipartFile testFile;
    static String testAssignmentId;
    static String testCourseId;

    // Executes before all the tests
    // @BeforeAll
    // static void initialize() {
    //     TOKEN = getStudentToken();
    // }

    // static String getStudentToken() {
    //     String studentToken = "";

    //     try {
    //         URL url = new URL("http://localhost:8080/api/auth/login");
    //         HttpURLConnection con = (HttpURLConnection) url.openConnection();
    //     }
    // }

    // // Use at least one assert* method in each test
    // @Test
    // void testMultiply(){
    //     assertEquals(15, x * y);
    // }
    // @Test
    // void testCompare(){
    //     assertTrue(x > y);
    // }

    // // This executes after all the tests
    // @AfterAll
    // static void cleanup() {

    // }
}
