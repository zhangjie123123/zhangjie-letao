/**
 * Created by Administrator on 2019-06-20.
 */
$(function () {
   //1.g功能一进入页面请求用户数据
    //2.用户没登录,后台返回error,当前用户未登录拦截到登录页面
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        dataType:"json",
        success:function (info) {
            console.log(info);
            if(info.error===400){
            //    用户未登录
                location.href ="login.html";
                return;
            }
            var htmlStr=template("userTpl",info);
            $('#userInfo').html(htmlStr);
        }


    });

    //2.退出功能
    $('.logoutBtn').click(function () {
        //发送请求，退出操作即可
        $.ajax({
            type:"get",
            url:"/user/logout",
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href ="login.html";
                }
            }
        })
    })
});