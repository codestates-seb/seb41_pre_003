package com33.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com33.answer.entity.Answer;
import com33.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
public class Question {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long questionId;
    @Column(length = 20, nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime create_date = LocalDateTime.now();
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @Column(nullable = false)
    private int viewCount;
    @Column(nullable = false)
    private int likeCount;
    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "memberId")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<QuestionTag> questionTagList = new ArrayList<>();

    public void addQuestionTag(QuestionTag questionTag) {
        this.questionTagList.add(questionTag);
        if(questionTag.getQuestion() != this){
            questionTag.addQuestion(this);
        }
    }

    @JsonIgnore
    @OneToMany(mappedBy = "question")
    private List<Like> likes = new ArrayList<>();

    public void addAnswer(Answer answer){
        answers.add(answer);
        if(answer.getQuestion() != this){
            answer.setQuestion(this);
        }
    }
    public void addLike(Like like){
        likes.add(like);
        if(like.getQuestion() != this){
            like.setQuestion(this);
        }
    }
}
