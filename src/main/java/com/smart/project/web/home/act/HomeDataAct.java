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
//        log.error("resNumString :: {}", resNumString);
        List<ResVO> result = test.ListDetailMatch(resNumString);
//        log.error("result :: {}", result);
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

    @PostMapping("viewReply")
    @ResponseBody
    public List<ReplyVO> viewReply(@RequestBody Map map){
        int bno = Integer.valueOf(String.valueOf(map.get("bno")));
        log.error("bno :: {}",bno);
        List<ReplyVO> rep = test.viewReply(bno);
        return rep;
    }

    @PostMapping("detailCount")
    @ResponseBody
    public int detailCount(@RequestBody Map map){
        int bno = Integer.valueOf(String.valueOf(map.get("bno")));
        log.error("bno :: {}",bno);
        int count = test.countReview(bno);
        log.error("리뷰 수 :: {}", count);
        return count;
    }

    @PostMapping("reviewInput")
//    @ResponseBody
    public String reviewInput(String reviewText,String userId, Integer num){
//        log.error("text :: {}", reviewText);
//        String result = String.format("리뷰 내용 : %s  /  유저 아이디 : %s  /  음식점 번호 : %s",reviewText,userId,num);

        ReplyVO rep = new ReplyVO();

        rep.setReply(reviewText);
        rep.setBno(num);
        rep.setReplyUser(userId);
//        rep.setRno(1); // auto increment
        log.error("rep :: {}", rep);
        test.insertReview(rep);

//        String url = "redirect:/detail?num="+num;
        return "redirect:/detail?num="+num;
    }

    @PostMapping("deleteReview")
//    @ResponseBody
    public String deleteReview(Integer rno, Integer bno){
//        log.error("rno :: {}", rno);
//        log.error("bno :: {}", bno);
        Map<String, Object> map = new HashMap();
        // Integer가 아니라 Object로 했더니 됨
        // Object가 최상위 클래스임..!!
        map.put("rno",rno);
        map.put("bno",bno);
        log.error("map :: {}", map);

        test.deleteReview(map);
        return "redirect:/detail?num="+bno;
    }

    @PostMapping("updateReview")
    public String updateReview(String updateText, int rno, int bno){
        Map<String, Object> map = new HashMap<>();
        map.put("updateText",updateText);
        map.put("rno",rno);
        map.put("bno",bno);
        log.error("map :: {}", map);
        test.updateReview(map);

        return "redirect:/detail?num="+bno;
    }

    @PostMapping("selectList")
    @ResponseBody
    public MainVO selectList(@RequestBody Map map){
        int index = Integer.valueOf(String.valueOf(map.get("index")));
//        log.error("index : {}",index);
        MainVO m = test.selectList(index);
        return m;
    }

    @PostMapping("listViewsUp")
    @ResponseBody
    public void listViewsUp(@RequestBody Map map){
        int index = Integer.valueOf(String.valueOf(map.get("index")));
//        log.error("index : {}",index);
        test.listViewsUp(index);
    }

    @PostMapping("detailViewsUp")
    @ResponseBody
    public void detailViewsUp(@RequestBody Map map){
        int num = Integer.valueOf(String.valueOf(map.get("num")));
//        log.error("num : {}",num);
        test.detailViewsUp(num);
    }












}
