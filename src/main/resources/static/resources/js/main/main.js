
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
    }
}
