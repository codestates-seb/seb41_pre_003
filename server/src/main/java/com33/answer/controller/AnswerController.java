package com33.answer.controller;

import com33.answer.dto.AnswerDto;
import com33.answer.entity.Answer;
import com33.answer.mapper.AnswerMapper;
import com33.answer.service.AnswerService;
import com33.member.service.MemberService;
import com33.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
public class AnswerController {
    private final AnswerService answerService;
    private final QuestionService questionService;
    private final MemberService memberService;

    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, QuestionService questionService, MemberService memberService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.questionService = questionService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    //답글 달기
    @PostMapping("/{question-id}/answers")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive Long questionId,
                                     @Valid @RequestBody AnswerDto.Post answerDto) {
        answerDto.setQuestionId(questionId);

        Answer answer = answerService.creatAnswer(mapper.answerPostToAnswer(questionService, memberService, answerDto));

        return ResponseEntity.ok(mapper.answerToAnswerResponse(answer));

    }

    //답글 수정
    @PatchMapping("/{question-id}/answers/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch answerDto) {
        answerDto.setQuestionId(questionId);
        answerDto.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(mapper.answerPatchToAnswer(answerDto));

        return ResponseEntity.ok(mapper.answerToAnswerResponse(answer));
    }

    //답글 조회
    @GetMapping("/{question-id}/answers/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("question-id") @Positive long questionId,
                                    @PathVariable("answer-id") @Positive long answerId) {

        return ResponseEntity.ok(mapper.answerToAnswerResponse(answerService.findAnswer(answerId)));
    }

    //답글 삭제
    @DeleteMapping("/{question-id}/answers/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //답글 전체 조회
    @GetMapping("/{question-id}/answers")
    public ResponseEntity getAnswers(@PathVariable("question-id") @Positive long questionId) {

        return ResponseEntity.ok(mapper.answersToAnswerResponses(answerService.findAnswers(questionId)));
    }
}
