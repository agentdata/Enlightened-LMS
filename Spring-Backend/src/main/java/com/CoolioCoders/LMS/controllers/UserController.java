package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.repositories.UserRepository;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.security.Principal;
import java.util.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@CrossOrigin
@RequestMapping(value="/api/user")
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
    @GetMapping("/{id}")
    public User findById(@PathVariable String id) {
        return userService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{email}")
    public User findByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        userService.deleteById(id);
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
}