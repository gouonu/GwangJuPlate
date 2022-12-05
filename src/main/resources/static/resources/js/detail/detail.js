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
        this.bookmarkEvent();
        this.bookMarkSlctDelete();
        this.recentEvent();
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
        axios.post("bookCount",{"bno":num}).then((count)=>{
            count = count.data;
            console.log("즐겨찾기 수:",count);
            $('.bookCount').text(count);
        })

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
                    axios.post("detailReplyImg", {"num":num}).then((data)=>{

                        console.log(data.data);
                        let replyImgTmpt = require('@/detail/detailImage2.html');
                        $(".grid-image").empty()
                        $(".grid-image").append(replyImgTmpt(data.data));
                    })
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
            this.updateThumbnail();
            this.thumbnailModal();
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
            $e.children('.update_img_box').removeClass('hidden');

        })

        $(".rollbackButton").on("click", (e)=>{
            // console.log("수정 취소");
            let $e = $(e.currentTarget).parents(".card-body").eq(0);
            $e.children(".updateReview").addClass("hidden");
            $e.children(".reviewHeader").removeClass("hidden");
            $e.children(".reviewButton").removeClass("hidden");
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
            let $submit = $("#reviewSubmit"); // 리뷰 작성
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

        /**
         *  리뷰 수정할때 길이가 0이면 <수정 완료> 버튼 막기
         */
        $('#updateText').on("keyup",(e)=>{
            let byteCount = $(e.currentTarget).val().length;
            let $submit = $(e.currentTarget).parent().find(".updateSubmit"); // 수정 완료
            if(byteCount === 0) {
                $submit.attr("disabled",true);
            }else{
                $submit.attr("disabled",false);
            }
        })


    }
    bookmarkEvent(){

        axios.post("bookModal",{}).then((result)=>{
            console.log(result);

            let data = result.data;
            _.forEach(data,(e)=>{
                let workplace = e.resWorkplace;
                let num4 = e.resNum;

                console.log(workplace);
                var html = [
                    '<form class="bookForm">',


                    '<a class="workplace" >'+ workplace +'<br></a>',


                    '<button class="bnum" type="button" onclick="location.href=\'detail?num='+num4+'\'">이동하기</button>',


                    '<button type="reset" class = "btn btn-danger deleteWish">' + '삭제'+'</button>',

                    '</form>'
                ].join('');
                $('#bookMark').append(html);
                console.log(num4);
                this.bookMarkSlctDelete();
            })
        })



        $('.wStar').on("click", (e)=> {
                $('.wStar').addClass("hidden");
                $('.bStar').removeClass("hidden");
                $(sessionStorage.getItem("userId"));

                axios.post("bookMarkInput",{}).then((result)=>{
                    console.log(result)
                })

            }
        )
        function getQueryParam(param) { // https://diaryofgreen.tistory.com/49
            let result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );
            return result ? result[3]:false;
        }
        let num = getQueryParam("num");
        console.log("num :",num);

        $('.bStar').on("click", (e)=> {
            $('.bStar').addClass("hidden");
            $('.wStar').removeClass("hidden");
            let bpl=e.resWorkplace;
            let uid=e.userID;
            axios.delete("bookDelete", {
                headers: {
                    Authorization: uid
                },
                data: {
                    source: bpl
                }
            });
        })

        //북마크 기본

        axios.post("bookMarkCheck",{}).then((result)=>{
            console.log(result);
            if(result.data == true){
                $('.bStar').removeClass("hidden");
                $('.wStar').addClass("hidden");
            }else{
                $('.bStar').addClass("hidden");
                $('.wStar').removeClass("hidden");

            }
        })

        // var doc1 = document.getElementsByClassName("doBok");
        // const w1= document.get('bleft');
        // // var n1=document.getElementById('bcenter').getElementsByClassName('bnum');
        // console.log("되긴함? : ",w1);
        // $('#bright').on("click",(e)=>{
        //     axios.post("bookSlct",{w1:{w1}, n1:{n1}}).then((result)=>{
        //
        //
        //     })
        // })
    }
    bookMarkSlctDelete(){
        $('.deleteWish').on("click",(e)=>{
            let workplce = $(e.currentTarget).prev().prev().text();
            console.log("가능?:",workplce);
            axios.post("bookSlct",{"workplace": workplce}).then((result)=>{
                $(e.currentTarget).parent($('.bookForm')).remove();
            })
        })

    }
    recentEvent(){
        $('.redel').on('click',(e)=>{
            axios.post("delete",{}).then(()=>{
                $('.asd').remove();
                var html = [
                    ' <div align="center" class="abc">',
                    '<b id="whe">',
                    '<br><br>거기가 어디였지?<br>',
                    '</b>',
                    '내가 둘러 본 식당이 이 곳에 순서대로<br> 기록됩니다.',
                    ' <br><br><br>',
                    '</div>'
                ].join('');
                $('#rkfk').empty(html);
                $('#rkfk').append(html);
            })
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
        let imageFile = $('#imageFile');
        let imgThumbnailBox = $('.img_thumbnail_box');

        imageFile.on('change', (e)=>{
            let fileSize = e.target.files[0].size; // 파일 크기
            let maxSize = 1024 * 1024; // 1mb
            let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
            var file = e.target.files[0];
            var reader = new FileReader();

            // 파일용량 체크
            if(fileSize > maxSize){
                imageFile.val("");
                return alert("1MB 이하의 파일만 업로드 가능합니다.");
            }else if(!imageFile.val().match(fileForm)){
                imageFile.val("");
                return alert("이미지 파일만 업로드 가능합니다.");
            }else{
                reader.onload = function (e){
                    $('.img_thumbnail_box > img').attr('src', e.target.result);
                    imgThumbnailBox.removeClass('hidden');
                }
                reader.readAsDataURL(file);
            }
        });

        $('.review_img_delete').on('click', ()=>{
            imgThumbnailBox.addClass('hidden');
            imageFile.val("");
        });

    }
    updateThumbnail(){
        let updateImg = $('input[name=updateImg]');
        let udtImgBox = $('.update_img_box');

        updateImg.on('change', (e)=>{
            let fileSize = e.target.files[0].size;
            let maxSize = 1024 * 1024;
            let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
            let file = e.target.files[0];
            let reader = new FileReader();

            if(fileSize > maxSize){
                updateImg.val("");
                return alert("1MB 이하의 파일만 업로드 가능합니다.");
            }else if(!updateImg.val().match(fileForm)){
                updateImg.val("");
                return alert("이미지 파일만 업로드 가능합니다.");
            }else{
                reader.onload = function (e) {
                    $('.update_thumbnail').attr('src', e.target.result);
                    udtImgBox.removeClass('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
        $('.update_img_delete').on('click', (e)=>{
            $(e.currentTarget).parent().addClass('hidden');
            $(e.currentTarget).prev().attr('src', null);
        });
    }


    //test
    thumbnailModal(){
        let replyImgTag = $('.reply_img > img');
        replyImgTag.on('click', (e)=>{
            let crntImg = $(e.currentTarget).attr('data-bs-target').slice(1);
            console.log(crntImg);
            axios.post("imgViews", {"crntImg" : crntImg});
        });
    }

}