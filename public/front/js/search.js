/**
 * Created by Administrator on 2019-06-18.
 */
$(function () {
    //1.进行本地存储
    //准备一个假数据
    // var arr =["耐克","阿迪","阿迪王","新百伦","阿迪王"];
    // var jsonStr=JSON.stringify(arr);
    // localStorage.setItem("search_list",jsonStr);
    //1.进行列表渲染功能呢
    //2.转换成数组
    //3.通过模板引擎动态渲染
    render();
    //功能2清空历史功能
    //动态渲染的
//   1.注册事件
    //封装方法
    function gerHistory() {
        var history=localStorage.getItem("search_list")||'[]';//得到字符串
        var arr=JSON.parse(history);
        return arr;
    }
//读取数组，进行页面渲染
    function render(){
        var arr = gerHistory();
        //第二个是数据对象
        var htmlStr=template("historyTpl",{arr:arr});
        console.log(htmlStr);
        $('.lt_history').html(htmlStr);
    }

    $('.lt_history').on("click",".btn_empty",function () {
        //清空记录
        localStorage.removeItem("search_list");
        //重新渲染
        render();
    });
});