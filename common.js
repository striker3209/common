/*公用js文件*/
/*定义一个对象 来承载我们封装的事件*/
window.itcast = {};/*定义了一个itcast的对象*/
//封装一个transitionEnd  过度结束事件
itcast.transitionEnd = function(dom,callback){
    /* 需要绑定事件的dom  绑定之后  当触发了 事件的时候  执行 callback */
  if(dom && typeof  dom == 'object'){
    dom.addEventListener('webkitTransitionEnd',function(){
        /*if(callback){
         callback();
         }*/
      callback && callback();
    });
    dom.addEventListener('transitionEnd',function(){
      callback && callback();
    });
  }
};
/*封装tap*/
itcast.tap = function(dom,callback){
    /*
     * 要求  没有触发 touchmove 事件
     *       并且响应速度要比click快
     */
  if(dom && typeof  dom == 'object'){
    var isMove = false;
    var startTime = 0;
    dom.addEventListener('touchstart',function(e){
      //console.log('touchstart');
      //console.time('tap');/*记录tap这个参数现在的时间*/
      startTime = Date.now();
    });
    dom.addEventListener('touchmove',function(e){
      //console.log('touchmove');
      isMove = true;
    });
    dom.addEventListener('touchend',function(e){
      //console.log('touchend');
      //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
        /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
      if(!isMove && (Date.now()-startTime) < 150){
          /*调用 callback*/
        callback && callback(e);
      }
        /*重置 参数*/
      isMove = false;
      startTime = 0;
    });
  }
};

function reSize() {
    var $innerWidth = $(window).innerWidth();
    var htmlFontSize = 20 * $innerWidth / 640;
    $('html').css('fontSize', htmlFontSize + 'px');
    $(window).on('resize', function () {
        var $innerWidth = $(window).innerWidth();
        var htmlFontSize = 20 * $innerWidth / 640;
        $('html').css('fontSize', htmlFontSize + 'px');
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "": decodeURIComponent(results[1]);
}

function goTopOld(selector) {
    var goTopBtn = document.querySelector(selector);
    goTopBtn.onclick = function () {
        var timer = setInterval(function () {
            var leader = window.pageYOffset;
            var target = 0;
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);//x,y
            if (leader === target) {
                clearInterval(timer);
            }
        }, 20);
    };
}

function goTop(selector) {
    $(selector).click(function(){
        $('body').animate({
            scrollTop:0
        },1000)
    });
}