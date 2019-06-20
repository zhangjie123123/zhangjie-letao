/**
 * Created by Administrator on 2019-06-20.
 */
$(function () {
   //1.一进入页面进行渲染
    //1（）用户已登录
function render() {
    setTimeout(function () {
        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.error===400){
                    location.href="login.html";
                    return;
                }
                var htmlStr=template("cartTpl",{arr:info});
                $('.lt_main .mui-table-view').html(htmlStr);
                //渲染完成，需要关闭下拉刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();//关闭
            }
        });
    },500);

};

    //配置下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                callback :function () {
                    console.log("下拉刷新了");
                    render();
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；


            }
        }
    });

    //3.删除功能
//    1.注册事件
    //获取id
    $(".lt_main").on("tap",".btn_del",function () {
        var id = $(this).data("id");
        //发送请求
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            //后台要就
            data:{
                id:[id]
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    render();
                }
            }

        })
    })

});
