package com.budget.demo.controller;

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

@RestController
@RequestMapping("/api/expenses")

public class ExpenseController {
        @Autowired
        private ExpenseRepository expenseRepository;
       @Autowired
       private UserRepository userRepository;

        @GetMapping("/")
        public List<Expense> getAllExpenses() {
            return expenseRepository.findAll();
        }

        @PostMapping("/")
         public Expense createExpense(@RequestBody Expense expense) {
             return expenseRepository.save(expense);
         }

        @GetMapping("/{userId}/expensesByUser")
        public ResponseEntity<List<Expense>> getAllExpensesByUser(@PathVariable(value = "userId") Long userId) {
            if ( !userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("Not found User with id " + userId);
            }
            List<Expense> expense = expenseRepository.findByUserId(userId);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        }



       @PostMapping("/{userId}/create")
       public ResponseEntity<Expense> createExpense(@PathVariable(value = "userId") Long userId,
       @RequestBody Expense expenseRequest) {
           Expense expense = userRepository.findById(userId).map(user -> {
               expenseRequest.setUser(user) ;
               return expenseRepository.save(expenseRequest);
           }).orElseThrow(() -> new ResourceNotFoundException("Expense does not exist with user id: " + userId));
           return new ResponseEntity<>(expense, HttpStatus.CREATED);
       }



        @GetMapping("/{id}")
        public ResponseEntity<Expense> getUserById(@PathVariable long id) {
            Expense expense = expenseRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Expense does not exist with id: " + id));
            return ResponseEntity.ok(expense);
        }

        @PutMapping("/{id}/update")
        public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
            Expense expense = expenseRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Expense does not exist with id: " + id));
            expense.setCategory(expenseDetails.getCategory());
            expense.setExpensePrice(expenseDetails.getExpensePrice());
            expense.setNotes(expenseDetails.getNotes());
           expense.setMonthlyIncome(expenseDetails.getMonthlyIncome());

            Expense updatedExpense = expenseRepository.save(expense);
            return ResponseEntity.ok(updatedExpense);
        }

        @DeleteMapping("/{id}/delete")
        public ResponseEntity<Map<String, Boolean>> deleteExpense(@PathVariable Long id) {
            Expense expense = expenseRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Expense does not exist with id: " + id));
            expenseRepository.delete(expense);
            Map<String, Boolean> response = new HashMap<>();
            response.put("delete", Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
}
