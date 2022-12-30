package com33.question.service;

import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.entity.Question;
import com33.question.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    public Question createQuestion(Question question) {
//        Member member = memberService.findVerifiedMember(question.getMember().getMemberId());
        Member member = memberService.getLoginMember();
        question.setMember(member);
        question.setViewCount(0);
        question.setLikeCount(0);
        member.addQuestion(question);

        return questionRepository.save(question);
    }

    public Question findQuestion(long question_Id) {
        Question question = findVerifiedQuestionByQuery(question_Id);
        question.setViewCount(question.getViewCount()+1);
        questionRepository.save(question);
        return question;
    }

    public Question updateQuestion(Question question) {

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
        findQuestion.setModifiedAt(LocalDateTime.now());
        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        return questionRepository.save(findQuestion);

    }

//    public Page<Question> findQuestions(int page, int size) {
//        return questionRepository.findAll(PageRequest.of(page, size,
//                Sort.by("question_Id").descending()));
//    }

    public void deleteQuestion(long questionId) {
        Question question = findVerifiedQuestion(questionId);
        questionRepository.delete(question);
    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;
    }


    private Question findVerifiedQuestionByQuery(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findByQuestionId(questionId);
        Question findQuestion =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;

    }

    public List<Question> findQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> searchQuestion(String type, String keyword) {
        switch (type) {
            case "1": {
                Optional<List<Question>> optionalQuestions = questionRepository.findByTitleContaining(keyword);
                return optionalQuestions.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
            }
            case "2": {
                Optional<List<Question>> optionalQuestions = questionRepository.findByContentContaining(keyword);
                return optionalQuestions.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
            }
            case "3": {
                Optional<List<Question>> optionalQuestions = questionRepository.findByMemberMemberId(memberService.findName(keyword).get(0).getMemberId());
                return optionalQuestions.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
            }
        }

        return null;
    }

}