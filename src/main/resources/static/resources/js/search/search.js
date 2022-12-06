"use strict";




$(()=>{
    new Search();
})

export class Search {

    constructor() {
        console.log("Search");
        this.searchEvent();
        this.pagination();
        this.paginationBtn();
    }

    searchEvent() {
        console.log("검색 이벤트");
        let result = $('#query').text();
        console.log("검색어 : ", result);
        let searchTemplate = require('@/search/search2-1.html');

        let startPage = 1;
        let perPage = 20;
        let object = {
            "result" : result,
            "startPage": startPage,
            "perPage" : perPage
        }

        axios({
            method:"post",
            url:"/searchInputPaging",
            params : object

        }).then((data)=>{
            console.log(data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

            // 이미지, 조회수
            data.data.r.forEach(value=> {
                // 조회수
                axios.post("detailCount", {"bno": value.num}).then((count) => {
                    count = count.data;
                    // console.log($("."+value.num));
                    $("." + value.num).children().children(".restaurant_info").children("div").eq(1).children().children(".restaurant_reviews").text(count);
                });
                // 이미지
                axios.post("DetailImg", {"workplace": value.workplace}).then((e) => {
                    // console.log(e.data);
                    let $i = $("." + value.num).children().children().children();
                    if (e.data === "") {
                        // console.log(value.workplace+" 이미지 없음");
                        $i.attr("src", "/image/empty.png");
                    } else {
                        console.log(value.workplace + " 이미지 있음");
                        // console.log(e.data.img1src);
                        $i.attr("src", e.data.img1src);
                    }
                });
            });

            // map
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 8 // 지도의 확대 레벨
                };

            // 지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();


            _.forEach(data.data.r, (obj)=> {
                let roadAddr = obj.roadAddr;
                let workplace = obj.workplace;
                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(roadAddr, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+workplace+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            });


        }); // then


    }//serchEvent



    pagination(){
        $('.paginationUl > li').on('click', (e)=>{
            // 지도 제거
            $('#map').remove();

            let currentPage = $(e.currentTarget).text();

            console.log(currentPage);
            console.log("페이징 이벤트");
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
                url:"/searchInputPaging",
                params : object

            }).then((data)=>{
                console.log(data);
                $('.list_restaurants_wrapper').empty();
                $('.list_restaurants_wrapper').append(searchTemplate(data));
                // 지도 다시 넣기
                $('.list_map').append('<div id="map" style="width:400px;height:500px;"></div>');

                // 페이징 넘길 때 이미지, 조회수
                data.data.r.forEach(value=> {
                    // 조회수
                    axios.post("detailCount", {"bno": value.num}).then((count) => {
                        count = count.data;
                        // console.log($("."+value.num));
                        $("." + value.num).children().children(".restaurant_info").children("div").eq(1).children().children(".restaurant_reviews").text(count);
                    });
                    // 이미지
                    axios.post("DetailImg", {"workplace": value.workplace}).then((e) => {
                        // console.log(e.data);
                        let $i = $("." + value.num).children().children().children();
                        if (e.data === "") {
                            // console.log(value.workplace+" 이미지 없음");
                            $i.attr("src", "/image/empty.png");
                        } else {
                            console.log(value.workplace + " 이미지 있음");
                            // console.log(e.data.img1src);
                            $i.attr("src", e.data.img1src);
                        }
                    });
                });

                // map
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 8 // 지도의 확대 레벨
                    };


                // 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();


                _.forEach(data.data.r, (obj)=> {

                    let roadAddr = obj.roadAddr;
                    let workplace = obj.workplace;
                    // 주소로 좌표를 검색합니다
                    geocoder.addressSearch(roadAddr, function(result, status) {

                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {

                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords
                            });

                            var infowindow = new kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;">'+workplace+'</div>'
                            });
                            infowindow.open(map, marker);

                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            map.setCenter(coords);
                        }
                    });
                });



            });
        });


    }//pagenationEvent


    paginationBtn(){
        $('.paginationUl > li:first').addClass('active');

        $('.paginationUl > li').on('click', (e)=> {
            if ($('.paginationUl > li').hasClass('active')) {
                $('.paginationUl > li').removeClass('active');
                $(e.currentTarget).addClass('active');
            } else {
                $(e.currentTarget).addClass('active');
            }
        });
    }


}// Search