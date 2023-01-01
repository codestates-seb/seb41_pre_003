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

    public Like createLike(Like like){
        Question question = questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());
//        Member member = memberService.findVerifiedMember(like.getMember().getMemberId());
        Member member = memberService.getLoginMember();

        verifyExistQuestionMember(question, member);
        like.setQuestion(question);
        like.setMember(member);
        question.setLikeCount(question.getLikeCount()+1);
        questionRepository.save(question);

        question.addLike(like);
        member.addLike(like);

        return likeRepository.save(like);
    }
    public Like findLike(long questionId){
        Question question = questionService.findVerifiedQuestion(questionId);
        Member member = memberService.getLoginMember();
        Optional<Like> optionalLike = likeRepository.findLikeByQuestionAndMember(question, member);
        if(optionalLike.isPresent())
        return optionalLike.get();
        else throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);
    }
    public void verifyExistQuestionMember(Question question,Member member) {
        Optional<Like> optionalLike = likeRepository.findLikeByQuestionAndMember(question,member);
        if (optionalLike.isPresent())
            throw new BusinessLogicException(ExceptionCode.LIKE_EXITS);
    }
}