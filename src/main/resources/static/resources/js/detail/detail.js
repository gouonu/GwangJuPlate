"use strict";


$(() => {
    new Detail();
})

export class Detail {

    constructor() {
        console.log("Detail");
        this.detailEvent();
        this.setThumbnail();
        this.bookmarkEvent();
        this.bookMarkSlctDelete();
        this.recentEvent();
        this.logEvent();
    }

    logEvent() {
        //로그인 체크
        $('#logID').on("keyup", (e) => {
            let id = document.getElementById("logID").value;
            // console.log(id);
            axios.post("logIdChk", {"id": id}).then((result) => {
                if (!result.data) {
                    $('#logerror').removeClass("hidden");
                } else {
                    $('#logerror').addClass("hidden");
                    $('#login').removeAttr("disabled");
                }
            })

        })

        $('#logPW').on("keyup", (e) => {
            let pw = document.getElementById("logPW").value;
            let id = document.getElementById("logID").value;
            // console.log(pw);
            axios.post("logPwChk", {"id": id, "pw": pw}).then((matches) => {
                if (matches.data == false) {
                    $('#pwerror').removeClass("hidden");
                    $('#login').attr("disabled", true);
                } else {
                    $('#pwerror').addClass("hidden");
                    $('#login').removeAttr("disabled");
                }
            })
        })
    }

    detailEvent() {

        function getQueryParam(param) { // https://diaryofgreen.tistory.com/49
            let result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );
            return result ? result[3] : false;
        }

        let num = getQueryParam("num");
        console.log("num :", num);
        axios.post("bookCount", {"bno": num}).then((count) => {
            count = count.data;
            console.log("즐겨찾기 수:", count);
            $('.bookCount').text(count);
        })

        axios.post("detailRes", {"num": num}).then((res) => {
            // console.log(place);
            // console.log(res.data);
            $('#workplace').text(res.data.workplace);
            $('#roadAddr').text(res.data.roadAddr);
            $('#locAddr').text(res.data.locAddr);
            $('#tel').text(res.data.tel === null ? "X" : res.data.tel);
            $('#state').text(res.data.state);
            $('#num').val(res.data.num);

            this.kakaoMap(res.data.roadAddr, res.data.workplace);


            axios.post("detailViewsUp", {"num": num}).then(() => {
                // console.log("조회수");
                $('.resViews').text(res.data.resViews);
            });

            axios.post("DetailImg", {"workplace": res.data.workplace}).then((i) => {
                // console.log(i.data);
                if (i.data === "") {
                    axios.post("detailReplyImg", {"num": num}).then((data) => {
                        console.log(data);
                        let replyImgTmpt = require('@/detail/detailImage2.html');
                        let newData = data.data.slice(0, 4);
                        console.log("newData", newData);
                        $(".grid-image").empty()
                        $(".grid-image").append(replyImgTmpt(newData));
                    })
                } else {
                    $("#resContent").text(i.data.content);
                    let imageTempl = require('@/detail/detailImage.html');
                    $(".grid-image").empty();
                    $(".grid-image").append(imageTempl(i));
                }
            });

        })

        let detailTemplate = require('@/detail/detailCard.html');
        axios.post("viewReply", {"bno": num}).then((rep) => {
            console.log(rep.data.length);
            $("#reviewAdd").empty();

            /*
            * 리뷰 더보기 버튼 제어
             */
            let perPage = 5; // 리뷰 몇개씩 보일지
            if (rep.data.length > perPage) {
                let viewData = rep.data.slice(0, perPage);
                $("#reviewAdd").append(detailTemplate(viewData));
                $("#moreButton").removeClass("hidden");
            } else {
                $("#reviewAdd").append(detailTemplate(rep.data));
            }

            let viewPage = perPage;
            $("#moreButton").on("click", () => {
                let viewData = rep.data.slice(viewPage, viewPage + perPage);

                if (viewData.length !== perPage) {
                    viewPage = rep.data.slice(viewPage);
                    $("#moreButton").addClass("hidden");
                }

                if (viewData.length != 0) {
                    $("#reviewAdd").append(detailTemplate(viewData));
                    viewPage += perPage;
                }
                console.log(viewData);
            })


            // console.log("리뷰 :",rep.data);
            this.reviewEvent();
            this.updateThumbnail();
            this.thumbnailModal();
        })

