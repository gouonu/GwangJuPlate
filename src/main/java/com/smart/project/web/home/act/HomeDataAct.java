package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {

    final private Test test;
    ArrayList<String>wpl = new ArrayList<String>();
    ArrayList<String> wpn = new ArrayList<String>();
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
    public Map<String, Object> getMainList() {
        Map<String, Object> data = new HashMap<>();
        List<MainVO> m = test.mainList();
        data.put("list", m);
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
        resNumString = resNumString.substring(0, resNumString.length() - 1);
        log.error("resNumString :: {}", resNumString);
        resNumString=resNumString.substring(0, resNumString.length() - 1);
        List<ResVO> result = test.ListDetailMatch(resNumString);
        data.put("list", result);

        return data;
    }

    @PostMapping("detailRes")
    public ResVO detailRes(@RequestBody Map map, HttpServletRequest request, HttpSession session, Model model) {
        int num = Integer.valueOf(String.valueOf(map.get("num")));
        log.error("workplace :: {}",num);
        ResVO res = test.detailRestaurant(num);
        log.error("ResVO :: {}", res);
        wpl.add(res.getWorkplace());
        wpn.add(String.valueOf(res.getNum()));
        List<String> wpchk = wpl.stream().distinct().collect(Collectors.toList());
        List<String> wnchk = wpn.stream().distinct().collect(Collectors.toList());
        session.setAttribute("able",wpchk);
        session.setAttribute("able2",wnchk);
        session.getAttribute("userId");
        session.setAttribute("resNum",res.getNum());
        session.setAttribute("reswpl",res.getWorkplace());

        log.error(String.valueOf(wpchk));
        log.error(String.valueOf(wnchk));

        return res;

    }

        @RequestMapping(value = "delete.do", method = RequestMethod.GET)
        public void Delete(HttpServletRequest request, HttpServletResponse response) throws IOException {
            wpl.clear();
            wpn.clear();
            HttpSession session = request.getSession();
            session.removeAttribute("able");
            session.removeAttribute("able2");
            String referer = request.getHeader("Referer");
            response.sendRedirect(referer);
        }
    @RequestMapping("bookMarkInput")
    public BookMarkVO bookMarkInput(Map map, HttpSession session, HttpServletRequest request) throws IOException{
        String id = (String)request.getSession().getAttribute("userId");
        int resnum = (int)request.getSession().getAttribute("resNum");
        String reswpl = (String)request.getSession().getAttribute("reswpl");
        BookMarkVO bookMarkVO =new BookMarkVO();
        bookMarkVO.setUserId(id);
        bookMarkVO.setResNum(resnum);
        bookMarkVO.setResWorkplace(reswpl);
        log.error(id);
        log.error(String.valueOf(resnum));
        log.error(reswpl);
        BookMarkVO data = bookMarkVO;
        test.bookMarkInsert(bookMarkVO);
        return data;
    }
@RequestMapping("bookModal")
public List<BookMarkVO> bookModal(HttpServletRequest request){
        String userId =(String) request.getSession().getAttribute("userId");
        List<BookMarkVO> data = test.bookList(userId);
        return data;
}
@RequestMapping("bookDelete")
public BookMarkVO bookDelete(HttpServletRequest request){
        String userID=(String) request.getSession().getAttribute("userId");
        String reswpl=(String) request.getSession().getAttribute("reswpl");
        int resNum =(int)request.getSession().getAttribute("resNum");
        BookMarkVO bookMarkVO =new BookMarkVO();
        bookMarkVO.setUserId(userID);
        bookMarkVO.setResNum(resNum);
        bookMarkVO.setResWorkplace(reswpl);
        BookMarkVO data = bookMarkVO;
        test.bookDeletego(bookMarkVO);
        return data;
    }
    @PostMapping("bookCount")
    public int bookCount(HttpServletRequest request, Map map){
//        int re2 = Integer.valueOf(String.valueOf(map.get("resNum")));
//        log.error(String.valueOf(re2));
        int resNum =(int)request.getSession().getAttribute("resNum");
        int count = test.bookMarkCount(resNum);
        log.error("리뷰 수 :: {}", count);
        return count;
    }
//    @RequestMapping(value = "bookCount")
//    public int bookCount(@RequestBody Map map){
//        int resNum = Integer.valueOf(String.valueOf(map.get("bno")));
//        log.error("왜");
//        int count = test.bookMarkCount(resNum);
//        return count;
//    }
    @RequestMapping("bookSlct")
    public BookMarkVO bookSlct(@RequestBody Map map,HttpServletRequest request){
        String userID = (String) request.getSession().getAttribute("userId");
        String workplace = String.valueOf(map.get("workplace"));
        BookMarkVO bookMarkVO = new BookMarkVO();
        bookMarkVO.setResWorkplace(workplace);
        bookMarkVO.setUserId(userID);
        BookMarkVO result =bookMarkVO;
        test.bookSlctDel(bookMarkVO);
        return result;




    }

    @PostMapping("viewReply")

    public List<ReplyVO> viewReply(@RequestBody Map map) {
        int bno = Integer.valueOf(String.valueOf(map.get("bno")));
        log.error("bno :: {}", bno);
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

