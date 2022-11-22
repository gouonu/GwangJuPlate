package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;


    @GetMapping("/searchInput")
    public String getSearch(Model model, @RequestParam(value="searchInput") String input) {

        List<ResVO> r = test.selectRes(input);
        model.addAttribute("res", r);
        model.addAttribute("input", input);
        return "search2";
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

    @PostMapping ("/searchInput/page")
    @ResponseBody
    public Map getSearchPage(@RequestBody Map map) {
        Map<String, Object> data = new HashMap<>();
        String param = String.valueOf(map.get("query")); // 이부분 잘모름
        List<ResVO> r = test.selectRes2(param);
        data.put("r",r);
        return data;
    }







}
