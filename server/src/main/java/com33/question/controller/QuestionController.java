package com33.question.controller;

import com33.member.entity.Member;
import com33.member.repository.MemberRepository;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import com33.question.mapper.QuestionMapper;
import com33.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;


@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper mapper;

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public QuestionController(QuestionService questionService, QuestionMapper mapper, MemberService memberService,
                              MemberRepository memberRepository) {
        this.questionService = questionService;
        this.mapper = mapper;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionDto,
                                       @RequestParam Member member) {
        Question question = questionService.createQuestion(mapper.questionPostToQuestion(questionDto), member.getMember_id());

        return ResponseEntity.ok(mapper.questionToQuestionResponse(question));
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionDto.Patch questionDto) {
        long memberId = 1L;
        questionDto.setQuestion_id(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchToQuestion(questionDto), memberId);

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
    public ResponseEntity search(@RequestParam(value = "keyword") String keyword) {
        return ResponseEntity.ok(mapper.questionsToQuestionResponses(questionService.searchQuestion(keyword)));
    }
}
//    @GetMapping("/search")
//    public ResponseEntity searchByMember_name(@RequestParam(value = "member_name") String member_name){
//        return ResponseEntity.ok(mapper.questionsToQuestionResponses(questionService.searchQuestionByMember(memberService.fineMember(member_name))));
//    }
//}
