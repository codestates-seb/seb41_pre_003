package com33.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;

public class QuestionDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank
        private String title;

        private String content;

    }
    @Getter
    @AllArgsConstructor
    public static class Patch{
        private Long question_id;
        @NotBlank
        private String title;

        private String content;


        public void setQuestion_id(Long question_id) {
            this.question_id = question_id;
        }
    }
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response{
        private String question_id;
        private Long member_id;
        private String title;
        private String content;
        private LocalDateTime create_date;
    }
}
