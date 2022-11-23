package com.smart.project.proc;

import com.smart.project.annotation.Master;
import com.smart.project.web.home.vo.Criteria;
import com.smart.project.web.home.vo.MainVO;
import com.smart.project.web.home.vo.ResVO;
import org.springframework.stereotype.Component;

import java.util.List;

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
	List<ResVO> selectRes(String input);
	List<ResVO> selectRes2(Criteria cri);
	int selectTotalCnt(String result);
	List<MainVO> mainList();
//	void joinInsert(JoinVO joinVO);


}
