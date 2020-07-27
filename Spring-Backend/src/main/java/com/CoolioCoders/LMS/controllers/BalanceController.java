package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.models.Balance;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.Payment;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.services.BalanceService;
import com.CoolioCoders.LMS.services.CourseService;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import com.google.gson.JsonObject;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.google.gson.Gson;


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
    public ResponseEntity<Map<Object, Object>> getBalance(Principal principalUser){
        Map<Object, Object> model = new HashMap<>();
        //trigger recalculate and confirm balance to send back.
        try{
            User user = userService.findUserByEmail(principalUser.getName());
            List<Balance> balance = balanceService.getBalance(user);
            model.put("balance", balance);
            model.put("totalCredits", userService.getCreditHours(user));
            model.put("message", "Successfully retrieved balance");
        }
        catch(Exception e){
            model.put("message", e.getMessage());
        }
        return ok(model);
    }

    //    requires JSON object in this format
//    {
//        "payment_method": "pm_1H9NIIFVMGnqF5Jhxv1usTbh",
//        "amount": 100
//    }
    @PostMapping("/pay")
    public ResponseEntity<Map<Object, Object>> processPayment(Principal principalUser, @RequestBody JSONObject body) {
        Map<Object, Object> response = new HashMap<>();

        final String KEY = "";

        try{
            userService.findUserByEmail(principalUser.getName());
            String currencyType = "usd";
            Double amount = Double.parseDouble(body.getAsString("amount"));

            //convert total cents amount for stripe api
            int amountInCents = (int)(amount*100.00);

            //TODO
            //abstract most of this stripe api call so it can be called from the unit tests directly
            URL url = new URL("https://api.stripe.com/v1/payment_intents");
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("authorization", "Bearer " + KEY);
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("amount=" + amountInCents + "&currency=" + currencyType +
                    "&payment_method=" + body.get("payment_method").toString() + "&confirm=true");
            out.flush();
            out.close();
            if(con.getResponseCode() == 200) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer content = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }
                in.close();

                JsonObject stripeResponse = new Gson().fromJson(content.toString(), JsonObject.class);
                String paymentStatus = stripeResponse.get("status").toString().replace("\"","");
                if(paymentStatus.equals("succeeded")){
                    response.put("message", "Payment processed successfully.");
                    //TODO
                    //recalculate balance and log payment info to balance object
                }
                else{
                    response.put("message", "There was an issu processing the payment.");
                    //TODO
                    //save payment intent for future retry?? not sure.
                }
            }
            else {
                response.put("message", "There was an issue with payment intent from Stripe");
            }
            con.disconnect();
        }
        catch(Exception e) {
            response.put("message", "there was an error.");
            return ok(response);
        }
        return ok(response);
    }

//    @PostMapping("/new")
//    public ResponseEntity<Map<Object, Object>> addBalance(Principal principalUser, @RequestBody Balance balance) {
//        Map<Object, Object> model = new HashMap<>();
//
//        try{
//            balance.setUser(userService.findUserByEmail(principalUser.getName()));
//            balance.setRemaining(balance.getBalance());
//            balanceService.saveBalance(balance);
//
//            model.put("message", "Sucessfully added new balance");
//        }
//        catch(Exception e) {
//            model.put("message", e.getMessage());
//        }
//
//        return ok(model);
//    }
//
//    @PostMapping("/pay") //TODO fix functionality
//    public ResponseEntity<Map<Object, Object>> payBalance(Principal principalUser, @RequestBody Payment payment) {
//        Map<Object, Object> model = new HashMap<>();
//
//        try{
//            User user = userService.findUserByEmail(principalUser.getName());
//            List<Balance> balanceList = balanceService.getBalance(user);
//
//            Balance balance = balanceList.get(0);
//            balance.setRemaining(balance.getRemaining() - payment.getAmount());
//            balanceService.saveBalance(balance);
//
//            model.put("message", "Sucessfully paid $" + payment.getAmount());
//        }
//        catch(Exception e) {
//            model.put("message", e.getMessage());
//        }
//
//        return ok(model);
//    }
//
//    @PostMapping("/update")
//    public ResponseEntity<Map<Object, Object>> updateBalance(Principal principalUser, @RequestBody Balance balance) {
//        Map<Object, Object> model = new HashMap<>();
//        int totalCredits = 0;
//        float totalCost;
//
//        //Find all courses for specific user
//        try {
//            List<Course> courses = courseService.findCoursesByUser(userService.findUserByEmail(principalUser.getName()));
//
//            //Find credit hours for each course and total them up
//            for (int i = 0; i < courses.size(); i++) {
//                totalCredits += courses.get(i).getCredits();
//            }
//
//            //Calculate totalCost
//            totalCost = totalCredits * CREDIT_COST;
//            balance.setBalance(totalCost);
//            balance.setTotalCredits(totalCredits);
//
//            //Save to database
//            balanceService.saveBalance(balance);
//            model.put("message", "Balance successfully updated");
//        } catch (Exception e) {
//            model.put("message", e.getMessage());
//        }
//
//        return ok(model);
//    }
}