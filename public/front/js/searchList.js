/**
 * Created by Administrator on 2019-06-18.
 */
$(function () {
    //1.获取地址栏传过来的搜索参数
 var key=getSearch("key");
    //s设置给input
    $('.search_input').val(key);
    //一进入页面发送Ajax请求搜索关键子 进行页面渲染
    render();
   function render() {
       $.ajax({
           type:"get",
           url:"/product/queryProduct",
           data:{
               proName:$('.search_input').val(),
               page:1,
               pageSize:100
           },
           dataType:"json",
           success:function (info) {
               console.log(info);
               var htmlStr=template("productTpl",info);
               $('.lt_product').html(htmlStr);
           }
       });
   }
    //功能2 点击搜索按钮， 实现搜索功能
    $('.seach_btn').click(function () {

        var key=$(".search_input").val();
        //获取数组
        if(key.trim()===""){
            alert("请输入搜索关键子");
            return;
        }
        render();
        var history = localStorage.getItem("search_list")||'[]';
        var arr =JSON.parse(history);
        //1.删除重复项目
        var index=arr.indexOf(key);
        if(index!=-1){
            arr.splice(index,1);
        }
        //限制长度
        if(arr.length >=5){
            arr.pop();//删除最后一个
        }

        arr.unshift(key);
        //转成json
        localStorage.setItem("search_list",JSON.stringify(arr));
    });
});