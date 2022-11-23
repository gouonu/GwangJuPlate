package com.smart.project.web.home.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ReplyVO {

    private int rno;
    private int bno;

    private String reply;
    private String replyUser;
    private Date replyDate;
    private Date updateDate;
}
