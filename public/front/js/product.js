/**
 * Created by Administrator on 2019-06-19.
 */
//获取地址栏Id 发送AJAXqingqiu 获取数据
$(function () {
    //
    var productId =getSearch("productId");
    // console.log(productId);

    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        dataType:"json",
        success:function (info) {
            console.log(info);
        //    渲染模板引擎
            var htmlStr=template("productTpl",info);
            $(".lt_main .mui-scroll").html(htmlStr);
            //手动进行轮播初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:500//自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui(".mui-numbox").numbox();
        }
    });

//功能2：让尺码能够选中
    $('.lt_main').on("click",".lt_size span",function () {
        $(this).addClass("current").siblings().removeClass("current");
    });
    //功能3加入购物车功能
    //添加点击事件
    //2收集尺码，数量
    $('#addCart').click(function () {
        //获取尺码，数量
        var size =$('.lt_size span.current').text();
        console.log(size);
        var num=$('.mui-numbox-input').val();
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        //发送ajax
        $.ajax({
           type:"post",
            url:"/cart/addCart",
            data:{
                productId:productId,
                num:num,
                size:size
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                //加入购物车需要登录
                if(info.error === 400){
                    //跳转到登录页面
                    location.href ="login.html?retUrl="+location.href;
                }
                //2.已登录，加入成，后的功能
                if(info.success){
                    mui.confirm("添加成","温馨提示",["去购物车","继续浏览"],function (e) {
                        if(e.index === 0){
                            //去购物车
                            location.href="cart.html";
                        }
                    })
                }
            }
        });
    })
});