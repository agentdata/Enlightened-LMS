package com.CoolioCoders.LMS.controllers;

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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

        } catch (Exception e) {
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }


    @PreAuthorize("hasAnyAuthority({'INSTRUCTOR', 'STUDENT'})")
    @GetMapping("/{courseId}")
    public ResponseEntity<Map<Object, Object>> userCourseAssignments(Principal principalUser, @PathVariable String courseId){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            Course course = courseService.findById(courseId);

            // user making request must either be a student enrolled in course or the course instructor
            if(user != null && course != null && (course.getInstructor().getId().equals(user.getId()) ||
                                                  courseService.findStudentsInCourse(course).contains(user))){

                model.put("assignments", assignmentService.findByCourseId(courseId));

                //if no error then return success message and OK status
                model.put("message", "Success");
            }
            else {
                model.put("message", "Error: invalid user/course combination");
            }
        }
        catch(Exception e) {
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);

    }

    @PreAuthorize("hasAnyAuthority({'INSTRUCTOR', 'STUDENT'})")
    @GetMapping("/simplified/{courseId}")
    public ResponseEntity<Map<Object, Object>> getSimplifiedAssignments(Principal principalUser, @PathVariable String courseId){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            List<Assignment> assignmentList = assignmentService.findByCourseId(courseId);
            List<SimplifiedAssignment> simplifiedAssignmentList = new ArrayList<>();

            for(int i = 0; i < assignmentList.size(); i++) {
                Assignment currentAssignment = assignmentList.get(i);
                String title = currentAssignment.getTitle();
                LocalDateTime dueDate = currentAssignment.getDueDate();
                boolean dismissed = currentAssignment.getDismissed();

                simplifiedAssignmentList.add(new SimplifiedAssignment(title, dueDate, dismissed));
            }


            model.put("courses", simplifiedAssignmentList);
            model.put("message", "success");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

}
