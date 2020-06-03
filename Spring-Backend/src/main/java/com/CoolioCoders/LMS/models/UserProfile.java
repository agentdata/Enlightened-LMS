package com.CoolioCoders.LMS.models;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class UserProfile {
    private User user;
    private Map<Object, Object> profileMap;

    public UserProfile(User user){
        this.user = user;
        profileMap = new HashMap<>();
        profileMap.put("firstName", getFirstName());
        profileMap.put("lastName", getLastName());
        profileMap.put("email", getEmail());
        profileMap.put("birthday", getBirthdayAsString());
    }

    public String getFirstName(){
        return user.getFirstName();
    }

    public String getLastName(){
        return user.getLastName();
    }

    public String getEmail(){
        return user.getEmail();
    }

    public String getBirthdayAsString(){
        LocalDate birthDate = user.getBirthDate();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        return birthDate.format(dateTimeFormatter);
    }

    public Map<Object, Object> getUserProfile(){
        return profileMap;
    }
}
