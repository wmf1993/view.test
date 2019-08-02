/* 兼容IE */
function compatibleIE () {
   if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (className,element) {
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j = 0; j < classNames.length; j++) {
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        };
    } 
}
/* 兼容IE8的addEventListener函数 */
function addEventListener(ele,event,fn){
    if (ele.addEventListener){
      ele.addEventListener(event,fn,false);
    }else {
      ele.attachEvent('on'+event,fn.bind(ele));
    }
}

/* navBar */
function navClick() {
    var drops = document.getElementsByClassName('drop')
    for (var i=0; i<drops.length; i++) {
      drops[i].onmouseover = function () {
        this.setAttribute('class', 'drop open')
      }
      drops[i].onmouseout = function () {
        this.setAttribute('class', 'drop')
      }
    }
}
// 收藏
function _addFavorite() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {//IE类浏览器
      try{
       window.external.addFavorite(url, title);
      }catch(e){
       alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
      }
    }
    else if (window.sidebar) {//firfox等浏览器；
        window.sidebar.addPanel(title, url, "");
    }
    else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

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
    if (isMobile()) {
        var links = document.getElementsByTagName('link')
        var newLink = document.createElement('link')
        links[1].parentNode.insertBefore(newLink, links[1])
        newLink.rel = 'stylesheet'
        newLink.href = './css/mobile.css'
    }
}

// 轮播图
function onClick() {
    var heroes = document.getElementsByClassName('hero')
    var clickRight = document.getElementsByClassName('next')[0]
    var clickLeft = document.getElementsByClassName('prev')[0]

    var interval = setInterval(moveRight, 3500, heroes)

    if (typeof(attachEvent) === 'object') {
        clickLeft.attachEvent('onclick', function() {
            moveLeft(heroes)
        })
        clickRight.attachEvent('onclick', function() {
            moveRight(heroes)
        })
        clickLeft.attachEvent('onmouseover', function(){
            clearInterval(interval)
        })
        clickRight.attachEvent('onmouseover', function(){
            clearInterval(interval)
        })
        clickLeft.attachEvent('onmouseout', function(){
            interval = setInterval(moveRight, 3500, heroes)
        })
        clickRight.attachEvent('onmouseout', function(){
            interval = setInterval(moveRight, 3500, heroes)
        })        
        for (var i=0; i<heroes.length; i++) {
            heroes[i].attachEvent('onmouseover', function(obj) {
                if (!obj.toElement.className.match('unselected')) {
                    clearInterval(interval)
                }
            })
            heroes[i].attachEvent('onmouseout', function(obj) {
                if (!obj.toElement.className.match('unselected')) {
                    clearInterval(interval)
                    interval = setInterval(moveRight, 3500, heroes)
                }
            })
        } 
    } else {
        clickLeft.addEventListener('click', function(){
            moveLeft(heroes)
        })
        clickRight.addEventListener('click', function(){
            moveRight(heroes)
        })
        clickLeft.addEventListener('mouseover', function(){
            clearInterval(interval)
        })
        clickRight.addEventListener('mouseover', function(){
            clearInterval(interval)
        })
        clickLeft.addEventListener('mouseout', function(){
            clearInterval(interval)
            interval = setInterval(moveRight, 3500, heroes)
        })
        clickRight.addEventListener('mouseout', function(){
            clearInterval(interval)
            interval = setInterval(moveRight, 3500, heroes)
        })

        for (var i=0; i<heroes.length; i++) {
            heroes[i].addEventListener('mouseover', function() {
                if (!this.className.match('unselected')) {
                    clearInterval(interval)
                }
            })
        }
        for (var i=0; i<heroes.length; i++) {
            heroes[i].addEventListener('mouseout', function() {
                if (!this.className.match('unselected')) {
                    clearInterval(interval)
                    interval = setInterval(moveRight, 3500, heroes)
                }
            })
        }
    }
}

