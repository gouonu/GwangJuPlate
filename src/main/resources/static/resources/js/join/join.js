"use strict";
import {FormatUtil} from "../module/common/formatUtil";


$(()=>{
	new Join();

})

export class Join
{
	constructor() {
		console.log('join')
		this.eventBindgin();
	}

	// 배우자 희망지역
	locEvent(key){
		console.log(key)

		let locTmpl = require("@/join/want.html")

		let callObj = {'key' : $('#locWantKey').val()};
		console.log($('#locWantKey').val())


		axios.post('/data/wantLoc', callObj).then((result)=>{
			console.log(result);
			result.data.title = key.key === 'loc' ? '자기지역' : '배우자 희망지역';
			//console.log(locTmpl(result));
			$('.want_loc').append(locTmpl(result));
			this.wantLocEvent();
			$('.want_loc').removeClass('hidden');
			$('.hope_list > li').each((idx, obj)=> {
				let $obj = $(obj).children('a');
				if ($obj.hasClass('active')) {
					$('.select_all').addClass('active');

				}
			})


		})
	}
	//본인 지역 선택
	locEvent2(key){
		let locTmpl = require("@/join/loc.html")
		let callObj = {'key' : $('#locWant').val()};
		let locDetailTmpl = require("@/join/locDetail.html");

		axios.post('/data/loc', callObj).then((result)=> {
			console.log(result);
			result.data.title = key.key === 'loc' ? '자기지역' : '배우자 희망지역';

			let html;
			_.forEach(result.data.locData, (obj) => {
				html+= '<div>' +
					'</div>'
				if (obj.code === 'b') {
					_.assign(obj, {checked : true})
				} else {
					_.assign(obj, {checked : false})
				}
				// 지역 출력
				//console.log(obj)

			});
			console.log(html)
			$('.normal_pop_wrap').empty();
			$('.want_loc').append(locTmpl(result));
			$('.region_content_kr_detail> ul').append(locDetailTmpl(result));
			this.RegionEvent();
			$('.want_loc').removeClass('hidden');

		})

	}
	locMiddleEvent(){

		// 국내 상세 지역 선택


	}

