/**
 * Created by Administrator on 2019-06-14.
 */

$(function () {
    //定义全局变量
    var currentPage = 1;
    var pageSize=5;

    render();
    //封装ajax请求
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);

                //分页初始化
                $('#paginator').bootstrapPaginator({
                    //配置版本信息
                    bootstrapMajorVersion:3,
                    //指定总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //当前显示在多少页
                    currentPage:info.page,
                    //当页码被点击时候调用的回调函数
                    onPageClicked:function (a,b,c,page) {
                        // console.log("页码被点击了")
                        //更新当前页
                        currentPage =page;
                        //重新渲染
                        render();
                    }

                });
            }

        });

    }


});
