"use strict";

$(()=>{
    new Main();
})

export class Main {

    constructor() {
        console.log("Main");
        this.eventBinding();
        this.mainListEvent();
    }


    eventBinding(){

        $('.category').on('click', (e)=> {
            console.log("카테고리 클릭");
        });

    }

    mainListEvent() {
        console.log("메인리스트이벤트");
        let listTemplate = require('@/main/listCard.html');
        axios.post('/mainList',{}).then((data)=>{
            console.log(data);
            $('.popular_top_list_wrap > div > div').append(listTemplate(data));
        });
    }



}
