package com33.answer.controller;

import com33.answer.dto.AnswerDto;
import com33.answer.entity.Answer;
import com33.answer.mapper.AnswerMapper;
import com33.answer.service.AnswerService;
import com33.member.service.MemberService;
import com33.question.entity.Question;
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

    @PostMapping("/{question-id}/answers")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive Long question_id,
                                         @Valid @RequestBody AnswerDto.Post answerDto) {
        answerDto.setQuestion_id(question_id);

        Answer answer = answerService.creatAnswer(mapper.answerPostToAnswer(questionService,memberService,answerDto));

        return  ResponseEntity.ok(mapper.answerToAnswerResponse(answer));

    }
    @PatchMapping("/{question-id}/answers/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch answerDto) {
        answerDto.setQuestion_id(questionId);
        answerDto.setAnswer_id(answerId);
        Answer answer = answerService.updateAnswer(mapper.answerPatchToAnswer(answerDto));

        return ResponseEntity.ok(mapper.answerToAnswerResponse(answer));
    }

    @GetMapping("/{question-id}/answers/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("question-id") @Positive long questionId,
                                    @PathVariable("answer-id") @Positive long answerId) {

        return ResponseEntity.ok(mapper.answerToAnswerResponse(answerService.findAnswer(answerId)));
    }

    @DeleteMapping("/{question-id}/answers/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/{question-id}/answers")
    public ResponseEntity getAnswers(@PathVariable("question-id") @Positive long questionId) {

        return ResponseEntity.ok(mapper.answersToAnswerResponses(answerService.findAnswers(questionId)));
    }
}