package com33.tag.controller;


import com33.member.service.MemberService;
import com33.tag.dto.TagDto;
import com33.tag.entity.Tag;
import com33.tag.mapper.TagMapper;
import com33.tag.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/tags")
public class TagController {

    private final TagService tagService;
    private final TagMapper mapper;
    private final MemberService memberService;

    public TagController(TagService tagService, TagMapper mapper, MemberService memberService) {
        this.tagService = tagService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postTag(@Valid @RequestBody TagDto.Post tagDto) {
        tagDto.setMemberId(memberService.getLoginMember().getMemberId());

        Tag tag = tagService.createTag(mapper.tagPostToTag(memberService,tagDto));

        return ResponseEntity.ok(mapper.tagToTagResponseDto(tag));
    }


    @GetMapping("/{right}")
    public ResponseEntity getTagsRight() {

        Page<Tag> pageTags = tagService.findTagsRight(0, 5);
        List<Tag> tags = pageTags.getContent();
        return ResponseEntity.ok(mapper.tagToTagResponsesDto(tags));
    }

    @GetMapping
    public ResponseEntity getTags() {

        return ResponseEntity.ok(mapper.tagToTagResponsesDto(tagService.findTags()));
    }

    @DeleteMapping("/{tag-id}")
    public ResponseEntity deleteQuestion(@PathVariable("tag-id") long tagId) {
        tagService.deleteTag(tagId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(value = "keyword") String keyword
    ) {
        return ResponseEntity.ok(mapper.tagToTagResponsesDto(tagService.searchTag(keyword)));
    }


}