package com33.question.mapper;

import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.dto.QuestionDto;
import com33.question.entity.Question;
import com33.question.entity.QuestionTag;
import com33.tag.service.TagService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    default QuestionDto.Response questionToQuestionResponse(Question question) {
        QuestionDto.Response response = new QuestionDto.Response();

        response.setQuestionId(question.getQuestionId());
        response.setMemberId(question.getMember().getMemberId());
        response.setTitle(question.getTitle());
        response.setCreate_date(question.getCreate_date());
        response.setContent(question.getContent());
        response.setViewCount(question.getViewCount());
        response.setVoteCount(question.getVoteCount());

        return response;
    }

    default Question questionPatchToQuestion(QuestionDto.Patch requestBody) {
        Question question = new Question();

        question.setQuestionId(requestBody.getQuestionId());
        question.setContent(requestBody.getContent());

        return question;
    }

    default Question questionPostToQuestion(MemberService memberService, QuestionDto.Post questionPostDto,
                                            TagService tagService) {
        if (questionPostDto == null) {
            return null;
        }

        Question question = new Question();
        Member member = new Member();
        member.setMemberId(questionPostDto.getMemberId());
        question.setTitle(questionPostDto.getTitle());
        question.setContent(questionPostDto.getContent());
        question.setMember(memberService.findMember(member.getMemberId()));
        question.setCreate_date(LocalDateTime.now());
        List<QuestionTag> questionTags = questionTagsDtosToQuestionTags(question,tagService);
        question.setQuestionTagList(questionTags);

        return question;
    }

    default List<QuestionTag> questionTagsDtosToQuestionTags(Question question,
                                                             TagService tagService) {

            QuestionTag questionTag = new QuestionTag();
            for(int i = 0; i < question.getQuestionTagList().size(); i++){
            questionTag.addTag(question.getQuestionTagList().get(i).getTag());
            }

            return questionTag.getQuestion().getQuestionTagList();

    }

    default List<QuestionDto.QuestionTagResponseDto> questionTagListToQuestionTagResponseDtoList(List<QuestionTag> list) {
        if (list == null) {
            return null;
        }
//        return list.stream()
//                .map(questionTag -> QuestionDto.QuestionTagResponseDto
//                        .builder()
//                        .tagName(questionTag.getTag().getTagName())
//                        .build())
//                .collect(Collectors.toList());
        return null;
    }

    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);


}
