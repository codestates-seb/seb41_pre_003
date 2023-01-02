package com33.question.service;

import com33.exception.BusinessLogicException;
import com33.exception.ExceptionCode;
import com33.member.entity.Member;
import com33.member.service.MemberService;
import com33.question.entity.Like;
import com33.question.entity.Question;
import com33.question.repository.LikeRepository;
import com33.question.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {
    QuestionService questionService;
    QuestionRepository questionRepository;
    MemberService memberService;
    LikeRepository likeRepository;

    //추천 버튼을 누를시 like가 생성되면서 연관 매핑 테이블에 저장
    public Like createLike(Like like) {
        Question question = questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());
        Member member = memberService.getLoginMember(); // 로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else {
            Optional<Like> optionalLike = likeRepository.findLikeByQuestionAndMember(question, member);
            if(optionalLike.isPresent()){ //이미 추천을 했으면 추천이 되지 않고 에러메시지 출력
                throw new BusinessLogicException(ExceptionCode.LIKE_EXITS);
            }
            else {
                like.setQuestion(question);
                like.setMember(member);
                like.setStatus(true);
                question.setLikeCount(question.getLikeCount() + 1);
                questionRepository.save(question);

                question.addLike(like);
                member.addLike(like);

                return likeRepository.save(like);
            }
        }
    }

}