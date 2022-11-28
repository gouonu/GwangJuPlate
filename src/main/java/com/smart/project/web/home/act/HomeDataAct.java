package com.smart.project.web.home.act;

import com.mysql.cj.MysqlxSession;
import com.mysql.cj.Session;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ReplyVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.stream.IntStream;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeDataAct {


    final private Test test;
    ArrayList workList = new ArrayList();


    ArrayList workList2 = new ArrayList();


    @ResponseBody
    @PostMapping("/mainList")
    public Map<String, Object> getMainList() {
        Map<String, Object> data = new HashMap<>();
        List<MainVO> m = test.mainList();
        data.put("list", m);
        log.error("{}", data);
        return data;
    }


    @PostMapping("/listDetail")
    @ResponseBody
    public Map<String, Object> listDetail(@RequestBody String[] resNum) {
        Map<String, Object> data = new HashMap<>();

        String resNumString = "";
        for (String r : resNum) {
            resNumString += r + ",";
        }
        resNumString = resNumString.substring(0, resNumString.length() - 1);
        log.error("resNumString :: {}", resNumString);
        List<ResVO> result = test.ListDetailMatch(resNumString);
        log.error("result :: {}", result);
        data.put("list", result);
//        log.error("result :: {}", result);
//        log.error("{}", data);

        return data;
    }

    @PostMapping("detailRes")
    @ResponseBody
    public ResVO detailRes(@RequestBody Map map, HttpServletRequest request, HttpSession session, Model model) {
////        model.addAttribute("workplace", place);
//        String workplace = String.valueOf(map.get("place"));
//        log.error("workplace :: {}",workplace);
//        ResVO res = test.detailRestaurant(workplace);
//        model.addAttribute("workplace", res.getWorkplace());
////        ResVO t = (ResVO)model.getAttribute("vo");
//        log.error("ResVO :: {}",res);

        int num = Integer.valueOf(String.valueOf(map.get("num")));
        log.error("workplace :: {}", num);
        ResVO res = test.detailRestaurant(num);
        log.error("ResVO :: {}", res);

        session.setAttribute("workplace", res.getWorkplace());
        session.setAttribute("num", res.getNum());

        workList.add(res.getWorkplace());
        workList2.add(res.getNum());
        session.setAttribute("able",workList);
        session.setAttribute("able2",workList2);

        log.error(String.valueOf(workList));
        log.error(String.valueOf(workList2));


        return res;

    }

    @PostMapping("viewReply")
    @ResponseBody
    public List<ReplyVO> viewReply(@RequestBody Map map) {
        int bno = Integer.valueOf(String.valueOf(map.get("bno")));
        log.error("bno :: {}", bno);
        List<ReplyVO> rep = test.viewReply(bno);
        return rep;
    }






}
