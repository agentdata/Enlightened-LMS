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
    private boolean paid;
    private int year;
    private String semester;
    private int totalCredits;

    public float getBalance(){return balance;}
    public boolean isPaid(){return paid;}
    public int getYear(){return year;}
    public String getSemester(){return semester;}
    public int getTotalCredits(){return getTotalCredits();}

    public Balance(){ }
}
