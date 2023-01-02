package com33.answer.repository;

import com33.answer.entity.Answer;
import com33.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findAllByQuestion(Question question);
}
