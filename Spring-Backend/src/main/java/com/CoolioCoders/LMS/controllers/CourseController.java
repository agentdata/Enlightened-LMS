package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.MeetingDays;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;
import java.time.LocalTime;
import java.util.*;

import static org.springframework.http.ResponseEntity.*;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/api/course")
public class CourseController {

    @Autowired
    private LMSUserDetailsService userService;
    @Autowired
    private CourseService courseService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @GetMapping("instructor")
    public List<Course> findCourses(Principal principalUser){
        User user = userService.findUserByEmail(principalUser.getName());
        return courseService.findCoursesByUser(user);
    }

    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @PostMapping("new")
    public ResponseEntity instructorCourses(Principal principalUser, @RequestBody JSONObject body){
        Map<Object, Object> model = new HashMap<>();
        try {
            MeetingDays days = new MeetingDays();
            days.parseMeetingDays(body.get("days").toString());
            courseService.saveCourse(
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
}