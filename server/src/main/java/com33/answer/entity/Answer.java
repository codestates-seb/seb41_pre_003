package com33.answer.entity;

import com33.member.entity.Member;
import com33.question.entity.Question;
import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Answer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long answer_id;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime create_date = LocalDateTime.now();
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    public void addMember(Member member) {
        this.member = member;
    }
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    public void addQuestion(Question question) {
        this.question = question;
    }

}
