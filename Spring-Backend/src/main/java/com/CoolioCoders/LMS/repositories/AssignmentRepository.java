package com.CoolioCoders.LMS.repositories;

import com.CoolioCoders.LMS.models.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends MongoRepository<Assignment, String> {
    List<Assignment> findByCourseId(String courseId);
}
