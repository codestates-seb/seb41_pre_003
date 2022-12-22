package com33.question.controller;

import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import com33.question.mapper.QuestionMapper;
import com33.question.service.QuestionService;
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

    public QuestionController(QuestionService questionService, QuestionMapper mapper, MemberService memberService) {
        this.questionService = questionService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionDto) {
        Question question = questionService.creatQuestion(mapper.questionPostToQuestion(questionDto));

        return  ResponseEntity.ok(mapper.questionToQuestionResponse(question));
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

        return new ResponseEntity<>(question,HttpStatus.OK);
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
}
