package com33.question.mapper;

import com33.question.dto.QuestionDto.Patch;
import com33.question.dto.QuestionDto.Post;
import com33.question.dto.QuestionDto.Response;
import com33.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-26T23:13:35+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.5.1.jar, environment: Java 11.0.11 (Oracle Corporation)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostToQuestion(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Question question = new Question();

        question.setTitle( requestBody.getTitle() );
        question.setContent( requestBody.getContent() );

        return question;
    }

    @Override
    public Question questionPatchToQuestion(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestion_id( requestBody.getQuestion_id() );
        question.setTitle( requestBody.getTitle() );
        question.setContent( requestBody.getContent() );

        return question;
    }

    @Override
    public List<Response> questionsToQuestionResponses(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponse( question ) );
        }

        return list;
    }
}
