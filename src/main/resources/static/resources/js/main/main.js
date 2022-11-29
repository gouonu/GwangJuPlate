
"use strict";


$(()=>{
    new Main();
})

export class Main {

    constructor() {
        console.log("Main");
        this.mainListEvent();
    }

    mainListEvent() {
        console.log("메인리스트이벤트");
        let listTemplate = require('@/main/mainListCard.html');
        axios.post('/mainList',{}).then((data)=>{
            console.log(data);
            $('.popular_top_list_wrap > div > div').append(listTemplate(data));
        });


        let str=""
        axios.post("resViewsTop",{}).then((li)=>{
            console.log(li.data);

            for(let i=0;i<li.data.length;i++){
                str+=li.data[i]+",";
            }
            str=str.substring(0,str.length-1);
            console.log(str);

            axios.post("ViewTop2",{"resNumString":str}).then(()=>{
                // console.log("조회수 top5 음식점 등록!")
            })
        })


    }
}
