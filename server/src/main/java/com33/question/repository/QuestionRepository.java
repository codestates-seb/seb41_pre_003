package com33.question.repository;


import com33.member.entity.Member;
import com33.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(value = "SELECT c FROM Question c WHERE c.question_id = :question_id")
    Optional<Question> findByQuestion_id(Long question_id);

    Optional<List<Question>> findByTitleContaining(String keyword);


}
