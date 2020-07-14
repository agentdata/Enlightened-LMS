package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.models.AssignmentSubmission;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.SimplifiedAssignment;
import com.CoolioCoders.LMS.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

    public Assignment findByAssignmentId(String assignmentId) {
        return assignmentRepository.findById(assignmentId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Assignment> findByCourseId(String courseId){
        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
        if(assignments != null){
            return assignments;
        }
        return new ArrayList<>();
    }

    public Assignment save(Assignment assignment){
        return assignmentRepository.save(assignment);
    }

    public void saveSubmission(Assignment assignment, AssignmentSubmission submission) {
        List<AssignmentSubmission> submissions = assignment.getSubmissions();
        submissions.add(submission);
        assignment.setSubmissions(submissions);
        save(assignment);
    }

    public List<SimplifiedAssignment> getSimplifiedAssignmentList(List<Assignment> assignments) {
        List<SimplifiedAssignment> simplifiedAssignmentList = new ArrayList<>();
        for (Assignment assignment : assignments) {
            String id = assignment.getId();
            String title = assignment.getTitle();
            LocalDateTime dueDate = assignment.getDueDate();
            String assignmentCourseId = assignment.getCourseId();

            simplifiedAssignmentList.add(new SimplifiedAssignment(id, title, dueDate, assignmentCourseId));
        }

        return simplifiedAssignmentList;
    }
    public Map<Object, Object> getAssignmentDetailsAsJson(Assignment assignment){
        Map<Object, Object> body = new LinkedHashMap<>();

        body.put("id", assignment.getId());
        body.put("title", assignment.getTitle());
        body.put("description", assignment.getDescription());
        body.put("submissionType", assignment.getSubmissionType());
        body.put("dueDate", assignment.getDueDate());
        body.put("maxPoints", assignment.getMaxPoints());
        body.put("courseId", assignment.getCourseId());

        return body;
    }


}
