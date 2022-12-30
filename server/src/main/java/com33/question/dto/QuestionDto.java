package com33.question.dto;

import com33.answer.entity.Answer;
import com33.question.entity.QuestionTag;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class QuestionDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "제목을 반드시 입력해주세요.")
        private String title;

        private long memberId;

        @NotBlank(message = "내용을 입력해주세요.")
        private String content;

        private List<QuestionTagDto> questionTags;


    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long questionId;
        @NotBlank
        private String content;

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Vote {
        private Long questionId;
    }

    @Getter
    @Setter
    public class QuestionTagResponseDto {
        private String tagName;
    }

    @Getter
    public class QuestionTagDto {
        @Positive
        private Long tagId;

    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long questionId;
        private Long memberId;
        private String title;
        private String content;
        private LocalDateTime create_date;
        private int viewCount;
        private int voteCount;
        private List<QuestionTagResponseDto> questionTags;
    }
}
