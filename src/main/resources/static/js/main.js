/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
"use strict";

$(()=>{
    new Main();
})

class Main {

    constructor() {
        console.log("Main");
        this.eventBinding();
        this.listEventBinding();
    }


    eventBinding(){

        $('.category').on('click', (e)=> {
            console.log("카테고리 클릭");
        });

        $('#searchButton').on('click', (e)=>{
            console.log("검색 버튼 클릭");
        })
    }

    listEventBinding(){
        // 리뷰 더보기 버튼
        $('.more_review').on('click', (e)=>{
            $('.short_review').addClass('hidden');
            $('.long_review').removeClass('hidden');
            $('.more_review').addClass('hidden');
        });

        // 가고싶다(별) 버튼

        // 리스트 더보기
        $(function(){
            $('.mb-3').slice(0, 1).show(); // 초기갯수
            $('.btn_more_list').click(function(e){ // 클릭시 more
                e.preventDefault();
                $('.mb-3:hidden').slice(0, 1).show(); // 클릭시 more 갯수 지정
                if($('.mb-3:hidden').length == 0){ // 컨텐츠 남아있는지 확인
                    $('.btn_more_list').addClass('hidden');
                }
            });
        });
    }



}
