package com.smart.project.web.home.act;

import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {

	@RequestMapping("/")
	public String index(){
		return "index";
	}

	@RequestMapping("/search")
	public String search(){
		return "search_seongeun";
	}

	@RequestMapping("/list")
	public String list(){ return "list"; }

	@RequestMapping("/search2")
	public String search2(){ return "search"; }

	@RequestMapping("/detail")
	public String detail(){ return "detail"; }



}
