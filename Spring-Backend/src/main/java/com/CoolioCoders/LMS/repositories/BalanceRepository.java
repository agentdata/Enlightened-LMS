package com.CoolioCoders.LMS.repositories;

import com.CoolioCoders.LMS.models.Balance;
import com.CoolioCoders.LMS.models.Course;
import com.CoolioCoders.LMS.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BalanceRepository extends MongoRepository<Balance, String> {
    List<Balance> findByUser(User user);
}
