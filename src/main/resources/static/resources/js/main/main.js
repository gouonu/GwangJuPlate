"use strict";


$(() => {
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
        let listTemplate = require('@/main/mainListCard.html');
        axios.post('/mainList', {}).then((data) => {
            // console.log(data.data.list);
            $('#listAppend').append(listTemplate(data));
            this.mainHoverEvent();
        });
        let str = ""
        axios.post("resViewsTop", {}).then((li) => {
            for (let i = 0; i < li.data.length; i++) {
                str += li.data[i] + ",";
            }
            str = str.substring(0, str.length - 1);
            axios.post("ViewTop2", {"resNumString": str}).then(() => {
                // console.log("조회수 top5 음식점 등록!")
            })
        })

        let topResTemp = require("@/main/mainTopRes.html");
        axios.get("viewTopRes", {}).then((result) => {
            result.data.forEach((e) => {
                axios.post("DetailImg", {"workplace": e.workplace}).then((m) => {
                    if (m.data !== "") { // DB 이미지
                        $("." + e.num).find("img").attr("src", m.data.img2src);
                    } else { // 리뷰 이미지
                        axios.post("detailReplyImg", {"num": e.num}).then((data) => {
                            let d = data.data[0];
                            $("." + e.num).find("img").attr("src", "/images/" + d.savedName);
                        })
                    }
                    let val = $("." + e.num).find("div.index").text();
                    switch (val) {
                        case "1":
                            $("." + e.num).find("span").text("🥇 ");
                            break;
                        case "2":
                            $("." + e.num).find("span").text("🥈 ");
                            break;
                        case "3":
                            $("." + e.num).find("span").text("🥉 ");
                            break;
                        default:
                            break;
                    }


                })
            })

            // console.log(result.data);
            let resList = result.data;
            for (let i = 0; i < resList.length; i++) {
                resList[i].index = i + 1;
            }
            // console.log(resList);
            $("#TopResAppend").append(topResTemp(result.data));
            this.mainHoverEvent();
        })


        /*
        * 카테고리
         */
        let category = ["한식", "중식", "일식", "양식", "카페", "패스트푸드", "분식", "식육", "치킨", "횟집", "외국음식", "광산구", "북구", "동구", "서구", "남구"]
        let s = "";
        category.forEach((e) => {
            s = s + "<a href='/searchInput?searchInput=" + e + "' class='tagItem'>#" + e + "</a>";
        })
        $(".categoryBox").find("p").append(s);


        /*
         *  헤더 이미지 랜덤
         */
        let headImageList = [
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
        $("header").attr("style", "background-image:url(" + headImageList[Math.floor(Math.random() * (headImageList.length))] + "); background-position:center;");
    }

    mainHoverEvent() {
        $(".resList").on({
            mouseenter: (e) => {
                $(e.currentTarget).addClass("active");
                $(e.currentTarget).find("h5").addClass("active");
            },
            mouseleave: (e) => {
                $(e.currentTarget).removeClass("active");
                $(e.currentTarget).find("h5").removeClass("active");
            }
        })
    }

    bookmarkEvent() {
        axios.post("bookModal", {}).then((result) => {
            console.log(result);

            let data = result.data;
            _.forEach(data, (e) => {
                let workplace = e.resWorkplace;
                let num4 = e.resNum;

                console.log(workplace);
                var html = [
                    '<form class="bookForm">',
                    '<a class="workplace">' + workplace + '<br></a>',
                    '<button class="bnum" type="button" onclick="location.href=\'detail?num=' + num4 + '\'">이동하기</button>',
                    '<button type="reset" class = "btn btn-danger deleteWish">' + '삭제' + '</button>',
                    '</form>'
                ].join('');
                $('#bookMark').append(html);
                console.log(num4);
            })
            this.bookMarkSlctDelete();
        })
    }

    bookMarkSlctDelete() {
        $('.deleteWish').on("click", (e) => {
            let workplace = $(e.currentTarget).prev().prev().text();
            console.log("가능?:", workplace);
            axios.post("bookSlct", {"workplace": workplace}).then(() => {
                $(e.currentTarget).parent($('.bookForm')).remove();
            })
        })
    }

    recentEvent() {
        $('.redel').on('click', () => {
            axios.post("delete").then(() => {
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

    logEvent() {
        //로그인 체크
        $('#logID').on("keyup", () => {
            let id = document.getElementById("logID").value;
            axios.post("logIdChk", {"id": id}).then((result) => {
                if (!result.data) {
                    $('#logerror').removeClass("hidden");
                } else {
                    $('#logerror').addClass("hidden");
                    $('#login').removeAttr("disabled")
                }
            })
        })

        $('#logPW').on("keyup", () => {
            let pw = document.getElementById("logPW").value;
            let id = document.getElementById("logID").value;

            axios.post("logPwChk", {"id": id, "pw": pw}).then((matches) => {
                if (!matches.data) {
                    $('#pwerror').removeClass("hidden");
                    $('#login').attr("disabled", true);
                } else {
                    $('#pwerror').addClass("hidden");
                    $('#login').removeAttr("disabled");
                }
            })
        })
    }
}