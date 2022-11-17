package com.smart.project.web.home.act;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smart.project.component.CommonCodeComponent;
import com.smart.project.component.LocCodeComponent;
import com.smart.project.component.data.CodeObject;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {


    final private Test test;

    @GetMapping("/searchInput")
    public List<ResVO>  getSearch(@RequestParam(value="searchInput") String input){

        List<ResVO> r = test.selectRes(input);
//        log.error("{}", r);


        return r;
    }










}
