package com33.member.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Min;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/members")
public class MemberController {
    private final Map<Long, Map<String, Object>> members = new HashMap<>();
    @PostConstruct
    public void init() { //더미 데이터
        Map<String, Object> member1 = new HashMap<>();
        long memberId = 1L;
        member1.put("memberId", memberId);
        member1.put("password","1234");
        member1.put("email", "hgd@gmail.com");
        member1.put("name", "홍길동");
        member1.put("phone", "010-1234-5678");
        member1.put("gender", "Male");
        member1.put("age","27");
        members.put(memberId, member1);

    }

    @GetMapping
    public ResponseEntity getMembers() {
        return  new ResponseEntity<>(members,HttpStatus.OK);
    }
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Min(1) long memberId) {
        return new ResponseEntity<>(members.get(memberId),HttpStatus.OK);
    }
    @PostMapping("/delete/{member-id}")
    public ResponseEntity deleteMember(){
        members.remove(1L);
        if (members.size() == 0) return new ResponseEntity<>("삭제완료",HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(members,HttpStatus.OK);
    }

}
