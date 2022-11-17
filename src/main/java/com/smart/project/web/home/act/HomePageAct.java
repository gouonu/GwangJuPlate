package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;


    @GetMapping("/searchInput")
    public String getSearch(Model model, @RequestParam(value="searchInput") String input){

        List<ResVO> r = test.selectRes(input);
        model.addAttribute("res",r);

        return "/search2";
    }

}
