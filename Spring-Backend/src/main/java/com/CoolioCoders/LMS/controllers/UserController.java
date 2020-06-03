package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.configuration.JwtTokenProvider;
import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.repositories.UserRepository;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @PutMapping("/{id}")
    public User update(@PathVariable String id, @RequestBody User user) {
        return userService.update(user.getId(), user);
        //TODO: change input to principal to prevent users from updating other users
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

}
