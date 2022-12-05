"use strict";


import replyImgTmpt from "@/detail/detailImage2.html";

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
                    let num=result.data.list[i].num;
                    console.log("result :: ", num);
                    axios.post("DetailImg", {"workplace":result.data.list[i].workplace}).then((e)=>{
                        // console.log(e.data);
                        let $i =  $("." + num).parent().parent().children().eq(0).children().children();
                        // console.log($i);
                        $("." + num).children().children('a').children('span').text((i+1)+".");
                        if(e.data===""){
                            // console.log(result.data.list[i].workplace+" 이미지 없음");
                            // $i.attr("src", "/image/empty.png");
                            axios.post("detailReplyImg", {"num":num}).then((data)=>{
                                // console.log(data.data[0].savedName);
                                _.forEach(data.data, ()=>{
                                    $i.attr('src', "/images/" + data.data[0].savedName);
                                });
                            });
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

        $(".btn_share_facebook").on("click", (e)=>{
            let thisUrl = document.URL;
            let url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(thisUrl);
            window.open(url, "", "width=486, height=286");
        })

        $(".btn_share_twitter").on("click", (e)=>{
            let thisUrl = document.URL;
            let snsTitle = "광주 플레이트";
            let url = "http://twitter.com/share?url="+encodeURIComponent(thisUrl)+"&text="+encodeURIComponent(snsTitle);
            window.open(url, "tweetPop", "width=486, height=286,scrollbars=yes");
        })
    }











}