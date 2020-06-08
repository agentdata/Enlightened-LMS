package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.Role;
import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.models.UserProfile;
import com.CoolioCoders.LMS.repositories.RoleRepository;
import com.CoolioCoders.LMS.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Service
public class LMSUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(String id) {
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User update(String id, User updatedUser) {
        Optional<User> foundUser = userRepository.findById(id);
        if(updatedUser.getFirstName() != null)
            foundUser.get().setFirstName(updatedUser.getFirstName());

        if(updatedUser.getLastName() != null)
            foundUser.get().setLastName(updatedUser.getLastName());

        if(updatedUser.getBirthDate() != null)
            foundUser.get().setBirthDate(updatedUser.getBirthDate());

        if(updatedUser.getEmail() != null) //TODO: check new email for uniqueness
            foundUser.get().setEmail(updatedUser.getEmail());

        if(updatedUser.getPassword() != null)
            foundUser.get().setPassword(updatedUser.getPassword());

        if(updatedUser.getBio() != null)
            foundUser.get().setBio(updatedUser.getBio());
        
        if(updatedUser.getLink1() != null)
            foundUser.get().setLink1(updatedUser.getLink1());

        if(updatedUser.getLink2() != null)
            foundUser.get().setLink2(updatedUser.getLink2());

        if(updatedUser.getAvatar() != null)
            foundUser.get().setAvatar(updatedUser.getAvatar());

        if(updatedUser.getPhone() != null)
            foundUser.get().setPhone(updatedUser.getPhone());

        if(updatedUser.getAddress1() != null)
            foundUser.get().setAddress1(updatedUser.getAddress1());

        if(updatedUser.getAddress2() != null)
            foundUser.get().setAddress2(updatedUser.getAddress2());

        if(updatedUser.getCity() != null)
            foundUser.get().setCity(updatedUser.getCity());

        if(updatedUser.getState() != null)
            foundUser.get().setState(updatedUser.getState());

        if(updatedUser.getZip() != null)
            foundUser.get().setZip(updatedUser.getZip());

        // We'll save the found user back into the db to ensure
        // that the id & role cannot be changed
        return userRepository.save(foundUser.get());
    }

    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    public UserProfile findUserProfileByEmail(String email){
        User user = userRepository.findByEmail(email);
        return new UserProfile(user);
    }

    public void saveUser(User user, Role role) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByRole(role.getRole());
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);
        if(user != null) {
            List<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
            return buildUserForAuthentication(user, authorities);
        }
        else {
            throw new UsernameNotFoundException("username not found");
        }
    }

    private List<GrantedAuthority> getUserAuthority(Set<Role> userRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        userRoles.forEach((role) -> {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        });

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
        return grantedAuthorities;
    }

    private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), authorities);
    }
}
