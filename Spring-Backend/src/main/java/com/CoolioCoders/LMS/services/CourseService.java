package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.Role;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.models.UserProfile;
import com.CoolioCoders.LMS.repositories.CourseRepository;
import com.CoolioCoders.LMS.repositories.RoleRepository;
import com.CoolioCoders.LMS.repositories.UserRepository;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.security.Principal;
import java.util.*;

import static org.springframework.http.ResponseEntity.ok;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> findAll(){
        return courseRepository.findAll();
    }

    public Course findById(String id) { return courseRepository.findById(id).orElseThrow(EntityNotFoundException::new); }

    public List<Course> findCoursesByInstructor(User user){return courseRepository.findByInstructor(user);}

    public void saveCourse(Course newCourse) {
        courseRepository.save(newCourse);
    }

    public void enrollUserInCourse(User user, Course course){
        //TODO: implement enrolling user
        //Need to make sure to add references to both the user and the course
        throw new NotImplementedException();
    }
}