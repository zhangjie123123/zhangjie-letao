/**
 * Created by Administrator on 2019-06-13.
 */
//入口函数
$(function () {
$("#form").bootstrapValidator({
    //配置字段
    fields:{
        username:{
            validators:{
                //非空
                notEmpty:{
                    message:"用户名不能为空"
                },
                stringLength:{
                    min:2,
                    max:6,
                    message:"用户名在2-6位数"
                },
                //专门用于配置回调提示的规则
                callback:{
                    message:"用户名不存在"
                }
            }
        },
        password:{
            validators:{
                notEmpty:{
                    message:"密码不能为空"
                },
                stringLength:{
                    min:6,
                    max:12,
                    message:"密码长度必须是6-12位数"
                }
                ,
                //专门用于配置回调提示的规则
                callback:{
                    message:"密码不正确"
                }
            }
        }
    },
    //配置效验图标
    feedbackIcons:{
        valid:"glyphicon glyphicon-ok",
        invalid:"glyphicon glyphicon-remove",
        validating:"glyphicon glyphicon-refresh"
    }
});


    //功能2登录功能
    //表单提交效
    $("#form").on("success.form.bv",function (e) {
    //阻止浏览器跳转事件
        e.preventDefault();
        //通过ajax进行提交
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href="index.html";
                }
                if(info.error===1000){
                    // alert("用户名不正确");
                    $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(info.error===1001){
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        });
    });


    //3重置的bug解决
    $("[type='reset']").click(function () {
        // 调用插件重置功能
        $("#form").data("bootstrapValidator").resetForm(true);
    });

});