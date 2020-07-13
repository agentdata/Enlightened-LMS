package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.repositories.CourseRepository;
import com.CoolioCoders.LMS.repositories.RoleRepository;
import com.CoolioCoders.LMS.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.springframework.http.ResponseEntity.ok;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LMSUserDetailsService userService;
    @Autowired
    private RoleRepository roleRepository;

    public List<Course> findAll(){
        return courseRepository.findAll();
    }

    public Course findById(String id) { return courseRepository.findById(id).orElseThrow(EntityNotFoundException::new); }

    public List<Course> findCoursesByInstructor(User user){return courseRepository.findByInstructor(user);}

    public List<Course> findCoursesByUser(User user) {
        List<Course> usersCourses = new ArrayList<>();
        user.getCourseIds().forEach(
                id -> usersCourses.add(courseRepository.findById(id).orElseThrow(EntityNotFoundException::new)));
        return usersCourses;
    }

    public void deleteCourse(Course course){
        courseRepository.delete(course);
    }

    public List<User> findStudentsInCourse(Course course) {
        List<User> studentsInCourse = new ArrayList<>();
        course.getStudentIds().forEach(
                id -> studentsInCourse.add(userService.findById(id)));
        return studentsInCourse;
    }

    public void saveCourse(Course newCourse) {
        //save the new course
        Course course = courseRepository.save(newCourse);

        // Update instructor's course list to include the new course from db
        User instructor = course.getInstructor();
        Set<String> courseIds = instructor.getCourseIds();
        courseIds.add(course.getId());
        instructor.setCourseIds(courseIds);
        userRepository.save(instructor);
    }

    public void enrollUserInCourse(User student, Course course) throws Exception {

        // Adds references to both the student and the course

        int capacity = course.getCapacity();
        Set<String> studentsCourseIds = student.getCourseIds();
        Set<String> studentIds = course.getStudentIds();
        if(!studentIds.isEmpty() && studentIds.size() >= capacity){
            throw new Exception("Course is full (id: " + course.getId() + ")");
        }

        // Update the course's set of student IDs to include newly enrolled student
        studentIds.add(student.getId());
        course.setStudentIds(studentIds);
        courseRepository.save(course);

        // Update the student's set of course IDs to include enrolled course
        studentsCourseIds.add(course.getId());
        student.setCourseIds(studentsCourseIds);
        userRepository.save(student);
    }

    public boolean isInstructorsCourse(Course course, User instructor) throws Exception {
        if(!instructor.getRoles().contains(roleRepository.findByRole("INSTRUCTOR"))){
            throw new Exception("CourseService:isInstructorsCourse(), User must be an instructor");
        }

        boolean courseHasInstructor = course.getInstructor().equals(instructor);
        boolean instructorHasCourse = instructor.getCourseIds().contains(course.getId());

        if(courseHasInstructor != instructorHasCourse){
            throw new Exception("There is a discrepancy between the instructor and course records");
        }

        return courseHasInstructor;
    }

    public boolean isStudentEnrolledInCourse(User student, Course course) throws Exception {
        if(!student.getRoles().contains(roleRepository.findByRole("STUDENT"))){
            throw new Exception("CourseService:isStudentEnrolledInCourse(), User must be a student");
        }

        boolean courseHasStudent = course.getStudentIds().contains(student.getId());
        boolean studentHasCourse = student.getCourseIds().contains(course.getId());

        if(courseHasStudent != studentHasCourse) {
            throw new Exception("There is a discrepancy between the student and course enrollment records");
        }

        return courseHasStudent;
    }

    public Map<Object, Object> courseToJSONResponse(Course course){
        return courseToJSONResponse(course, true);
    }

    public Map<Object, Object> courseToJSONResponse(Course course, Boolean includeStudentList){
        Map<Object, Object> body = new LinkedHashMap<>();
        body.put("id", course.getId());
        body.put("department", course.getDepartment());
        body.put("courseName", course.getCourseName());
        body.put("courseNumber", course.getCourseNumber());
        body.put("description", course.getDescription());
        body.put("instructor", userService.userToJSONResponse(course.getInstructor(), false));

        if(includeStudentList) {
            List<Object> studentList = new ArrayList<>();
            course.getStudentIds().forEach(
                    courseId -> {
                        studentList.add(userService.userToJSONResponse(userService.findById(courseId), false));
                    });
            body.put("students", studentList);
        }

        body.put("year", Integer.toString(course.getYear()));
        body.put("block", course.getBlock());
        body.put("startTime", course.getStartTime().toString());
        body.put("endTime", course.getEndTime().toString());
        body.put("semester", course.getSemester());
        body.put("meetingDays", course.getMeetingDays());
        body.put("buildingName", course.getBuildingName());
        body.put("roomNumber", course.getRoomNumber());
        body.put("capacity", Integer.toString(course.getCapacity()));
        body.put("credits", Integer.toString(course.getCredits()));

        return body;
    }

}