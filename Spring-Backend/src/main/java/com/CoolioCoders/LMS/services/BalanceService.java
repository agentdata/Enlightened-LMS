package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.models.Balance;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.repositories.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceService {

    @Autowired
    private BalanceRepository balanceRepository;

    public void saveBalance(Balance balance) {
        balanceRepository.save(balance);
    }
    public List<Balance> getBalance(User user){return balanceRepository.findByUser(user);}
}