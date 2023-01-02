//package com33.member.mapper;
//
//import com33.member.dto.MemberDto;
//import com33.member.entity.Member;
//import org.springframework.context.annotation.Primary;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class MemberMapperManualImpl implements MemberMapper {
//    public MemberMapperManualImpl() {
//    }
//
//    public Member memberPostToMember(MemberDto.Post requestBody) {
//        if (requestBody == null) {
//            return null;
//        } else {
//            Member member = new Member();
//            member.setName(requestBody.getName());
//            member.setEmail(requestBody.getEmail());
//            member.setPw(requestBody.getPw());
//            return member;
//        }
//    }
//    public  Member memberPatchToMember(MemberDto.Patch requestBody){
//        if (requestBody == null) {
//            return null;
//        } else {
//            Member member = new Member();
//            member.setName(requestBody.getName());
//            member.setEmail(requestBody.getEmail());
//            member.setPw(requestBody.getPw());
//            return member;
//        }
//    }
//
//    public MemberDto.Response memberToMemberResponse(Member member) {
//        MemberDto.Response response = new MemberDto.Response();
//        response.setMember_id(member.getMember_id());
//        response.setEmail(member.getEmail());
//        response.setName(member.getName());
//        response.setPw(member.getPw());
//
//        return response;
//    }
//
//    public List<MemberDto.Response> membersToMemberResponses(List<Member> members) {
//        if (members == null) {
//            return null;
//        }
//
//        List<MemberDto.Response> list = new ArrayList<>(members.size());
//        for (Member member : members) {
//            list.add(memberToResponse(member));
//        }
//
//        return list;
//    }
//
//    protected MemberDto.Response memberToResponse(Member member) {
//        if (member == null) {
//            return null;
//        }
//
//        MemberDto.Response response = new MemberDto.Response();
//
//        if (member.getMember_id() != null) {
//            response.setMember_id(member.getMember_id());
//        }
//        response.setName(member.getName());
//
//        return response;
//    }
//
//
//}