	// 배우자 희망 지역 이벤트
	wantLocEvent(){
		//선택하면 값 보내기
		$('.btn_complete').on('click', (e)=>{
			let selectedKeyArray = new Array();
			$('.hope_list > li').each((idx, obj)=>{
				//console.log(idx, obj, $(obj).hasClass());
				if($(obj).children('a').hasClass('active')){
					let wantKey = $(obj).children('a').data('key');
					//console.log(wantKey);
					selectedKeyArray.push(wantKey);
					console.log(selectedKeyArray);
					console.log(_.join(selectedKeyArray, ','));
				}
			})

			$('#locWantKey').val(_.join(selectedKeyArray, ','));
			$('.want_loc').empty().addClass('hidden');
		})
		// 초기화
		$('.btn_reset').on('click', (e)=>{
			$('.hope_list > li').each((idx, obj)=>{
				let $obj = $(obj).children('a');
				if($obj.hasClass('active')){
					$obj.removeClass('active');
				}
			})
		})
		// 체크
		$('.hope_list > li > a').on('click', (e)=>{
			console.log(e, e.currentTarget, $(e.currentTarget))

			if($(e.currentTarget).hasClass('active')){
				$(e.currentTarget).removeClass('active');

			}else{
				$(e.currentTarget).addClass('active'
				);
			}
		})
		$('.select_all').on('click', (e)=>{
			$('.hope_list > li').each((idx, obj)=>{
				let $obj = $(obj).children('a');

				if($(e.currentTarget).hasClass('active')){
					$obj.addClass('active');

				}
				else{
					$obj.removeClass('active');

				}
			})
		})

		//닫기
		$('.pop_cls').on('click', (e)=>{
			$('.want_loc').empty().addClass('hidden');
		})
	}
	//본인지역
	RegionEvent(){
		// 값 넘기기
		$('.btn_slct').on('click', (e)=>{
			let selectedKeyArray = new Array()
			let selectedKeyArray2 = new Array()
			//국내 선택시
			if($('.slct_kr').hasClass('active')) {
				$('.region_list > li').each((idx, obj) => {
					if ($(obj).children('a').hasClass('chk_active')) {
						let wantKey = $(obj).children('a').data('key');
						//console.log(wantKey);
						selectedKeyArray.push(wantKey);
						console.log(selectedKeyArray);
						console.log(_.join(selectedKeyArray, ','));
						$('#locWant').val(_.join(selectedKeyArray, ','));

					}

					$('.region_detail > li').each((idx, obj) => {
						//console.log(idx, obj, $(obj).hasClass());

						if ($(obj).children('a').hasClass('chk_active')) {
							let wantKey2 = $(obj).children('a').data('key');
							//console.log(wantKey);
							selectedKeyArray2.push(wantKey2);
							console.log(selectedKeyArray2);
							console.log(_.join(selectedKeyArray2, ','));
							$('#locWantDetail').val(_.join(selectedKeyArray2, ','));
							$('.regionAboard_list').addClass('hidden');
							$('.region_list').addClass('hidden');
							$('.region_content_kr_detail').removeClass('hidden');
							$('.want_loc').empty().addClass('hidden');}

					})
				})
			}
			// 해외 선택시
			else {
				$('.regionAboard_list > li').each((idx, obj) => {
					//console.log(idx, obj, $(obj).hasClass());

					if ($(obj).children('a').hasClass('chk_active')) {
						let wantKey = $(obj).children('a').data('key');
						//console.log(wantKey);
						selectedKeyArray.push(wantKey);
						console.log(selectedKeyArray);
						console.log(_.join(selectedKeyArray, ','));
						$('#locWantAbroad').val(_.join(selectedKeyArray, ','));
						$('.regionAboard_list').addClass('hidden');
						$('.region_list').addClass('hidden');
						$('.region_content_kr_detail').removeClass('hidden');
						$('.want_loc').empty().addClass('hidden');
					}
				})



			}

		})

		//국내 대분류
		$('.region_list > li > a').on('click', (e)=>{
			//console.log(e, e.currentTarget, $(e.currentTarget))

			$('.region_list > li > a').removeClass('chk_active')
			$(e.currentTarget).addClass('chk_active');
			$('.btn_slct').addClass('active');


		})
		//해외
		$('.regionAboard_list > li > a').on('click', (e)=>{
			//console.log(e, e.currentTarget, $(e.currentTarget))

			$('.regionAboard_list > li > a').removeClass('chk_active')
			$(e.currentTarget).addClass('chk_active');
			$('.btn_slct').addClass('active');

		})
		//국내 상세 분류
		$('.region_content_kr_detail > ul > li > a').on('click', (e)=>{
			// 상세지역 선택
			$('.region_content_kr_detail > ul > li > a ').each((idx, obj) => {

				$('.region_content_kr_detail > ul > li > a').removeClass('chk_active')
				$(e.currentTarget).addClass('chk_active');
				$('.btn_slct').addClass('active');




			})
			console.log(e, e.currentTarget, $(e.currentTarget))


		})
		// 이전 버튼
		$('.btn_prev').on('click', (e)=>{
			$('.region_content_kr').removeClass('hidden');
			$('.region_content_kr_detail').addClass('hidden');
			$('.btn_prev').addClass('hidden');
			$('.btn_slct').removeClass('btn_half');
			$('.btn_slct').addClass('btn_full');


		})

/// 여기부터 중복코드
		// 해외 선택
		$('.slct_abroad').on('click', (e) => {
			$('.regionAboard_list > li > a').removeClass('chk_active')
			$('.region_content_abroad').removeClass('hidden');
			$('.slct_abroad').addClass('active');
			if($('.slct_kr').hasClass('active')){
				$('.slct_kr').removeClass('active');
			}
			$('.region_list').addClass('hidden');
			$('.region_content_kr_detail').addClass('hidden');
			$('.regionAboard_list').removeClass('hidden');
			$('.btn_prev').addClass('hidden');
			$('.btn_slct').removeClass('btn_half');
			$('.btn_slct').addClass('btn_full');

		})
		//국내 선택
		$('.slct_kr').on('click', (e) => {
			$('.region_content_kr').removeClass('hidden');
			$('.region_content_kr > ul > li > a').removeClass('chk_active')
			$('.slct_kr').addClass('active');
			if($('.slct_abroad').hasClass('active')){
				$('.slct_abroad').removeClass('active');
			}
			$('.regionAboard_list').addClass('hidden');
			$('.region_content_kr_detail').addClass('hidden');
			$('.region_list').removeClass('hidden');

		})

		$('.region_content_kr > ul > li > a').on('click', (e) => {
			console.log("국내 지역 선택");
			$('.region_content_abroad > ul > li ').each((idx, obj) => { // 해외지역 선택 없애기
				$(obj).children('a').removeClass('chk_active');
			})

			$('.region_content_kr > ul > li > a ').each((idx, obj) => { // 하나만 선택
				if ($(obj).children('a').hasClass('chk_active')) {
					$(obj).children('a').removeClass('chk_active');
				}
			})
			$(e.currentTarget).addClass('chk_active');
			console.log($(e.currentTarget));
			let key = $(e.currentTarget).data('key');
			let middle = $('#locWant').val(key);
			console.log("middle->" , middle);


			// let call = {'key' : key, 'middleKey' : middle};
			// let call = {'key' : $('#locWant').val(key), 'middleKey' : $('#locWantMiddle').val()};

			let call = {'key':key}
			let locMiddleTemplate = require("@/join/locMiddle.html");
			// console.log(key);

			axios.post('/data/locMiddle', call).then((data)=> {
				console.log(data);
				$('.region_content_kr_detail >ul').empty();
				$('.region_content_kr_detail >ul').append(locMiddleTemplate(data));
				this. RegionEvent();
				$('.region_content_kr').addClass('hidden');
				$('.region_content_kr_detail').removeClass('hidden');
				$('.btn_slct').removeClass('btn_full');
				$('.btn_slct').addClass('btn_half');
				$('.btn_prev').removeClass('hidden');

			});

		})



		$('.btn_cls').on('click', (e)=>{
			$('.want_loc').empty().addClass('hidden');
		})


	}

