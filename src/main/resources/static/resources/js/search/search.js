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
    }

    searchEvent() {
        console.log("검색 이벤트");
        let query = $('#query').text();
        console.log(query)
        let searchTemplate = require('@/search/search2-1.html');

        axios.post('/searchInput',{"query":query}).then((data)=>{
            console.log(data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

            var map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(37.3595704, 127.105399),
                zoom: 10
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

            // pagination



        });

    }

    // 맛집 클릭해서 상세 페이지로 넘어가는 이벤트



}