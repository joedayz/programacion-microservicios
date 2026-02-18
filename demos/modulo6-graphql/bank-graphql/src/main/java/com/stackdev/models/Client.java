package com.stackdev.models;

import java.time.LocalDateTime;

public class Client {

    private String firstName;
    private String lastName;
    private String idNumber;
    private Integer age;
    private LocalDateTime created;

    public Client(){}
    public Client(String firstName, String lastName, String idNumber, Integer age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.age = age;
        this.created = LocalDateTime.now();
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

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
}
