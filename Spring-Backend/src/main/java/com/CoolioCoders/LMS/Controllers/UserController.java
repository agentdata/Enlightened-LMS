package com.CoolioCoders.LMS.Controllers;

import com.CoolioCoders.LMS.Models.User;
import com.CoolioCoders.LMS.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")    // We can secure our endpoints by restricting access to URL "/api/**"
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping
    public User findById(@PathVariable String id) {
        return userService.findById(id);
    }

    @GetMapping
    public User findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public User update(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        userService.deleteById(id);
    }

}
