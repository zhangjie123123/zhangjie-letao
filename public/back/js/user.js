/**
 * Created by Administrator on 2019-06-14.
 */

$(function () {
    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page:1,
            pageSize:5
        },
        dataType:"json",
        success:function (info) {
            console.log(info);
            var htmlStr = template("tpl",info);
            $("tbody").html(htmlStr);
        }

    });
});
