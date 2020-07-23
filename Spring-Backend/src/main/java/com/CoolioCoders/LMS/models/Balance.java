package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "balances")
public class Balance {

    @Id
    private String id;
    @DBRef
    private User user;

    private float balance;
    private float remaining;
    private boolean paid;
    private int year;
    private String semester;
    private int totalCredits;

    public User getUser(){return user;}
    public float getBalance(){return balance;}
    public float getRemaining(){return remaining;}
    public boolean isPaid(){return paid;}
    public int getYear(){return year;}
    public String getSemester(){return semester;}
    public int getTotalCredits(){return totalCredits;}

    public void setUser(User user){this.user = user;}
    public void setBalance(float balance){this.balance = balance;}
    public void setRemaining(float remaining){this.remaining = remaining;}
    public void setIsPaid(boolean paid){this.paid = paid;}
    public void setYear(int year){this.year = year;}
    public void setSemester(String semester){this.semester = semester;}
    public void setTotalCredits(int totalCredits){this.totalCredits = totalCredits;}

    public Balance(){ }
}
