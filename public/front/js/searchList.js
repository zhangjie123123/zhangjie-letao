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
       $('.lt_product').html('<div class="loading"></div>');
       var params = {};
       params. proName =$('.search_input').val();
       params.page =1;
       params.pageSize=100;
       // params.price = 1;
       //
       var $current=$(".lt_sort a.current");//找到这个带有类的标签
       if($current.length>0){
           //有高亮的a
           //获取传给后台的键
           var sortName =$current.data("type");
           // console.log(sortName);
           //通过判断箭头方向来判定升序还是降序
           var sortValue = $current.find("i").hasClass("fa-angle-down")?2:1;
           //添加到params中去
           params[sortName]=sortValue;
       }
       setTimeout(function () {
           $.ajax({
               type:"get",
               url:"/product/queryProduct",
               data:params,
               dataType:"json",
               success:function (info) {
                   console.log(info);
                   var htmlStr=template("productTpl",info);
                   $('.lt_product').html(htmlStr);
               }
           });
       },500);

   }
    //功能2 点击搜索按钮， 实现搜索功能
    $('.seach_btn').click(function () {

        var key=$(".search_input").val();
        //获取数组
        if(key.trim()===""){
           mui.toast("请输入关键子");
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
    //功能3排序功能
    //通过自定义属性找到两个a
    $('.lt_sort a[data-type]').click(function () {
        if($(this).hasClass("current")){
            //
            $(this).find('i').toggleClass("fa-angle-up").toggleClass("fa-angle-down");
        }
        else {
            //如果自己没有类 给自己加上
            $(this).addClass("current").siblings().removeClass("current");
        }
        //页面重新渲染即可
        render();
    })
});