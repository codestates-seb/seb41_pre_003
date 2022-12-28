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

        private Long member_id;
        @NotBlank
        private String pw;

        private String name;

        private String gender;

        private int age;

        @Email
        private String email;


//        public Patch(String pw, String name, String gender, int age, String email) {
//            this.pw = pw;
//            this.name =  name;
//            this.gender = gender;
//            this.age = age;
//            this.email = email;
//        }

        public void setMember_id(long member_id) {
            this.member_id = member_id;
        }
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private Long member_id;
        private String pw;
        private String name;
        private String gender;
        private int age;
        private String email;

    }
}
