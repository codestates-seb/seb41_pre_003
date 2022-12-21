package com33.question.mapper;

import com33.question.dto.QuestionDto;
import com33.question.entity.Question;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionPostToQuestion(QuestionDto.Post requestBody);
    Question questionPatchToQuestion(QuestionDto.Patch requestBody);
    QuestionDto.Response questionToQuestionResponse(Question question);
    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);

}
