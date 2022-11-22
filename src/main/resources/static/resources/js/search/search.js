"use strict";


import listTemplate from "@/main/mainListCard.html";
import searchTemplate from "@/search/search2-1.html";

$(()=>{
    new Search();
})

export class Search {

    constructor() {
        console.log("Search");
        this.searchEvent();
        this.searchDetailEvent();
    }

    searchEvent() {
        // console.log("검색 이벤트");
        let query = $('#query').text();
        console.log("검색어 : ", query);
        let searchTemplate = require('@/search/search2-1.html');

        axios.post('/searchInput',{"query":query}).then((data)=>{
            console.log(data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

        });
    }

    // 맛집 클릭해서 상세 페이지로 넘어가는 이벤트
    searchDetailEvent(){

        // $('.list_item').on("click", (e)=>{
        //     let resInfo = $(e.currentTarget);
        //     console.log(resInfo);
        //     console.log("클릭");
        // })

    }





}