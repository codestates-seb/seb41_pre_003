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

    public Like createLike(Like like) {
        Question question = questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());
        Member member = memberService.getLoginMember();
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LONGIN);
        } else {
            Optional<Like> optionalLike = likeRepository.findLikeByQuestionAndMember(question, member);
            if(optionalLike.isPresent()){
                throw new BusinessLogicException(ExceptionCode.LIKE_EXITS);
            }
            else {
                verifyExistQuestionMember(question, member);
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
    public void verifyExistQuestionMember(Question question,Member member) {
        Optional<Like> optionalLike = likeRepository.findLikeByQuestionAndMember(question,member);
        if (optionalLike.isPresent())
            throw new BusinessLogicException(ExceptionCode.LIKE_EXITS);
    }
}