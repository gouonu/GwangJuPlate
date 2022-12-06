"use strict";


$(()=>{
    new List();
})


export class List {

    constructor() {
        console.log("List");
        this.listEvent();
        this.buttonEvent();
        this.bookmarkEvent();
        this.bookMarkSlctDelete();
        this.recentEvent();
        this.logEvent();

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


                    '<a class="workplace" >'+ workplace +'<br></a>',


                    '<button class="bnum" type="button" onclick="location.href=\'detail?num='+num4+'\'">이동하기</button>',


                    '<button type="reset" class = "btn btn-danger deleteWish">' + '삭제'+'</button>',

                    '</form>'
                ].join('');
                $('#bookMark').append(html);
                console.log(num4);
                this.bookMarkSlctDelete();
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
        function getQueryParam(param) { // https://diaryofgreen.tistory.com/49
            let result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );
            return result ? result[3]:false;
        }
        let num = getQueryParam("num");
        console.log("num :",num);

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

        //북마크 기본

        axios.post("bookMarkCheck",{}).then((result)=>{
            console.log(result);
            if(result.data == true){
                $('.bStar').removeClass("hidden");
                $('.wStar').addClass("hidden");
            }else{
                $('.bStar').addClass("hidden");
                $('.wStar').removeClass("hidden");

            }
        })

        // var doc1 = document.getElementsByClassName("doBok");
        // const w1= document.get('bleft');
        // // var n1=document.getElementById('bcenter').getElementsByClassName('bnum');
        // console.log("되긴함? : ",w1);
        // $('#bright').on("click",(e)=>{
        //     axios.post("bookSlct",{w1:{w1}, n1:{n1}}).then((result)=>{
        //
        //
        //     })
        // })
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


    listEvent(){


        function getQueryParam(param) { // https://diaryofgreen.tistory.com/49
            let result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );
            return result ? result[3]:false;
        }

        let index = getQueryParam("index");
        // console.log("index :", index);
        let listDetailTemplate = require('@/list/listCard.html');


        axios.post("selectList", {"index":index}).then((m)=>{
            let title = m.data.title;
            let resNum = m.data.resNum.split(",");
            let listViews = m.data.listViews;
            let listDate = m.data.listDate.split(" ")[0]; // 시간은 안나오게 만듦
            let context = m.data.context;

            // console.log(title);
            // console.log(resNum);
            // console.log("조회수 :",listViews);
            // console.log("게시날짜 :",listDate);

            $('.header_inner > h1').text(title);
            $('.header_inner > h5').text('" '+context+' "');
            $('#views').text(listViews+" 클릭 |");
            $('#date').text(" "+listDate);


            axios.post("/listDetail", resNum).then((result)=>{
                // console.log("result :: ", result.data.list);
                $('.listCardAppend').empty();
                $('.listCardAppend').append(listDetailTemplate(result));

                for(let i=0; i<resNum.length; i++){
                    axios.post("selectResReview", {"num":Number(resNum[i])}).then((r)=>{
                        let n = Number(resNum[i]);
                        // console.log(r.data.replyUser);
                        // console.log(r.data.reply);
                        let $n = $("."+n).children("div");
                        $n.children("div").children(".mango_nickname").text(r.data.replyUser==null?" ":r.data.replyUser);
                        let review;
                        // console.log(r.data.reply.length);
                        if(r.data.reply==null){
                            review="아직 리뷰가 없습니다.";
                            $n.find(".fa-solid.fa-circle-user").remove();
                        }else if(r.data.reply.length>=80){
                            review=r.data.reply.substring(0,80)+"...";
                        }else{
                            review=r.data.reply;
                        }
                        $n.children(".short_review").text(review);
                    })
                }

                for(let i=0; i<result.data.list.length; i++){
                    // console.log("result :: ", result.data.list[i].workplace);
                    axios.post("DetailImg", {"workplace":result.data.list[i].workplace}).then((e)=>{
                        // console.log(e.data);
                        let $i =  $("." + result.data.list[i].num).parent().parent().children().eq(0).children().children();
                        // console.log($i);
                        $("." + result.data.list[i].num).children().children('a').children('span').text((i+1)+".");
                        if(e.data===""){
                            // console.log(result.data.list[i].workplace+" 이미지 없음");
                            $i.attr("src", "/image/empty.png");
                        }else {
                            console.log(result.data.list[i].workplace+" 이미지 있음");
                            $i.attr("src", e.data.img1src);
                        }
                    })


                }




            });

            // axios.post("DetailImg", {"workplace":})



        })

        axios.post("listViewsUp", {"index":index}).then(()=>{
            // console.log("조회수 up");
        })

    }

    buttonEvent(){

        $(".btn_copy_link").on("click", (e)=>{
            console.log("링크 복사 하기 클릭");
            let url ="";
            let textarea =  document.createElement("textarea");

            document.body.appendChild(textarea);
            url = window.document.location.href;
            textarea.value = url;
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            $(".alert.alert-primary").removeClass("hidden");
        })

        $(".alert.alert-primary").on("click", (e)=>{
            $(".alert.alert-primary").addClass("hidden");
        })
    }











}