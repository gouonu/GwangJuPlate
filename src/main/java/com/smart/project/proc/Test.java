package com.smart.project.proc;

import com.smart.project.annotation.Master;
import com.smart.project.common.vo.MenuVO;
import com.smart.project.web.home.vo.*;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Master
@Component
public interface Test {
	/**********************************************************************************************
	 * @Method 설명 : Test_Mapper.xml에 있는 쿼리를 사용 할 경우
	 * @작성일 : 2021-02-15
	 * @작성자 : 김남현
	 * @변경이력 :
	 **********************************************************************************************/
//	List<TestVO> sqlMenu2(String userId);
	List<ResVO> selectRes(String result);
	List<MainVO> mainList();
//	void joinInsert(JoinVO joinVO);

	List<ResVO> ListDetailMatch(String resNumString);

	ResVO detailRestaurant(int num);

	List<ReplyVO> viewReply(int bno);

	void insertReview(ReplyVO r);

	int countReview(int bno);

	void deleteReview(Map map);
}
