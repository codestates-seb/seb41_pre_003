//package com33.slice.repository;
//
//import com33.member.entity.Member;
//import com33.member.repository.MemberRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class MemberRepositoryTest {
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Test
//    void findByEmail() {
//        // given
//        Member member = new Member(1L,"1234", "김코딩", "M", 20,"kimcoding@gmail.com");
//
//        // when
//        memberRepository.save(member);
//        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
//
//        // then
//        assertTrue(findMember.isPresent());
//        assertTrue(findMember.get().getEmail().equals(member.getEmail()));
//    }
//
//}