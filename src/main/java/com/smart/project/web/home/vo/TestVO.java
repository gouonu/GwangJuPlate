package com.smart.project.web.home.vo;

import lombok.Data;

@Data
public class TestVO {
	private String result;
	private int startPage;
	private int perPage;

	// 특정 페이지 조회를 위한 클래스
	public int getPageStart() {
		// 특정 페이지의 범위를 정하는 구간, 현재 페이지의 게시글 시작 번호
		// 0 ~ 10 , 10 ~ 20 이런식으로
		return (this.startPage -1) * perPage;
	}

	public TestVO() {
		// 기본 생성자 : 최초 게시판에 진입시 필요한 기본값
		this.startPage = 0;
		this.perPage = 10;
	}

	// 현재 페이지 번호 startPage : getter, setter
	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		if(startPage <= 0) {
			this.startPage = 1;

		} else {
			this.startPage = startPage;
		}
	}


	// 페이지당 보여줄 게시글의 개수 perPage : getter, setter
	public int getperPage() {
		return perPage;
	}

	public void setperPage(int perPage) {
		int cnt = this.perPage;

		if(perPage != cnt) {
			this.perPage = cnt;
		} else {
			this.perPage = perPage;
		}

	}

	@Override
	public String toString() {
		return "Criteria [startPage=" + startPage + ", perPage=" + perPage + "]";
	}
}
