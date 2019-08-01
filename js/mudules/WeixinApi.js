var _getScript = function(url, callback) {
  var head = document.getElementsByTagName('head')[0],
      js = document.createElement('script');

  js.setAttribute('type', 'text/javascript'); 
  js.setAttribute('src', url); 

  head.appendChild(js);

  //鎵ц鍥炶皟
  var callbackFn = function(){
          if(typeof callback === 'function'){
              callback();
          }
      };

  if (document.all) { //IE
      js.onreadystatechange = function() {
          if (js.readyState == 'loaded' || js.readyState == 'complete') {
              callbackFn();
          }
     }
 } else {
      js.onload = function() {
          callbackFn();
      }
 }
}
var located=-1,inarea=false;
function checkLocation(){
if(typeof(locs) != "undefined"){
if(located!=1||!inarea){
event.stopPropagation();
event.preventDefault();
}
if(located==0){
alert("姝ｅ湪杩涜鍦扮悊浣嶇疆瀹氫綅锛岃绋嶅悗鍐嶈瘯");
return false;
}
if(located==-1){
alert("璇锋偍鎵撳紑鍦板潃鐞嗙疆瀹氫綅锛屽惁鍒欐棤娉曞弬涓庢椿鍔�");
return false;
}
if(!inarea){
alert("寰堟姳姝夛紒鏍规嵁瀹氫綅锛屾偍鐨勫湴鐞嗕綅缃笉鍦ㄦ椿鍔ㄦ湁鏁堣寖鍥达紝璇峰叧娉ㄦ椿鍔ㄨ鎯呬簡瑙ｆ椿鍔ㄥ弬涓庤鍒�");
return false;
}
}
return true;
}
$(document).ready(function() {
_getScript("https://weixin.zjol.com.cn/weixin/wxapi/share_sign.js", function() {
wx.config({
     debug: false,
     appId: sign_params.appId,
     timestamp: sign_params.timestamp,
     nonceStr: sign_params.nonceStr,
     signature: sign_params.signature,
     jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage"]
 });
 wx.ready(function() {
     wx.onMenuShareTimeline({
         title: wxData.title,
         link: wxData.link,
         imgUrl: wxData.imgUrl,
         success: function() {
             wxCallbacks.success()
         },
         cancel: function() {
             wxCallbacks.cancel()
         }
     });
     wx.onMenuShareAppMessage({
         title: wxData.title,
         desc: wxData.desc,
         link: wxData.link,
         imgUrl: wxData.imgUrl,
         type: "",
         dataUrl: "",
         success: function() {
             wxCallbacks.success()
         },
         cancel: function() {
             wxCallbacks.cancel()
         }
     });
     wx.onMenuShareQQ({
         title: wxData.title,
         desc: wxData.desc,
         link: wxData.link,
         imgUrl: wxData.imgUrl,
         success: function() {
             wxCallbacks.success()
         },
         cancel: function() {
             wxCallbacks.cancel()
         }
     });
     wx.onMenuShareWeibo({
         title: wxData.title,
         desc: wxData.desc,
         link: wxData.link,
         imgUrl: wxData.imgUrl,
         success: function() {
             wxCallbacks.success()
         },
         cancel: function() {
             wxCallbacks.cancel()
         }
     });
     if(typeof(locs) != "undefined"){
       located=0;
     wx.getLocation({
   type: 'gcj02', // 榛樿涓簑gs84鐨刧ps鍧愭爣锛屽鏋滆杩斿洖鐩存帴缁檕penLocation鐢ㄧ殑鐏槦鍧愭爣锛屽彲浼犲叆'gcj02'
   success: function (res) {
       var latitude = res.latitude; // 绾害锛屾诞鐐规暟锛岃寖鍥翠负90 ~ -90
       var longitude = res.longitude; // 缁忓害锛屾诞鐐规暟锛岃寖鍥翠负180 ~ -180銆�
       var speed = res.speed; // 閫熷害锛屼互绫�/姣忕璁�
       var accuracy = res.accuracy; // 浣嶇疆绮惧害
       located=1;
       for(var i in locs){
       item=locs[i];
       if(GetDistance(latitude,longitude,Number(item.lat),Number(item.lng))<=Number(item.radius)){
         inarea=true;
         break;
       }
       }
   }
});
     }
 })
});
$(".wx_image_preview_area").delegate(".wx_image_preview","click",function(){
var srcList = [];
$(".wx_image_preview").each(function(){
srcList.push(this.src);
});
 imagePreview(this.src,srcList);
});
});
function imagePreview(curSrc, srcList) {
if (!curSrc || !srcList || srcList.length == 0) {
 return
}
WeixinJSBridge.invoke("imagePreview", {
 "current": curSrc,
 "urls": srcList
})
}
function closeWindow() {
WeixinJSBridge.call("closeWindow")
}
function toast(msg,icon,callback){
var html='<div id="toast" class="mytoast">';
html+='<div class="weui_mask_transparent"></div>';
html+='<div class="weui_toast">';
if(icon!=null){
html+='<i class="weui_icon_toast_error"></i>';
}else{
html+='<i class="weui_icon_toast"></i>';
}
html+='<p class="weui_toast_content">'+msg+'</p>';
html+='</div>';
html+='</div>';
$("body").append(html);
setTimeout(function () {
 $(".mytoast").fadeOut(function(){
   $(this).remove();
   if(callback!=null){
     callback();
   }
 });
}, 1500);
}
function loadingToast(msg){
var html='<div id="loadingToast" class="weui_loading_toast">';
html+='<div class="weui_mask_transparent"></div>';
html+='<div class="weui_toast">';
html+='<div class="weui_loading">';
html+='<div class="weui_loading_leaf weui_loading_leaf_0"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_1"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_2"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_3"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_4"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_5"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_6"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_7"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_8"></div>';
html+=' <div class="weui_loading_leaf weui_loading_leaf_9"></div>';
html+=' <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
html+='<div class="weui_loading_leaf weui_loading_leaf_11"></div>';
html+='</div>';
html+='<p class="weui_toast_content">'+msg+'</p>';
html+='</div>';
html+='</div>';
$("body").append(html);
}
function closeLoadingToast(){
$("#loadingToast").remove();
}
function loadpage() {
var html = $("<div id='loading' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='width:58px;height:10px;position: fixed;left:" + ($("body").width() / 2 - 22) + "px;top:200px;z-index:20001;' src='" + src_perfix + "image/loading.gif?v=1.1'></div>");
$("body").append(html);
$(document).on("touchmove",
function(e) {
 e.preventDefault()
})
}
function closeload() {
$("#loading").remove();
$(document).off("touchmove")
}
function guanzhu(t, wid, d) {
var html;
if (wid == null && d == null) {
 html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='position: absolute;right: 18px;top:5px;z-index:20001;' src='" + src_perfix + "mobile/website/zjolwebsite/images/guanzhu_a.png'><img style='position: fixed;right: 18px;top:120px;z-index:20001;' src='" + src_perfix + "mobile/website/zjolwebsite/images/guanzhu_b.png'><div style='text-decoration:underline;padding:20px;font-size:25px;color:#fff;position: fixed;top:250px;z-index:20001;'>" + t + "</div></div>")
} else {
 if (t != null && wid != null && d == null) {
     html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='display:block;margin:30px auto;z-index:20001;width:70%;height:auto;' src='" + src_perfix + "images/wechats/qrcode" + wid + ".jpg'><div style='padding:30px 20px 20px 20px;font-size:18px;color:#fff;z-index:20001;'>1銆侀暱鎸変簩缁寸爜锛岀偣鍑烩€滆瘑鍒簩缁寸爜鈥濇寜閽紝鍏虫敞鎴戜滑<br/><br/>" + (t == "" ? "": "2銆佸洖澶嶅叧閿瓧鈥�<font style='font-size:22px;color:#e51400'>" + t + "</font>鈥濆弬涓庡綋鍓嶆椿鍔�<br/><font style='font-size:14px'>锛堣嫢鎮ㄥ凡鍏虫敞浠嶅脊鍑烘椤甸潰锛屽垯蹇呴』瑕佸埌褰撳墠鍏紬鍙蜂笅鍥炲涓婅堪鍏抽敭瀛楄幏鍙栨椿鍔ㄩ摼鎺ワ級</font>") + "</div></div>")
 } else {
     if (t != null && wid != null && d != null) {
         html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='display:block;margin:30px auto;z-index:20001;width:70%;height:auto;' src='" + src_perfix + "images/wechats/qrcode" + wid + ".jpg'><div style='padding:30px 20px 20px 20px;font-size:18px;color:#fff;z-index:20001;'>1銆侀暱鎸変簩缁寸爜锛岀偣鍑烩€滆瘑鍒簩缁寸爜鈥濇寜閽紝鍏虫敞鎴戜滑<br/><br/>" + (t == "" ? "": "2銆佸洖澶嶅叧閿瓧鈥�<font style='font-size:22px;color:#e51400'>" + t + "</font>鈥濆弬涓庡綋鍓嶆椿鍔�<br/><font style='font-size:14px'>锛堣嫢鎮ㄥ凡鍏虫敞浠嶅脊鍑烘椤甸潰锛屽垯蹇呴』瑕佸埌褰撳墠鍏紬鍙蜂笅鍥炲涓婅堪鍏抽敭瀛楄幏鍙栨椿鍔ㄩ摼鎺ワ級</font>") + d + "</div></div>")
     }
 }
}
$("body").append(html);
$("#scover").click(function() {
 $(this).remove()
})
}
function fenxiang(t) {
var html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='position: fixed;left:0px;top:0px;z-index:20001;width:100%;' src='" + src_perfix + "mobile/website/zjolwebsite/images/guanzhu_a.png'></div>");
$("body").append(html);
$("#scover").click(function() {
 $(this).remove()
})
}
function checkReg(wechatId, fn) {
if (wechatId == null) {
 alert("no wechatId");
 return
}
$.ajax({
 url: "pages/ZjolFans/checkReg.do",
 data: {
     wechatId: "41"
 },
 success: function(d) {
     if (d.trim() != "0") {
         alert("浣犵殑娉ㄥ唽淇℃伅涓嶅叏锛岃鍒扳€樻垜->涓汉涓績鈥欏畬鍠勪釜浜轰俊鎭悗鍐嶅洖鏉ラ鍙�")
     } else {
         if (fn) {
             fn()
         }
     }
 }
})
}
//杩涜缁忕含搴﹁浆鎹负璺濈鐨勮绠�

function Rad(d){
return d * Math.PI / 180.0;//缁忕含搴﹁浆鎹㈡垚涓夎鍑芥暟涓害鍒嗚〃褰㈠紡銆�
}
//璁＄畻璺濈锛屽弬鏁板垎鍒负绗竴鐐圭殑绾害锛岀粡搴︼紱绗簩鐐圭殑绾害锛岀粡搴�
function GetDistance(lat1,lng1,lat2,lng2){

var radLat1 = Rad(lat1);
var radLat2 = Rad(lat2);
var a = radLat1 - radLat2;
var  b = Rad(lng1) - Rad(lng2);
var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
s = s *6378.137 ;// EARTH_RADIUS;
s = Math.round(s * 10) / 10; //杈撳嚭涓哄叕閲�
return s*1000;
}