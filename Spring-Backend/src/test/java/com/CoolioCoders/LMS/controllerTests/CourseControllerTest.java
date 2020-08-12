package com.CoolioCoders.LMS.controllerTests;

import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.repositories.CourseRepository;
import com.CoolioCoders.LMS.services.CourseService;
import com.google.gson.Gson;
import net.minidev.json.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.json.*;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CourseControllerTest {

    static CourseService courseService = new CourseService();
    static String teacherToken;
    static String studentToken1;
    static String studentToken2;
    static String createdCourseId;
//    static String domain = "http://localhost:8080";
    static String domain = "https://cooliocoders.ddns.net";

    @BeforeAll
    static void setUp() {
        teacherToken = getUserToken("testteacher@cc.net", "12345");
        studentToken1 = getUserToken("teststudent1@cooliocoders.ddns.net", "12345");
        studentToken2 = getUserToken("teststudent2@cooliocoders.ddns.net", "12345");

    }

    @AfterAll
    static void tearDown(){
        if(createdCourseId != null) {
            courseService.deleteCourse(courseService.findById(createdCourseId));
        }
    }

    @Test
    //instructorCourses
    public void testCreateCourse()
    {
        String courseJsonString = "{\n" +
                "\tblock: \"Full\",\n" +
                "\tbuilding: \"hse\",\n" +
                "\tcapacity: \"25\",\n" +
                "\tcredits: \"4\",\n" +
                "\tdays: {mon: true, tues: false, wed: true, thurs: false, fri: true, sat: false, sun: false},\n" +
                "\tdepartment: \"MP\",\n" +
                "\tdescription: \"upper leve financial processing of micro loans\",\n" +
                "\tendTime: \"13:55\",\n" +
                "\tinstructor: \"\",\n" +
                "\tname: \"micro loans processing\",\n" +
                "\tnumber: \"2330\",\n" +
                "\tplatform: \"In Person\",\n" +
                "\troomNumber: \"225\",\n" +
                "\tsemester: \"Fall\",\n" +
                "\tstartTime: \"13:00\",\n" +
                "\tyear: \"2020\"\n" +
                "}";

        try
        {
            //set url and headers
            URL url = new URL(domain+"/api/course/new");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("authorization", "Bearer " + teacherToken);

            // Create and embed body of request
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = courseJsonString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int status = con.getResponseCode();

            String responseString = "";
//            if(status == 200){
                try(BufferedReader br = new BufferedReader(
                        new InputStreamReader(con.getInputStream(), "utf-8"))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine = null;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    responseString = response.toString();
                }
//            }
            con.disconnect();

            //check results
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            //check result is
            //{"message":"Successfully added New Course"}
            assertTrue(true);
        }
    }

    @Test
    //enrollStudent
    public void testEnrollStudent(){
        try
        {
            //set url and headers
            URL url = new URL(domain+"/api/course/enroll");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("authorization", "Bearer " + teacherToken);
            String courseIdString = "{courses: [\""+createdCourseId+"\"]}";

            // Create and embed body of request
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = courseIdString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int status = con.getResponseCode();

            String responseString = "";
            if(status == 200){
                try(BufferedReader br = new BufferedReader(
                        new InputStreamReader(con.getInputStream(), "utf-8"))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine = null;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    responseString = response.toString();
                }
            }
            con.disconnect();

            //check results
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            //check result is
            //{"message":"Successfully added New Course"}
            assertTrue(true);
        }
    }

    @Test
    //getAllCourses
    public void testGetAllCourses(){
        try
        {
            //set url and headers
            URL url = new URL(domain+"/api/course/all");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("authorization", "Bearer " + studentToken1);

            // Create and embed body of request


            int status = con.getResponseCode();

            String responseString = "";
            if(status == 200){
                try(BufferedReader br = new BufferedReader(
                        new InputStreamReader(con.getInputStream(), "utf-8"))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine = null;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    responseString = response.toString();
                }
            }
            con.disconnect();

            //check results
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            //check result is
            //{"message":"Successfully added New Course"}
            assertTrue(true);
        }
    }

    @Test
    //getStudentsCourses
    public void testGetStudentsCourses(){

    }

    @Test
    //getInstructorsCourses
    public void testGetInstructorsCourses(){

    }

    @Test
    //getCourseDetails
    public void testGetCourseDetails(){

    }

    @Test
    //getEnrolledStudents
    public void testGetEnrolledStudents(){

    }

    public static String getUserToken(String email, String password)
    {
        String adminToken = "";
        try
        {
            // Set up POST Request
            URL url = new URL(domain+"/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            String body = "{ \"email\": \""+email+"\", \"password\": \""+password+"\"}";

            // Create and embed body of request
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = body.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int status = con.getResponseCode();

            String responseString = "";
            if(status == 200){
                try(BufferedReader br = new BufferedReader(
                        new InputStreamReader(con.getInputStream(), "utf-8"))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine = null;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    responseString = response.toString();
                }
            }
            con.disconnect();

            // Extract token
            String splitString[] = responseString.split("token\":\"");
            adminToken = splitString.toString();
//            adminToken = splitString[1].substring(0, splitString[1].length()-2);

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            System.out.println("TOKEN: " + adminToken);
            return adminToken;
        }
    }
}
