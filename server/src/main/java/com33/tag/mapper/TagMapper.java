package com33.tag.mapper;


import com33.member.service.MemberService;
import com33.tag.dto.TagDto;
import com33.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;



@Mapper(componentModel = "spring")
public interface TagMapper {
    default Tag tagPostToTag(TagDto.Post tagPostDto, MemberService memberService) {

        Tag tag = new Tag();
        tag.setTagName(tagPostDto.getTagName().toLowerCase());
        tag.setTagCount(0);
        return tag;
    }
    List<TagDto.Response> tagToTagResponsesDto(List<Tag> tags);
    default TagDto.Response tagToTagResponseDto(Tag tag){
        TagDto.Response response = new TagDto.Response();
        response.setTagCount(tag.getTagCount());
        response.setTagId(tag.getTagId());
        response.setTagName(tag.getTagName());

        return response;
    }
}