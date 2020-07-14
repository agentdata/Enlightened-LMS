package com.CoolioCoders.LMS.repositoryTests;

import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.repositories.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class UserRepositoryTests {
//
//    @Autowired
//    private UserRepository userRepository;
//    private static User testUser;
//
//    @BeforeEach
//    public void init() {
//        // setup data for testing
//        testUser = new User();
//        testUser.setFirstName("John");
//        testUser.setLastName("Doe");
//        testUser.setAddress1("123 Fake St");
//        testUser.setAddress2("Apt 2");
//        testUser.setCity("Salt Lake City");
//        testUser.setState("Utah");
//        testUser.setBio("Hello I am John");
//        testUser.setBirthDate(LocalDate.of(1985, 1,2));
//        testUser.setEmail("john.doe@example.com");
//        testUser.setAvatar("myImageBase64");
//    }
//
//        @AfterEach
//        public void tearDown(){
//            userRepository.delete(testUser);
//        }
//
//        @Test
//        public void findByEmailTest(){
//            //TODO - finish writing tests
//            userRepository.save(testUser);
//            String userEmail = "john.doe@example.com";
//            User user = userRepository.findByEmail(userEmail);
//            assertTrue(user.getEmail().equals(userEmail));
//    }
}