
"use strict";


import replyImgTmpt from "@/detail/detailImage2.html";

$(()=>{
    new Main();
})

export class Main {

    constructor() {
        this.mainListEvent();
    }

    mainListEvent() {
        // console.log("메인리스트이벤트");
        let listTemplate = require('@/main/mainListCard.html');
        axios.post('/mainList',{}).then((data)=>{
            // console.log(data.data.list);
            $('#listAppend').append(listTemplate(data));
            this.Event();
        });


        let str=""
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

        let topResTemp = require("@/main/mainTopRes.html");
        axios.get("viewTopRes", {}).then((result)=>{
            result.data.forEach((e)=>{
                axios.post("DetailImg",{"workplace":e.workplace}).then((m)=>{
                    if(m.data!==""){ // DB 이미지
                        $("."+e.num).find("img").attr("src", m.data.img2src );
                    }else{ // 리뷰 이미지
                        axios.post("detailReplyImg", {"num":e.num}).then((data)=>{
                            let d = data.data[0];
                            $("."+e.num).find("img").attr("src", "/images/"+d.savedName );
                        })
                    }
                    let val = $("."+e.num).find("div.index").text();
                    switch (val){
                        case "1":
                            $("."+e.num).find("span").text("🥇 ");
                            break;
                        case "2":
                            $("."+e.num).find("span").text("🥈 ");
                            break;
                        case "3":
                            $("."+e.num).find("span").text("🥉 ");
                            break;
                    }


                })
            })

            // console.log(result.data);
            let resList = result.data;
            for(let i=0;i<resList.length;i++){
                resList[i].index=i+1;
            }
            // console.log(resList);
            $("#TopResAppend").append(topResTemp(result.data));
            this.Event();
        })





        /**
         *  헤더 이미지 랜덤
         */
        let headImageList=["https://pixabay.com/get/g1eaea14e9bec84ec66269468856a5405633b58574755e308181d5d190403f4e3fd3e43217adddd0ad325bcdfe07afd027b2051f2e57e24a1deaacc837a133f8c_1920.jpg",
            "https://pixabay.com/get/gde3cb999b9225b6fbd02f9c565826278cb0c8b9e0b0b638c427a24a0d8c6fcf6f68ea04c02f2b16c705322df820f7683_1920.jpg",
            "https://pixabay.com/get/g6e0595a2787818fc9caf41b78f07164c97153051c2fed419b64cd1add270f2bdf3ec277f3d5e8cf39bb467148058514015815e11f0637978e6cdc1be211707cd_1920.jpg",
            "https://pixabay.com/get/g7f5424553b0f237dcb368b6f0720a57af88063fce8f908a4376a99189b166b00fc2a9668608cf36fac48a73d4dd37b1e_1920.jpg",
            "https://pixabay.com/get/gfe81c4a163cf7e8bcd320b65c8ba5b7b566c5322e404cf2200861c608d79a5cdfc02270bcfab937c3edd9fca04bbdd741e604cf22eacb24fb9d82105ee198f34_1920.jpg",
            "https://pixabay.com/get/g5959c5423535c672fbca308df2d6afed0c98f684a5ff64ede86ab5a2ce274fb35268598e52b1d343b54a1a2ff92370d8323b99c79766265a554babb7671ea972_1920.jpg",
            "https://pixabay.com/get/gc76e6d3d9c15167f2c8a3cf369bc4cd61638aeff276343011b6e946d8a954792850eb5262819ab19510139f4fa385a8d_1920.jpg",
            "https://pixabay.com/get/g4fca597754d46167a079be03deaf8545102ade83d37f79596b9acdc693fe5e07c42fcd0061261d78faca7d55f9ad049c099ed5a02d6a17ba5ec5535d41e9c6a0_1920.jpg",
            "https://pixabay.com/get/gcd827cf7c8d237fa2add486ed6519589f54ad6312a8e0bd1d2c29a78aea4a91f200523b49aa0817c0d7cd16473125718cf7c1bfc48b9bace0ff24769d1d9bf58_1920.jpg",
            "https://pixabay.com/get/ge8365b9650efe22ebf568d3b80b9a84e27f709f7135b01d37792656d8f3c0e88b48cb980f1b89417b3084416a0dac820896a06cf482e47d40cb239d90b67e937_1920.jpg",
            "https://pixabay.com/get/g80a096e11d93955feb72921d4ca2658c5abf6eb5ec5285772855bfa24ca3e4673f5b3f42a330bfa213934b21fe7713bb9d4ea0836b9d5349b398985ae9d92396_1920.jpg",
            "https://pixabay.com/get/ge3ceb50b0f6c408942523f2cd16a6ce97364bfecf67c084c0fb0764de3fa7359480538a370de84359adafbe1cb0b0955247c64b7b62dfec9f071b6007fb1f7b7_1920.jpg"
        ]
        $("header").attr("style", "background-image:url("+headImageList[Math.floor(Math.random()*(headImageList.length))]+"); background-position:center;");
    }

    Event(){

        $(".resList").on({
            mouseenter:(e)=>{
                $(e.currentTarget).addClass("active");
                $(e.currentTarget).find("h5").addClass("active");
            },
            mouseleave:(e)=>{
                $(e.currentTarget).removeClass("active");
                $(e.currentTarget).find("h5").removeClass("active");
            }
        })




    }


}
