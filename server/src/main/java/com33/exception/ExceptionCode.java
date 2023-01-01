package com33.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    LIKE_NOT_FOUND(410, "Like not found"),
    LIKE_EXITS(409, "Like exists"),
    TAG_NOT_FOUND(404, "Tag not found"),
    LIKE_NOT_FOUND(410,"login, please");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
