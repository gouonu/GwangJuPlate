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
        let place = decodeURIComponent(getQueryParam("place"));
        console.log(place);

        // axios.post("detailRes", {place}).then(()=>{
        //     console.log(place);
        //
        // })



    }


}