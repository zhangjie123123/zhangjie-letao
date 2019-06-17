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
        //将隐藏域效验状态
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    });

    //4.利用插件进行文件上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //图片上传完成后会调用回调函数
        done:function (e,data) {
            console.log();
            var imgUrl=data.result.picAddr;
            $("#imgBox img").attr("src",imgUrl);
            $('[name="brandLogo"]').val(imgUrl);
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    });
    //5.实现表单效验
    $("form").bootstrapValidator({
        //1.指定不效验的类型":disabled",":hidden",":not(:visible)"
        excluded:[],
        //配置效验图标
        feedbackIcons:{
            valid:"glyphicon glyphicon-ok",
            invalid:"glyphicon glyphicon-remove",
            validating:"glyphicon glyphicon-refresh"
        },
        //配置字段
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择图片"
                    }
                }
            }
        }
    });

    //6.注册表单效验成功事件，阻止默认提交，
    $("#form").on("success.form.bv",function (e) {
        //阻止跳转事件
        e.preventDefault();
        //通过ajax提交
        $.ajax({
           type:"post",
            url:"/category/addSecondCategory",
            data:$('#form').serialize(),//表单序列化
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    //1.关闭模态框
                    $('#addModal').modal('hide');
                    //2.重新渲染页面
                    currentPage=1;
                    render();
                    $('#form').data("bootstrapValidator").resetForm(true);//重置表单内容

                    //手动重置文本内容
                    $('#dropdownText').text("请选择一级分类");
                    //手动重置图片
                    $('#imgBox img').attr("src","images/none.png");
                }
            }

        });
    })
});