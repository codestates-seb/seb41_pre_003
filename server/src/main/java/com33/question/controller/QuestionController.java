package com33.question.controller;

import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Like;
import com33.question.entity.Question;
import com33.question.mapper.QuestionMapper;
import com33.question.repository.QuestionRepository;
import com33.question.repository.QuestionTagRepository;
import com33.question.service.LikeService;
import com33.question.service.QuestionService;
import com33.tag.repository.TagRepository;
import com33.tag.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;


    private final QuestionMapper mapper;

    private final MemberService memberService;
    private final QuestionRepository questionRepository;
    private final TagService tagService;
    private final LikeService likeService;
    private final QuestionTagRepository questionTagRepository;
    private final TagRepository tagRepository;

    public QuestionController(QuestionService questionService, QuestionMapper mapper, MemberService memberService,
                              QuestionRepository questionRepository, TagService tagService, LikeService likeService, QuestionTagRepository questionTagRepository,
                              TagRepository tagRepository) {
        this.questionService = questionService;
        this.mapper = mapper;
        this.memberService = memberService;

        this.questionRepository = questionRepository;
        this.tagService = tagService;
        this.likeService = likeService;
        this.questionTagRepository = questionTagRepository;
        this.tagRepository = tagRepository;
    }

    //질문 게시
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionDto) {
        Question question = questionService.createQuestion(mapper.questionPostToQuestion(memberService, questionDto), questionDto);

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }

    //질문 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionDto.Patch questionDto) {

        questionDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchToQuestion(questionDto), questionDto);

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }
    //해당 게시물 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponse(question), HttpStatus.OK);
    }

    //해당 게시물 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    //게시물 전체 조회
    @GetMapping
    public ResponseEntity getQuestions() {
        return ResponseEntity.ok(mapper.questionsToQuestionResponses(questionService.findQuestions()));
    }
    //게시글 검색
    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(value = "type") String type,
                                 @RequestParam(value = "keyword") String keyword
    ) {
        return ResponseEntity.ok(mapper.questionsToQuestionResponses(questionService.searchQuestion(type, keyword)));
    }
    //게시글 추천하기
    @PostMapping("/{question-id}/like")
    public ResponseEntity postLike(@PathVariable("question-id") long questionId) {

        Like like = likeService.createLike(mapper.questionLikeToQuestion(questionService, memberService, questionId));

        return ResponseEntity.ok(mapper.questionLikeToQuestionResponse(like));
    }
    //태그로 게시물 검색
    @GetMapping("/search/tags/{tag-id}")
    public ResponseEntity searchByTag(@PathVariable("tag-id") long tagId) {
        return ResponseEntity.ok(mapper.questionTagToQuestionResponse(questionTagRepository.findAllByTagTagId(tagId)));
    }
}


