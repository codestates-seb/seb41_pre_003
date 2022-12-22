package com33.answer.service;

import com33.answer.entity.Answer;
import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.answer.repository.AnswerRepository;
import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.entity.Question;
import com33.question.service.QuestionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final MemberService memberService;

    public AnswerService(AnswerRepository answerRepository, QuestionService questionService, MemberService memberService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
        this.memberService = memberService;
    }

    public Answer creatAnswer(Answer answer,long questionId, long memberId){
        Member member = memberService.findVerifiedMember(memberId);
        Question question = questionService.findVerifiedQuestion(questionId);
        answer.setMember(member);
        answer.setQuestion(question);
        member.addAnswer(answer);
        question.addAnswer(answer);

        return answerRepository.save(answer);
    }
    public Answer findAnswer(long answer_Id) {
        return findVerifiedAnswerByQuery(answer_Id);
    }
    public Answer updateAnswer(Answer answer,long questionId, long memberId) {
        if (memberId != findVerifiedAnswer(answer.getAnswer_id()).getMember().getMember_id() &&
            questionId != findVerifiedAnswer(answer.getAnswer_id()).getQuestion().getQuestion_id()){
            throw new RuntimeException();
        }

        Answer findAnswer = findVerifiedAnswer(answer.getAnswer_id());
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


    private Answer findVerifiedAnswerByQuery(long answer_Id) {
        Optional<Answer> optionalAnswer = answerRepository.findByAnswer_id(answer_Id);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;

    }

    public List<Answer> findAnswers(){
        return answerRepository.findAll();
    }
}
