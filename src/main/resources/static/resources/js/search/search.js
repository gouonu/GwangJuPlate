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
            console.log(data.data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

            data.data.r.forEach(value=>{
                // console.log(value.num);
                axios.post("detailCount", {"bno":value.num}).then((count)=>{
                    count = count.data;
                    // console.log($("."+value.num));
                    $("."+value.num).children().children(".restaurant_info").children("div").eq(1).children().children(".restaurant_reviews").text(count);
                })
            });
        });




    }





}