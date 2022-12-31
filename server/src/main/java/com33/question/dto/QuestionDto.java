package com33.question.dto;

import com33.question.entity.Question;
import com33.question.entity.QuestionTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Lazy;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
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

        private List<QuestionTagDto> tagList;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class SearchByTag {
        private List<QuestionTagDto> tagList;
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
    public static class QuestionTagDto {
        @Positive
        private Long tagId;

    }
    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class TagResponse {
        private List<Long> questionId;
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long questionId;
        private Long memberId;
        private String name;
        private String title;
        private String content;
        private LocalDateTime create_date;
        private int viewCount;
        private List<String> tagList;
        private int likeCount;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Like {
        private long questionId;
        private long memberId;
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class LikeResponse {
        private Long likeId;
        private Long questionId;
        private Long memberId;

    }
}
