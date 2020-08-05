package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.*;
import com.CoolioCoders.LMS.repositories.RoleRepository;
import com.CoolioCoders.LMS.repositories.UserRepository;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.http.ResponseEntity.ok;

@Service
public class LMSUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private CourseService courseService;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(String id) { return userRepository.findById(id).orElseThrow(EntityNotFoundException::new); }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User update(String email, User updatedUser) {
        User foundUser = userRepository.findByEmail(email);
        if(updatedUser.getFirstName() != null)
            foundUser.setFirstName(updatedUser.getFirstName());

        if(updatedUser.getLastName() != null)
            foundUser.setLastName(updatedUser.getLastName());

        if(updatedUser.getBirthDate() != null)
            foundUser.setBirthDate(updatedUser.getBirthDate());

        if(updatedUser.getEmail() != null) //TODO: check new email for uniqueness
            foundUser.setEmail(updatedUser.getEmail());

        if(updatedUser.getPassword() != null)
            foundUser.setPassword(updatedUser.getPassword());

        if(updatedUser.getBio() != null)
            foundUser.setBio(updatedUser.getBio());
        
        if(updatedUser.getLink1() != null)
            foundUser.setLink1(updatedUser.getLink1());

        if(updatedUser.getLink2() != null)
            foundUser.setLink2(updatedUser.getLink2());

        if(updatedUser.getAvatar() != null)
            foundUser.setAvatar(updatedUser.getAvatar());

        if(updatedUser.getPhone() != null)
            foundUser.setPhone(updatedUser.getPhone());

        if(updatedUser.getAddress1() != null)
            foundUser.setAddress1(updatedUser.getAddress1());

        if(updatedUser.getAddress2() != null)
            foundUser.setAddress2(updatedUser.getAddress2());

        if(updatedUser.getCity() != null)
            foundUser.setCity(updatedUser.getCity());

        if(updatedUser.getState() != null)
            foundUser.setState(updatedUser.getState());

        if(updatedUser.getZip() != null)
            foundUser.setZip(updatedUser.getZip());

        // We'll save the found user back into the db to ensure
        // that the id & role cannot be changed
        return userRepository.save(foundUser);
    }

    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    public int getCreditHours(User user){
        int credits = 0;
        for(String courseId: user.getCourseIds()){
            credits += courseService.findById(courseId).getCredits();
        }
        return credits;
    }

    public UserProfile findUserProfileByEmail(String email){
        User user = userRepository.findByEmail(email);
        return new UserProfile(user);
    }

    public Map<Object, Object> saveAvatar(String email, JSONObject body)
    {
        User currentUser = findUserByEmail(email);
        currentUser.setAvatar(body.get("avatar").toString());

        userRepository.save(currentUser);

        Map<Object, Object> model = new HashMap<>();
        model.put("message", "Avatar saved successfully");
        return model;
    }

    public List<Notification> getNewUserNotifications(User user)
    {
        List<Notification> notifications = user.getNotifications();
        List<Notification> newNotifications = new ArrayList<>();

        for(Notification notification : notifications) {
            if(!notification.isCleared()){
                newNotifications.add(notification);
            }
        }

        return newNotifications;
    }

    public Notification generateNotification(String userId, String courseId, String title){
        User user = findById(userId);
        Course course = courseService.findById(courseId);

        Notification notification = new Notification();
        notification.setId(UUID.randomUUID().toString());
        notification.setTitle(title);
        notification.setCourseId(course.getId());
        notification.setCourseName(course.getCourseName());
        notification.setTimestamp(LocalDateTime.now());
        notification.setLink("http://cooliocoders.ddns.net/course/" + courseId + "/course-assignments");
        notification.setCleared(false);

        List<Notification> notificationList = user.getNotifications();
        notificationList.add(notification);
        user.setNotifications(notificationList);
        userRepository.save(user);
        return notification;
    }

    public Notification clearNotification(String notificationId, User user)
    {
        List<Notification> notificationList = user.getNotifications();
        Notification updatedNotification = null;

        for(Notification notification : notificationList){
            if(notification.getId().equals(notificationId)){
                updatedNotification = notificationList.remove(notificationList.indexOf(notification));
                break;
            }
        }

        if(updatedNotification != null) {
            updatedNotification.setCleared(true);

            notificationList.add(updatedNotification);
            user.setNotifications(notificationList);
            userRepository.save(user);
        }
        return updatedNotification;
    }

    public Map<Object, Object> userToJSONResponse(User user){
        return userToJSONResponse(user, true);
    }

    protected Map<Object, Object> userToJSONResponse(User user, Boolean includeCourseList){
        Map<Object, Object> body = new LinkedHashMap<>();
        body.put("id", user.getId());
        body.put("firstName", user.getFirstName());
        body.put("lastName", user.getLastName());
        body.put("email", user.getEmail());
        Role[] rolesArray = {};
        body.put("role", user.getRoles().toArray(rolesArray)[0].getRole());

        if(includeCourseList) {
            List<Object> courseStrings = new ArrayList<>();
            user.getCourseIds().forEach(
                (courseId) -> {
                    courseStrings.add(courseService.courseToJSONResponse(courseService.findById(courseId), false));
                });
            body.put("courses", courseStrings);
        }
        return body;
    }

    public boolean updateCurrentBalance(User user, int creditHours){
        //credithours multiplied by 300$ per credit hour
        user.updateCurrentAccountBalance(creditHours*300);
        userRepository.save(user);
        return true;
    }

    public double getCurrentBalance(User student){
        return student.getCurentAccountBalance();
    }

    public boolean saveProcessedPayment(User student, String stripeIntentId, double paymentAmount){
        student.addPayment(stripeIntentId, paymentAmount);
        userRepository.save(student);
        return true;
    }

    //region User Details Service Methods for Security Configuration
    //------------------------------------------------------------------------------------------------------------------
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
    //------------------------------------------------------------------------------------------------------------------
    //endregion
}
