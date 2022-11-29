"use strict";


import detailTemplate from "@/detail/detailCard.html";
import Model from "@/module/common/model";

$(()=>{
    new Detail();
})

export class Detail {

    constructor() {
        console.log("Detail");
        this.detailEvent();
        this.setThumbnail();
    }

    detailEvent(){

        function getQueryParam(param) { // https://diaryofgreen.tistory.com/49
            let result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );
            return result ? result[3]:false;
        }
        let num = getQueryParam("num");
        console.log("num :",num);

        axios.post("detailRes", {"num":num}).then((res)=>{
            // console.log(place);
            // console.log(res.data);
            $('#workplace').text(res.data.workplace);
            $('#roadAddr').text(res.data.roadAddr);
            $('#locAddr').text(res.data.locAddr);
            $('#tel').text(res.data.tel===null?"X":res.data.tel);
            $('#state').text(res.data.state);
            $('#num').val(res.data.num);

            this.kakaoMap(res.data.roadAddr, res.data.workplace);


            axios.post("detailViewsUp", {"num":num}).then(()=>{
                // console.log("조회수");
                $('.resViews').text(res.data.resViews);
            })

        })

        let detailTemplate = require('@/detail/detailCard.html');
        axios.post("viewReply", {"bno":num}).then((rep)=>{
            $("#reviewAdd").empty();
            $("#reviewAdd").append(detailTemplate(rep));
            // console.log("리뷰 :",rep.data);
            this.reviewEvent();
        })

        axios.post("detailCount", {"bno":num}).then((count)=>{
            count = count.data;
            // console.log("리뷰 수 :",count);
            $('.reviewCount').text("리뷰 ("+count+")");
            $('.reviewCountNum').text(count);
        })
    }

    reviewEvent(){
        $('.updateButton').on("click", (e)=>{
            // console.log("수정");
            let $e = $(e.currentTarget).parents(".card-body").eq(0);
            $e.children(".updateReview").removeClass("hidden");
            $e.children(".reviewHeader").addClass("hidden");
            $e.children(".reviewButton").addClass("hidden");
        })

        $(".rollbackButton").on("click", (e)=>{
            // console.log("수정 취소");
            let $e = $(e.currentTarget).parents(".card-body").eq(0);
            $e.children(".updateReview").addClass("hidden");
            $e.children(".reviewHeader").removeClass("hidden");
            $e.children(".reviewButton").removeClass("hidden");
        })
    }

    kakaoMap(locName){



        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
        geocoder.addressSearch(locName, function(result, status) {

            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // // 인포윈도우로 장소에 대한 설명을 표시합니다
                // var infowindow = new kakao.maps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:6px 0;" th:text="${workplace}"></div>'
                // });
                // infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });



    }

    setThumbnail(){
        $('#imageFile').on('click', (e)=>{
            var file = $(e.target.files[0]);
            var reader = new FileReader();
            reader.onload = function (e){
                $('.img_thumbnail_box > img').attr('src', $(e.target.result));
            }
            reader.readAsDataURL(file);
        })

    }





}