package com.smart.project.web.home.vo;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class ResVO {

    private int num;
    private String tel;
    private int postcode;
    private String locAddr;
    private String roadAddr;
    private int roadPost;
    private String workplace;
    private String state;
    private double X;
    private double Y;
    private int resViews; // 상세 페이지 조회수
}
