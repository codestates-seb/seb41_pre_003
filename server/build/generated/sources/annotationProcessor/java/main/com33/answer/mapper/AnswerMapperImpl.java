package com33.answer.mapper;

import com33.answer.dto.AnswerDto.Patch;
import com33.answer.dto.AnswerDto.Post;
import com33.answer.dto.AnswerDto.Response;
import com33.answer.entity.Answer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-26T19:52:11+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.5.1.jar, environment: Java 11.0.11 (Oracle Corporation)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostToAnswer(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswer_id( requestBody.getAnswer_id() );
        answer.setContent( requestBody.getContent() );

        return answer;
    }

    @Override
    public Answer answerPatchToAnswer(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswer_id( requestBody.getAnswer_id() );
        answer.setContent( requestBody.getContent() );

        return answer;
    }

    @Override
    public Response answerToAnswerResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        long answer_id = 0L;
        String content = null;
        LocalDateTime create_date = null;

        if ( answer.getAnswer_id() != null ) {
            answer_id = answer.getAnswer_id();
        }
        content = answer.getContent();
        create_date = answer.getCreate_date();

        long question_id = 0L;
        long member_id = 0L;

        Response response = new Response( answer_id, question_id, member_id, content, create_date );

        return response;
    }

    @Override
    public List<Response> answersToAnswerResponses(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponse( answer ) );
        }

        return list;
    }
}
