package com.smart.project.web.home.vo;

import lombok.Data;

@Data
public class FileVO {

    private int ino; // 파일 고유 넘버
    private String originName; // 파일 원본 이름
    private String savedName; // 파일 저장될 이름
    private String filePath; // 파일 경로

}