	eventBindgin(){



		$('.slct_man').on('click', ()=>{
			bridge.startWin('/');
		});

		$(document).ready(function() {

			$('.btn_back_area').click(function() {

				$(location).attr('href','/');

			});

		});

		// 배우자 희망지역 이벤트
		$('.btn_hope_area').on('click', (e)=>{
			// console.log('aaaaaa')
			this.locEvent($(e.currentTarget).data());

		})
		// 본인 지역 이벤트
		$('.btn_slct_area').on('click', (e)=>{
			//console.log('aaaaaa')
			this.locEvent2($(e.currentTarget).data());

		})




	}
	eventBindgin3(){
		$('.btn_member').on('click', (e)=>{
			if(!$('#userId').val()){
				$('.join_txt:first').css('color', 'red');
				$('#userID').focus();
				return false;
			}

			if(!$('#userPw').val()){
				return false;
			}

			if($('#userPw').val() != $('#userPwchk').val()){
				$('#userPwchk').focus();
				return false;
			}

			if(!$('#userPwchk').val()){
				return false;
			}

			if(!$('#userName').val()){
				$('#userName').focus();
				return false;
			}
			if(!$('#userDate').val()){
				$('#userDate').focus();
				return false;
			}
			if(!$('#userSex').val()){
				$('#userSex').focus();
				return false;
			}
			if(!$('#userPhnum').val()){
				$('#userPhnum').focus();
				return false;
			}

			// 남 or 녀 여부

			// 태어난 년도 여부

			// 체크 여부

		});


	}


}