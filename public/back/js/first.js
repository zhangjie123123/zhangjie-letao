/**
 * Created by Administrator on 2019-06-15.
 */

//
$(function () {
    var currentPage=1;
    var pageSize=5;
    //1.一进入页面发送请求 渲染页面
    render();
    function render() {
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);
                //准备分页初始化
                $("#paginator").bootstrapPaginator({
                    //指定版本
                    bootstrapMajorVersion:3,
                    //
                    totalPages:Math.ceil(info.total/info.size),
                    //
                    currentPage:info.page,
                    onPageClicked:function (a,b,c,page) {
                        currentPage=page;
                        render();
                    }
                });
            }
        });
    }

});