package com33.member.entity;

import com33.answer.entity.Answer;
import com33.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long member_id;
    @Column(nullable = false)
    private String pw;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 2, nullable = false)
    private String gender;

    private int age;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    public void addQuestion(Question question){
        questions.add(question);
    }
    public void addAnswer(Answer answer){
        answers.add(answer);
    }
}
