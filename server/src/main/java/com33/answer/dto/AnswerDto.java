package com33.answer.dto;

import com33.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Convert;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        private long questionId;
        private long memberId;
        @NotBlank(message = "내용을 입력해주세요.")
        private String content;

    }

    @Setter
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long answerId;
        private long memberId;
        private long questionId;
        @NotBlank
        private String content;
        private LocalDateTime create_date;

        public void setAnswerId(long answerId) {
            this.answerId = answerId;
        }
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long answerId;
        private long questionId;
        private long memberId;
        private String content;
        private LocalDateTime create_date;
    }

}
