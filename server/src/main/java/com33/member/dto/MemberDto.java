package com33.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post{

        @NotBlank
        private String pw;

        private String name;

        private String gender;

        private int age;

        @Email
        private String email;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch{

        private Long memberId;

        private String pw;

        private String name;

        private String gender;

        private int age;

        @Email
        private String email;


        public void setMember_id(long memberId) {
            this.memberId = memberId;
        }
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private Long memberId;
        private String pw;
        private String name;
        private String gender;
        private int age;
        private String email;

    }
}
