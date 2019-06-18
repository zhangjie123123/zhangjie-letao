/**
 * Created by Administrator on 2019-06-17.
 */
$(function () {
    //1.一进入页面发送ajax
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function (info) {
            console.log(info);
            var htmlStr=template("leftTpl",info);
            $(".lt_category_left ul").html(htmlStr);
            //一进入页面，渲染二级分类
            renderSecondById(info.rows[0].id);
        }
    });

    //2.点击一级分类进行渲染

    $(".lt_category_left").on("click","a",function () {
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");
        //h获取当前这个的id
        var id=$(this).data("id");
        renderSecondById(id);
    });

    //实现一个方法：专门更具一级分类 id 去渲染 二节分类
    function renderSecondById(id) {
        $.ajax({
           type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            success:function (info) {
               console.log(info);
                var htmlStr=template("rightTpi",info);
                $(".lt_category_right ul").html(htmlStr);
            }
        });
    }
});