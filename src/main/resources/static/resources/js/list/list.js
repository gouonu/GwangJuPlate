"use strict";


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

        let resNum = getQueryParam("resNum").split(",");
        let title = decodeURIComponent(getQueryParam("title"));
        console.log("Title : ",title);

        console.log(resNum);
        let listDetailTemplate = require('@/list/listCard.html');


        axios.post("/listDetail", resNum).then((result)=>{
            // console.log("result :: ", result);
            $('.listCardAppend').empty();
            $('.listCardAppend').append(listDetailTemplate(result));
        });

        $('.header_inner > h1').text(title);






    }


}