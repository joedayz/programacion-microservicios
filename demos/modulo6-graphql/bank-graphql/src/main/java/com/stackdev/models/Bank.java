package com.stackdev.models;

import java.util.List;

public class Bank {

    private String name;
    private String bankCode;
    private Branch branch;
    private List<Account> accounts;

    public Bank(){}

    public Bank(String name, String bankCode, Branch branch) {
        this.name = name;
        this.bankCode = bankCode;
        this.branch = branch;

    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {}

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
}
