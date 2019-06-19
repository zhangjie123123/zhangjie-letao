/**
 * Created by Administrator on 2019-06-18.
 */
$(function () {
    //1.进行本地存储
    //准备一个假数据
    // var arr =["耐克","阿迪","阿迪王","新百伦","阿迪王"];
    // var jsonStr=JSON.stringify(arr);
    // localStorage.setItem("search_list",jsonStr);
    // 1.进行列表渲染功能呢
    //2.转换成数组
    //3.通过模板引擎动态渲染
    render();
    //功能2清空历史功能
    //动态渲染的
//   1.注册事件
    //封装方法
    function getHistory() {
        var history=localStorage.getItem("search_list")||'[]';//得到字符串
        var arr=JSON.parse(history);
        return arr;
    }
//读取数组，进行页面渲染
    function render(){
        var arr = getHistory();
        //第二个是数据对象
        var htmlStr=template("historyTpl",{arr:arr});
        console.log(htmlStr);
        $('.lt_history').html(htmlStr);
    }

    $('.lt_history').on("click",".btn_empty",function () {

        mui.confirm("确认清空历史记录吗","温馨提示",["取消","确认"],function (e) {
            if(e.index === 1){
                //清空记录
                localStorage.removeItem("search_list");
                //重新渲染
                render();
            }
        });
    });

    //添加mui确认框

    //功能3 删除单条功能
    $('.lt_history').on("click",".btn_del",function () {
        var that=this;
        mui .confirm("确定删除该条记录吗","温馨提示",["取消","确认"],function (e) {
            if(e.index === 1){
                //h获取下标
                var index=$(that).data('index');
                //获取数组
                var arr=getHistory();
                //根据下标，删除对应项
                arr.splice(index,1);
                //转存本地
                localStorage.setItem("search_list",JSON.stringify(arr));
                //页面重新渲染
                render();
            }
        })
    });

    //4.添加历史记录
    //1
    $('.seach_btn').click(function () {
        //获取搜索框里的内容trim清除两边的空格
        var key=$(".search_input").val().trim();
        if(key === ''){
            // 不做任何炒作
            mui.toast("请输入关键子");
            return;
        }

        //获取数组
        var arr=getHistory();
        //往数组里面追加
        var index =arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        }
        if( arr.length >=5){
            //删除最后一个
            arr.pop();
        }
        arr.unshift(key);
        //转成json存到本地
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
        //清空
        $(".search_input").val("");
        //添加跳转到产品列表页
        location.href="searchList.html?key="+key;
    })

});