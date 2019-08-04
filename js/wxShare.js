$(document).ready(function () {
  var imgUrl ='http://zzhz.zjol.com.cn/material/public-resource/img/share-logo.png';
  
  //获取本页面地址作为分享指向链接(重要!!!!)
  var lineLink = window.location.href;
  //微信分享摘要（35字以内）：必填
  // var descContent =$('.abstract').text();
  var descContent = document.querySelector('meta[name=description]').content
  //微信分享标题(23字以内)：必填
  var shareTitle = document.title;
  //对应频道的id：必填
  var appid = '';
  //以下内容不需要编辑
  function shareFriend() {
      WeixinJSBridge.invoke('sendAppMessage',{
          "appid": appid,
          "img_url": imgUrl,
          "img_width": "300",
          "img_height": "300",
          "link": lineLink,
          "desc": descContent,
          "title": shareTitle
      }, function(res) {
          _report('send_msg', res.err_msg);
      })
  }
  function shareTimeline() {
      WeixinJSBridge.invoke('shareTimeline',{
          "img_url": imgUrl,
          "img_width": "300",
          "img_height": "300",
          "link": lineLink,
          "desc": descContent,
          "title": shareTitle
      }, function(res) {
          _report('timeline', res.err_msg);
      });
  }
  function shareWeibo() {
      WeixinJSBridge.invoke('shareWeibo',{

          "content": descContent,
          "url": lineLink,
      }, function(res) {
          _report('weibo', res.err_msg);
      });
  }
  // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      // 发送给好友
      WeixinJSBridge.on('menu:share:appmessage', function(argv){
          shareFriend();
      });
      // 分享到朋友圈
      WeixinJSBridge.on('menu:share:timeline', function(argv){
          shareTimeline();
      });
      // 分享到微博
      WeixinJSBridge.on('menu:share:weibo', function(argv){
          shareWeibo();
      });
  }, false);
})

function isMobile () {
  var flag = false
  var userAgentInfo = navigator.userAgent
  var mobileType = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
  ]
  for (var i=0; i<mobileType.length; i++) {
      if (userAgentInfo.match(mobileType[i])) {
          flag = true
          break
      }
  }
  return flag
}

function addMobileStyle () {
//   if (isMobile()) {
//       var links = document.getElementsByTagName('link')
//       var newLink = document.createElement('link')
//       links[1].parentNode.insertBefore(newLink, links[1])
//       newLink.rel = 'stylesheet'
//       newLink.href = './css/mobile.css'
//   }
  if (!isMobile()) {
      var links = document.getElementsByTagName('link')[0]
      links.rel = 'stylesheet'
      links.href = './css/main.css'
  }
}
addMobileStyle()