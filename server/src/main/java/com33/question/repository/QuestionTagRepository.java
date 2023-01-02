package com33.question.repository;

import com33.question.entity.Question;
import com33.question.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {

    List<QuestionTag> findAllByTagTagId(@Param("tagId") Long tagId);
    List<QuestionTag> findAllByQuestionQuestionId(@Param("questionId") Long questionId);


}