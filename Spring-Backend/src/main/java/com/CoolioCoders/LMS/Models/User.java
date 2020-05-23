package com.CoolioCoders.LMS.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "users")
public class User {
    @Id
    String id;
    String firstName;
    String lastName;
    Date birthDate;
    String email;
    String hashedPassword;
    Boolean isInstructor;

    public User(String firstName, String lastName, Date birthDate, String email, String hashedPassword, Boolean isInstructor) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.isInstructor = isInstructor;
    }

    public String getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public String getEmail() {
        return email;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public Boolean isInstructor() {
        return isInstructor;
    }
}
