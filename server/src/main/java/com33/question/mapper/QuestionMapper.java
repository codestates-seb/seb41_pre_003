package com33.question.mapper;

import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Like;
import com33.question.entity.Question;
import com33.question.entity.QuestionTag;
import com33.question.service.QuestionService;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    default QuestionDto.Response questionToQuestionResponse(Question question) {
        QuestionDto.Response response = new QuestionDto.Response();

        response.setQuestionId(question.getQuestionId());
        response.setMemberId(question.getMember().getMemberId());
        response.setName(question.getMember().getName());
        response.setTitle(question.getTitle());
        response.setCreate_date(question.getCreate_date());
        response.setContent(question.getContent());
        response.setViewCount(question.getViewCount());
        response.setLikeCount(question.getLikeCount());
        List<String> tagList = new ArrayList<>();
        for(int i = 0; i < question.getQuestionTagList().size(); i++){
            tagList.add(question.getQuestionTagList().get(i).getTag().getTagName());
        }
        response.setTagList(tagList);


        return response;
    }
    default QuestionDto.LikeResponse questionLikeToQuestionResponse(Like like) {
        QuestionDto.LikeResponse response = new QuestionDto.LikeResponse();

        response.setLikeId(like.getLikeId());
        response.setQuestionId(like.getQuestion().getQuestionId());
        response.setMemberId(like.getMember().getMemberId());
        response.setStatus(like.isStatus());

        return response;
    }
    default QuestionDto.TagResponse questionTagToQuestionResponse(List<QuestionTag> questions) {
      QuestionDto.TagResponse tagResponse = new QuestionDto.TagResponse();
      List<Long> list = new ArrayList<>();
      for(int i = 0; i < questions.size(); i++){
          list.add(questions.get(i).getQuestion().getQuestionId());
      }
       tagResponse.setQuestionId(list);
      return tagResponse;
    }

    default Question questionPatchToQuestion(QuestionDto.Patch requestBody) {
        Question question = new Question();

        question.setTitle(requestBody.getTitle());
        question.setQuestionId(requestBody.getQuestionId());
        question.setContent(requestBody.getContent());


        return question;
    }

    default Question questionPostToQuestion(MemberService memberService, QuestionDto.Post questionPostDto) {
        if (questionPostDto == null) {
            return null;
        }

        Question question = new Question();
        question.setTitle(questionPostDto.getTitle());
        question.setContent(questionPostDto.getContent());
        question.setViewCount(0);
        question.setLikeCount(0);
        question.setMember(memberService.getLoginMember());
        question.setCreate_date(LocalDateTime.now());

        return question;
    }

    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);

    default Like questionLikeToQuestion(QuestionService questionService, MemberService memberService,
                                            long questionId) {

        Like like = new Like();
        Question question = new Question();

        question.setQuestionId(questionId);

        like.setQuestion(questionService.findQuestion(question.getQuestionId()));
        like.setMember(memberService.getLoginMember());
        like.setStatus(true);

        return like;
    }
}