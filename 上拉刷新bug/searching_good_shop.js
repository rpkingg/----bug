(function($, document) {




	//接口路径
	//mrsyg/kqgoods/GoodShop.form?pag_no=1&pag_num=100
	var urlPath_one = "mrsyg/kqgoods/GoodShop.form";
	var need_data = {
		"pag_no": "1",
		"pag_num": "100"
	};
	var data_one = myAjax(urlPath_one, need_data);
	if(data_one != undefined) {
		init(data_one);
	}

	function init(data) {
		$.each(data.shopinfo, function(index, getData) {
			//店铺图片2x
			var shop_picture = getData.shop_picture;
			//店铺图片3x
			//店铺名称
			var shop_name = getData.shop_name;
			//店铺评分
			var shop_grade = getData.shop_grade;
			var red_starts = "";
			var gray_starts = "";
			for(var i = 0; i < shop_grade; i++) {
				red_starts = red_starts + '<div class="start_nor start_sel"></div>';
			}
			for(var i = 0; i < 5 - shop_grade; i++) {
				gray_starts = gray_starts + '<div class="start_nor"></div>';
			}
			//店铺地址
			var shop_address = getData.shop_address;
			//距离店铺多远
			var distance = parseInt(getData.distance);
			var distance_judge = "";
			console.log("distance="+distance)
			if(distance >= 1000){
				distance_judge = (distance/1000).toFixed(1);
					var distance_unit = "公里";
			}
			else{
				distance_judge = distance.toFixed(0);
				var distance_unit = "米";
			}
			//店铺编号
			var shop_id = getData.shop_id;
			var firstString = '<div class="offsetH">'+
				'<div class="one_shop_container swiper-slide">' +
				'<div class="searching_shop_container" id="' + shop_id + '">' +
				'<img class="searching_shop_container_img" src="'+shop_picture+'" srcset=""/>' +
				'</div>' +
				'<div class="searching_shop_name_container">' +
				'<div class="searching_shop_name one_line_font">' + shop_name + '</div>' +
				'<div class="comment_start_box">' + red_starts + gray_starts + '</div>' +
				'<div class="score"><span>' + shop_grade + '</span></div>' +
				'</div>' +
				'<div class="serching_shop_adviser clear">' +
				'<img class="location_img" src="img/receiver_address@2x.png" srcset="img/receiver_address@2x.png 2x, img/receiver_address@3x.png 3x"/>' +
				'<div class="location_text">' +
				'<span class="one_line_font location_width">' + shop_address + '</span>' +
				'</div>' +
				'<div class="location_area">' +
				'<span>距你&lt;' + distance_judge + '<span class="distance_unit">'+distance_unit+'</span></span>' +
				'</div>' +
				'</div>' +
				'<div class="line_bend">' +
				'</div>'+
				'</div>';
			var assistantSting = "";
			var count = 1;
			if(getData.assistantinfo) {
				$.each(getData.assistantinfo, function(index, getData) {
					//营业员头像
					var customer_picture = getData.customer_picture;
					//营业员id
					var assistant_id = getData.assistant_id;
					//营业员名称
					var customer_name = getData.customer_name;
					//营业员粉丝数量
					var fans_total = getData.fans_total;
					//云信accid
					var assistant_focus = getData.assistant_focus_flag;
					var  assistant_Focus = "";
					if  (assistant_focus == -1){
						assistant_Focus = "已关注" ;
						var colorString = '<div class="reds_color" id="'+im_uuid+'">' +
							'<p class="reds_chat_p">'+assistant_Focus+'</p>'+
							'</div>';
					}
					else if (assistant_focus == 1){
						assistant_Focus = "+ 聊聊" ;
						var colorString = '<div class="reds_chat" id="'+im_uuid+'">' +
							'<p class="reds_chat_p">'+assistant_Focus+'</p>'+
							'</div>';
					}
					var im_uuid = getData.im_uuid;
					count = count + 1;
					assistantSting = assistantSting + '<div class="reds_message" data-index="'+count+'" data-focus="'+assistant_focus+'" data-id="'+assistant_id+'">' +
						'<div class="reds_headpor">' +
						'<img class="customer-icon radius" src="' + customer_picture + '" id="' + assistant_id + '">' +
						'</div>' +
						'<div class="reds_name one_line_font">' + customer_name + '</div>' +
						'<div class="reds_fans_num">已有' + fans_total + '位粉丝</div>' +

						colorString +

						'</div>';
				});

			}

			var secondString = '<div class="advister_container">' +
				'<div class="second_part">' + assistantSting +
				'</div>' +
				'</div>' +
				'</div>';
			var needString = firstString + secondString;
			$(needString).appendTo("#search_shop_container_id");
		});

		//店家店铺照片跳转到店铺详情页
		$("#search_shop_container_id").on("click", ".searching_shop_container", function() {
			//获取店铺id
			var shop_id = $(this).attr("id");
			native.openWebView("searching_good_shop_detail.jsp?jump_shop_id=" + shop_id);
		});

		//点击聊聊
		$("#search_shop_container_id").on("click", ".reds_chat", function() {
			var assistant_id = $(this).parent().attr("data-id");
			$(this).find(".reds_chat_p").text("已关注");
			$(this).addClass("reds_color")
			$(this).removeClass("reds_chat")
			//接口路径
			//mrsyg/kquser/FocusAssistant
			var urlPath_two = "mrsyg/kquser/FocusEmployer.form";
			var need_data_focus = {
				"assistant_id": assistant_id,
				"type":1
			};
			var data_one = myAjax(urlPath_two, need_data_focus);
			if (data_one != undefined) {
				init(data_one);
			}
			function init(data) {
				return true;
			}
		})

		//点击营业员头像，进入营业员页面
		$("#search_shop_container_id").on("click",".customer-icon",function(){
			//获取营业员id，
			var assistant_id=$(this).attr("id");
			console.log("assistant_id="+assistant_id);
			native.openWebView("adviser_personal_data.jsp?jump_assistant_id="+assistant_id);
		});
	}

	var count_num = $(".reds_message").attr("data-index");
	if (count_num <= 3){
		$(".advister_container").addClass("advister_container_overflow");
	}

	//上拉加载下拉刷新
	var loadFlag = true;
	var pag_no = 1;
	var mySwiper = new Swiper('.swiper-container1',{
		direction: 'vertical',
		//scrollbar: '.swiper-scrollbar',
		slidesPerView: 'auto',
		mousewheelControl: true,
		//allowSwipeToPrev : false,
		freeMode: true,
		onTouchMove: function(swiper){		//手动滑动中触发
			var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
			var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;

			if(mySwiper.translate < 50 && mySwiper.translate > 0) {
				$(".init-loading").html('下拉刷新...').show();
			}else if(mySwiper.translate > 50 ){
				$(".init-loading").html('释放刷新...').show();
			}
		},
		onTouchEnd: function(swiper) {
			var viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
			//var viewHeight = document.getElementsByClassName('offsetH')[0].offsetHeight;//元素高度
			var contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;
			// 上拉加载
			if(mySwiper.translate <= viewHeight - 50 && mySwiper.translate < 0) {
				// console.log("已经到达底部！");
				if(loadFlag){
					$(".loadtip").html('正在加载...');
				}else{
					$(".loadtip").html('没有更多啦！');
				}

				setTimeout(function() {
					pag_no++;
					//接口路径(商品)
					//http://120.76.190.223:8988/mrsyg/kqgoods/GoodShop.form
					var urlPath_one = "mrsyg/kqgoods/GoodShop.form";
					var need_data = {
						"pag_no": "1",
						"pag_num": "100"
					};
					var data_one = myAjax(urlPath_one, need_data);
					if(data_one != undefined) {
						init(data_one);
					}
					//$(".list-group").eq(mySwiper2.activeIndex).append(needString);
					$(".loadtip").html('上拉加载更多...');
					mySwiper.update(); // 重新计算高度;
				}, 800);
			}

			// 下拉刷新
			if(mySwiper.translate >= 50) {
				$(".init-loading").html('正在刷新...').show();
				//$(".loadtip").html('上拉加载更多');
				loadFlag = true;
				/*pag_no++;*/
				setTimeout(function() {
					/*//接口路径(商品)
					 //http://120.76.190.223:8988/mrsyg/kqgoods/FashionGoods.form?pag_no=1&pag_num=100
					 var urlPath_two = "mrsyg/kqgoods/FashionGoods.form";
					 var need_data_two = {
					 "pag_no":pag_no,
					 "pag_num": "1"
					 };
					 var data_two = myAjax(urlPath_two, need_data_two);
					 if(data_two != undefined) {
					 init2(data_two);
					 }*/
					window.location.reload();
					$(".refreshtip").show(0);
					$(".init-loading").html('刷新成功！');
					setTimeout(function(){
						$(".init-loading").html('').hide();
					},800);
					$(".loadtip").show(0);

					//刷新操作
					mySwiper.update(); // 重新计算高度;
				}, 1000);
			}else if(mySwiper.translate >= 0 && mySwiper.translate < 50){
				$(".init-loading").html('').hide();
			}
			return false;
		}
	});

})(jQuery, document);