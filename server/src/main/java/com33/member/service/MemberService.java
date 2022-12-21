package com33.member.service;

import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.helper.event.MemberRegistrationApplicationEvent;
import com33.member.entity.Member;
import com33.member.repository.MemberRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
    }
    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this,savedMember));
        return savedMember;
    }
    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMember_id());
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getAge())
                .ifPresent(age -> findMember.setAge(age));

        return memberRepository.save(findMember);
    }
    public Member findMember(long memberId){
        return findVerifiedMember(memberId);
    }
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }
    public void deleteMember(long memberId){
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
