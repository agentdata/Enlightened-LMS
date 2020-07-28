package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.models.*;
import com.CoolioCoders.LMS.services.AssignmentService;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.FileStoreService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
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
            "assignmentId":     "replaceMeWithAssignmentId",
            "studentId":   "replaceMeWithStudentId",
            "grade":       50.5
        }
     */
    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @PutMapping("/grade")
    public ResponseEntity<Map<Object, Object>> addGradeToSubmission(Principal principalUser, @RequestBody JSONObject body){
        Map<Object, Object> model = new HashMap<>();
        try{
            if(assignmentService.gradeAssignmentSubmission(userService.findUserByEmail(principalUser.getName()).getId(), body.getAsString("assignmentId"), body.getAsString("studentId"), body.getAsNumber("grade"))){
                model.put("message", "Assignment graded successfully.");
            }
            else{
                model.put("message", "something went wrong");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            model.put("message", "Error: " + e.getMessage());
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

    /*
        Content-Type should be "multipart/form-data"
        Use "file" for the field name

     */
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
                //store the file in directory i.e. /{courseId}/{userId}/{assignmentId}/filename.txt
                String fileName = fileStoreService.storeFile(file, student, assignment);

                String filePath = "/api/assignment/downloadFile/" +
                                  assignment.getCourseId() + "/" +
                                  student.getId() + "/" +
                                  assignmentId + "/";

                //build download API call string
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .scheme("https")
                        .path(filePath)
                        .path(fileName)
                        .toUriString();

                //Create fileUpload
                FileUpload fileUpload = new FileUpload();
                fileUpload.setFileName(fileName);
                fileUpload.setFileSize(file.getSize());
                fileUpload.setFileType(file.getContentType());
                fileUpload.setFileDownloadUrl(fileDownloadUri);

                //Create assignment submission and add the fileUpload
                AssignmentSubmission submission = new AssignmentSubmission();
                submission.setStudentId(student.getId());
                submission.setSubmittedTimestamp(LocalDateTime.now());
                submission.setSubmittedFile(fileUpload);

                //save the submission
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

    /*
        Use the fileUpload fileDownloadUrl to make the call to this endpoint
     */
    @PreAuthorize("hasAnyAuthority({'INSTRUCTOR', 'STUDENT'})")
    @GetMapping("/downloadFile/{courseId}/{studentId}/{assignmentId}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(Principal principalUser,
            @PathVariable String courseId, @PathVariable String studentId, @PathVariable String assignmentId,
            @PathVariable String fileName, HttpServletRequest request){

        try {
            Resource resource = fileStoreService.getFileAsResource(courseId, studentId, assignmentId, fileName);

            String contentType = null;
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            if(contentType == null){
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        }
        catch(Exception e) {
            e.printStackTrace();
        }
        // TODO: create a more graceful response
        return null;
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
                List<Assignment> assignments = assignmentService.findByCourseId(courseId);

                //if requester is student then filter for student's submissions.
                if(user.getRole().compareTo("STUDENT") ==  0){
                    ArrayList modifiedAssignments = new ArrayList();
                    for (Assignment assignment : assignments) {
                        Map<Object, Object> modifiedAssignment = new HashMap<>();
                        modifiedAssignment.put("id", assignment.getId());
                        modifiedAssignment.put("title", assignment.getTitle());
                        modifiedAssignment.put("description", assignment.getDescription());
                        modifiedAssignment.put("submissionType", assignment.getSubmissionType());
                        modifiedAssignment.put("dueDate", assignment.getDueDate());
                        modifiedAssignment.put("maxPoints", assignment.getMaxPoints());
                        modifiedAssignment.put("courseId", assignment.getCourseId());
                        modifiedAssignment.put("submissions", assignment.getStudentSubmission(user.getId()));
                        modifiedAssignments.add(modifiedAssignment);
                    }
                    model.put("assignments", modifiedAssignments);
                }else{
                    model.put("assignments", assignments);
                }

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

    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    @GetMapping("/{assignmentId}/submissions")
    public ResponseEntity<Map<Object, Object>> getAssignmentSubmissions(Principal principalUser, @PathVariable String assignmentId){
        Map<Object, Object> model = new HashMap<>();
        try {
            User instructor = userService.findUserByEmail(principalUser.getName());
            Assignment assignment = assignmentService.findByAssignmentId(assignmentId);
            Course course = courseService.findById(assignment.getCourseId());

            if(courseService.isInstructorsCourse(course, instructor)) {

                ArrayList assignmentSubmissionsForGrading = new ArrayList();
                for (AssignmentSubmission assignmentSubmission : assignment.getSubmissions()) {
                    Map<Object, Object> modifiedAssignmentSubmission = new HashMap<>();

                    modifiedAssignmentSubmission.put("studentId", assignmentSubmission.getStudentId());
                    modifiedAssignmentSubmission.put("studentName", userService.findById(assignmentSubmission.getStudentId()).getFirstName() +" "+ userService.findById(assignmentSubmission.getStudentId()).getLastName());
                    modifiedAssignmentSubmission.put("pointsAwarded", assignmentSubmission.getPointsAwarded());
                    modifiedAssignmentSubmission.put("submissionContent", assignmentSubmission.getSubmissionContent());
                    modifiedAssignmentSubmission.put("submittedFile", assignmentSubmission.getSubmittedFile());
                    modifiedAssignmentSubmission.put("submittedTimeStamp", assignmentSubmission.getSubmittedTimestamp());
                    modifiedAssignmentSubmission.put("graded", assignmentSubmission.isGraded());


                    assignmentSubmissionsForGrading.add(modifiedAssignmentSubmission);
                }
                model.put("assignment", assignmentService.getAssignmentDetailsAsJson(assignment));
                model.put("submissions", assignmentSubmissionsForGrading);
                model.put("message", "success");
            }
            else {
                model.put("message", "Instructor must teach this course to see submissions");
            }
        }
        catch (Exception e){
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

    @PreAuthorize("hasAuthority('STUDENT')")
    @GetMapping("/{courseId}/grades")
    public ResponseEntity<Map<Object, Object>> getStudentGrades(Principal principalUser, @PathVariable String courseId){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            Course course = courseService.findById(courseId);
            if (course != null && courseService.isStudentEnrolledInCourse(user, course)) {
                List<Assignment> assignments = new ArrayList<>(assignmentService.findByCourseId(courseId));
                ArrayList<Map<Object, Object>> assignmentsAndGradesDetails = new ArrayList<Map<Object, Object>>();
                ArrayList<Map<Object, Object>> List = new ArrayList<Map<Object, Object>>();

                for (Assignment assignment : assignments) {
                    AssignmentSubmission assignmentSubmission = assignment.getStudentSubmission(user.getId());
                    Map<Object, Object> assignmentAndGradeDetails = new HashMap<>();
                    assignmentAndGradeDetails.put("assignmentDetails", assignmentService.getAssignmentDetailsAsJson(assignment));
                    if (assignmentSubmission != null) {
                        assignmentAndGradeDetails.put("graded", assignmentSubmission.isGraded());
                        assignmentAndGradeDetails.put("pointsAwarded", assignmentSubmission.getPointsAwarded());
                        assignmentAndGradeDetails.put("analytics", assignment.getAnalytics());
                    } else {
                        assignmentAndGradeDetails.put("graded", null);
                        assignmentAndGradeDetails.put("pointsAwarded", null);
                        assignmentAndGradeDetails.put("analytics", null);
                    }
                    assignmentsAndGradesDetails.add(assignmentAndGradeDetails);
                }

                model.put("assignmentsAndGradesDetails", assignmentsAndGradesDetails);
                model.put("message", "Success");
            }
            else{
                model.put("message", "Student not registered for this course.");
            }
        }

        catch (Exception e){
            e.printStackTrace();
            model.put("message", "An exception occurred");
        }
        return ok(model);
    }
}
