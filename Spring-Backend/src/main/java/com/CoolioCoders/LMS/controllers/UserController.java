package com.CoolioCoders.LMS.controllers;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @GetMapping("/{email}")
    public User findByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable String id, @RequestBody User user) {
        Optional<User> foundUser = userRepository.findById(id);
        if(user.getFirstName() != null)
            foundUser.get().setFirstName(user.getFirstName());

        if(user.getLastName() != null)
            foundUser.get().setLastName(user.getLastName());

        if(user.getBirthDate() != null)
            foundUser.get().setBirthDate(user.getBirthDate());

        if(user.getEmail() != null)
            foundUser.get().setEmail(user.getEmail());

        if(user.getPassword() != null)
            foundUser.get().setPassword(user.getPassword());

        if(user.getFirstName() != null)
            foundUser.get().setFirstName(user.getFirstName());

        // We'll save the found user back into the db to ensure
        // that the id & role cannot be changed
        return userRepository.save(foundUser.get());
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        userRepository.deleteById(id);
    }

}
