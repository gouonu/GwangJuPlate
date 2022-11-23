"use strict";


import detailTemplate from "@/detail/detailCard.html";

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
        })

        let detailTemplate = require('@/detail/detailCard.html');
        axios.post("viewReply", {"bno":num}).then((rep)=>{
            $("#reviewAdd").empty();
            $("#reviewAdd").append(detailTemplate(rep));
            console.log("리뷰 :",rep.data);
            this.reviewEvent();
        })

        axios.post("detailCount", {"bno":num}).then((count)=>{
            count = count.data;
            console.log("리뷰 수 :",count);
            $('.reviewCount').text(count);
        })
    }



    reviewEvent(){

        $('.updateButton').on("click", (e)=>{
            // console.log("수정");
            $(".updateReview").removeClass("hidden");
            $(".reviewHeader").addClass("hidden");
            $(".reviewButton").addClass("hidden");
        })

        $(".rollbackButton").on("click", (e)=>{
            // console.log("수정 취소");
            $(".updateReview").addClass("hidden");
            $(".reviewHeader").removeClass("hidden");
            $(".reviewButton").removeClass("hidden");
        })


    }



}