//package com33.slice.controller.question;
//
//import com.google.gson.Gson;
//import com33.member.service.MemberService;
//import com33.question.dto.QuestionDto;
//import com33.question.entity.Question;
//import com33.question.mapper.QuestionMapper;
//import com33.question.service.QuestionService;
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
//
//import java.net.URI;
//
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class QuestionControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private QuestionService questionService;
//
//    @Autowired
//    private QuestionMapper mapper;
//
//    @MockBean
//    private MemberService memberService;
//
//
//    @Test
//    void getQuestion() throws Exception {
//
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setContent("content");
//        question.setTitle("title");
//
//        //question.setCreate_date(LocalDateTime.MAX);
//
//        ResultActions actions = mockMvc.perform(
//                get("/questions/1")
//
//        );
//        //then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//
//    }
//
//
//    @Test
//    void getQuestions() throws Exception {
//
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setContent("content");
//        question.setTitle("title");
//
//        Question question1 = new Question();
//        question1.setQuestionId(2L);
//        question1.setContent("contents");
//        question1.setTitle("titles");
//
//        ResultActions actions = mockMvc.perform(
//                get("/questions"));
//
//
//        //then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//    }
//
//    @Test
//    void patchQuestions() throws Exception {
//
//        QuestionDto.Response responseBody = new QuestionDto.Response(1L, 1L, "wow", "yeah", null);
//
//        QuestionDto.Patch patch = new QuestionDto.Patch(1L, "wow", "yeah", 1L);
//
//        Question question = mapper.questionPatchToQuestion(patch);
//
//        given(questionService.updateQuestion(Mockito.any(Question.class)))
//                .willReturn(question);
//
//        String content = gson.toJson(question);
//        ResultActions actions =
//                mockMvc.perform(
//                        patch("/questions/1")
//                        .accept(MediaType.APPLICATION_JSON)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content));
//
//
//        //then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//    }
//
//
//        @Test
//        void deleteQuestions () throws Exception {
//            long questionId = 1L;
//
//            doNothing().when(questionService).deleteQuestion(questionId);
//
//
//            // when
//            ResultActions actions =
//                    mockMvc.perform(
//                            delete("/questions/1"));
//
//            //then
//            MvcResult result = actions
//                .andExpect(status().isNoContent())
//                .andReturn();
//        }
//
//    }