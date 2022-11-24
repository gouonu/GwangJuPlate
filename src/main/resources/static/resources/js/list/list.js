"use strict";


import listDetailTemplate from "@/list/listCard.html";

$(()=>{
    new List();
})

export class List {

    constructor() {
        console.log("List");
        this.listEvent();

    }

    listEvent(){


        function getQueryParam(param) { // https://diaryofgreen.tistory.com/49
            let result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );
            return result ? result[3]:false;
        }

        // let resNum = getQueryParam("resNum").split(",");
        let index = getQueryParam("index");
        // let title = decodeURIComponent(getQueryParam("title"));
        // console.log("Title :",title);
        console.log("index :", index);

        // console.log("resNum :",resNum);
        let listDetailTemplate = require('@/list/listCard.html');

        // let title="";
        // let resNum="";

        axios.post("selectList", {"index":index}).then((m)=>{
            let title = m.data.title;
            let resNum = m.data.resNum.split(",");
            let listViews = m.data.listViews;
            let listDate = m.data.listDate.split(" ")[0]; // 시간은 안나오게 만듦
            let context = m.data.context;

            // console.log(title);
            // console.log(resNum);
            // console.log("조회수 :",listViews);
            // console.log("게시날짜 :",listDate);

            $('.header_inner > h1').text(title);
            $('.header_inner > h5').text('" '+context+' "');
            $('#views').text(listViews+" 클릭 |");
            $('#date').text(" "+listDate);


            axios.post("/listDetail", resNum).then((result)=>{
                // console.log("result :: ", result);
                $('.listCardAppend').empty();
                $('.listCardAppend').append(listDetailTemplate(result));
            });

        })

        axios.post("listViewsUp", {"index":index}).then(()=>{
            // console.log("조회수 up");
        })

        // axios.post("/listDetail", resNum).then((result)=>{
        //     // console.log("result :: ", result);
        //     $('.listCardAppend').empty();
        //     $('.listCardAppend').append(listDetailTemplate(result));
        // });










    }


}