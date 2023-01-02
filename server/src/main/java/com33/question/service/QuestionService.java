package com33.question.service;

import com33.answer.repository.AnswerRepository;
import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.member.entity.Member;
import com33.member.repository.MemberRepository;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import com33.question.entity.QuestionTag;
import com33.question.repository.LikeRepository;
import com33.question.repository.QuestionRepository;
import com33.question.repository.QuestionTagRepository;
import com33.tag.entity.Tag;
import com33.tag.repository.TagRepository;
import com33.tag.service.TagService;
import org.springframework.data.jpa.repository.support.QuerydslJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final QuestionTagRepository questionTagRepository;
    private final TagRepository tagRepository;
    private final MemberRepository memberRepository;
    private final AnswerRepository answerRepository;
    private final LikeRepository likeRepository;


    public QuestionService(QuestionRepository questionRepository, MemberService memberService, TagService tagService, QuestionTagRepository questionTagRepository,
                           TagRepository tagRepository,
                           MemberRepository memberRepository,
                           AnswerRepository answerRepository,
                           LikeRepository likeRepository) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.questionTagRepository = questionTagRepository;
        this.tagRepository = tagRepository;
        this.memberRepository = memberRepository;

        this.answerRepository = answerRepository;
        this.likeRepository = likeRepository;
    }

    public Question createQuestion(Question question, QuestionDto.Post questionDto) {

        Member member = memberService.getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else {

            question.setMember(member);

            Question savedQuestion = questionRepository.save(question);
            List<Long> tagIdList = new ArrayList<>();
            for (int i = 0; i < questionDto.getTagList().size(); i++) {
                tagIdList.add(questionDto.getTagList().get(i).getTagId());
            }
            Question returnQuestion;
            returnQuestion = updateQuestionTag(tagIdList, savedQuestion);
            member.addQuestion(returnQuestion);
            return questionRepository.save(returnQuestion);
        }
    }

    public Question updateQuestionTag(List<Long> tagList, Question savedQuestion) {

        //가장 최근에 저장된 질문 불러오기
        Question findQuestion = questionRepository.findById(savedQuestion.getQuestionId()).get();
        for (int i = 0; i < tagList.size(); i++) {
            //연관 매핑에 저장
            QuestionTag questionTag = new QuestionTag();
            questionTag.addTag(tagRepository.findByTagId(tagList.get(i)));
            questionTag.addQuestion(findQuestion);
            questionTagRepository.save(questionTag);
            //태그가 사용될 때마다 사용횟수 증가
            Tag tag = tagRepository.findByTagId(tagList.get(i));
            tag.setTagCount(tag.getTagCount() + 1);
            tag.addQuestionTag(questionTag);
            tagRepository.save(tag);
            findQuestion.addQuestionTag(questionTag);
        }

        return findQuestion;

    }


    public Question findQuestion(long question_Id) {
        Question question = findVerifiedQuestionByQuery(question_Id);
        question.setViewCount(question.getViewCount() + 1);
        questionRepository.save(question);
        return question;
    }


    public Question updateQuestion(Question question, QuestionDto.Patch questionDto) {

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
        findQuestion.setModifiedAt(LocalDateTime.now());
        Optional.ofNullable(question.getTitle())
                .ifPresent(findQuestion::setTitle);
        Optional.ofNullable(question.getContent())
                .ifPresent(findQuestion::setContent);
        questionTagRepository.deleteAll(questionTagRepository.findAllByQuestionQuestionId(findQuestion.getQuestionId()));

        for (int i = 0; i < questionDto.getTagList().size(); i++) {
            QuestionTag questionTag = new QuestionTag();
            questionTag.addTag(tagRepository.findByTagId(questionDto.getTagList().get(i).getTagId()));
            questionTag.addQuestion(findQuestion);
            questionTagRepository.save(questionTag);
            //태그가 사용될 때마다 사용횟수 증가
            Tag tag = tagRepository.findByTagId(questionDto.getTagList().get(i).getTagId());
            tag.setTagCount(tag.getTagCount() + 1);
            tag.addQuestionTag(questionTag);
            tagRepository.save(tag);
            findQuestion.addQuestionTag(questionTag);
        }

        return questionRepository.save(findQuestion);

    }

    public void deleteQuestion(Long questionId) {
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

    //타입으로 나눠서 질문 검색 기능 구현 1 : 제목, 2 : 내용, 3 : 작성자 이름
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