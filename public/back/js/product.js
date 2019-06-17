/**
 * Created by Administrator on 2019-06-16.
 */
$(function () {
   var currentPage = 1;//当前页
    var pageSize=5;//每页条数
    //定义全局变量
    var picArr=[];
    //1。一旦进入页面渲染
    render();
    function render() {
    //发送请求
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
              var htmlStr=template("productTpl",info);
                $(".lt_content tbody").html(htmlStr);
                //分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //当前页
                    currentPage:info.page,
                    //添加页码点击事件
                    //配置按钮大小
                    size:"normal",
                    itemTexts:function (type,page,current) {
                     switch (type){
                         case "page":
                             return page;
                         case "first":
                             return "首页";
                         case "last":
                             return "尾页";
                         case "prev":
                             return "上一页";
                         case "next":
                             return "下一页";
                     }
                    },
                    //配置鼠标放在按钮上的文字说明
                    tooltipTitles:function(type,page,current){
                        switch (type){
                            case "page":
                                return "前往第"+page+"页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                        }
                    },
                    //设置提示框的说明
                    useBootstrapTooltip:true,
                    onPageClicked:function (a,b,c,page) {
                        //更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        });
    };
    //2.点击添加商品按钮显示添加的模态框

    $("#addBtn").click(function () {
        $('#addModal').modal("show");
        //请求二级分类数据进行下拉菜单的列表渲染
        $.ajax({
          type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr = template("dropdownTpl",info);
                $(".dropdown-menu").html(htmlStr);
            }

        });
    });
    //3.给dropdown-menu注册事件委托
    $(".dropdown-menu").on("click","a",function () {
        //设置获取文本
        var txt = $(this).text();
        $("#dropdownText").text(txt);
        //设置隐藏域
        var id =$(this).data("id");
        $('[name = "brandId"]').val(id);
        //重置效验状态为VALID
        $('#form').data("bootstrapValidator").updateStatus("brandId","VALID");
    });

    //4.文件上传初始化
    $("#fileupload").fileupload({
        //返回数据格式
        dataType:"json",
        //文件上传完成时调用回调函数
        done:function (e,data) {
            console.log(data.result);
            picArr.unshift(data.result);
            console.log(picArr);
            $("#imgBox").prepend('<img src="'+data.result.picAddr+'" width="100" >');
            if(picArr.length>3){
                //移除最后一个
                picArr.pop();
                $("#imgBox img").eq(-1).remove();
            }
            //处理后可以提交图片
            if(picArr.length === 3){
                $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
            }
        }
    });

    //5.进行表单效验初始化
    $("#form").bootstrapValidator({
    //   重置排除项
        excluded:[],
        //配置效验图标
        //配置效验图标
        feedbackIcons:{
            valid:"glyphicon glyphicon-ok",
            invalid:"glyphicon glyphicon-remove",
            validating:"glyphicon glyphicon-refresh"
        },
        //配置效验字段
        fields:{
            //选择二级分类
            brandId:{
                proName:{
                    validators:{
                        notEmpty:{
                            message:"请选择二级分类"
                        }
                    }
                }
            },
            //产品名称
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            //产品描述
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            //产品库存
            //除了非空之外，要求必须是非零开头的数字
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    //正则效验
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'商品库存必须是非零开头的数字'
                    }
                }
            },
            //产品库存
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    },
                    //正则效验
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'尺码必须是xx-xx的格式，例如32-40'
                    }
                }
            },
            //产品原价
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            //产品现价
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品现价"
                    }
                }
            },
            //图片效验
            picStatus:{
                validators:{
                    notEmpty:{
                        message:"请选择三张图片"
                    }
                }

            }
        }
    });

    //6.阻止默认提交
    $("#form").on("success.form.bv",function (e) {
        //阻止默认的提交
        e.preventDefault();
        //声明数组
        //获取表单的序列化数据
        var paramsStr = $("#form").serialize();

        paramsStr+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        paramsStr+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
        paramsStr+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
        // console.log(paramsStr);
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:paramsStr,
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    //1,关闭模态框
                    $('#addModal').modal('hide');
                    //2.页面重新渲染
                    currentPage = 1;
                    render();
                    //重置表单的内容和效验
                    $('#form').data("bootstrapValidator").resetForm(true);
                    //下拉列表和表单列表需要手动重置
                    $('#dropdownText').text("请选择二级分类");
                    $("#imgBox img").remove();//移除所有的图片
                }
            }

        })
    });

});