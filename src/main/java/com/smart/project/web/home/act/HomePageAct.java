package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.ReplyVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;


    @GetMapping("/searchInput")
    public String getSearch(Model model, @RequestParam(value="searchInput") String input) {
        List<ResVO> r = test.selectRes(input);
        model.addAttribute("res", r);
        model.addAttribute("input", input);
        return "search";
    }


    @PostMapping("reviewInput")
    public String reviewInput(String reviewText,String userId, Integer num){
        ReplyVO rep = new ReplyVO();
        rep.setReply(reviewText);
        rep.setBno(num);
        rep.setReplyUser(userId);
        log.error("rep :: {}", rep);
        test.insertReview(rep);

        return "redirect:/detail?num="+num;
    }

    @PostMapping("deleteReview")
    public String deleteReview(Integer rno, Integer bno){
        Map<String, Object> map = new HashMap();
        // Integer가 아니라 Object로 했더니 됨
        // Object가 최상위 클래스임..!!
        map.put("rno",rno);
        map.put("bno",bno);
        log.error("map :: {}", map);

        test.deleteReview(map);
        return "redirect:/detail?num="+bno;
    }

    @PostMapping("updateReview")
    public String updateReview(String updateText, int rno, int bno){
        Map<String, Object> map = new HashMap<>();
        map.put("updateText",updateText);
        map.put("rno",rno);
        map.put("bno",bno);
//        log.error("map :: {}", map);
        test.updateReview(map);

        return "redirect:/detail?num="+bno;
    }







}
