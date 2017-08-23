//接收上个页面传过来的参数
function queryString() {
	var name, value, i;
	var str = location.href;
	var num = str.indexOf("?")
	str = str.substr(num + 1);
	var arrtmp = str.split("&");
	for(i = 0; i < arrtmp.length; i++) {
		num = arrtmp[i].indexOf("=");
		if(num > 0) {
			name = arrtmp[i].substring(0, num);
			value = arrtmp[i].substr(num + 1);
			this[name] = value;
		}
	}
}

//UTF-8编码的汉字转换为字符，特殊字符处理
function fromUtf8ToChinese(strUtf8) {
	var bstr = "";
	var nOffset = 0;
	if(strUtf8 == "") {
		return "";
	}

	strUtf8 = strUtf8.toLowerCase();
	nOffset = strUtf8.indexOf("%e");
	if(nOffset == -1) {
		return strUtf8;
	}
	while(nOffset != -1) {
		bstr += strUtf8.substr(0, nOffset);
		strUtf8 = strUtf8.substr(nOffset, strUtf8.length - nOffset);
		if(strUtf8 == "" || strUtf8.length < 9) {
			return bstr;
		}
		bstr += utf8CodeToChineseChar(strUtf8.substr(0, 9));
		strUtf8 = strUtf8.substr(9, strUtf8.length - 9);
		nOffset = strUtf8.indexOf("%e");
	}
	return bstr + strUtf8;
}

function utf8CodeToChineseChar(strUtf8) {
	var iCode, iCode1, iCode2;
	iCode = parseInt("0x" + strUtf8.substr(1, 2));
	iCode1 = parseInt("0x" + strUtf8.substr(4, 2));
	iCode2 = parseInt("0x" + strUtf8.substr(7, 2));

	return String.fromCharCode(((iCode & 0x0F) << 12) |
		((iCode1 & 0x3F) << 6) |
		(iCode2 & 0x3F));
}
/**
 * 我的ajax获取后台数据
 * @param {Object} urlPath_parameter
 */
