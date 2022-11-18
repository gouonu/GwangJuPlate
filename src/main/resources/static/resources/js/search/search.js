"use strict";


import listTemplate from "@/main/listCard.html";
import searchTemplate from "@/search/seach2-1.html";

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
        let searchTemplate = require('@/search/seach2-1.html');

        axios.post('/searchInput',{"query":query}).then((data)=>{
            console.log(data);
            $('.list_restaurants_wrapper').empty();
            $('.list_restaurants_wrapper').append(searchTemplate(data));

            // 맞는 핑찍기

            this.kakaoMapEvent();
        });
    }

    // kakao map api
    kakaoMapEvent(){
        // GET 방식의 parameter 받아오기
        // function receive_get_data(param) {
        //   var result = null, tmp = [];
        //   var items = window.location.search.substring(1).split("&");
        //   for (var i = 0; i < items.length; i++) {
        //     tmp = items[i].split("=");
        //     if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
        //   }
        //   return result;
        // }
        // var searchInput = receive_get_data("searchInput");

        
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                // 광주광역시 126.8526012, 35.1595454
                center: new kakao.maps.LatLng(37.5666805, 126.9784147), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        // 키워드로 장소를 검색합니다
        // 검색어 가져와서 넣어주기
        // ex)명동
        ps.keywordSearch("명동", placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();

                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {

            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
    }

    // 맛집 클릭해서 상세 페이지로 넘어가는 이벤트



}