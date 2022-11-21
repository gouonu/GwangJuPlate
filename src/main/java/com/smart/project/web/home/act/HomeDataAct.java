package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MainVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {


    final private Test test;

    @PostMapping("/mainList")
    public Map<String, Object> getMainList(){
        Map<String, Object> data = new HashMap<>();
        List<MainVO> m = test.mainList();
        data.put("list",m);
        log.error("{}", data);
        return data;
    }










}
