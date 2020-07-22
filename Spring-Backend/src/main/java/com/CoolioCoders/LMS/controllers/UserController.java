package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.models.Notification;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private LMSUserDetailsService userService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/allusers")
    public List<User> findAll(){
        return userService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/id/{id}")
    public User findById(@PathVariable String id) {
        return userService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/email/{email}")
    public User findByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        userService.deleteById(id);
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<Object, Object>> validateToken(){
        Map<Object, Object> model = new HashMap<>();
        model.put("message","Token is valid.");
        return ok(model);
    }

    @PutMapping("/profile")
    public User update(Principal principalUser, @RequestBody User updatedUser) {
        return userService.update(principalUser.getName(), updatedUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<Object, Object>> findUserProfile(Principal principalUser){
        return ok(userService.findUserProfileByEmail(principalUser.getName()).getUserProfile());
    }

    @PutMapping(value = "/profile/avatar")
    public ResponseEntity<Map<Object, Object>> setUserAvatar(Principal principalUser, @RequestBody JSONObject body){
        return ok(userService.saveAvatar(principalUser.getName(), body));
    }

    @GetMapping("/notifications")
    public ResponseEntity<Map<Object, Object>> getUserNotifications(Principal principalUser){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());

            //all notifications for that user
            model.put("notifications", user.getNotifications());
            //notifications for that user that have not been cleared by the user
            model.put("newNotifications", userService.getNewUserNotifications(user));

            model.put("message", "success");
        }
        catch (Exception e) {
            e.printStackTrace();
            model.put("message", "Error: " + e.getMessage());
        }
        return ok(model);
    }

    @PutMapping("/notification/clear/{notificationId}")
    public ResponseEntity<Map<Object, Object>> clearUserNotification(Principal principalUser, @PathVariable String notificationId){
        Map<Object, Object> model = new HashMap<>();
        try {
            User user = userService.findUserByEmail(principalUser.getName());
            Notification clearedNotification = userService.clearNotification(notificationId, user);

            model.put("notification", clearedNotification);
            model.put("message", "success");
        }
        catch (Exception e) {
            e.printStackTrace();
            model.put("message", "Error: " + e.getMessage());
        }
        return ok(model);
    }
}