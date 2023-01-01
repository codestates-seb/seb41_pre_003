//package com33.slice.repository;
//
//import com33.answer.entity.Answer;
//import com33.answer.repository.AnswerRepository;
//import com33.member.entity.Member;
//import com33.member.repository.MemberRepository;
//import com33.question.entity.Question;
//import com33.question.repository.QuestionRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.util.List;
//
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class AnswerRepositoryTest {
//
//    @Autowired
//    private AnswerRepository answerRepository;
//
//    @Autowired
//    private QuestionRepository questionRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Test
//    void findAllByQuestion() {
//
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setTitle("제목이다");
//        question.setContent("내용이다");
//
//        Member member = new Member(1L,"1234", "김코딩", "M", 20,"kimcoding@gmail.com");
//
//        Answer answer = new Answer();
//        answer.setAnswerId(1L);
//        answer.setContent("content");
//        answer.setQuestion(question);
//
//
//        question.setMember(member);
//        answer.setQuestion(question);
//
//        memberRepository.save(member);
//        questionRepository.save(question);
//        answerRepository.save(answer);
//
//        List<Answer> findAnswers = answerRepository.findAllByQuestion(question);
//
//
//        assertNotNull(findAnswers);
//    }
//}