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

class Main {

    constructor() {
        console.log("Main");
        this.eventBinding();
    }


    eventBinding(){

        $('.category').on('click', (e)=> {
            console.log("카테고리 클릭");
        });

        $('#searchButton').on('click', (e)=>{
            console.log("검색 버튼 클릭");
        })
    }





}
