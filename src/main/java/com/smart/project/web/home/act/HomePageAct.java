package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MemberVO;
import com.smart.project.web.home.vo.TestVO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class HomePageAct {
    final private Test test;

    // 잠깐 임시로 여기다가 회원가입

//    @GetMapping(value = "/register")
//    public String registerGet(MemberVO memberVO){
//        return "/register";
//    }
    @PostMapping(value = "/register")
    public String registerUser(@Valid MemberVO memberVO, Errors errors, Model model){
        if(errors.hasErrors()){
            // 실패시 입력 데이터 유지
            model.addAttribute("memberVO", memberVO);

            /* 회원가입 실패시 message 값들을 모델에 매핑해서 View로 전달 */
            Map<String, String> validateMap = new HashMap<>();

            for (FieldError error : errors.getFieldErrors()) {
                String validKeyName = "valid_" + error.getField();
                validateMap.put(validKeyName, error.getDefaultMessage());
            }

            // map.keySet() -> 모든 key값을 갖고온다.
            // 그 갖고온 키로 반복문을 통해 키와 에러 메세지로 매핑
            for (String key : validateMap.keySet()) {
                model.addAttribute(key, validateMap.get(key));
            }

            return "dddd/join";
        }

        test.joinInsert(memberVO);

        return "redirect:/";
    }

    public Map<String, String> validateHandler(Errors errors) {
        Map<String, String> validateResult = new HashMap<>();

        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = "valid_" + error.getField();
            validateResult.put(validKeyName, error.getDefaultMessage());
        }


        return validateResult;
    }
    }

//    @Service
//    @AllArgsConstructor
//    public class UserService {
//        // 회원가입 시, 유효성 체크
//        public Map<String, String> validateHandling(Errors errors) {
//            Map<String, String> validatorResult = new HashMap<>();
//
//            for (FieldError error : errors.getFieldErrors()) {
//                String validKeyName = String.format("valid_%s", error.getField());
//                validatorResult.put(validKeyName, error.getDefaultMessage());
//            }
//
//            return validatorResult;
//        }
//
//        // 회원가입
//        public void signUp(MemberVO memberVO) {
//            // 회원 가입 비즈니스 로직 구현
//        }
//    }


//    @Override
//    public Map<String, String> validateHandler(Errors errors) {
//        Map<String, String> validateResult = new HashMap<>();
//
//        for (FieldError error : errors.getFieldErrors()) {
//            String validKeyName = "valid_" + error.getField();
//            validateResult.put(validKeyName, error.getDefaultMessage());
//        }
//
//
//        return validateResult;
//    }
//




