package com33.answer.mapper;

import com33.answer.dto.AnswerDto;
import com33.answer.entity.Answer;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);

    default AnswerDto.Response answerToAnswerResponse(Answer answer) {
        AnswerDto.Response response = new AnswerDto.Response();

        response.setAnswer_id(answer.getAnswer_id());
        response.setMember_id(answer.getMember().getMember_id());
        response.setContent(answer.getContent());
        response.setCreate_date(answer.getCreate_date());
        response.setQuestion_id(answer.getQuestion().getQuestion_id());


        return response;
    }
    List<AnswerDto.Response> answersToAnswerResponses(List<Answer> answers);

}
