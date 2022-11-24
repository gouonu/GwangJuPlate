package com.smart.project.web.home.vo;

import lombok.Data;

import java.util.Date;

@Data
public class MainVO {
    private String title;
    private String context;
    private String resNum;
    private int index;
    private String image;
    private int listViews; // 조회수
    private Date listDate; // 게시 날짜

}
