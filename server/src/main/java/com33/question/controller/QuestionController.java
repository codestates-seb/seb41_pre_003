package com33.question.controller;

import com33.member.repository.MemberRepository;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import com33.question.mapper.QuestionMapper;
import com33.question.repository.QuestionRepository;
import com33.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
@CrossOrigin
@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper mapper;

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    public QuestionController(QuestionService questionService, QuestionMapper mapper, MemberService memberService,
                              MemberRepository memberRepository,
                              QuestionRepository questionRepository) {
        this.questionService = questionService;
        this.mapper = mapper;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionDto) {

        Question question = questionService.createQuestion(mapper.questionPostToQuestion(memberService, questionDto));

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionDto.Patch questionDto) {
        questionDto.setQuestion_id(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchToQuestion(questionDto));

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);

        return new ResponseEntity<>(question, HttpStatus.OK);
    }


    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity getQuestions() {
        return ResponseEntity.ok(mapper.questionsToQuestionResponses(questionService.findQuestions()));
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(value = "type") String type,
                                 @RequestParam(value = "keyword") String keyword
    ) {
        return ResponseEntity.ok(mapper.questionsToQuestionResponses(questionService.searchQuestion(type, keyword)));
    }

}
