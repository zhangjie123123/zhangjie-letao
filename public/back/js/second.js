/**
 * Created by Administrator on 2019-06-15.
 */
$(function () {
    var currentPage=1;//当前页码
    var pageSize = 5;//每页多少条
    //1,一进入页面发送请求，获取数据
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr=template("cecondTpl",info);
                $("tbody").html(htmlStr);
                //分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //当前页
                    currentPage:info.page,
                    //添加页码点击事件
                    onPageClicked:function (a,b,c,page) {
                        //更新当前页
                        currentPage=page;
                        //重新渲染
                        render();
                    }
                });

            }
        });
    }
});