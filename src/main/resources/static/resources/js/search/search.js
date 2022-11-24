"use strict";


import listTemplate from "@/main/listCard.html";
import searchTemplate from "@/search/search2-1.html";

$(()=>{
    new Search();
})

export class Search {

    constructor() {
        console.log("Search");

        this.searchEvent();
        this.pagination();
    }

    searchEvent() {
        console.log("검색 이벤트");
        let result = $('#query').text();
        //
        let startPage = 1;
        let perPage = 10;
        console.log(result)
        let searchTemplate = require('@/search/search2-1.html');
        let object = {
            "result":result,
            "startPage": startPage,
            "perPage" : perPage
        }
        axios({
            method:"post",
            url:"/searchInput",
            params : object

            }).then((data)=>{
            console.log(data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

            var map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(37.3595704, 127.105399),
                zoom: 10
            });
        });

            // _.forEach(data.data.r, (obj)=> {
            //     let latitude = obj.x;
            //     let longitude = obj.y;
            //     console.log(latitude);
            //     console.log(longitude);
            //     var marker = new naver.maps.Marker({
            //         position: new naver.maps.LatLng(latitude, longitude),
            //         map: map
            //     });
            // });


        this.paginationBtn();

    }

    pagination(){
        $('.paginationUl > li').on('click', (e)=>{
            let currentPage = $(e.currentTarget).text();

            console.log(currentPage);
            console.log("검색 이벤트");
            let result = $('#query').text();
            //
            let startPage = currentPage;
            let perPage = 10;
            console.log(result)
            let searchTemplate = require('@/search/search2-1.html');
            let object = {
                "result" : result,
                "startPage": startPage,
                "perPage" : perPage
            }
            axios({
                method:"post",
                url:"/searchInput",
                params : object

            }).then((data)=>{
                console.log(data);
                $('.list_restaurants_wrapper').empty();
                $('.list_restaurants_wrapper').append(searchTemplate(data));

                // var map = new naver.maps.Map('map', {
                //     center: new naver.maps.LatLng(37.3595704, 127.105399),
                //     zoom: 10
                // });
            });
        });




    }

    // 페이지 버튼 생성
    paginationBtn(){
        let paginationUl = $('.paginationUl'); // 추가될 곳
        let pageHtml = "";

        let selectTotalCnt = $('.selectTotalCnt').text(); // 총 데이터 수
        let endPageNum = Math.ceil(selectTotalCnt/10); // 끝 페이지 번호(총 페이지 수)
        let currentPage = 1 // 현재 페이지 (임시1)
        let pageCount = 10; // 페이지 수 범위

        // 총 데이터 수가 페이지 범위보다 작다면
        if(selectTotalCnt < pageCount){
            pageCount = selectTotalCnt;
        }

        // 총 데이터 수가 페이지 수 보다 작다면
        if (selectTotalCnt < endPageNum) {
            endPageNum = selectTotalCnt;
        }

        let startPageNum = endPageNum - (pageCount-1); // 화면에 보여질 첫 번째 페이지 번호
        let next = endPageNum + 1;
        let prev = startPageNum -1;

        if (prev > 0) {
            pageHtml += "<li><a href='#' class='prevPageBtn' style='margin-right: 25px'> 이전 </a></li>";
        }

        //페이징 번호 표시 10개씩 끊어야함(for문 안에 조건문), 이전 다음 버튼 현재 기능 없음
        for (let i = currentPage; i <= endPageNum; i++) {
            pageHtml +=
                "<li class='page_btn_list' style='margin-right: 25px'><a href='#'>" + i + "</a></li>";
        }

        if (endPageNum < selectTotalCnt) {
            pageHtml += "<li><a href='#' class='nextPageBtn'> 다음 </a></li>";
        }

        paginationUl.html(pageHtml);
    }


}