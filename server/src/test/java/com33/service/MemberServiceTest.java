//package com33.slice.service;
//
//import com.google.gson.Gson;
//import com33.exception.BusinessLogicException;
//import com33.member.controller.MemberController;
//import com33.member.dto.MemberDto;
//import com33.member.entity.Member;
//import com33.member.mapper.MemberMapper;
//import com33.member.repository.MemberRepository;
//import com33.member.service.MemberService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.BDDMockito.given;
//
//
//@ExtendWith(MockitoExtension.class)
//class MemberServiceTest {
//
//    @Mock
//    private MemberRepository memberRepository;
//
//    @InjectMocks
//    private MemberService memberService;
//    // given 테스트용 request body 생성
//    // when MockMvc 객체로 테스트 대상 Controller 호출
//    // then Controller 핸들러 메서드에서 응답으로 수신한 HTTP Status 및 response body 검증
//
//    @Test
//    void createMember() throws Exception{
//        // given 테스트용 request body 생성
//
//        Member member = new Member(1L,"1234", "김코딩", "M", 20,"kimcoding@gmail.com");
//        given(memberRepository.findByEmail(member.getEmail()))
//                .willReturn(Optional.of(member));
//
//        // when / then
//        assertThrows(BusinessLogicException.class, () -> memberService.createMember(member));
//    }
//
//    @Test
//    void updateMember() {
//        //given
//        Member member = new Member(1L,"1234", "김코딩", "M", 20,"kimcoding@gmail.com");
//        given(memberRepository.findByEmail(member.getEmail()))
//                .willReturn(Optional.of(member));
//        member.setName("홍길동");
//        Member member1 = new Member(1L,"1234", "홍길동", "M", 20,"kimcoding@gmail.com");
//
//
//
//        //when/then
//        //assertTrue(memberService.findMember(member.getMemberId()).equals(member1));
//    }
//
//    @Test
//    void findMember() {
//    }
//
//    @Test
//    void findMembers() {
//    }
//
//    @Test
//    void deleteMember() {
//    }
//
//    @Test
//    void findName() {
//    }
//
//    @Test
//    void findVerifiedMember() {
//    }
//}