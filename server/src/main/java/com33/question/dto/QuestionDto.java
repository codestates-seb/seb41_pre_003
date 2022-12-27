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

        private long member_id;
        @NotBlank(message = "내용을 입력해주세요.")
        private String content;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long question_id;
        @NotBlank
        private String title;

        private String content;

        private Long member_id;


        public void setQuestion_id(Long question_id) {
            this.question_id = question_id;
        }
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long question_id;
        private Long member_id;
        private String title;
        private String content;
        private LocalDateTime create_date;
    }
}
