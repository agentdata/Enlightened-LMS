package com.CoolioCoders.LMS.startup;

import com.CoolioCoders.LMS.models.Role;
import com.CoolioCoders.LMS.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        loadUserRoles();
    }

    private void loadUserRoles() {
        // Loads the roles in the DB if they don't exist
        String[] roleStrings = { "ADMIN", "STUDENT", "INSTRUCTOR" };
        for(String roleName : roleStrings){
            if(roleRepository.findByRole(roleName) == null){
                Role newRole = new Role();
                newRole.setRole(roleName);
                roleRepository.save(newRole);
            }
        }
    }
}
