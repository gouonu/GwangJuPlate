"use strict";


$(()=>{
    new List();
})


export class List {

    constructor() {
        console.log("List");
        this.listEvent();
        this.buttonEvent();

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
                        $n.children(".short_review").text(r.data.reply==null?"아직 리뷰가 없습니다.":r.data.reply);
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