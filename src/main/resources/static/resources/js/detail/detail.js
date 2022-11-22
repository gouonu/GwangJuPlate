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
        // console.log(place);


        let workplace;
        axios.post("detailRes", {"place":place}).then((res)=>{
            // console.log(place);
            // console.log(res);
            console.log(res.data);

            $('.restaurant_name').text(res.data.workplace);
            $('#roadAddr').text(res.data.roadAddr);
            $('#locAddr').text(res.data.locAddr);
            $('#tell').text( res.data.tel);
            $('#state').text(res.data.state);
        })

        // $('.restaurant_name > div').empty();
        // $('.restaurant_name > div').append("<div th:text='dkdk'></div>");








    }


}