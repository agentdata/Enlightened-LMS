package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.*;

@Document(collection="courses")
public class Course {
    @Id
    private String id;
    private String department;
    private String courseName;
    private String courseNumber;
    private String description;

    // Lazy load - prevents cyclical reference loop between courses and users
    @DBRef(lazy = true)
    private User instructor;

    private Set<String> studentIds;
    private int year;
    private String block;
    private LocalTime startTime;
    private LocalTime endTime;
    private String semester;
    private MeetingDays meetingDays;
    private String buildingName;
    private String roomNumber;
    private int capacity;
    private int credits;
    private Map<String, Double> analytics;

    public Course(){}

    public Course(String courseName, String courseNumber, String roomNumber, int credits){
        this.courseName = courseName;
        this.courseNumber = courseNumber;
        this.roomNumber = roomNumber;
        this.credits = credits;
    }

    public Course(String courseName, String courseNumber, User instructor,
                  LocalTime startTime, LocalTime endTime, MeetingDays meetingDays,
                  String buildingName, String roomNumber,
                  int capacity, int credits, int year, String description, String department, String semester) {
        this.courseName = courseName;
        this.courseNumber = courseNumber;
        this.instructor = instructor;
        this.startTime = startTime;
        this.endTime = endTime;
        this.meetingDays = meetingDays;
        this.buildingName = buildingName;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.credits = credits;
        this.year = year;
        this.description = description;
        this.department = department;
        this.semester = semester;
    }

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

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public MeetingDays getMeetingDays() { return meetingDays; }

    public void setMeetingDays(MeetingDays meetingDays) { this.meetingDays = meetingDays; }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) { this.capacity = capacity; }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) { this.credits = credits; }

    public String getBuildingName() { return buildingName; }

    public void setBuildingName(String buildingName) { this.buildingName = buildingName; }

    public String getRoomNumber() { return roomNumber; }

    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public Set<String> getStudentIds() {
        if(studentIds == null){
            return new HashSet<>();
        }
        return studentIds;
    }

    public void setStudentIds(Set<String> studentIds) {
        this.studentIds = studentIds;
    }

    public Map<String, Double> getAnalytics() {
        if(analytics == null) { analytics = new HashMap<>(); }
        return analytics;
    }

    public void setAnalytics(Map<String, Double> analytics) {
        this.analytics = analytics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course)o;
        return getId().equals(course.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}