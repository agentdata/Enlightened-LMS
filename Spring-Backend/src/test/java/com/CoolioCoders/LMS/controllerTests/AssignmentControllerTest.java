package com.CoolioCoders.LMS.controllerTests;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

// REMEMBER TO RUN 'LmsApplication' when testing API calls
// To run your tests, simply run this file (Ctrl+Shift+F10)
public class AssignmentControllerTest {

    // Global variables if needed
    static int x;
    static int y;

    // Executes before all the tests
    @BeforeAll
    static void initialize() {
        x = 5;
        y = 3;
    }

    // Use at least one assert* method in each test
    @Test
    void testMultiply(){
        assertEquals(15, x * y);
    }
    @Test
    void testCompare(){
        assertTrue(x > y);
    }

    // This executes after all the tests
    @AfterAll
    static void cleanup() {

    }
}
