
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
        this.recentEvent();
        this.logEvent();
    }

    mainListEvent() {
        // console.log("메인리스트이벤트");
        let listTemplate = require('@/main/mainListCard.html');
        axios.post('/mainList',{}).then((data)=>{
            // console.log(data.data.list);
            $('.popular_top_list_wrap > div > div').append(listTemplate(data));
        });
        let str =""
        axios.post("resViewsTop",{}).then((li)=>{
            // console.log(li.data);

            for(let i=0;i<li.data.length;i++){
                str+=li.data[i]+",";
            }
            str=str.substring(0,str.length-1);
            // console.log(str);

            axios.post("ViewTop2",{"resNumString":str}).then(()=>{
                // console.log("조회수 top5 음식점 등록!")
            })
        })
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
    recentEvent(){
        $('.redel').on('click',(e)=>{
            axios.post("delete",{}).then(()=>{
                $('.asd').remove();
                var html = [
                    ' <div align="center" class="abc">',
                    '<b id="whe">',
                    '<br><br>거기가 어디였지?<br>',
                    '</b>',
                    '내가 둘러 본 식당이 이 곳에 순서대로<br> 기록됩니다.',
                    ' <br><br><br>',
                    '</div>'
                ].join('');
                $('#rkfk').empty(html);
                $('#rkfk').append(html);
            })
        })


    }
    logEvent(){
        //로그인 체크
        $('#logID').on("keyup",(e)=>{
            let id = document.getElementById("logID").value;

            axios.post("logIdChk",{"id":id}).then((result)=>{
                if(result.data == false){
                    $('#logerror').removeClass("hidden");
                }
                else{
                    $('#logerror').addClass("hidden");
                    $('#login').removeAttr("disabled")
                }
            })

        })

        $('#logPW').on("keyup",(e)=>{
            let pw = document.getElementById("logPW").value;
            let id = document.getElementById("logID").value;

            axios.post("logPwChk",{"id":id,"pw":pw}).then((matches)=>{
                if(matches.data ==false){
                    $('#pwerror').removeClass("hidden");
                    $('#login').attr("disabled",true);
                }else{
                    $('#pwerror').addClass("hidden");
                    $('#login').removeAttr("disabled");
                }
            })
        })
    }
}