function myAjax(urlPath_parameter, need_data) {
	loadingAnimate();
	console.log("loadingAnimate();");
	var serverUrl = "http://120.76.190.223:8988/" + urlPath_parameter;
	var getdata_obj;
	$.ajax({
		type: "post",
		url: serverUrl,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded; charset=GBK",
		data: need_data,
		cache: false,
		async: false,
		success: function(res) {
			$(".loading_animate").hide();
			console.log("mytools.js, myAjax:[" + urlPath_parameter + "], success:[" + JSON.stringify(res) + "]");

			if(res.gda.msg_typ == "N") {
				getdata_obj = res;
			} else {
//				alert(res.gda.msg_inf);
				return "";
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$(".loading_animate").hide();
			console.error("mytools.js, myAjax:[" + urlPath_parameter + "], error:[" + jqXHR.status + ":" + textStatus + ":" + errorThrown + "]");
			//alert("异常错误:"+jqXHR.status);
			return "";
		}
	});
	return getdata_obj;
}

function myAjax1(urlPath_parameter, need_data) {
    var serverUrl = "http://120.76.190.223:8988/" + urlPath_parameter;
    var getdata_obj = "";
    $.ajax({
        type: "post",
        url: serverUrl,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=GBK",
        data: need_data,
        cache:false,
        sync: false,
        success: function(res) {
           console.log("mytools.js, myAjax1:[" + urlPath_parameter + "], success:[" + JSON.stringify(res) + "]");
            getdata_obj = res;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.error("mytools.js, myAjax1:[" + urlPath_parameter + "], error:[" + jqXHR.status + ":" +  textStatus + ":" + errorThrown + "]");
            //alert("异常错误:"+jqXHR.status);
        }
    });
    return getdata_obj;
}

//加载分页器'.swiper-container'
function loadSwiper(classOne, classTwo) {
	new Swiper('.' + classOne + '', {
		direction: 'horizontal',
		loop: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true, //修改swiper的父元素时，自动初始化swiper
		speed: 300,
		autoplay: 2000,
		paginationClickable: true,
		//分页器
		pagination: '.' + classTwo + '',
		//centeedSlides: true,
		//	autoplayDisableOnInteraction: false
		/*onSlideChangeEnd: /function(swiper){
			swiper.update();
		}*/
	})
}
/**
 * 设置手机号码显示为3+4+4的格式
 * @param {Object} obj 
 */
function setPhoneNum(obj) {
	var value = obj.value;
	value = value.replace(/\s*/g, "");
	var result = [];
	if(value.length==11){
		for(var i = 0; i < value.length; i++) {
			if(i == 3 || i == 7) {
				result.push(" ");
				result.push(value.charAt(i));
				//result.push(" " + value.charAt(i));
			} else {
				result.push(value.charAt(i));
			}
		}
		obj.value = result.join("");
	}

}
/**
 * 获取图片规格（1x_，2x_，3x_）
 * @param {Object} 
 */
function getDifferencePic(picture_path, picture_style) {
	var a = picture_path.lastIndexOf("/");
	var file_path = picture_path.substring(0, a + 1);
	var file_name = picture_path.substring(a + 1, picture_path.length);
	var picture_size = file_path + picture_style + file_name;
	return picture_size;
}

/**
 * 获取当前日期 例如：2017-03-18
 * type(1-获取日期，2-获取时间，3-获取日期和时间)
 * @param {Object} 
 */
function getNowFormatDate(type) {
	var currentdate = "";
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	month = addZero(month);
	var strDate = date.getDate();
	strDate = addZero(strDate);
	var hour = date.getHours();
	hour = addZero(hour);
	var minutes = date.getMinutes();
	minutes = addZero(minutes);
	var seconds = date.getSeconds();
	seconds = addZero(seconds);
	switch(type) {
		case "1":
			currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			break;
		case "2":
			currentdate = hour + seperator2 + minutes + seperator2 + seconds;
			break;
		case "3":
			currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				" " + hour + seperator2 + minutes + seperator2 + seconds;
			break;
		default:
			break;
	}
	return currentdate;
}
/**
 * 当传入的参数小于10时，在前面添加0
 * @param {Object} 
 */
function addZero(initString) {
	if(initString >= 0 && initString <= 9) {
		initString = "0" + initString;
	}
	return initString;
}

/**
 * 转换表情
 * @param {Object} str
 */
function changeEmoji(str) {
	var emojArray = ["[smiley_0]", "[smiley_1]", "[smiley_2]", "[smiley_3]", "[smiley_4]", "[smiley_5]", "[smiley_6]", "[smiley_7]", "[smiley_8]", "[smiley_9]",
		"[smiley_10]", "[smiley_11]", "[smiley_12]", "[smiley_13]", "[smiley_14]", "[smiley_15]", "[smiley_16]", "[smiley_17]", "[smiley_18]", "[smiley_19]",
		"[smiley_20]", "[smiley_21]", "[smiley_22]", "[smiley_23]", "[smiley_24]", "[smiley_25]", "[smiley_26]", "[smiley_27]", "[smiley_28]", "[smiley_29]",
		"[smiley_30]", "[smiley_31]", "[smiley_32]", "[smiley_33]", "[smiley_34]", "[smiley_35]", "[smiley_36]", "[smiley_37]", "[smiley_38]", "[smiley_39]",
		"[smiley_40]", "[smiley_41]", "[smiley_42]", "[smiley_43]", "[smiley_44]", "[smiley_45]", "[smiley_46]", "[smiley_47]", "[smiley_48]", "[smiley_49]",
		"[smiley_50]", "[smiley_51]", "[smiley_52]", "[smiley_53]", "[smiley_54]", "[smiley_55]", "[smiley_56]", "[smiley_57]", "[smiley_58]", "[smiley_59]",
		"[smiley_60]", "[smiley_61]", "[smiley_62]", "[smiley_63]", "[smiley_64]", "[smiley_65]", "[smiley_66]", "[smiley_67]", "[smiley_68]", "[smiley_69]",
		"[smiley_70]", "[smiley_71]", "[smiley_72]", "[smiley_73]", "[smiley_74]", "[smiley_75]", "[smiley_76]", "[smiley_77]", "[smiley_78]", "[smiley_79]",
		"[smiley_80]", "[smiley_81]", "[smiley_82]", "[smiley_83]", "[smiley_84]", "[smiley_85]", "[smiley_86]", "[smiley_87]", "[smiley_88]", "[smiley_89]",
	];
	for(var i = 0; i < emojArray.length; i++) {
		//if (str.indexOf(emojArray[i])>0) {
		var reg = new RegExp(emojArray[i], "g");
		//str=str.replace(reg,'<img class="emoji_style" src="img/表情/表情包/'+emojArray[i].substring(1,emojArray[i].length-1)+'.png">');
		str = str.replace(reg, "ni");
		console.log(str);
		//}
	}
	return str;
}

/**
 * 校验手机号码
 * @param {Object} tel
 */
function isMobile(tel) {
	var reg = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/;
	if(reg.test(tel)) {
		return true;
	} else {
		return false;
	}
}

function callByAndroid() {
	console.log("callByAndroid");
	alert("Js收到消息");
	//showElement("Js收到消息-->无参方法callByAndroid被调用");
}

function callByAndroidParam(msg1) {
	console.log("callByAndroid_param");
	alert("Js收到消息：" + msg1);
	//showElement("Js收到消息-->方法callByAndroidParam被调用,参数:" + msg1);

}

function callByAndroidMoreParams(objs, msg2, msg3) {
	alert("objs="+objs.toJSONString());
	alert("Js收到消息：" + "id:" + objs.id.toString() + " name:" + objs.name + " age:" + objs.age.toString() + msg2 + msg3);
	//showElement("Js收到消息-->方法callByAndroidMoreParam被调用 , 参数1:" + objs + "  参数2:" + msg2 + "  参数3:" + msg3);
	return "ok";
}

function callByAndroidInteraction(msg) {
	showElement(msg);
	window.setTimeout(sendHelloToAndroid, 3000);
}

/*H5给原生传值*/
function sendHelloToNative() {
	if(window.native != null && typeof(window.native) != "undefined") {
		native.callNative("你好，native! ");
	}else{
		alert(typeof(window.native));
	}

}

/*原生点击右上角*/

/*原生给H5传值*/
function callByNativeMoreParams(objs,msg2,msg3){
	alert("3")
	alert("Js收到消息：" + "id:" + objs.id

		.toString() + " name:" + objs.name

		+
		" age:" + objs.age.toString() + msg2 + msg3);
	showElement("Js收到消息-->方法callByNativeMoreParams被调用 , 参数1:" + objs + "参数2:" + msg2 + "  参数3:" + msg3);
	return "ok";
}

//H5弹出框
function popHtml(tips) {
	var html = '<div class="model_bottom"></div>'+
				'<div class="pop">'+
				'<div class="pop_font">'+tips+'</div>'+
				'</div>'
	$(html).appendTo("body");
	$(".model_bottom").show(300).delay(2000).hide(300);
	$(".pop").show(300).delay(2000).hide(300);
	setTimeout("fn()",2100);
}

function fn() {
	$(".model_bottom").remove();
	$(".pop").remove();
}

function loadingAnimate() {
	var animateString = '<div class="loading_animate" style="position: fixed;left: 0;top: 0;background-color: rgba(0,0,0,0.3)!important;z-index: 99999;width: 100%;height: 100%;">' +
		'<div style="text-align: center;margin-top: 75%;">' +
		'<img style="width: 1.5rem;height: 1.5rem;border-radius: 50%;" src="img/loading_img.gif"/>' +
		'</div>' +
		'</div>';
	$(animateString).appendTo("body");	
}