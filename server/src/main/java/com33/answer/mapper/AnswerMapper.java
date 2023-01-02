package com33.answer.mapper;

import com33.answer.dto.AnswerDto;
import com33.answer.entity.Answer;
import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import com33.question.service.QuestionService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    //Answer answerPostToAnswer(AnswerDto.Post requestBody);
    default Answer answerPostToAnswer(QuestionService questionService, MemberService memberService, AnswerDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }
        Answer answer = new Answer();

        Question question = new Question();

        question.setQuestionId(requestBody.getQuestionId());

        answer.setContent(requestBody.getContent());
        answer.setMember(memberService.getLoginMember());
        answer.setQuestion(questionService.findQuestion(question.getQuestionId()));
        answer.setCreate_date(LocalDateTime.now());

        return answer;
    }
    default Answer answerPatchToAnswer(AnswerDto.Patch requestBody){
        Answer answer = new Answer();

        answer.setAnswerId(requestBody.getAnswerId());
        answer.setContent(requestBody.getContent());
        answer.setCreate_date(requestBody.getCreate_date());


        return answer;
    };

    default AnswerDto.Response answerToAnswerResponse(Answer answer) {
        AnswerDto.Response response = new AnswerDto.Response();

        response.setAnswerId(answer.getAnswerId());
        response.setMemberId(answer.getMember().getMemberId());
        response.setContent(answer.getContent());
        response.setCreate_date(answer.getCreate_date());
        response.setQuestionId(answer.getQuestion().getQuestionId());


        return response;
    }
    List<AnswerDto.Response> answersToAnswerResponses(List<Answer> answers);

}
