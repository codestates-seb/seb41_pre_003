package com33.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com33.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "LIKES")
public class    Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "memberId")
    private Member member;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "questionId")
    private Question question;
}
