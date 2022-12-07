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


        /**
         *  헤더 이미지 랜덤
         */
        let headImageList=[
            "asparagus-2169305_1920.jpg",
            "table-710040_1920.jpg",
            "wheat-crops-865098_1920.jpg",
            "restaurant-2602736_1920.jpg",
            "salad-569156_1920.jpg",
            "table-3018151_1920.jpg",
            "lime-2481346_1920.jpg",
            "rice-3997767_1920.jpg",
            "wheat-1845835_1920.jpg",
            "cooking-2132874_1920.jpg",
            "potatoes-411975_1920.jpg"
        ]
        $("header").attr("style", "background-image:url(/mainHeaderImage/"+headImageList[Math.floor(Math.random()*(headImageList.length))]+"); background-position:center;");
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