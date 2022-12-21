package com33.question.entity;

import com33.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Question {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long question_id;
    @Column(length = 20, nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime create_date = LocalDateTime.now();
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
