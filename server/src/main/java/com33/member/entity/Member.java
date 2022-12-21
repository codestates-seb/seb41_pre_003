package com33.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

}
