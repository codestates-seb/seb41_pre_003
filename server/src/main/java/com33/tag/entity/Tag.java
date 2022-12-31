package com33.tag.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com33.member.entity.Member;
import com33.question.entity.QuestionTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    @Column(nullable = false)
    private String tagName;
    @Column(nullable = false)
    private int tagCount;

    @ManyToOne(optional = false)
    @JoinColumn(name = "memberId")
    private Member member;
    @JsonIgnore
    @OneToMany(mappedBy = "tag")
    private List<QuestionTag> questionTagList = new ArrayList<>();

    // 연관 관계 메서드
    public void addQuestionTag(QuestionTag questionTag) {
        this.questionTagList.add(questionTag);
        if (questionTag.getTag() != this) {
            questionTag.addTag(this);
        }
    }
}