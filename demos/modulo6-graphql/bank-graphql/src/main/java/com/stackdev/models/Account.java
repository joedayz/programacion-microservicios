package com.stackdev.models;

public class Account {

    private String name;
    private String accountNumber;
    private Client client;
    private Double balance;


    public Account(){}

    public Account(String name, String accountNumber, Client client, Double balance) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.client = client;
        this.balance = balance;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}
