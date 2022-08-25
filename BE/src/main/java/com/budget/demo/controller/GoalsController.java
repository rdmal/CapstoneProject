package com.budget.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.budget.demo.exception.ResourceNotFoundException;
import com.budget.demo.models.Expense;
import com.budget.demo.security.repository.ExpenseRepository;
import com.budget.demo.security.repository.UserRepository;

import com.budget.demo.models.Goals;
import com.budget.demo.security.repository.GoalsRepository;
import com.budget.demo.security.repository.UserRepository;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")

public class GoalsController {
    @Autowired
    private GoalsRepository goalsRepository;
    @Autowired 
    private UserRepository userRepository;

    @GetMapping("/goal")
    public List<Goals> getGoals() {
        return goalsRepository.findAll();
    }

    @GetMapping("/{userId}/goalsByUser")
    public ResponseEntity<List<Goals>> getGoalsByUser(@PathVariable(value = "userId") Long userId) {
        if ( !userRepository.existsById(userId)){
            throw new ResourceNotFoundException("Not found user with id " + userId);
        }
        List<Goals> goals = goalsRepository.findByUserId(userId);
        return new ResponseEntity<>(goals, HttpStatus.OK);
    }

    @PostMapping("/{userId}/create")
       public ResponseEntity<Goals> createGoals(@PathVariable(value = "userId") Long userId,
       @RequestBody Goals goalsRequest) {
           Goals goals = userRepository.findById(userId).map(user -> {
               goalsRequest.setUser(user) ;
               return goalsRepository.save(goalsRequest);
           }).orElseThrow(() -> new ResourceNotFoundException("Goal does not exist with user id: " + userId));
           return new ResponseEntity<>(goals, HttpStatus.CREATED);
       }

       @PutMapping("/{id}/update")
       public ResponseEntity<Goals> updateGoals(@PathVariable Long id, @RequestBody Goals goalsDetails) {
           Goals goals = goalsRepository.findById(id)
                   .orElseThrow(() -> new ResourceNotFoundException("Goal does not exist with id: " + id));
           goals.setGoals(goalsDetails.getGoals());
           goals.setPrice(goalsDetails.getPrice());

            Goals updateGoals = goalsRepository.save(goals);
           return ResponseEntity.ok(updateGoals);
       }

       @DeleteMapping("/{id}/delete")
       public ResponseEntity<Map<String, Boolean>> deleteEntity(@PathVariable Long id) {
        Goals goals = goalsRepository.findById(id)
                   .orElseThrow(() -> new ResourceNotFoundException("Goals does not exist with id: " + id));
                   goalsRepository.delete(goals);
           Map<String, Boolean> response = new HashMap<>();
           response.put("delete", Boolean.TRUE);
           return ResponseEntity.ok(response);
       }

    @GetMapping("/{id}")
    public ResponseEntity<Goals> getGoalById(@PathVariable long id) {
        Goals goals = goalsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal does not exist with id: " + id));
        return ResponseEntity.ok(goals);
    }


}
