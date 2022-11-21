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
        // this.eventBinding();
        this.mainListEvent();
    }




    mainListEvent() {
        console.log("메인리스트이벤트");
        let listTemplate = require('@/main/mainListCard.html');
        axios.post('/mainList',{}).then((data)=>{
            console.log(data);
            $('.popular_top_list_wrap > div > div').append(listTemplate(data));
            this.eventBinding(data);
        });
    }

    eventBinding(data){

        // $('div.card.h-100').on('click', (e)=>{
        //     let dataList = data.data.list;
        //     let text = $(e.currentTarget).text();
        //     text = text.replaceAll("\n","").replaceAll(" ","").split("/");
        //     let title = text[0];
        //     // console.log(dataList);
        //
        //     let result;
        //     dataList.forEach(e=>{
        //        if(title===e['title'].replaceAll(" ","")){
        //            // console.log(title);
        //            result = e;
        //            // console.log(result);
        //        }
        //     });
        //     // axios.post('/listDetail',result).then((list)=>{
        //     //     console.log("result :: ", result);
        //     //     console.log("list :: ", list);
        //     //
        //     // })
        // })




    }





}
