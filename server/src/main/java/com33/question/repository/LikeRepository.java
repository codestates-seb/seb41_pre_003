package com33.question.repository;

import com33.member.entity.Member;
import com33.question.entity.Like;
import com33.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query(value = "SELECT l FROM Like l WHERE l.question = :question and l.member = :member")
    Optional<Like> findLikeByQuestionAndMember(Question question, Member member);
    List<Like> findAllByQuestionQuestionId(Long quesionId);

}
