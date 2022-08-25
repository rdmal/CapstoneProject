package com.budget.demo.security.repository;

import com.budget.demo.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByCategory(String category);

    Boolean existsByCategory(String category);

    Boolean existsByExpensePrice(int expensePrice);

    Boolean existsByNotes(String notes);

    Boolean existsByMonthlyIncome(String monthlyIncome);

    List<Expense> findByUserId(Long userId);

}
