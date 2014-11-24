package com.mangelovski.feedme.demo.web.rest.dto;

import java.util.List;

public class UserDTO {

    private String login;
    
    private String firstName;
    
    private String lastName;
    
    private String email;

    private String userId;

    private List<String> roles;

    private String facebookLogin;

    private String lastKnownPhone;

    private String lastKnownAddress;

    public UserDTO() {
    }

    public UserDTO(String login, String firstName, String lastName, String email,String userId, List<String> roles,
                   String facebookLogin, String lastKnownAddress, String lastKnownPhone) {
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roles = roles;
        this.userId=userId;
        this.facebookLogin=facebookLogin;
        this.lastKnownAddress=lastKnownAddress;
        this.lastKnownPhone=lastKnownPhone;
    }

    public String getLogin() {
        return login;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getUserId() {
        return userId;
    }


    public List<String> getRoles() {
        return roles;
    }

    public String getFacebookLogin() {
        return facebookLogin;
    }

    public String getLastKnownPhone() {
        return lastKnownPhone;
    }

    public String getLastKnownAddress() {
        return lastKnownAddress;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("UserDTO{");
        sb.append("login='").append(login).append('\'');
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", email='").append(email).append('\'');
        sb.append(", userId='").append(userId).append('\'');
        sb.append(", lastKnownAddress='").append(lastKnownAddress).append('\'');
        sb.append(", lastKnownPhone='").append(lastKnownPhone).append('\'');
        sb.append(", facebookLogin='").append(facebookLogin).append('\'');
        sb.append(", roles=").append(roles);
        sb.append('}');
        return sb.toString();
    }
}
