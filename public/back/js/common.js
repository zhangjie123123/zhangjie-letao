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

      NProgress.done();

});

//登录拦截
//前后分离
if(location.href.indexOf("login.html")===-1){
    //判断没有login就不用跳转了
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function (info) {
            console.log(info);
            if(info.success){

            }
            if(info.error === 400){
                //w未登录
                location.href = "login.html";
            }
        }
    });
}





$(function () {
   //1.分类管理侧边栏
    //2.左侧侧边栏切换功能

    $(".nav .category").click(function () {
        $(".nav .child").stop().slideToggle();
    });

    $(".icon_menu").click(function () {
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");

    });

    //3.点击退出模态框
    $(".icon_logout").click(function () {
       //显示模态框
       $("#logoutModal").modal("show");

    });
    //点击退出模态框的按钮
    $("#logoutBtn").click(function () {
        //发送ajax请求
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }

        })
    });
});