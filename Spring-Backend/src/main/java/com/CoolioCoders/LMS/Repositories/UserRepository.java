package com.CoolioCoders.LMS.Repositories;

import com.CoolioCoders.LMS.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
