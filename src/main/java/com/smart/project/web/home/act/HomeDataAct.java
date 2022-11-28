package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.Criteria;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ReplyVO;
import com.smart.project.web.home.vo.ResVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {

    final private Test test;

    @PostMapping (value = {"/searchInput", "/searchInputPaging"})
    public Map getSearch2(@ModelAttribute Criteria cri) {
        Map<String, Object> data = new HashMap<>();

        log.error("시작/개수{}", cri);

        int start = cri.getPageStart();
        cri.setStartPage(start);
        log.error("변경값{}", cri);

        List<ResVO> r = test.selectRes2(cri);
        log.error("정보", r);


        data.put("r",r);
        return data;
    }

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
    public ResVO detailRes(@RequestBody Map map, HttpServletRequest request,HttpSession session){

        int num = Integer.valueOf(String.valueOf(map.get("num")));
        log.error("workplace :: {}",num);
        ResVO res = test.detailRestaurant(num);
        log.error("ResVO :: {}",res);
        session.setAttribute("d456",res.getWorkplace());
        session.setAttribute("wno",res.getNum());

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
