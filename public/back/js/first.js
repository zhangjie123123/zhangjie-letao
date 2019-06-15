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
                // console.log(info);
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
//2.点击添加分类按钮
    $("#addBtn").click(function () {
        $("#addModal").modal('show');
    });
    //3.使用表单效验，
    $("#form").bootstrapValidator({
        //配置图标
        feedbackIcons:{
          valid:"glyphicon glyphicon-ok",
          invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        //配置字段
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类不能为空"
                    }
                }
            }
        }
    });
    //4.注册表单效验，阻止默认的成功提交
        $("#form").on("success.form.bv",function (e) {
            e.preventDefault();//阻止默认跳转事件
        //通过ajax提交
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('#form').serialize(),//自动表单序列化
            dataType:"json",
            success:function (info) {
                // console.log(info.success);
                if(info.success){
                    //添加成
                    //1.关闭模态框
                    $("#addModal").modal('hide');
                    //2.页面重新渲染
                    currentPage=1;
                    render();
                //  重置模态框
                    $("#form").data("bootstrapValidator").resetForm(true);//重置表单内容

                }
            }
        });
    });
    
});