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





}