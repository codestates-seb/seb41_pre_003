package com33.tag.mapper;


import com33.member.service.MemberService;
import com33.tag.dto.TagDto;
import com33.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;



@Mapper(componentModel = "spring")
public interface TagMapper {
    default Tag tagPostToTag(MemberService memberService,TagDto.Post tagPostDto) {
        if (tagPostDto == null) {
            return null;
        }

        Tag tag = new Tag();
        tag.setTagName(tagPostDto.getTagName().toLowerCase());
        tag.setMember(memberService.findMember(tagPostDto.getMemberId()));

        return tag;
    }
    List<TagDto.Response> tagToTagResponsesDto(List<Tag> tags);
    TagDto.Response tagToTagResponseDto(Tag tags);
}