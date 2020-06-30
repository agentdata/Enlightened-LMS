package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.models.Balance;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.services.BalanceService;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/balance")
public class BalanceController {

    // ASSUME ONE CREDIT IS $300.00
    private final float CREDIT_COST = 300;

    @Autowired
    private CourseService courseService;
    @Autowired
    private BalanceService balanceService;
    @Autowired
    private LMSUserDetailsService userService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @GetMapping("/amount")
    public Balance getEnrolledStudents(Principal principalUser){
        return balanceService.getBalance(userService.findUserByEmail(principalUser.getName()));
    }

    @PostMapping("/new")
    public ResponseEntity<Map<Object, Object>> addBalance(Principal principalUser, @RequestBody Balance balance) {
        Map<Object, Object> model = new HashMap<>();

        try{
            balanceService.saveBalance(balance);

            model.put("message", "Sucessfully added new balance");
        }
        catch(Exception e) {
            model.put("message", e.getMessage());
        }

        return ok(model);
    }

    @PostMapping("/update")
    public ResponseEntity<Map<Object, Object>> updateBalance(Principal principalUser, @RequestBody Balance balance) {
        Map<Object, Object> model = new HashMap<>();
        int totalCredits = 0;
        float totalCost;

        //Find all courses for specific user
        try {
            List<Course> courses = courseService.findCoursesByUser(userService.findUserByEmail(principalUser.getName()));

            //Find credit hours for each course and total them up
            for (int i = 0; i < courses.size(); i++) {
                totalCredits += courses.get(i).getCredits();
            }

            //Calculate totalCost
            totalCost = totalCredits * CREDIT_COST;
            balance.setBalance(totalCost);
            balance.setTotalCredits(totalCredits);

            //Save to database
            balanceService.saveBalance(balance);
            model.put("message", "Balance successfully updated");
        } catch (Exception e) {
            model.put("message", e.getMessage());
        }

        return ok(model);
    }
}