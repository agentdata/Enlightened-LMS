package com.CoolioCoders.LMS.repositories;

import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByInstructor(User instructor);
}
