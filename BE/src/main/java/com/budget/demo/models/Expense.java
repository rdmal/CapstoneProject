package com.budget.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    @Column(name = "category")

    private String category;

    @Column(name = "expensePrice")

    private double expensePrice;

    @Column(name = "notes")

    private String notes;

    @Column(name = "monthlyIncome")
    private String monthlyIncome;
    @ManyToOne( fetch = FetchType.LAZY , optional = false )
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public Expense() {

    }

    public Expense(String category, double expensePrice, String notes, String monthlyIncome) {
        this.category = category;
        this.expensePrice = expensePrice;
        this.notes = notes;
        this.monthlyIncome = monthlyIncome;
    }

    // public Expense(long id, String category, double expensePrice, String notes) {
    //     this.id = id;
    //     this.category = category;
    //     this.expensePrice = expensePrice;
    //     this.notes = notes;
    // }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getExpensePrice() {
        return expensePrice;
    }

    public void setExpensePrice(double expensePrice) {
        this.expensePrice = expensePrice;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(String monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }
}
