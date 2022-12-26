package com33.question.mapper;

import com33.question.dto.QuestionDto;
import com33.question.entity.Question;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionPostToQuestion(QuestionDto.Post requestBody);

    Question questionPatchToQuestion(QuestionDto.Patch requestBody);


    default QuestionDto.Response questionToQuestionResponse(Question question) {
        QuestionDto.Response response = new QuestionDto.Response();

        response.setQuestion_id(question.getQuestion_id());
        response.setMember_id(question.getMember().getMember_id());
        response.setTitle(question.getTitle());
        response.setCreate_date(question.getCreate_date());
        response.setContent(question.getContent());


        return response;
    }

    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);

}
