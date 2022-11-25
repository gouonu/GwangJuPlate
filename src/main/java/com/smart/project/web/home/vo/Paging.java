package com.smart.project.web.home.vo;

import lombok.Data;

@Data
public class Paging {
    private Criteria cri; // page . perPageNum
    private int totalCount; // 총 게시물 개수
    private int displayPageNum = 10; //하단에 출력되는 페이지 개수
    private int startPageNum; // 시작페이지 번호 3,10일떄 1    11 -> 2
    private int endPageNum; // 끝페이지 번호 (총게시물 수에따라 조정이필요하다)
    private boolean prev ;  // 이전버튼(true,false)
    private boolean next; //다음버튼 (true , false)

    // 전체 게시글의 수를 저장하는 메서드
    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        pageMaker();
    }

    //페이징 처리에 필요한 계산 메서드
    public void pageMaker() {
        //1. 화면에 보여질 마지막 페이지 번호(계산수식)
        endPageNum = (int) (Math.ceil(cri.getStartPage() / (double) displayPageNum) * displayPageNum);

        //2. 화면에 보여줄 시작페이지
        startPageNum = (endPageNum-displayPageNum)+1;

        if (startPageNum <= 0) {
            startPageNum = 1;
        }
        //3.전체 마지막 페이지 계산
        int tempEndPage = (int)(Math.ceil(totalCount/(double)cri.getPerPage()));
        //4. 화면에 보여줄 마지막 페이지의 유효성검사.
        if(tempEndPage < endPageNum) {
            endPageNum = tempEndPage;
        }
        //5. 이전페이지 버튼 생성 여부
        prev = startPageNum == 1 ? false : true;

        //6. 다음페이지 버튼 생성 여부
        next = endPageNum < tempEndPage ? true : false;

    }


}
