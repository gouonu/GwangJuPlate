"use strict";

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
        let perPage = 20;
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



}