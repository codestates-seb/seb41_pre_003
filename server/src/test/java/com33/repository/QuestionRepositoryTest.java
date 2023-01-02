//package com33.slice.repository;
//
//import com33.member.entity.Member;
//import com33.question.entity.Question;
//import com33.question.repository.QuestionRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//
//import java.util.List;
//import java.util.Optional;
//
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class QuestionRepositoryTest {
//
//    @Autowired
//    private QuestionRepository questionRepository;
//
//    @Test
//    void findByQuestionId() {
//        Member member = new Member(1L,"1234", "김코딩", "M", 20,"kimcoding@gmail.com");
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setMember(member);
//        question.setTitle("title");
//        question.setContent("content");
//
//        questionRepository.save(question);
//
//        Optional<Question> findQuestion = questionRepository.findByQuestionId(question.getQuestionId());
//
//        // then
//        assertTrue(findQuestion.isPresent());
//        assertTrue(findQuestion.get().getQuestionId().equals(question.getQuestionId()));
//    }
//
//    @Test
//    void findByMemberMemberId() {
//        Member member = new Member(1L,"1234", "김코딩", "M", 20,"kimcoding@gmail.com");
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setMember(member);
//        question.setTitle("title");
//        question.setContent("content");
//
//        questionRepository.save(question);
//        List<Question> questions = questionRepository.findAll();
//
//        Optional<List<Question>> findMemberId = questionRepository.findByMemberMemberId(question.getMember().getMemberId());
//
//    }
//}