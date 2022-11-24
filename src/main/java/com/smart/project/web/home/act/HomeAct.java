package com.smart.project.web.home.act;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {

	@RequestMapping("/")
	public String index(){
		return "index";
	}

	@RequestMapping("/list")
	public String list(){ return "list"; }

	@RequestMapping("/search2")
	public String search2(){ return "search"; }

	@RequestMapping("/detail")
	public String detail(){ return "detail"; }



}
