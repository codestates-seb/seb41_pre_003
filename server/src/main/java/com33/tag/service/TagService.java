package com33.tag.service;


import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.tag.entity.Tag;
import com33.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class TagService {
    private final TagRepository tagRepository;
    private final MemberService memberService;

    public TagService(TagRepository tagRepository, MemberService memberService) {
        this.tagRepository = tagRepository;
        this.memberService = memberService;
    }

    public Tag createTag(Tag tag) {
        Member member = memberService.getLoginMember();
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LONGIN);
        } else {
            if (tagRepository.findByTagName(tag.getTagName()).isPresent())
                throw new BusinessLogicException(ExceptionCode.TAG_EXITS);
            else {
                return tagRepository.save(tag);
            }
        }
    }

    public List<Tag> findTags() {
        return tagRepository.findAll();
    }

    public Tag findTag(Long tag_Id) {
        Tag tag = tagRepository.findByTagId(tag_Id);
        return tag;
    }


    public Page<Tag> findTagsRight(int page, int size) {
        List<Tag> list = tagRepository.findByTagCountGreaterThan(0)
                .stream().sorted(Comparator.comparing(Tag::getTagCount).reversed())
                .collect(Collectors.toList());

        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), list.size());
        Page<Tag> questionPage = new PageImpl<>(list.subList(start, end), pageRequest, list.size());
        return questionPage;
    }

    public void deleteTag(long tagId) {
        tagRepository.delete(tagRepository.findByTagId(tagId));
    }

    public List<Tag> searchTag(String keyword) {
        Optional<List<Tag>> optionalTags = tagRepository.findByTagNameContaining(keyword);
        List<Tag> findTags =
                optionalTags.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return findTags;
    }

}