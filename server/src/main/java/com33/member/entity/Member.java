package com33.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com33.answer.entity.Answer;
import com33.question.entity.Like;
import com33.question.entity.Question;
import com33.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column()
    private String pw;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String gender;
    @Column(length = 255)
    private int age;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Tag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "question")
    private List<Like> likes = new ArrayList<>();


    public Member(long memberId, String pw, String name, String gender, int age, String email) {
        this.memberId = memberId;
        this.pw = pw;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
    }

    public void addQuestion(Question question){
        questions.add(question);
        if (question.getMember() != this) {
            question.setMember(this);
        }
    }
    public void addAnswer(Answer answer){
        answers.add(answer);
        if (answer.getMember() != this) {
            answer.setMember(this);
        }
    }

    public void addLike(Like like){
        likes.add(like);
        if (like.getMember() != this) {
            like.setMember(this);
        }
    }

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
