package com33.question.mapper;

import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


import java.time.LocalDateTime;
import java.util.List;



@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    default QuestionDto.Response questionToQuestionResponse(Question question) {
        QuestionDto.Response response = new QuestionDto.Response();

        response.setQuestion_id(question.getQuestion_id());
        response.setMember_id(question.getMember().getMember_id());
        response.setTitle(question.getTitle());
        response.setCreate_date(question.getCreate_date());
        response.setContent(question.getContent());
        return response;
    }
    default Question questionPatchToQuestion(QuestionDto.Patch requestBody) {
        Question question = new Question();

        question.setQuestion_id(requestBody.getQuestion_id());
        question.setTitle(requestBody.getTitle());
        question.setContent(requestBody.getContent());

        return question;
    }
    default Question questionPostToQuestion(MemberService memberService, QuestionDto.Post questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();
        Member member = new Member();
        member.setMember_id(questionPostDto.getMember_id());

        question.setTitle( questionPostDto.getTitle() );
        question.setContent( questionPostDto.getContent());
        question.setMember(memberService.findMember(member.getMember_id()));
        question.setCreate_date(LocalDateTime.now());

        return question;
    }

    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);

}
