package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
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
    @GetMapping
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

    @PutMapping
    public User update(Principal principalUser, @RequestBody User updatedUser) {
        return userService.update(principalUser.getName(), updatedUser);
        // See findUserProfile Method
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        userService.deleteById(id);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<Object, Object>> findUserProfile(Principal principalUser){
        //Returns the user profile based on their authorization token
        //Users can only see their profile

        return ok(userService.findUserProfileByEmail(principalUser.getName()).getUserProfile());
    }

    //TODO POST method for setting avatar
    @PutMapping(value = "/profile/avatar")
    public ResponseEntity<Map<Object, Object>> setUserAvatar(Principal principalUser, @RequestBody JSONObject body){

//        String stringFile = "";												        //Store encoded string
//
//        try {
//            FileInputStream fileInput = new FileInputStream(file);			        //Set up reading from a file as a stream of bytes
//            byte[] bytes = new byte[(int)file.length()];					        //Allocate enough space
//            fileInput.read(bytes);											        //Read file into bytes
//            fileInput.close();
//            stringFile = Base64.getEncoder().encodeToString(bytes);			        //Encode the bytes into a string
//
//            updateUser.setAvatar(stringFile);                                       //Set user's avatar
//        }
//        catch(Exception e){
//            // File is missing or invalid
//            e.printStackTrace();
//        }
//
//        userService.(principalUser.getName(), updateUser);                    //Updates current user
//        userService.updateinvokeSave(updateUser);                             //Invokes save() from UserRepository

        //Return successful
        return ok(userService.saveAvatar(principalUser.getName(), body));
    }

}
