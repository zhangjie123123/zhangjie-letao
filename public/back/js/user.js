/**
 * Created by Administrator on 2019-06-14.
 */

$(function () {
    //定义全局变量
    var currentPage = 1;
    var pageSize=5;
    var currentId;//声明一个全局id变量
    var isDelete;//声明一个全局的变量
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
//点击禁用 显示模态框
    //通过事件委托注册点击事件

    $("tbody").on("click",".btn",function () {
        //显示模态框
        $("#userModal").modal("show");
        //获取用户id
        currentId=$(this).parent().data("id");//获取到的属性
        isDelete=$(this).hasClass("btn-danger")?0:1;
    });

    //3.点击确认修改对应的用户状态
    $("#submitBtn").click(function () {
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:"json",
            success:function (info) {
                //1,关闭模态框
                //2,页面重新渲染
                if(info.success){
                    $("#userModal").modal("hide");
                    render();
                }

            }
        })
    });
});
