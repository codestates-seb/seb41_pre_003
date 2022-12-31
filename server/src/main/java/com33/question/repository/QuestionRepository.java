package com33.question.repository;


import com33.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(value = "SELECT c FROM Question c WHERE c.questionId = :questionId")
    Optional<Question> findByQuestionId(Long questionId);

    Optional<List<Question>> findByTitleContaining(String keyword);
    Optional<List<Question>> findByContentContaining(String keyword);
    Optional<List<Question>> findByMemberMemberId(@Param(value = "memberId") Long memberId);

    List<Question> findByTitle(String Title);


}