function onTouch () {
    if (isMobile()) {
        var ul = document.getElementsByClassName('heroes')[0]
        var heroes = document.getElementsByClassName('hero')
        var startIndex, moveIndex, flag

        interval = setInterval(moveRight, 5000, heroes)

        ul.addEventListener('touchstart', function (e) {
            clearInterval(interval)
            e.preventDefault()
            flag = true
            startIndex = e.changedTouches[0].pageX
        })
        ul.addEventListener('touchmove', function (e) {
            e.preventDefault()
            moveIndex = e.changedTouches[0].pageX
            if (flag & startIndex>moveIndex && startIndex-moveIndex>100) {
                moveRight(heroes)
                flag = false
            } else if (flag & startIndex<moveIndex && moveIndex-startIndex<100) {
                moveLeft(heroes)
                flag = false
            }
        })
        ul.addEventListener('touchend', function (e) {
            e.preventDefault()
            interval = setInterval(moveRight, 5000, heroes)
        })
    }
}

function moveLeft (objArr) {
    var click = true
    for (var i=0; i<objArr.length; i++) {
        if (click && !objArr[i].className.match('unselected')) {
            var n
            (i==0) ? (n = objArr.length-1) : (n = i-1)
            for (var j=0; j<objArr.length; j++) {
                if (j == n) {
                    objArr[j].className = 'hero'
                } else {
                    objArr[j].className = 'hero unselected'
                }

            if (n == objArr.length-1) {
                objArr[objArr.length-1].style.left = (-1)*1000 + 'px'
                objArr[objArr.length-2].style.left = (-2)*1000 + 'px'
                move(objArr[j])
            } else if(n == 2) {
                objArr[1].style.left = (-2)*1000 + 'px'
                objArr[0].style.left = (-3)*1000 + 'px'
                move(objArr[j])
            } else if (n == 1) {
                objArr[0].style.left = (-2)*1000 + 'px'
                objArr[objArr.length-1].style.left = (-3)*1000 + 'px'
                move(objArr[j])
            } else if (n == 0) {
                objArr[objArr.length-1].style.left = (-2)*1000 + 'px'
                objArr[objArr.length-2].style.left = (-3)*1000 + 'px'
                move(objArr[j])
            } else {
                move(objArr[j])
            }
        }
            click = false
        }
    }
}

function moveRight (objArr) {
    if (!objArr) {
        objArr = document.getElementsByClassName('hero')
    }
    var click = true
    for (var i=0; i<objArr.length; i++) {
        if (click && !objArr[i].className.match('unselected')) {
            var n
            (i<objArr.length-1) ? (n = i+1) : (n=0)
            for (var j=0; j<objArr.length; j++) {
                if (j == n) {
                    objArr[j].className = 'hero'
                } else {
                    objArr[j].className = 'hero unselected'
                }

                if (n == objArr.length-3) {
                    objArr[objArr.length-2].style.left = (+2)*1000 + 'px'
                    objArr[objArr.length-1].style.left = (+3)*1000 + 'px'
                    move(objArr[j], 'right')
                } else if (n == objArr.length-2) {
                    objArr[objArr.length-1].style.left = (+2)*1000 + 'px'
                    objArr[0].style.left = (+3)*1000 + 'px'
                    move(objArr[j], 'right')
                } else if (n == objArr.length-1) {
                    objArr[0].style.left = (+2)*1000 + 'px'
                    objArr[1].style.left = (+3)*1000 + 'px'
                    move(objArr[j], 'right')
                } else {
                    move(objArr[j], 'right')
                }
            }
            click = false
        }
    }    
}

function move (obj,direction) {
    var oldP = parseInt(obj.style.left)
    var moving = oldP
    var x,duration
    if (window.navigator.userAgent.indexOf("MSIE")>=1) {
        // IE
        x = 50
        duration = 1000/60
    } else if (isMobile()) {
        // mobile
        x = 20
        duration = 1000/180
    } else {
        // PC
        x =25
        duration = 1000/120
    }
    var speed = (direction == 'right') ? x : -x
    setTimeout(function moveSlow () {
        if (Math.abs(oldP-moving) <= 1000) {
            obj.style.left = moving + 'px'
            moving -= speed
            setTimeout(moveSlow, duration)
        }
    }, duration)
}

$(document).ready(function () {
    var imgUrl ='https://wmf1993.github.io/view.test/img/share-logo.png';
    
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

window.onload = function () {
    navClick()
}

function __main () {
    compatibleIE()
    addMobileStyle()
    if (isMobile()) {
        onTouch()
    } else {
        onClick()
    }
}
__main()

