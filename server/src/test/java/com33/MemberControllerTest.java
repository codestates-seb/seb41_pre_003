//package com33;
//
//import com.google.gson.Gson;
//import com33.member.dto.MemberDto;
//import com33.member.entity.Member;
//import com33.member.mapper.MemberMapper;
//import com33.member.service.MemberService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotBlank;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//
//
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class MemberControllerTest {
//
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//    @Autowired
//    private MemberMapper mapper;
//    @MockBean
//    private MemberService memberService;
//
//
//    @Test
//    @DisplayName("회원가입")
//    public void postMember() throws Exception {
//
//        // given
//        MemberDto.Post post = new MemberDto.Post("1234",
//                "김코딩",
//                "M",
//                20,
//                "kimcoding@gmail.com");
//        MemberDto.Response responseBody = new MemberDto.Response(1L, "1234", "김코딩",
//                "M", 20, "kimcoding@gmail.com");
//        given(mapper.memberPostToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());
//        given(memberService.createMember(Mockito.any(Member.class))).willReturn(new Member());
//        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(responseBody);
//
//        String content = gson.toJson(post);
//
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/members")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//        //then
//        actions
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    @DisplayName("특정 회원 정보 수정")
//    void patchMemberTest() throws Exception {
//
//        //given
//        MemberDto.Patch patch = new MemberDto.Patch(1L,"1234","최지현","male",
//                27,"chlwlgus9584@naver.com");
//
//        Member member = mapper.memberPatchToMember(patch);
//
//        given(memberService.updateMember(Mockito.any(Member.class)))
//                .willReturn(member);
//
//        String content = gson.toJson(member);
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        patch("/members/" + patch.getMember_id())
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content));
//
//        // then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//
//    }
//    @Test
//    void getMemberTest() throws Exception {
//
//        Member member = new Member(1L,"1234","최지현","male",
//                27,"chlwlgus9584@naver.com");
//
//        given(memberService.findMember(1))
//                .willReturn(member);
//
//
//        ResultActions actions = mockMvc.perform(
//                get("/members/1")
//        );
//
//        actions.andExpect(status().isOk())
//                .andReturn();
//
//    }
//    @Test
//    void getMembersTest() throws Exception {
//
//        Member member1 = new Member(1L,"1234","최지현","male",
//                27,"chlwlgus9584@naver.com");
//        Member member2 = new Member(2L,"1234","최지현2","male",
//                27,"chlwlgus9582@naver.com");
//
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/members")
//
//        );
//
//        // then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//
//
//    }
//}
//
////    @Test
////    @DisplayName("모든 회원 찾기")
////    void getMembers() throws Exception {
////        // given
////        List<Member> members = new ArrayList<>();
////        Member member1 = new Member(1L, "1234", "홍길동", "M", 20, "hgd@gmail.com", null, null);
////        member1.setMember_id(1L);
////
////        Member member2 = new Member(2L, "1234", "김코딩", "M", 20, "kimcoding@gmail.com", null, null);
////        member2.setMember_id(2L);
////
////        Member member3 = new Member(3L, "1234", "김자바", "M", 20, "kimjava@gmail.com", null, null);
////        member2.setMember_id(3L);
////
////        given(memberService.findMembers()).willReturn(members);
////
////        String content = gson.toJson(members);
////
////        //when
////        ResultActions actions =
////                mockMvc.perform(
////                        get("/members")
////                                .accept(MediaType.APPLICATION_JSON)
////                                .contentType(MediaType.APPLICATION_JSON)
////                                .content(content));
////
////        //then
////        actions
////                .andExpect(status().isOk())
////                .andReturn();
////
////    }
////
////    @Test
////    @DisplayName("특정 회원 찾기")
////    void getMember() throws Exception {
////        Member member1 = new Member(1L, "1234", "김코딩", "M", 20,
////                "kimcoding@gmail.com", null, null);
////
////        given(memberService.findMember(1L)).willReturn(member1);
////
////        String content = gson.toJson(member1);
////
////        ResultActions actions =
////                mockMvc.perform(
////                        get("/members/"+ 1L)
////                                .accept(MediaType.APPLICATION_JSON)
////                                .contentType(MediaType.APPLICATION_JSON)
////                                .content(content));
////        actions
////                .andExpect(status().isOk());
////
////    }
////
////    @Test
////    @DisplayName("특정 회원 삭제")
////    void deleteMember() throws Exception {
////        long memberId = 1L;
////
////        doNothing().when(memberService).deleteMember(memberId);
////
////
////        // when
////        ResultActions actions =
////                mockMvc.perform(
////                        delete("/members/"+memberId)
////                );
////
////        //then
////        actions
////                .andExpect(status().isOk());
////    }
////}