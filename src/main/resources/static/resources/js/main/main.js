/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
"use strict";


$(()=>{
    new Main();
})

export class Main {

    constructor() {
        console.log("Main");
        this.eventBinding();
        this.mainListEvent();
        this.listEventBinding();
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
