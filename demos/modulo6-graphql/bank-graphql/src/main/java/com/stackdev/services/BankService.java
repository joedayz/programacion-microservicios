package com.stackdev.services;

import com.stackdev.models.Account;
import com.stackdev.models.Bank;
import com.stackdev.models.Branch;
import com.stackdev.models.Client;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class BankService {

    private final List<Bank> banks = new ArrayList<>();
    private final List<Client> clients = new ArrayList<>();
    private final List<Account> accounts = new ArrayList<>();
    private final List<Branch> branches = new ArrayList<>();

    public BankService() {
        // Initialize accounts
        accounts.add(new Account(
                "Daniel Matthew",
                "12345",
                new Client("Daniel", "Matthews", "324232", 23),
                2000.00
        ));
        accounts.add(new Account(
                "Fred Lama",
                "123456",
                new Client("Fred", "Lama", "656456", 23),
                2000.00
        ));

        // Initialize branches
        Branch branch = new Branch("NEW DELI", "0001");
        Branch branch2 = new Branch("NEW DELI2", "0002");
        branches.add(branch);
        branches.add(branch2);

        // Initialize banks
        banks.add(new Bank("ABC Bank", "B342346666", branch));
        banks.add(new Bank("ZBD Bank", "0980000000", branch));
    }

    public List<Bank> listBanks() {
        return banks;
    }

    public Client createClient(Client client) {
        clients.add(client);
        return client;
    }

    public Account createAccount(Account account) {
        accounts.add(account);
        return account;
    }

    public List<Account> listAccounts() {
        return accounts;
    }

    public Account getAccountById(int id){
        return accounts.get(id);
    }

    public Bank createBank(Bank bank) {
        banks.add(bank);
        return bank;
    }

    public Branch getBranchById(int id){
        return branches.get(id);
    }
    public List<Bank> getBanksByBranch(Branch branch) {
        return banks.stream()
                .filter(bank -> bank.getBranch().getCode() != null &&
                        bank.getBranch().getCode().contains(branch.getCode()))
                .collect(Collectors.toList());
    }

    public List<Account> deleteAccount(int id) {
        accounts.remove(id);
        return accounts;
    }

    public Account updateAccount(Account account, int id) {
        Account existing = accounts.get(id);
        existing.setAccountNumber(account.getAccountNumber());
        existing.setName(account.getName());
        return existing;
    }

}
