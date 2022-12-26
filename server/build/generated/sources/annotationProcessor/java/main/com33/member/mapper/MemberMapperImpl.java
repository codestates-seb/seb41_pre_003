package com33.member.mapper;

import com33.member.dto.MemberDto.Patch;
import com33.member.dto.MemberDto.Post;
import com33.member.dto.MemberDto.Response;
import com33.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-26T20:42:38+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.5.1.jar, environment: Java 11.0.11 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostToMember(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setPw( requestBody.getPw() );
        member.setName( requestBody.getName() );
        member.setGender( requestBody.getGender() );
        member.setAge( requestBody.getAge() );
        member.setEmail( requestBody.getEmail() );

        return member;
    }

    @Override
    public Member memberPatchToMember(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMember_id( requestBody.getMember_id() );
        member.setPw( requestBody.getPw() );
        member.setName( requestBody.getName() );
        member.setGender( requestBody.getGender() );
        member.setAge( requestBody.getAge() );
        member.setEmail( requestBody.getEmail() );

        return member;
    }

    @Override
    public Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        Long member_id = null;
        String pw = null;
        String name = null;
        String gender = null;
        int age = 0;
        String email = null;

        member_id = member.getMember_id();
        pw = member.getPw();
        name = member.getName();
        gender = member.getGender();
        age = member.getAge();
        email = member.getEmail();

        Response response = new Response( member_id, pw, name, gender, age, email );

        return response;
    }

    @Override
    public List<Response> membersToMemberResponses(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponse( member ) );
        }

        return list;
    }
}
