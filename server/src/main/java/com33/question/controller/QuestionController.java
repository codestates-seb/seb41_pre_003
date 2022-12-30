package com33.question.controller;

import com33.answer.entity.Answer;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Like;
import com33.question.entity.Question;
import com33.question.mapper.QuestionMapper;
import com33.question.repository.QuestionRepository;
import com33.question.service.LikeService;
import com33.question.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper mapper;

    private final MemberService memberService;
    private final QuestionRepository questionRepository;
    private final LikeService likeService;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionDto) {

        Question question = questionService.createQuestion(mapper.questionPostToQuestion(memberService, questionDto));

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionDto.Patch questionDto) {
        questionDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchToQuestion(questionDto));

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponse(question), HttpStatus.OK);
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
    @PostMapping("/{question-id}/like")
    public ResponseEntity postLike(@PathVariable("question-id") long questionId,
                               @Valid @RequestBody QuestionDto.Like questionDto){
        questionDto.setQuestionId(questionId);

        Like like = likeService.createLike(mapper.questionLikeToQuestion(questionService, memberService, questionDto));

        return ResponseEntity.ok(mapper.questionLikeToQuestionResponse(like));
    }

}