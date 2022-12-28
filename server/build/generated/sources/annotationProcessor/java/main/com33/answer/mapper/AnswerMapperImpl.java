package com33.answer.mapper;

import com33.answer.dto.AnswerDto.Response;
import com33.answer.entity.Answer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-28T20:50:14+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.5.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

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
