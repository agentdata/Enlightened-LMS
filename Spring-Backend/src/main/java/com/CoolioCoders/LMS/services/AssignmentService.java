package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

    public Assignment save(Assignment assignment){
        return assignmentRepository.save(assignment);
    }

}
