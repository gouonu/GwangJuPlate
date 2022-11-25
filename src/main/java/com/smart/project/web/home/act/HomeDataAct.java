package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ReplyVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
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


    @PostMapping("/listDetail")
    public Map<String, Object> listDetail(@RequestBody String[] resNum) {
        Map<String, Object> data = new HashMap<>();

        String resNumString = "";
        for (String r : resNum) {
            resNumString += r + ",";
        }
        resNumString=resNumString.substring(0, resNumString.length() - 1);
        List<ResVO> result = test.ListDetailMatch(resNumString);
        data.put("list", result);

        return data;
    }

    @PostMapping("detailRes")
    public ResVO detailRes(Model model, @RequestBody Map map){

        int num = Integer.valueOf(String.valueOf(map.get("num")));
        log.error("workplace :: {}",num);
        ResVO res = test.detailRestaurant(num);
        log.error("ResVO :: {}",res);

        return res;

    }

    @PostMapping("viewReply")
    public List<ReplyVO> viewReply(@RequestBody Map map){
        int bno = Integer.valueOf(String.valueOf(map.get("bno")));
        log.error("bno :: {}",bno);
        List<ReplyVO> rep = test.viewReply(bno);
        return rep;
    }

    @PostMapping("detailCount")
    public int detailCount(@RequestBody Map map){
        int bno = Integer.valueOf(String.valueOf(map.get("bno")));
        log.error("bno :: {}",bno);
        int count = test.countReview(bno);
        log.error("리뷰 수 :: {}", count);
        return count;
    }



    @PostMapping("selectList")
    public MainVO selectList(@RequestBody Map map){
        int index = Integer.valueOf(String.valueOf(map.get("index")));
//        log.error("index : {}",index);
        MainVO m = test.selectList(index);
        return m;
    }

    @PostMapping ("/searchInput")
    public Map getSearch(@RequestBody Map map) {
        Map<String, Object> data = new HashMap<>();
        String param = String.valueOf(map.get("query")); // 이부분 잘모름
        List<ResVO> r = test.selectRes(param);
        data.put("r",r);
        return data;
    }

    @PostMapping("listViewsUp")
    public void listViewsUp(@RequestBody Map map){
        int index = Integer.valueOf(String.valueOf(map.get("index")));
//        log.error("index : {}",index);
        test.listViewsUp(index);
    }

    @PostMapping("detailViewsUp")
    public void detailViewsUp(@RequestBody Map map){
        int num = Integer.valueOf(String.valueOf(map.get("num")));
//        log.error("num : {}",num);
        test.detailViewsUp(num);
    }













}
