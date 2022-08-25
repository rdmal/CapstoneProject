package com.budget.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity 
@Table(name = "goals")
public class Goals {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    @Column(name = "goals")

    private String goals;

    @Column(name = "price")

    private double price;

    @Column(name = "comment")

    private String comment;

    @ManyToOne( fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public Goals() {
    }



    public Goals(long id, String goals, double price, String comment) {
        this.id = id;
        this.goals = goals;
        this.price = price;
        this.comment = comment;
    }

    public Goals(String goals, double price, String comment) {
        this.goals = goals;
        this.price = price;
        this.comment = comment;
    }

    public void Goal(String goals, String comment){
        this.goals = goals;
        this.comment = comment;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

}
