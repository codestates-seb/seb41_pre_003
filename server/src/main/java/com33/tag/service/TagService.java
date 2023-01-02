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
        Member member = memberService.getLoginMember();//로그인을 안했을 시 에러메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else {
            if (tagRepository.findByTagName(tag.getTagName()).isPresent())//이미 존재하는 태그라면 에러메시지 출력
                throw new BusinessLogicException(ExceptionCode.TAG_EXITS);
            else {
                return tagRepository.save(tag);
            }
        }
    }

    public List<Tag> findTags() {
        return tagRepository.findAll();
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
    //태그목록에서 태그이름으로 검색, 자동완성 가능하게 containing 사용
    public List<Tag> searchTag(String keyword) {
        Optional<List<Tag>> optionalTags = tagRepository.findByTagNameContaining(keyword);
        List<Tag> findTags =
                optionalTags.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return findTags;
    }

}