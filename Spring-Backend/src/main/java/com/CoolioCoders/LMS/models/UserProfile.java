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
        profileMap.put("id", getId());
        profileMap.put("firstName", getFirstName());
        profileMap.put("lastName", getLastName());
        profileMap.put("email", getEmail());
        profileMap.put("birthDate", getBirthdayAsString());

        profileMap.put("bio", getBio());
        profileMap.put("link1", getLink(1));
        profileMap.put("link2", getLink(2));
        profileMap.put("link3", getLink(3));
        profileMap.put("avatar", getAvatar());
        profileMap.put("phone", getPhone());
        profileMap.put("address1", getAddress(1));
        profileMap.put("address2", getAddress(2));
        profileMap.put("city", getCity());
        profileMap.put("state", getState());
        profileMap.put("zip", getZip());
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

    public String getBio() {
        return user.getBio();
    }

    public String getLink(int linkNum) {
        switch(linkNum) {
            case 1:
                return user.getLink1();
            case 2:
                return user.getLink2();
            case 3:
                return user.getLink3();
            default:
                return user.getLink1();
        }
    }

    public String getAvatar() {
        return user.getAvatar();
    }

    public String getPhone() {
        return user.getPhone();
    }

    public String getAddress(int addressNum) {
        switch(addressNum) {
            case 1:
                return user.getAddress1();
            case 2:
                return user.getAddress2();
            default:
                return user.getAddress1();
        }
    }

    public String getCity() {
        return user.getCity();
    }

    public String getState() {
        return  user.getState();
    }

    public String getZip() {
        return user.getZip();
    }

    public Map<Object, Object> getUserProfile(){
        return profileMap;
    }

    public String getId(){return user.getId();}
}
