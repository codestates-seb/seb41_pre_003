package com33.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

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

        private Long member_id;
        @NotBlank
        private String pw;

        private String name;

        private String gender;

        private int age;

        @Email
        private String email;

        public void setMember_id(long member_id) {
            this.member_id = member_id;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long member_id;
        private String pw;
        private String name;
        private String gender;
        private int age;
        private String email;
    }
}
