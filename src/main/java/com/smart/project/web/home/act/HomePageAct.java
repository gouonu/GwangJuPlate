package com.smart.project.web.home.act;

import com.smart.project.Service.MemberService;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MemberVO;
import com.smart.project.web.home.vo.TestVO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
//    @PostMapping(value = "/register")
//    public String registerUser(@Valid MemberVO memberVO, Errors errors, Model model){
//        if(errors.hasErrors()){
//            // 실패시 입력 데이터 유지
//            model.addAttribute("memberVO", memberVO);
//
//            /* 회원가입 실패시 message 값들을 모델에 매핑해서 View로 전달 */
//            Map<String, String> validateMap = new HashMap<>();
//
//            for (FieldError error : errors.getFieldErrors()) {
//                String validKeyName = "valid_" + error.getField();
//                validateMap.put(validKeyName, error.getDefaultMessage());
//            }
//
//            // map.keySet() -> 모든 key값을 갖고온다.
//            // 그 갖고온 키로 반복문을 통해 키와 에러 메세지로 매핑
//            for (String key : validateMap.keySet()) {
//                model.addAttribute(key, validateMap.get(key));
//            }
//            memberVO.setUserAuth("User");
//
//            return "dddd/join";
//        }
//
//        test.joinInsert(memberVO);
//
//        return "redirect:/";
//    }
//
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
    @Controller
    @RequiredArgsConstructor
    public class UserController {
        @Autowired
        private final MemberService memberService;
    @GetMapping("/register")
    public String signUpForm() {
        return "register";
    }

    /**
     * 회원가입 진행
     * @param user
     * @return
     */
    @PostMapping("/register")
    public String signUp(MemberVO memberVO) {
        memberService.joinUser(memberVO);
        return "redirect:/"; //로그인 구현 예정
    }

        /**
         * 로그인 폼
         * @return
         */
        @GetMapping("/login")
        public String login(){

            return "login";
        }



        /**
         * 로그인 실패 폼
         * @return
         */
        @GetMapping("/access_denied")
        public String accessDenied() {
            return "asset_denied";
        }
        /**
         * 유저 페이지
         * @param model
         * @param authentication
         * @return
         */
        @GetMapping("/user_access")
        public String userAccess(Model model, Authentication authentication,HttpSession session) {
            //Authentication 객체를 통해 유저 정보를 가져올 수 있다.
            MemberVO memberVO = (MemberVO) authentication.getPrincipal();  //userDetail 객체를 가져옴
            model.addAttribute("info", memberVO.getUserId() +"의 "+ memberVO.getUserName()+ "님");      //유저 아이디
            session.setAttribute("userId",memberVO.getUserId());
            return "redirect:/";
        }
    }
    @RequestMapping(value="logout.do", method= RequestMethod.GET)
    public String logoutMainGET(HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        session.invalidate();

        return "redirect:/";

    }
    }



