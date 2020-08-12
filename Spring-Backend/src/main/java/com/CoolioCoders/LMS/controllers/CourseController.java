package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.*;
import com.CoolioCoders.LMS.services.AssignmentService;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private LMSUserDetailsService userService;

    @Autowired
    private CourseService courseService;
    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @GetMapping("/all")
    public ResponseEntity<Map<Object, Object>> getAllCourses(){
        Map<Object, Object> model = new HashMap<>();
        try {
            List<Course> courseList = courseService.findAll();
            List<Object> courseResponseObjects = new ArrayList<>();
            courseList.forEach((course -> courseResponseObjects.add(courseService.courseToJSONResponse(course, false))));
            model.put("courses", courseResponseObjects);
            model.put("message", "success");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @GetMapping("/student")
    public ResponseEntity<Map<Object, Object>> getStudentsCourses(Principal principalUser){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            List<Course> courseList = courseService.findCoursesByUser(user);
            List<Object> courseStrings = new ArrayList<>();
            courseList.forEach((course) -> courseStrings.add(courseService.courseToJSONResponse(course)));
            model.put("courses", courseStrings);
            model.put("message", "success");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @GetMapping("/instructor")
    public ResponseEntity<Map<Object, Object>> getInstructorsCourses(Principal principalUser){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            List<Course> courseList = courseService.findCoursesByUser(user);
            List<Object> courseStrings = new ArrayList<>();
            courseList.forEach((course) -> courseStrings.add(courseService.courseToJSONResponse(course)));
            model.put("courses", courseStrings);
            model.put("message", "success");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @GetMapping("/details/{courseId}")
    public ResponseEntity<Map<Object, Object>> getCourseDetails(@PathVariable String courseId){
        Map<Object, Object> model = new HashMap<>();
        try {
            Course course = courseService.findById(courseId);
            model.put("message", "success");
            model.put("course", courseService.courseToJSONResponse(course));
            model.put("assignments", assignmentService.getSimplifiedAssignmentList(assignmentService.findByCourseId(courseId)));
        }catch(Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @GetMapping("/enrolledstudents/{courseId}")
    public ResponseEntity<Map<Object, Object>> getEnrolledStudents(Principal principalUser, @PathVariable String courseId){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            Course course = courseService.findById(courseId);
            List<User> studentsInCourse = courseService.findStudentsInCourse(course);
            if (studentsInCourse.contains(user) || user.getId().equals(course.getInstructor().getId())) {
                List<Object> studentStrings = new ArrayList<>();
                studentsInCourse.forEach((student) -> studentStrings.add(userService.userToJSONResponse(student)));
                model.put("students", studentStrings);
                model.put("message", "success");
            }
            else {
                model.put("message", "User must be the course instructor or an enrolled " +
                                     "student in order to view the student list");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @PostMapping("/new")
    public ResponseEntity instructorCourses(Principal principalUser, @RequestBody JSONObject body){
        Map<Object, Object> model = new HashMap<>();
        try {
            MeetingDays days = new MeetingDays();
            days.parseMeetingDays(body.get("days").toString());
            Course registeredCourse = courseService.saveCourse(
                new Course(
                body.get("name").toString(),
                body.get("number").toString(),
                userService.findUserByEmail(principalUser.getName()),
                LocalTime.parse( body.get("startTime").toString()), LocalTime.parse( body.get("endTime").toString()),
                days,
                body.get("building").toString(),
                body.get("roomNumber").toString(),
                Integer.parseInt(body.get("capacity").toString()),
                Integer.parseInt(body.get("credits").toString()),
                Integer.parseInt(body.get("year").toString()),
                body.get("description").toString(),
                body.get("department").toString(),
                body.get("semester").toString()
                )
            );

            //if no error then return success message and OK status
            model.put("message", "Successfully added New Course");
            model.put("courseId", registeredCourse);
            return ok(model);
        } catch (ParseException e) {
            e.printStackTrace();
            model.put("message", "Parse exception");
            return ok(model);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("message", "Bad exception");
            return ok(model);
        }
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @PostMapping("/enroll")
    public ResponseEntity<Map<Object, Object>> enrollStudent(Principal principalUser, @RequestBody Map<String, String[]> body) {
        Map<Object, Object> model = new HashMap<>();
        try {
            User student = userService.findUserByEmail(principalUser.getName());
            String[] courseIds = body.get("courses");

            for(String courseId : courseIds) {
                Course course = courseService.findById(courseId);
                courseService.enrollUserInCourse(student, course);
            }
            model.put("message", "Student registration successful");

            // TODO Trigger recalculation of balance
        }
        catch (EntityNotFoundException e){
            e.printStackTrace();
            model.put("message", "Course not found");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }
}