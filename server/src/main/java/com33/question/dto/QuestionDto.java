package com33.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
    }
}
