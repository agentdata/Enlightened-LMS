package com.CoolioCoders.LMS.repositories;

import com.CoolioCoders.LMS.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Role findByRole(String role);
}
