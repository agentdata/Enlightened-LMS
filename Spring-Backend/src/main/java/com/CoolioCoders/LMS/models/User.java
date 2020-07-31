package com.CoolioCoders.LMS.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.*;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    @Indexed(unique = true, direction = IndexDirection.DESCENDING)
    private String email;
    private String password;
    private String bio;
    private String link1;
    private String link2;
    private String link3;
    private String avatar;
    private String phone;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zip;
    @DBRef
    private Set<Role> roles;
    private Set<String> courseIds;
    private List<Notification> notifications;
    private double currentAccountBalance;
    private ArrayList<Map<Object, Object>> paymentsMade;

    public User(){}

    public User(String id, String firstName, String lastName, String email){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public User(String firstName, String lastName, LocalDate birthDate, String email, String password, String bio,
                String link1, String link2, String link3, String avatar, String phone, String address1, String address2,
                String city, String state, String zip, Set<Role> roles, List<Notification> notifications, double currentAccountBalance,
                ArrayList<Map<Object, Object>> paymentsMade) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.link1 = link1;
        this.link2 = link2;
        this.link3 = link3;
        this.avatar = avatar;
        this.phone = phone;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.roles = roles;
        this.notifications = notifications;
        this.currentAccountBalance = currentAccountBalance;
        this.paymentsMade = paymentsMade;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    // link getters / setters
    public String getLink1() {
        return link1;
    }

    public void setLink1(String link1) {
        this.link1 = link1;
    }

    public String getLink2() {
        return link2;
    }

    public void setLink2(String link2) {
        this.link2 = link2;
    }

    public String getLink3() {
        return link3;
    }

    public void setLink3(String link3) {
        this.link3 = link3;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // address lines getters/setters
    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    // city, state, zip getters/setters
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Set<Role> getRoles() { return roles; }
    public String getRole(){
        Role[] rolesArray = {};
        return this.getRoles().toArray(rolesArray)[0].getRole();
    }

    public void setRoles(Set<Role> roles) { this.roles = roles; }

    public void setCourseIds(Set<String> courseIds) {
        this.courseIds = courseIds;
    }

    public Set<String> getCourseIds() {
        if(courseIds == null){
            return new HashSet<>();
        }
        return courseIds;
    }

    public void setNotifications(List<Notification> notifications){this.notifications = notifications;}

    public List<Notification> getNotifications(){
        if(notifications == null){
            return new ArrayList<>();
        }
        return notifications;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User)o;
        return getId().equals(user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    public double getCurentAccountBalance() {
        return currentAccountBalance;
    }

    public void setCurrentAccountBalance(double currentAccountBalance){
        this.currentAccountBalance = currentAccountBalance;
    }

    public void updateCurrentAccountBalance(double currentAccountBalance) {
        this.currentAccountBalance += currentAccountBalance;
    }

    public void setPaymentsMade(ArrayList<Map<Object, Object>> paymentsMade) {
        this.paymentsMade= paymentsMade;
    }

    public List<Map<Object, Object>> getPaymentsMade(){
        return this.paymentsMade;
    }

    public void addPayment(String intentId, double total){
        Map<Object, Object> payment = new HashMap<>();
        payment.put(intentId, total);
        if(paymentsMade == null){
            paymentsMade = new ArrayList<Map<Object, Object>>();
        }
        this.paymentsMade.add(payment);
        this.currentAccountBalance -= total;
    }
}