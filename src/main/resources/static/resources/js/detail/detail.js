"use strict";


$(()=>{
    new Detail();
})

export class Detail {

    constructor() {
        console.log("Detail");
        this.detailEvent();
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
            });

            axios.post("DetailImg",{"workplace":res.data.workplace}).then((i)=>{
                // console.log(i.data);
                if(i.data===""){
                    // console.log("음식점 이름 중복 or 없음");
                    // for(let j=1;j<=4;j++){
                    //     $("#img"+j).attr("class", "hidden");
                    // }
                }else{
                    $("#resContent").text(i.data.content);
                    let imageTempl = require('@/detail/detailImage.html');
                    $(".grid-image").empty();
                    $(".grid-image").append(imageTempl(i));
                }
            });

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



            /**
             * 한 개의 수정이 완료되지 않았을 때, 다른 리뷰 수정 동시에 못하게 막기
             */
            let update = document.getElementsByClassName("updateReview");
            let hiddenCount = 0;

            _.forEach(update, function (u) {
                // console.log(u);
                if(!u.className.includes("hidden")){
                    hiddenCount+=1;
                }
            })
            // console.log(hiddenCount);
            _.forEach(update, function (u) {
                let review = u.parentElement.getElementsByClassName("reviewButton");
                let updateButton = review.item(0).children.item(0).children.item(0);
                let removeButton = review.item(0).children.item(0).children.item(1);
                if(hiddenCount>=1&&u.className.includes("hidden")){
                    // console.log(u);
                    updateButton.setAttribute("disabled","disabled");
                    removeButton.setAttribute("disabled","disabled");
                }
            })

        })

        $(".rollbackButton").on("click", (e)=>{
            // console.log("수정 취소");
            let $e = $(e.currentTarget).parents(".card-body").eq(0);
            $e.children(".updateReview").addClass("hidden");
            $e.children(".reviewHeader").removeClass("hidden");
            $e.children(".reviewButton").removeClass("hidden");
            $(".reviewButtonForm").each(function (index, item) { // 다른 수정,삭제 버튼 막혔던 거 지우기
                $(this).find(".updateButton").removeAttr("disabled");
                $(this).find(".removeButton").removeAttr("disabled");
            })
        })

        $(".scoreRadio").on("checked", (e)=>{
            console.log($(e.currentTarget).val());
        })

        /**
         *  < 수정/삭제 버튼 보이기 >
         * - 현재 세션 아이디와 댓글 아이디를 비교해서 일치했을때 수정/삭제 버튼 보이기
         */
        let idList = $(".replyUserID").text().split(" ");
        idList.pop();
        // console.log(idList);
        let sessionID = $('#userId').val();
        console.log("현재 아이디 : ", sessionID===""? "로그인 안됨":sessionID);

        if(sessionID===""){
            // console.log("미로그인 상태");
            $('#reviewSubmit').addClass("hidden");
            $('#reviewText').attr("placeholder", "로그인 후 리뷰를 남기실 수 있습니다.");
            $('#reviewText').attr("readonly", true);
        }else{
            // console.log("로그인 상태");
            idList.forEach(function (id){
                // console.log(id);
                if(id===sessionID){
                    // let $c = $('.'+id).children().children().eq(2).children();
                    // console.log($c);
                    $('.'+id).find('.updateButton').removeClass("hidden");
                    $('.'+id).find('.removeButton').removeClass("hidden");
                }
            })

        }

        /*
        * 리뷰 텍스트 null 일때 alert 띄우기
         */
        $('#reviewText').on("keyup",(e)=>{
            let byteCount = document.getElementById("reviewText").value.length;
            let $submit = $("#reviewSubmit");
            let $bCount = $('#byteCount');
            $bCount.text(byteCount);
            if(byteCount === 0 || byteCount > 300) {
                $submit.attr("disabled",true);
                $bCount.parent().addClass("error");
            }else{
                $submit.attr("disabled",false);
                $bCount.parent().removeClass("error");
            }
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





}