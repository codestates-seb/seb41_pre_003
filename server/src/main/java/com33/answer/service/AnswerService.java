package com33.answer.service;

import com33.answer.entity.Answer;
import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.answer.repository.AnswerRepository;
import com33.member.entity.Member;
import com33.member.repository.MemberRepository;
import com33.member.service.MemberService;
import com33.question.entity.Question;
import com33.question.repository.QuestionRepository;
import com33.question.service.QuestionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final QuestionService questionService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, QuestionService questionService, MemberService memberService,
                         MemberRepository memberRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.questionService = questionService;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    public Answer creatAnswer(Answer answer) {
        Question question = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());
//      Member member = memberService.findVerifiedMember(answer.getMember().getMemberId());
        Member member = memberService.getLoginMember();
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LONGIN);
        } else {

            answer.setQuestion(question);
            answer.setMember(member);

            question.addAnswer(answer);
            member.addAnswer(answer);


            return answerRepository.save(answer);
        }
    }
    public Answer findAnswer(long answer_Id) {
        return findVerifiedAnswer(answer_Id);
    }
    public Answer updateAnswer(Answer answer) {

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        findAnswer.setModifiedAt(LocalDateTime.now());
        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));
        return answerRepository.save(findAnswer);


    }

//    public Page<Answer> findAnswers(int page, int size) {
//        return answerRepository.findAll(PageRequest.of(page, size,
//                Sort.by("answer_Id").descending()));
//    }

    public void deleteAnswer(long answerId) {
        Answer answer = findVerifiedAnswer(answerId);
        answerRepository.delete(answer);
    }

    public Answer findVerifiedAnswer(long answer_Id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answer_Id);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }


    public void verifyExistsQuestionIdAndUserId(Answer answer) {
        questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());
        memberService.findVerifiedMember(answer.getMember().getMemberId());
    }

    public List<Answer> findAnswers(Long questionId){

        Optional<Question> question = questionRepository.findByQuestionId(questionId);
        return answerRepository.findAllByQuestion(question.get());
    }
}
