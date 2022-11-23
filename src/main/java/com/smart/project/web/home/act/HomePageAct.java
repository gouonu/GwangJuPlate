package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ResVO;
import com.smart.project.web.home.vo.TestVO;
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

        int selectTotalCnt = test.selectTotalCnt(input);
        log.error("가져온 정보의 총 개수 {}",selectTotalCnt);
        model.addAttribute("selectTotalCnt", selectTotalCnt);

        return "search2";
    }

    @PostMapping ("/searchInput")
    @ResponseBody
    public Map getSearch(@ModelAttribute TestVO testVO) {
        Map<String, Object> data = new HashMap<>();
        
        log.error("시작/개수{}", testVO);
        
        int start = testVO.getPageStart();
        testVO.setStartPage(start);
        log.error("변경값{}", testVO);
        
        List<ResVO> r = test.selectRes2(testVO);
        log.error("정보", r);


        data.put("r",r);
        return data;
    }








}
