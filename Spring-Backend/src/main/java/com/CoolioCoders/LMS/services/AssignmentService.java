package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.models.AssignmentSubmission;
import com.CoolioCoders.LMS.models.SimplifiedAssignment;
import com.CoolioCoders.LMS.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
            String title = assignment.getTitle();
            LocalDateTime dueDate = assignment.getDueDate();
            simplifiedAssignmentList.add(new SimplifiedAssignment(title, dueDate));
        }
        return simplifiedAssignmentList;
    }
}
