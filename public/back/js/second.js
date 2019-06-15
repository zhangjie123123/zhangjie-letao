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

    //2.点击添加分类按钮，显示添加模态框
    $("#addBtn").click(function () {
        $('#addModal').modal("show");
        //发送ajax请求 ，获取一级分类全部数据，通过模板引擎渲染
        $.ajax({
           type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr=template("dropdownTpl",info);
                $(".dropdown-menu").html(htmlStr);
            }
        });
    });
    //3.通过事件委托， 绑定事件
    $('.dropdown-menu').on("click","a",function () {
        //获取文本
        var txt=$(this).text();
        $("#dropdownText").text(txt);
        //获取选中的id
        var id =$(this).data("id");
        //将id设置给input
        $("[name='categoryId']").val(id);
    });

    //4.利用插件进行文件上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //图片上传完成后会调用回调函数
        done:function (e,data) {
            console.log();
            var imgUrl=data.result.picAddr
            $("#imgBox img").attr("src",imgUrl);
            $('[name="brandLogo"]').val(imgUrl);
        }
    });
});