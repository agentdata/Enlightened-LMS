package com.CoolioCoders.LMS.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Notification {

    private String title;           //The course name goes here.
    private String description;
    private String link = "";
    private LocalDateTime time;

    //Rudimentary notification with only title and description
    public Notification(String title, String description) {
        this.title = title;
        this.description = description;
        time = LocalDateTime.now();
    }

    //Notification with link
    public Notification(String title, String description, String link){
        this.title = title;
        this.description = description;
        this.link = link;
        time = LocalDateTime.now();
    }

    public void setTitle(String title){this.title = title;}
    public String getTitle(){return title;}

    public void setDescription(String description){this.description = description;}
    public String getDescription(){return description;}

    public void setLink(String link){this.link = link;}
    public String getLink(){return link;}

    public void setTime(LocalDateTime time){this.time = time;}
    public LocalDateTime getTime(){return time;}
}
