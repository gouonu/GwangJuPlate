package com.smart.project.proc;

import com.smart.project.annotation.Master;
import com.smart.project.web.home.vo.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Master
@Component
public interface Test {
	/**********************************************************************************************
	 * @Method 설명 : Test_Mapper.xml에 있는 쿼리를 사용 할 경우
	 * @작성일 :
	 * @작성자 :
	 * @변경이력 :
	 **********************************************************************************************/
	MemberVO getUserAccount(String userId);

	void joinInsert(MemberVO memberVO);

	List<ResVO> selectRes(String input);

	List<ResVO> selectRes2(Criteria cri);

	int selectTotalCnt(String result);

	List<MainVO> mainList();

	List<ResVO> ListDetailMatch(String resNumString);

	ResVO detailRestaurant(int num);

	List<ReplyVO> viewReply(int bno);

	void insertReview(ReplyVO r);

	int countReview(int bno);

	void deleteReview(Map map);

	void updateReview(ReplyVO replyVO);

	MainVO selectList(int index);

	void listViewsUp(int index);

	void detailViewsUp(int num);

	ReplyVO selectResReview(int num);

	void bookMarkInsert(BookMarkVO bookMarkVO);
	Map DetailImg(String workplace);

	int joinCount(String workplace);

	List resViewsTop();

	void updateViewsTop(String resNumString);

	List<BookMarkVO> bookList(String userId);
	ReplyVO getImageInfo(int rno);

	int idDuplicate(String userId);

	void bookDeletego(BookMarkVO bookMarkVO);

	int bookMarkCount(int resNum);

	void bookSlctDel(BookMarkVO bookMarkVO);

	List<ReplyVO> viewReply2(Map map);

	void ImgViewsUp(String crntImg);

	List<ReplyVO> detailReplyImg(int num);

	boolean bookCheck(BookMarkVO bookMarkVO);

	boolean logIdChk(MemberVO memberVO);

	String pwchk(String userID);

	List<ResVO> viewTopRes();
}
