package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.DayOfWeek;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Document(collection="courses")
public class Course {
    @Id
    private String id;
    private String courseName;
    private String courseNumber;

    // Lazy load - prevents cyclical reference loop between courses and users
    @DBRef(lazy = true)
    private User instructor;
    // Lazy load - prevents cyclical references loop between courses and users
    @DBRef(lazy = true)
    private List<User> students;

    private Date startDate;   //set date to first date & set time to meeting beginning time
    private Date endDate;     //set date to last date & set time to meeting ending time
    private Set<DayOfWeek> meetingDays;
    private String location;
    private int capacity;
    private int creditHours;

    public Course(){ }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Set<DayOfWeek> getMeetingDays() {
        return meetingDays;
    }

    public void setMeetingDays(Set<DayOfWeek> meetingDays) {
        this.meetingDays = meetingDays;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCreditHours() {
        return creditHours;
    }

    public void setCreditHours(int creditHours) {
        this.creditHours = creditHours;
    }
}
