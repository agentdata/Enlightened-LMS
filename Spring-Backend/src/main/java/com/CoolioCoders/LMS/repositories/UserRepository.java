package com.CoolioCoders.LMS.repositories;

import com.CoolioCoders.LMS.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);     // Spring will implement behind the scenes based on method signature
}
