package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.models.*;
import com.CoolioCoders.LMS.services.AssignmentService;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import jdk.internal.loader.AbstractClassLoaderValue;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/assignment")
public class AssignmentController {

    @Autowired
    AssignmentService assignmentService;
    @Autowired
    LMSUserDetailsService userService;
    @Autowired
    CourseService courseService;

    /*
    API Call format example

        {
            "title":            "replaceMeWithTitle",
            "description":      "replaceMeWithDescription",
            "submissionType":   "textbox or fileUpload",
            "dueDate":          "yyyy-mm-ddTHH:MM:SS",
            "maxPoints":        "replaceMeWithMaxPoints"
            "courseId":         "replaceMeWithCourseId"
        }
     */
    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @PostMapping("/new")
    public ResponseEntity<Map<Object, Object>> instructorAssigment(Principal principalUser, @RequestBody JSONObject body){
        Map<Object, Object> model = new HashMap<>();
        Assignment newAssignment = null;
        try {

            User instructor = userService.findUserByEmail(principalUser.getName());
            Course course = courseService.findById(body.getAsString("courseId"));

            if(instructor != null && course != null && course.getInstructor().getId().equals(instructor.getId())){
                newAssignment = new Assignment();
                newAssignment.setTitle(body.getAsString("title"));
                newAssignment.setDescription(body.getAsString("description"));
                newAssignment.setSubmissionType(SubmissionType.getSubmissionTypeFromString(body.getAsString("submissionType")));
                newAssignment.setDueDate(LocalDateTime.parse(body.getAsString("dueDate")));
                newAssignment.setMaxPoints(Integer.parseInt(body.getAsString("maxPoints")));
                newAssignment.setCourseId(course.getId());
                model.put("assignment", assignmentService.save(newAssignment));

                //if no error then return success message and OK status
                model.put("message", "Successfully added new assignment");
            }
            else {
                model.put("message", "Error: invalid instructor/course combination");
            }

            return ok(model);

        } catch (Exception e) {
            e.printStackTrace();
            model.put("message", e.getMessage());
            return ok(model);
        }
    }


}
