package com33.answer.dto;

import com33.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private long answer_id;
        @NotBlank
        private String content;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        private long answer_id;
        private long member_id;
        private long question_id;
        @NotBlank
        private String content;
        public void setAnswer_id(long answer_id) {
            this.answer_id = answer_id;
        }
    }
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long answer_id;
        private long question_id;
        private long member_id;
        private String content;
        private LocalDateTime create_date;
    }

}
