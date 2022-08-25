package com.budget.demo.security.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.budget.demo.models.Goals;

public interface GoalsRepository extends JpaRepository<Goals, Long>{


    List<Goals> findByUserId(Long userId);

    Optional<Goals> findByGoals(Integer goals);


}
