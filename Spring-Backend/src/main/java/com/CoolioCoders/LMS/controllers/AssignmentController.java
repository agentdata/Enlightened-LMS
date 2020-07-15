package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.models.*;
import com.CoolioCoders.LMS.services.AssignmentService;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.FileStoreService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.io.File;
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
    @Autowired
    FileStoreService fileStoreService;

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


    /*
        API Call format example

        {
            "courseId":         "replaceMeWithCourseId",
            "assignmentId":     "replaceMeWithAssignmentId",
            "submissionType":   "textbox or fileUpload",
            "submission":       "This is the text submitted by the student" or
                                "URL String of the submitted file"
        }

     */
    @PreAuthorize("hasAuthority('STUDENT')")
    @PostMapping("/submit")
    public ResponseEntity<Map<Object, Object>> assignmentSubmit(Principal principalUser, @RequestBody JSONObject body){
        Map<Object, Object> model = new HashMap<>();
        try{
            User student = userService.findUserByEmail(principalUser.getName());
            Course course = courseService.findById(body.getAsString("courseId"));

            if(courseService.isStudentEnrolledInCourse(student, course)){
                Assignment assignment = assignmentService.findByAssignmentId(body.getAsString("assignmentId"));
                AssignmentSubmission submission = new AssignmentSubmission();
                submission.setStudentId(student.getId());
                submission.setSubmittedTimestamp(LocalDateTime.now());
                submission.setSubmissionContent(body.getAsString("submission"));
                assignmentService.saveSubmission(assignment, submission);

                model.put("message", "Assignment Successfully Submitted");
            }
            else {
                model.put("message", "Error: Student must be enrolled in this course");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            model.put("message", "Error: " + e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @PostMapping("/submit/{assignmentId}/uploadFile")
    public ResponseEntity<Map<Object, Object>> assignmentFileSubmit(Principal principalUser,
                @RequestParam("file") MultipartFile file, @PathVariable String assignmentId){

        Map<Object, Object> model = new HashMap<>();
        try{

            User student = userService.findUserByEmail(principalUser.getName());
            Assignment assignment = assignmentService.findByAssignmentId(assignmentId);
            Course course = courseService.findById(assignment.getCourseId());

            if(courseService.isStudentEnrolledInCourse(student, course)){

                String fileName = fileStoreService.storeFile(file, student);

                FileUpload fileUpload = new FileUpload();
                fileUpload.setFileName(fileName);
                fileUpload.setFileSize(file.getSize());
                fileUpload.setFileType(file.getContentType());
                fileUpload.setFileDownloadUrl(fileStoreService.getFileAsResource(student.getId() + "/" + fileName));

                AssignmentSubmission submission = new AssignmentSubmission();
                submission.setStudentId(student.getId());
                submission.setSubmittedTimestamp(LocalDateTime.now());
                submission.setSubmittedFile(fileUpload);

                assignmentService.saveSubmission(assignment, submission);

                model.put("fileUpload", fileUpload);
                model.put("message", "Assignment Successfully Uploaded");
            }
            else {
                model.put("message", "Error: Student must be enrolled in this course");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            model.put("message", "Error: " + e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAnyAuthority({'INSTRUCTOR', 'STUDENT'})")
    @GetMapping("/{assignmentId}")
    public ResponseEntity<Map<Object, Object>> getAssignmentDetailsById(@PathVariable String assignmentId){
        Map<Object, Object> model = new HashMap<>();
        try {
            Assignment assignment = assignmentService.findByAssignmentId(assignmentId);

            // user making request must either be a student enrolled in course or the course instructor
            if(assignment != null){
                model.put("assignment", assignmentService.getAssignmentDetailsAsJson(assignment));

                //if no error then return success message and OK status
                model.put("message", "Success");
            }
            else {
                model.put("message", "Error: assignment may not exist");
            }
        }
        catch(Exception e) {
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAnyAuthority({'INSTRUCTOR', 'STUDENT'})")
    @GetMapping("/bycourse/{courseId}")
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
    public ResponseEntity<Map<Object, Object>> getSimplifiedCourseAssignments(Principal principalUser, @PathVariable String courseId){
        Map<Object, Object> model = new HashMap<>();
        try {
            model.put("assignments", assignmentService.getSimplifiedAssignmentList(assignmentService.findByCourseId(courseId)));
            model.put("message", "success");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    @PreAuthorize("hasAnyAuthority({'INSTRUCTOR', 'STUDENT'})")
    @GetMapping("/simplified")
    public ResponseEntity<Map<Object, Object>> getSimplifiedAssignments(Principal principalUser){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            List<Assignment> assignments = new ArrayList<>();

            for (String courseId : user.getCourseIds()) {
                assignments.addAll(assignmentService.findByCourseId(courseId));
            }

            model.put("assignments", assignmentService.getSimplifiedAssignmentList(assignments));
            model.put("message", "success");
        }
        catch (Exception e){
            e.printStackTrace();
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

}
