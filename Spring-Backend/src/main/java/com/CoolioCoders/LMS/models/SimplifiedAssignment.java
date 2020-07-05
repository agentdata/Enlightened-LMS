package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

public class SimplifiedAssignment {

    @Id
    private String title;
    private LocalDateTime dueDate;
    private boolean dismissed = false;

    public SimplifiedAssignment(String title, LocalDateTime dueDate, boolean dismissed){
        this.title = title;
        this.dueDate = dueDate;
        this.dismissed = dismissed;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }


    public boolean getDismissed(){return dismissed;}

    public void setDismissed(boolean dismissed){this.dismissed = dismissed;}
}
