package com.smart.project.web.home.act;

import com.smart.project.Service.MemberService;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MemberVO;
import com.smart.project.web.home.vo.TestVO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class HomePageAct {
    final private Test test;

    @Controller
    @RequiredArgsConstructor
    public class UserController {
        @Autowired
        private final MemberService memberService;
    @GetMapping("/register")
    public String signUpForm() {

        return "dddd/join";
    }

    /**
     * 회원가입 진행
     * @param
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

            return "index";
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





    @GetMapping("/searchInput")
    public String getSearch(Model model, @RequestParam(value="searchInput") String input) {
        List<ResVO> r = test.selectRes(input);
        model.addAttribute("res", r);
        model.addAttribute("input", input);
        return "search";
    }

    @PostMapping ("/searchInput")
    @ResponseBody
    public Map getSearch(@RequestBody Map map) {
        Map<String, Object> data = new HashMap<>();
        String param = String.valueOf(map.get("query")); // 이부분 잘모름
        List<ResVO> r = test.selectRes(param);
        data.put("r",r);
        return data;
    }







}
