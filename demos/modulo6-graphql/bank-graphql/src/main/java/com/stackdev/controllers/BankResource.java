package com.stackdev.controllers;

import com.stackdev.models.Account;
import com.stackdev.models.Bank;
import com.stackdev.models.Branch;
import com.stackdev.models.Client;
import com.stackdev.services.BankService;
import org.eclipse.microprofile.graphql.*;

import java.util.List;

@GraphQLApi
public class BankResource {

    BankService bankService;

    public BankResource(BankService bankService) {
        this.bankService = bankService;
    }

    @Query("allAccounts")
    @Description("Get all accounts")
    public List<Account> getAllAccounts() {
        return bankService.listAccounts();
    }

    @Query("account")
    @Description("Getting an account by primary key id")
    public Account getAccountById(@Name("accountId") int id) {
        return bankService.getAccountById(id);
    }
    @Query("branch")
    @Description("Getting a branch by primary key id")
    public Branch getBranchById(@Name("branchId") int id) {
        return bankService.getBranchById(id);
    }

    @Query("banksByBranch")
    @Description("Getting banks by Branch")
    public List<Bank> getBanksByBranchLocation(@Source Branch branch) {
        return bankService.getBanksByBranch(branch);
    }


    @Mutation
    public Client createClient(Client client) {
        return bankService.createClient(client);
    }

    @Mutation
    public List<Account> deleteAccount(int id) {
        return bankService.deleteAccount(id);
    }

    @Mutation
    public Account updateAccount(Account account, @Name("accountId") int id) {
        return bankService.updateAccount(account, id);
    }

}
