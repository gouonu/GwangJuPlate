
"use strict";


import detailTemplate from "@/detail/detailCard.html";

$(()=>{
    new Main();
})

export class Main {

    constructor() {
        this.mainListEvent();
        this.bookmarkEvent();
        this.bookMarkSlctDelete();
    }

    mainListEvent() {


        console.log("메인리스트이벤트");
        let listTemplate = require('@/main/mainListCard.html');
        axios.post('/mainList',{}).then((data)=>{
            console.log(data);
            $('.popular_top_list_wrap > div > div').append(listTemplate(data));
        });
}
    bookmarkEvent(){

        axios.post("bookModal",{}).then((result)=>{
            console.log(result);

            let data = result.data;
            _.forEach(data,(e)=>{
                let workplace = e.resWorkplace;
                let num4 = e.resNum;

                console.log(workplace);
                var html = [
                    '<form class="bookForm">',
                    '<a class="workplace">'+ workplace +'<br></a>',
                    '<button class="bnum" type="button" onclick="location.href=\'detail?num='+num4+'\'">이동하기</button>',
                    '<button type="reset" class = "btn btn-danger deleteWish">' + '삭제'+'</button>',
                    '</form>'
                ].join('');
                $('#bookMark').append(html);
                console.log(num4);
                this.bookMarkSlctDelete()
            })
        })


        $('.wStar').on("click", (e)=> {
                $('.wStar').addClass("hidden");
                $('.bStar').removeClass("hidden");
                $(sessionStorage.getItem("userId"));

                axios.post("bookMarkInput",{}).then((result)=>{
                    console.log(result)
                })

            }
        )

        $('.bStar').on("click", (e)=> {
            $('.bStar').addClass("hidden");
            $('.wStar').removeClass("hidden");
            let bpl=e.resWorkplace;
            let uid=e.userID;
            axios.delete("bookDelete", {
                headers: {
                    Authorization: uid
                },
                data: {
                    source: bpl
                }
            });
        })


    }
    bookMarkSlctDelete(){
        $('.deleteWish').on("click",(e)=>{
            let workplce = $(e.currentTarget).prev().prev().text();
            console.log("가능?:",workplce);
            axios.post("bookSlct",{"workplace": workplce}).then((result)=>{
                $(e.currentTarget).parent($('.bookForm')).remove();
            })
        })

    }
}