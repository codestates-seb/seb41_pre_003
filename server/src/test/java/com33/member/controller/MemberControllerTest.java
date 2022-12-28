//package com33.member.controller;
//
//import com33.member.dto.MemberDto;
//import com33.member.entity.Member;
//import com33.member.mapper.MemberMapper;
//import com33.member.service.MemberService;
//import org.junit.jupiter.api.Disabled;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.transaction.annotation.Transactional;
//import com.google.gson.Gson;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
////@Transactional
////@SpringBootTest
////@AutoConfigureMockMvc
//class MemberControllerTest {
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
//    @Disabled
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
//        // TODO MemberController의 patchMember() 핸들러 메서드를 테스트하는 테스트 케이스를 여기에 작성하세요.
//        // TODO Mockito를 사용해야 합니다. ^^
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
//        // TODO MemberController의 getMember() 핸들러 메서드를 테스트하는 테스트 케이스를 여기에 작성하세요.
//        // TODO Mockito를 사용해야 합니다. ^^
//        Member member = new Member("1234","최지현","male",
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
//        // TODO MemberController의 getMembers() 핸들러 메서드를 테스트하는 테스트 케이스를 여기에 작성하세요.
//        // TODO Mockito를 사용해야 합니다. ^^
//        Member member1 = new Member("1234","최지현","male",
//                27,"chlwlgus9584@naver.com");
//        Member member2 = new Member("1234","최지현2","male",
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