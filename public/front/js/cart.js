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
    });

//    4.编辑功能

    $('.lt_main').on("tap",".btn_edit",function () {
        var obj =this.dataset;
        var id=obj.id;
        var htmlStr = template("editTpl",obj);
        //弹出确认框
        htmlStr =htmlStr.replace(/\n/g,"");
        mui.confirm(htmlStr,"编辑商品",["确认","取消"],function (e) {
            if(e.index === 0){
                var size =$('.lt_size span.current').text();
                var num = $('.mui-numbox-input').val();
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    dataType:"json",
                    success:function (info) {
                        console.log(info);
                        if(info.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        });
        mui(".mui-numbox").numbox()
    });

    //5.让尺码可以被选择
    $('body').on("click",".lt_size span",function () {
        $(this).addClass("current").siblings().removeClass("current");
    });

});
