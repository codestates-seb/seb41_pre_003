package com33.member.service;

import com33.auth.utils.CustomAuthorityUtils;
import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.helper.event.MemberRegistrationApplicationEvent;
import com33.member.entity.Member;
import com33.member.repository.MemberRepository;
import com33.question.entity.Question;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher,
                         PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPw());  //패스워드 인코딩
        member.setPw(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this,savedMember));
        return savedMember;
    }
    public Member updateMember(Member member){
        String encryptedPassword = passwordEncoder.encode(member.getPw());
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getAge())
                .ifPresent(age -> findMember.setAge(age));
        Optional.ofNullable(member.getPw())
                .ifPresent(pw -> findMember.setPw(encryptedPassword));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> findMember.setGender(gender));


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
    public List<Member> findName(String name){
        Optional<List<Member>> optionalMembers =
                memberRepository.findByNameContaining(name);
        return optionalMembers.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //로그인한 회원정보 가져오기
    public Member getLoginMember(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();  //SecurityContextHolder에서 회원정보 가져오기
        Optional<Member> optionalMember = memberRepository.findByEmail(principal.toString());
        if (optionalMember.isPresent()) return optionalMember.get();
        else return null;
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
