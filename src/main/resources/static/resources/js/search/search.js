"use strict";


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
            // console.log(data.data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

            data.data.r.forEach(value=>{
                // console.log(value);
                // console.log(value.workplace);
                axios.post("detailCount", {"bno":value.num}).then((count)=>{
                    count = count.data;
                    // console.log($("."+value.num));
                    $("."+value.num).children().children(".restaurant_info").children("div").eq(1).children().children(".restaurant_reviews").text(count);
                })


                axios.post("DetailImg", {"workplace":value.workplace}).then((e)=>{
                    // console.log(e.data);
                    let $i =  $("." + value.num).children().children().children();
                    if(e.data===""){
                        // console.log(value.workplace+" 이미지 없음");
                        $i.attr("src", "/image/empty.png");
                    }else {
                        console.log(value.workplace+" 이미지 있음");
                        // console.log(e.data.img1src);
                        $i.attr("src", e.data.img1src);
                    }
                })

            });
        });




    }





}