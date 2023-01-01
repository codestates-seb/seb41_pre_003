//package com33.slice.controller.answer;
//
//
//import com.google.gson.Gson;
//import com33.answer.entity.Answer;
//import com33.answer.mapper.AnswerMapper;
//import com33.answer.service.AnswerService;
//import com33.member.entity.Member;
//import com33.member.service.MemberService;
//import com33.question.entity.Question;
//import com33.question.mapper.QuestionMapper;
//import com33.question.service.QuestionService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class AnswerControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private AnswerService answerService;
//
//    @Autowired
//    private AnswerMapper mapper;
//
//    @MockBean
//    private QuestionService questionService;
//
//    @MockBean
//    private  MemberService memberService;
//
//    @Test
//    void getAnswer() throws Exception {
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setContent("content");
//        question.setTitle("title");
//
//
//        Answer answer = new Answer();
//        answer.setAnswerId(1L);
//        answer.setContent("content");
//        answer.setQuestion(question);
//
//        Member member = new Member(1L,"1234", "김코딩", "M", 20, "kimcoding@gmail.com");
//        question.setMember(member);
//        answer.setMember(member);
//
//
//
//
//
//
//        ResultActions actions = mockMvc.perform(
//                get("/questions/1/answers/"));
//
//
//        //then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//
//    }
//
//    @Test
//    void getAnswers() throws Exception {
//        Question question = new Question();
//        question.setQuestionId(1L);
//        question.setContent("content");
//        question.setTitle("title");
//
//        Answer answer = new Answer();
//        answer.setAnswerId(1L);
//        answer.setContent("content");
//        answer.setQuestion(question);
//
//        Answer answer1 = new Answer();
//        answer.setAnswerId(2L);
//        answer.setContent("content1");
//        answer.setQuestion(question);
//
//
//
//
//        ResultActions actions = mockMvc.perform(
//                get("/questions/1/answers"));
//
//
//        //then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andReturn();
//
//    }
//
//    @Test
//    void deleteAnswer() throws Exception {
//        long answerId= 1L;
//
//        doNothing().when(answerService).deleteAnswer(answerId);
//
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        delete("/questions/1/answers")
//                );
//
//        //then
//        actions
//                .andExpect(status().isNoContent());
//    }
//}