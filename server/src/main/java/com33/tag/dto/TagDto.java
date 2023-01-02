package com33.tag.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class TagDto {
    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "태그 이름을 입력해주세요.")
        private String tagName;
    }

    @Getter
    @Setter
    public static class Response {
        private Long tagId;
        private String tagName;
        private int tagCount;
    }
}