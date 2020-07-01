package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

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

}
