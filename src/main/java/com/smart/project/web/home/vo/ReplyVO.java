package com.smart.project.web.home.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ReplyVO {

    private int rno; // 댓글 고유 번호
    private int bno; // 게시글 고유 번호

    private String reply; // 댓글 내용
    private String replyUser; // 댓글 작성자
    private Date replyDate; // 작성 날짜
    private Date updateDate; // 업데이트 날짜(수정, 삭제)
    private boolean replyDel; // 삭제됐는지

    private String originName; // 파일 원본 이름
    private String savedName; // 파일 저장될 이름(중복 이름으로 저장될 시 오류 발생)
    private String filePath; // 파일 경로
    private String modalName; // modal target될 이름
}
