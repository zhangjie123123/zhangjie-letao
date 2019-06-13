/**
 * Created by Administrator on 2019-06-13.
 */
//公共的进度条
//开起进度条

//结束



$(document).ajaxStart(function () {//全局注册一个ajax开始的事件
    NProgress.start();
});

$(document).ajaxStop(function () {//全局注册一个ajax开始的事件
  setTimeout(function () {
      NProgress.done();
  },5000);
});