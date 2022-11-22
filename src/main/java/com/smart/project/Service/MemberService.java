package com.smart.project.Service;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Member;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService{
    SimpleDateFormat format = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:sss");
    Date time = new Date();
    String localTime = format.format(time);

    @Autowired
    Test test;

    @Transactional
    public void joinUser(MemberVO memberVO){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        memberVO.setUserPw(passwordEncoder.encode(memberVO.getPassword()));
        memberVO.setUserAuth("USER");
        memberVO.setAppendDate(localTime);
        memberVO.setUpdateDate(localTime);
        test.joinInsert(memberVO);
    }



    public MemberVO loadUserByUsername(String userId) throws UsernameNotFoundException {
        //여기서 받은 유저 패스워드와 비교하여 로그인 인증
        MemberVO memberVO = test.getUserAccount(userId);
        if (memberVO == null){
            throw new UsernameNotFoundException("User not authorized.");
        }
        return memberVO;
    }
}