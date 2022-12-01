package com.smart.project.web.home.act;

import com.smart.project.Service.MemberService;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;

    private final MemberService memberService;

    @GetMapping("/register")
    public String signUpForm() {
        return "dddd/join";
    }

    /**
     * 회원가입 진행
     * @param
     * @return
     */
    @PostMapping("/register")
    public String signUp(MemberVO memberVO) {
        memberService.joinUser(memberVO);
        return "redirect:/"; //로그인 구현 예정
    }

    /**
     * 로그인 폼
     * @return
     */
    @GetMapping("/login")
    public String login(){

        return "index";
    }

    /**
     * 로그인 실패 폼
     * @return
     */
    @GetMapping("/access_denied")
    public String accessDenied() {
        return "asset_denied";
    }
    /**
     * 유저 페이지
     * @param model
     * @param authentication
     * @return
     */
    @GetMapping("/user_access")
    public String userAccess(Model model, Authentication authentication, HttpSession session, HttpServletRequest request, Principal principal) {
        //Authentication 객체를 통해 유저 정보를 가져올 수 있다.
        MemberVO memberVO = (MemberVO) authentication.getPrincipal();  //userDetail 객체를 가져옴
//            model.addAttribute("info", memberVO.getUserId() +"의 "+ memberVO.getUserName()+ "님");      //유저 아이디
        session.setAttribute("userId",memberVO.getUserId());
        session.setAttribute("userName",memberVO.getUserName());
        session.setAttribute("userSex",memberVO.getUserSex());
        session.setAttribute("userPhnum",memberVO.getUserPhnum());
        session.setAttribute("userAuth",memberVO.getUserAuth());
        session.setAttribute("appendDate",memberVO.getAppendDate());

        return "redirect:" + request.getHeader("Referer");
    }

    @RequestMapping(value="logout.do", method= RequestMethod.GET)
    public String logoutMainGET(HttpServletRequest request,MemberVO memberVO) throws Exception{
        HttpSession session = request.getSession();
        session.invalidate();


        return "redirect:" + request.getHeader("Referer");

    }

    @GetMapping(value = {"/searchInput", "searchInputPaging"})
    public String getSearch(Model model, @RequestParam(value="searchInput") String input, Criteria cri) {

        List<ResVO> r = test.selectRes(input);
        model.addAttribute("res", r);
        model.addAttribute("input", input);

        int selectTotalCnt = test.selectTotalCnt(input);
        log.error("가져온 정보의 총 개수 {}",selectTotalCnt);

        Paging paging = new Paging();
        paging.setCri(cri);
        paging.setTotalCount(selectTotalCnt);
        log.error("시작페이지 {}", paging.getStartPageNum());
        log.error("끝 페이지 {}", paging.getEndPageNum());

        model.addAttribute("paging", paging);

        model.addAttribute("selectTotalCnt", selectTotalCnt);

        return "search";
    }

    @PostMapping("reviewInput")
    public String reviewInput(String reviewText, String userId, Integer num, @RequestParam("imageFile") MultipartFile file) throws IOException {
        ReplyVO rep = new ReplyVO();
        rep.setReply(reviewText);
        rep.setBno(num);
        rep.setReplyUser(userId);
        log.error("rep :: {}", rep);

        if(!file.isEmpty()){
            // 파일 저장 위치
            String filePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\";
            rep.setFilePath(filePath);

            // 원래 파일 이름 추출
            String originName = file.getOriginalFilename();
            rep.setOriginName(originName);

            // 파일 이름으로 쓸 uuid 생성
            String uuid = UUID.randomUUID().toString();
            // 확장자 추출(ex : .png)
            String extension = originName.substring(originName.lastIndexOf("."));
            // uuid와 확장자 결합
            String savedName = (uuid + extension).substring(24);
            rep.setSavedName(savedName);
            String saveImage = rep.getFilePath() + rep.getSavedName();

            // 파일 저장
            file.transferTo(new File(saveImage));
            // DB에 정보 저장
            test.insertReview(rep);

            // 썸네일
            File thumbnailImg = new File(filePath, "s_" + savedName);

            BufferedImage boImg = ImageIO.read(new File(saveImage));
            BufferedImage btImg = new BufferedImage(120, 120, BufferedImage.TYPE_3BYTE_BGR);

            Graphics2D graphics2D = btImg.createGraphics();
            graphics2D.drawImage(boImg, 0, 0, 120, 120, null);

            ImageIO.write(btImg, "jpg", thumbnailImg);
        }else{
            test.insertReview(rep);
        }

        return "redirect:/detail?num="+num;
    }

    @PostMapping("deleteReview")
    public String deleteReview(Integer rno, Integer bno){
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
    public String updateReview(String reply, int rno, int bno, @RequestParam("updateImg") MultipartFile file) throws IOException {
        ReplyVO replyVO = new ReplyVO();
        replyVO.setRno(rno);
        replyVO.setBno(bno);
        replyVO.setReply(reply);
//        log.error("newReplyVO :: {}", replyVO);


        if(!file.isEmpty()){
            String filePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\";
            replyVO.setFilePath(filePath);

            String originName = file.getOriginalFilename();
            replyVO.setOriginName(originName);

            String uuid = UUID.randomUUID().toString();
            String extension = originName.substring(originName.lastIndexOf("."));
            String savedName = (uuid + extension).substring(24);
            replyVO.setSavedName(savedName);

            String saveImage = filePath + replyVO.getSavedName();
            file.transferTo(new File(saveImage));

            test.updateReview(replyVO);

            File thumbnailImg = new File(filePath, "s_" + savedName);

            BufferedImage boImg = ImageIO.read(new File(saveImage));
            BufferedImage btImg = new BufferedImage(120, 120, BufferedImage.TYPE_3BYTE_BGR);

            Graphics2D graphics2D = btImg.createGraphics();
            graphics2D.drawImage(boImg, 0, 0, 120, 120, null);

            ImageIO.write(btImg, "jpg", thumbnailImg);
        }else{
            ReplyVO imgList = test.getImageInfo(rno);
            replyVO.setOriginName(imgList.getOriginName());
            replyVO.setSavedName(imgList.getSavedName());
            replyVO.setFilePath(imgList.getFilePath());
            test.updateReview(replyVO);
        }

        return "redirect:/detail?num=" + bno;
    }




}
