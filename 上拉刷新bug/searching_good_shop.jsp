<%@ page contentType="text/html;charset=GBK" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">

	<head>
		<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta http-equiv="Content-Type" content="text/html;charset=GBK" />
		<meta content="yes" name="apple-mobile-web-app-capable" />
		<meta content="black" name="apple-mobile-web-app-status-bar-style" />
		<meta content="telephone=no" name="format-detection" />
		<meta http-equiv="Cache-Control" content="no-cache"/>
		<title>Ѱ�õ�</title>
		<link rel="stylesheet" href="css/common_css/initialization_style.css" />
		<link rel="stylesheet" href="css/common_css/public_style.css" />
		<link rel="stylesheet" href="css/common_css/swiper.min.css" />
		<link rel="stylesheet" href="css/searching_good_shop.css" />
		<script type="text/javascript" src="js/common_js/swiper.min.js"></script>
		<script type="text/javascript" src="js/common_js/jquery-2.1.4.min.js"></script>
		<!--<script type="text/javascript" src="js/common_js/set_fontsize.js"></script>-->
		<script type="text/javascript">
			(function($, document) {
				console.log("This is a test");
				var fontSize = $(window).width() / 10;
				$("html").css('font-size', fontSize + 'px');
			})(jQuery, document);
		</script>
	</head>
	<body>
	<div class="swiper-container swiper-container1">
		<div class="refreshtip">��������ˢ��</div>
		<div class="init-loading list-group-item text-center" style="display: none;">��������ˢ��</div>
		<div id="search_shop_container_id" class="swiper-wrapper list-group">

			<!--<div class="one_shop_container">
				<div class="searching_shop_container">
					<img class="searching_shop_container_img" src="img/searching_good_shop/shop_pic@2x.png" srcset="img/searching_good_shop/shop_pic@2x.png 2x,img/searching_good_shop/shop_pic@3x.png 3x" />
				</div>
				<div class="searching_shop_name_container">
					<div class="searching_shop_name">�ߺ�·����</div>
					<div class="comment_start_box">
						<div class="start_nor start_sel"></div>
						<div class="start_nor start_sel"></div>
						<div class="start_nor start_sel"></div>
						<div class="start_nor start_sel"></div>
						<div class="start_nor"></div>
					</div>
					<div class="score"><span>4.0</span></div>
				</div>
				<div class="serching_shop_adviser clear">
					<img src="img/receiver_address@2x.png" srcset="img/receiver_address@2x.png 2x, img/receiver_address@3x.png 3x" class="location_img" />
					<div class="location_text">
						<span>����ͨ����·�������28��</span>
					</div>
					<div class="location_area">
						<span>������&lt;50��</span>
					</div>
				</div>
				<div class="line_bend">
					<img class="line_bend_img" src="img/line_one.png" />
				</div>
				<div class="advister_container">
					<div class="second_part">
						<div class="reds_message">
							<div class="reds_headpor">
								<img class="customer-icon" src="img/adviser_two@2x.png" srcset="img/adviser_two@2x.png 2x, img/adviser_two@3x.png 3x">
							</div>
							<div class="reds_name">������</div>
							<div class="reds_fans_num">����125λ��˿</div>
							<div class="reds_chat">
								<p class="reds_chat_p">+&nbsp;����</p>
							</div>
						</div>
					</div>
				</div>
			</div>-->

		</div>
		<div class="loadtip">�������ظ���</div>
			<!--<div class="swiper-scrollbar"></div>-->
		</div>
		<div class="line_interval"></div>
	</div>
	</body>
	<script type="text/javascript" src="js/common_js/vconsole.min.js"></script>
	<script type="text/javascript" src="js/common_js/change_fontsize.js"></script>
	<script type="text/javascript" src="js/common_js/my_tools.js"></script>
	<script type="text/javascript" src="js/searching_good_shop.js"></script>
</html>