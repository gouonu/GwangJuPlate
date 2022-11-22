package com.smart.project.web.home.act;

import com.mysql.cj.MysqlxSession;
import com.mysql.cj.Session;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeDataAct {


    final private Test test;




    @ResponseBody
    @PostMapping("/mainList")
    public Map<String, Object> getMainList(){
        Map<String, Object> data = new HashMap<>();
        List<MainVO> m = test.mainList();
        data.put("list",m);
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
        resNumString=resNumString.substring(0, resNumString.length() - 1);
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
    public ResVO detailRes(@RequestBody Map map){
////        model.addAttribute("workplace", place);
//        String workplace = String.valueOf(map.get("place"));
//        log.error("workplace :: {}",workplace);
//        ResVO res = test.detailRestaurant(workplace);
//        model.addAttribute("workplace", res.getWorkplace());
////        ResVO t = (ResVO)model.getAttribute("vo");
//        log.error("ResVO :: {}",res);

        int num = Integer.valueOf(String.valueOf(map.get("num")));
        log.error("workplace :: {}",num);
        ResVO res = test.detailRestaurant(num);
        log.error("ResVO :: {}",res);

        return res;

    }












}
