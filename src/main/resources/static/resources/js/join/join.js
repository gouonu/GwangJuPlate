
"use strict";


$(()=>{
    new Join();
})

export class Join{

    constructor() {
        console.log("회원가입");
        this.validationEvent()
    }

    inputChecks={
        idCheck1:false,
        idCheck2:false,
        pwCheck1:false,
        pwCheck2:false,
        nameCheck:false,
        policyCheck:false,

    }

    validationEvent(){

        let $idErr1 =  $(".userID").find(".error:eq(0)"); // 아이디가 올바르지 않습니다.
        let $idErr2 =  $(".userID").find(".error:eq(1)"); // 중복되는 아이디 입니다.
        let $idCon = $(".userID").find(".confirm"); // 사용 가능한 아이디 입니다.
        let $pwErr1 =  $(".userPw").find(".error"); // 4자 ~ 12자 영어, 숫자만 사용가능합니다.
        let $pwCon1 = $(".userPw").find(".confirm"); // 등록 가능합니다.
        let $pwCkErr =  $(".userPwchk").find(".error"); // 비밀번호가 동일하지 않습니다.
        let $pwCkCon = $(".userPwchk").find(".confirm"); // 비밀번호가 동일합니다.
        let $nameErr = $(".userName").find(".error"); // 올바르지 않은 이름입니다.
        // let $phoneErr1 = $(".userPhnum").find(".error:eq(0)"); // 올바르지 않은 번호입니다.
        // let $phoneErr2 = $(".userPhnum").find(".error:eq(1)"); // -를 제외하고 입력해주세요.

        let idPattern = /^[A-Za-z0-9].{3,12}$/;
        let pwPattern = /^[A-Za-z0-9].{3,12}$/;
        let namePattern = /^[가-힣]{2,8}$/;


        $("#userId").on("keyup", (e)=> {
            let id = document.getElementById("userId").value;
            if (idPattern.test(id)) {
                $idErr1.addClass("hidden");
                this.inputChecks.idCheck1=true;
            } else {
                $idErr1.removeClass("hidden");
                this.inputChecks.idCheck1 = false;
            }
            this.joinBtnOnOff();
        })

        $("#userId").on("blur", (e)=> {
            let id = document.getElementById("userId").value;
            if(this.inputChecks.idCheck1&& id!=="") {
                axios.post("idDuplicate", {"id":id}).then((result)=>{
                    // console.log(result.data);
                    if(result.data){ //중복x
                        $idErr2.addClass("hidden");
                        $idCon.removeClass("hidden");
                        this.inputChecks.idCheck2=true;
                    }else{ //중복o
                        $idErr2.removeClass("hidden");
                        $idCon.addClass("hidden");
                        this.inputChecks.idCheck2=false;
                    }
                })
            }else{
                $idErr2.addClass("hidden");
                $idCon.addClass("hidden");
            }
            this.joinBtnOnOff();
        })


        /**
         * 비밀 번호 체크
         */
        $("#userPw").on("keyup", (e)=>{
            let pw = document.getElementById("userPw").value;
            if(pwPattern.test(pw)){
                $pwCon1.removeClass("hidden");
                $pwErr1.addClass("hidden");
                this.inputChecks.pwCheck1 = true;
                $('#userPwchk').attr("disabled", false);
            }else{
                $pwErr1.removeClass("hidden");
                $pwCon1.addClass("hidden");
                this.inputChecks.pwCheck1 = false;

                $('#userPwchk').attr("disabled", true);
                $('#userPwchk').val('');
                $pwCkErr.addClass("hidden");
                $pwCkCon.addClass("hidden");
            }
            this.joinBtnOnOff();
        })

        $("#userPwchk").on("keyup", (e)=> {
            let pw = document.getElementById("userPw").value;
            let pwChk = document.getElementById("userPwchk").value;
            if(pw===pwChk){
                $pwCkCon.removeClass("hidden");
                $pwCkErr.addClass("hidden");
                this.inputChecks.pwCheck2 = true;
            }else{
                $pwCkErr.removeClass("hidden");
                $pwCkCon.addClass("hidden");
                this.inputChecks.pwCheck2 = false;
            }
            this.joinBtnOnOff();
        })


        $("#userName").on("keyup", (e)=>{
            let name = document.getElementById("userName").value;
            if(namePattern.test(name)){
                $nameErr.addClass("hidden");
                this.inputChecks.nameCheck = true;
            }else{
                $nameErr.removeClass("hidden");
                this.inputChecks.nameCheck = false;
            }
            this.joinBtnOnOff();
        })

        $("#userPolicy").on("click",(e)=>{
            let policy = document.getElementById("userPolicy").value;
            if(policy==='on'){
                document.getElementById("userPolicy").value='off';
                this.inputChecks.policyCheck=false;
            }else{
                document.getElementById("userPolicy").value='on';
                this.inputChecks.policyCheck=true;
            }
            // console.log(policy);
            this.joinBtnOnOff();
        })

    }

    joinBtnOnOff(){
        let count=0;
        let checkLength = Object.keys(this.inputChecks).length;
        // console.log(this.inputChecks);
        _(this.inputChecks).forEach(function (n){
            if(n){
                count+=1;
            }
        })
        if(count===checkLength) {
            console.log("가입완료버튼 활성화");
            $(".userJoinBtn").removeAttr("disabled");
        }else{
            console.log("가입완료버튼 비활성화");
            $(".userJoinBtn").attr("disabled", true);
        }
        console.log(count+"/"+checkLength);
    }










}