        axios.post("detailCount", {"bno": num}).then((count) => {
            count = count.data;
            // console.log("리뷰 수 :",count);
            $('.reviewCount').text("리뷰 (" + count + ")");
            $('.reviewCountNum').text(count);
        })
    }

    reviewEvent() {
        $('.updateButton').on("click", (e) => {
            // console.log("수정");
            let $e = $(e.currentTarget).parents(".card-body").eq(0);
            $e.children(".updateReview").removeClass("hidden");
            $e.children(".reviewHeader").addClass("hidden");
            $e.children(".reviewButton").addClass("hidden");
            $e.children('.update_img_box').removeClass('hidden');


            /**
             * 한 개의 수정이 완료되지 않았을 때, 다른 리뷰 수정 동시에 못하게 막기
             */
            let update = document.getElementsByClassName("updateReview");
            let hiddenCount = 0;

            _.forEach(update, function (u) {
                // console.log(u);
                if (!u.className.includes("hidden")) {
                    hiddenCount += 1;
                }
            })
            // console.log(hiddenCount);
            _.forEach(update, function (u) {
                let review = u.parentElement.getElementsByClassName("reviewButton");
                let updateButton = review.item(0).children.item(0).children.item(0);
                let removeButton = review.item(0).children.item(0).children.item(1);
                if (hiddenCount >= 1 && u.className.includes("hidden")) {
                    // console.log(u);
                    updateButton.setAttribute("disabled", "disabled");
                    removeButton.setAttribute("disabled", "disabled");
                }
            })

        })

        $(".rollbackButton").on("click", (e) => {
            // console.log("수정 취소");
            let $e = $(e.currentTarget).parents(".card-body").eq(0);
            $e.children(".updateReview").addClass("hidden");
            $e.children(".reviewHeader").removeClass("hidden");
            $e.children(".reviewButton").removeClass("hidden");
            $(".reviewButtonForm").each(function () { // 다른 수정,삭제 버튼 막혔던 거 지우기
                $(this).find(".updateButton").removeAttr("disabled");
                $(this).find(".removeButton").removeAttr("disabled");
            })
        })

        $(".scoreRadio").on("checked", (e) => {
            console.log($(e.currentTarget).val());
        })

        /**
         *  < 수정/삭제 버튼 보이기 >
         * - 현재 세션 아이디와 댓글 아이디를 비교해서 일치했을때 수정/삭제 버튼 보이기
         */
        let idList = $(".replyUserID").text().split(" ");
        idList.pop();
        // console.log(idList);
        let sessionID = $('#userId').val();
        console.log("현재 아이디 : ", sessionID === "" ? "로그인 안됨" : sessionID);

        if (sessionID === "") {
            // console.log("미로그인 상태");
            $('#reviewSubmit').remove();
            $(".byteCount").remove();
            $('#imageFile').remove();
            $('#reviewText').attr("placeholder", "로그인 후 리뷰를 남기실 수 있습니다.");
            $('#reviewText').attr("readonly", true);
        } else {
            // console.log("로그인 상태");
            idList.forEach(function (id) {
                // console.log(id);
                if (id === sessionID) {
                    // let $c = $('.'+id).children().children().eq(2).children();
                    // console.log($c);
                    $('.' + id).find('.updateButton').removeClass("hidden");
                    $('.' + id).find('.removeButton').removeClass("hidden");
                }
            })

        }

        /*
        * 리뷰 텍스트 null 일때 막기
         */
        $('#reviewText').on("keyup", () => {
            let byteCount = document.getElementById("reviewText").value.length;
            let $submit = $("#reviewSubmit");
            let $bCount = $('#byteCount');
            $bCount.text(byteCount);
            if (byteCount === 0 || byteCount > 300) {
                $submit.attr("disabled", true);
                $bCount.parent().addClass("error");
            } else {
                $submit.attr("disabled", false);
                $bCount.parent().removeClass("error");
            }
        })

        /**
         *  리뷰 수정할때 길이가 0이면 <수정 완료> 버튼 막기
         */
        $('.updateText').on("keyup", (e) => {
            let byteCount = $(e.currentTarget).val().length;
            let $submit = $(e.currentTarget).parent().find(".updateSubmit"); // 수정 완료
            if (byteCount === 0) {
                $submit.attr("disabled", true);
            } else {
                $submit.attr("disabled", false);
            }
        })


    }

    getQueryParam(param) { // https://diaryofgreen.tistory.com/49
        let result = window.location.search.match(
            new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
        );
        return result ? result[3] : false;
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


                    '<a class="workplace" >' + workplace + '<br></a>',


                    '<button class="bnum" type="button" onclick="location.href=\'detail?num=' + num4 + '\'">이동하기</button>',


                    '<button type="reset" class = "btn btn-danger deleteWish">' + '삭제' + '</button>',

                    '</form>'
                ].join('');
                $('#bookMark').append(html);
                console.log(num4);
                this.bookMarkSlctDelete();
            })
        })


        $('.wStar').on("click", () => {
                $('.wStar').addClass("hidden");
                $('.bStar').removeClass("hidden");
                $(sessionStorage.getItem("userId"));

                axios.post("bookMarkInput", {}).then((result) => {
                    console.log(result)
                })

            }
        )

        let num = this.getQueryParam("num");
        console.log("num :", num);

        $('.bStar').on("click", (e) => {
            $('.bStar').addClass("hidden");
            $('.wStar').removeClass("hidden");
            let bpl = e.resWorkplace;
            let uid = e.userID;
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
        axios.post("bookMarkCheck", {}).then((result) => {
            console.log(result);
            if (result.data) {
                $('.bStar').removeClass("hidden");
                $('.wStar').addClass("hidden");
            } else {
                $('.bStar').addClass("hidden");
                $('.wStar').removeClass("hidden");

            }
        })

    }

    bookMarkSlctDelete() {
        $('.deleteWish').on("click", (e) => {
            let workplce = $(e.currentTarget).prev().prev().text();
            console.log("가능?:", workplce);
            axios.post("bookSlct", {"workplace": workplce}).then((result) => {
                $(e.currentTarget).parent($('.bookForm')).remove();
            })
        })

    }

    recentEvent() {
        $('.redel').on('click', (e) => {
            axios.post("delete", {}).then(() => {
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


    kakaoMap(locName) {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(locName, function (result, status) {

            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                map.setCenter(coords);
            }
        });


    }

    setThumbnail() {
        let imageFile = $('#imageFile');
        let imgThumbnailBox = $('.img_thumbnail_box');

        imageFile.on('change', (e) => {
            let fileSize = e.target.files[0].size; // 파일 크기
            let maxSize = 1024 * 1024; // 1mb
            let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf|PNG)$/;
            var file = e.target.files[0];
            var reader = new FileReader();

            // 파일용량 체크
            if (fileSize > maxSize) {
                imageFile.val("");
                return swal({
                    text: "1MB 이하의 파일만 업로드 가능합니다.",
                    icon: "error",
                });
            } else if (!imageFile.val().match(fileForm)) {
                imageFile.val("");
                return swal({
                    text: "이미지 파일만 업로드 가능합니다.",
                    icon: "error",
                });
            } else {
                reader.onload = function (e) {
                    $('.img_thumbnail_box > img').attr('src', e.target.result);
                    imgThumbnailBox.removeClass('hidden');
                }
                reader.readAsDataURL(file);
            }
        });

        $('.review_img_delete').on('click', () => {
            imgThumbnailBox.addClass('hidden');
            imageFile.val("");
        });
    }

    updateThumbnail() {
        let updateImg = $('input[name=updateImg]');
        let udtImgBox = $('.update_img_box');

        updateImg.on('change', (e) => {
            let fileSize = e.target.files[0].size;
            let maxSize = 1024 * 1024;
            let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf|PNG)$/;
            let file = e.target.files[0];
            let reader = new FileReader();

            if (fileSize > maxSize) {
                updateImg.val("");
                return swal({
                    text: "1MB 이하의 파일만 업로드 가능합니다.",
                    icon: "error",
                });
            } else if (!updateImg.val().match(fileForm)) {
                updateImg.val("");
                return swal({
                    text: "이미지 파일만 업로드 가능합니다.",
                    icon: "error",
                });
            } else {
                reader.onload = function (e) {
                    $('.update_thumbnail').attr('src', e.target.result);
                    udtImgBox.removeClass('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
        $('.update_img_delete').on('click', (e) => {
            $(e.currentTarget).parent().addClass('hidden');
            $(e.currentTarget).prev().attr('src', null);
        });
    }

    //test
    thumbnailModal() {
        let replyImgTag = $('.reply_img > img');
        replyImgTag.on('click', (e) => {
            let crntImg = $(e.currentTarget).attr('data-bs-target').slice(1);
            console.log(crntImg);
            axios.post("imgViews", {"crntImg": crntImg});
        });
    }

}