/**
 * Created by Administrator on 2019-06-18.
 */
$(function () {
    //1.获取地址栏传过来的搜索参数
    var key=getSearch("key");
    //s设置给input
    $('.search_input').val(key);
    //一进入页面发送Ajax请求搜索关键子 进行页面渲染
    // render();

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                callback :function () {
                    console.log("哈哈");
                    currentPage=1;
                    render(function (info) {
                        var htmlStr=template("productTpl",info);
                        $('.lt_product').html(htmlStr);
                        //ajas回来后需要结束下拉刷新，让内容回滚底部
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        //第一页数据
                        mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();//启用上拉框
                    });
                }
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            //配置上拉加载
            up:{
                callback:function () {
                    console.log("执行了上拉加载");
                    // currentPage=currentPage+1;
                    currentPage++;
                    render(function (info) {
                        var htmlStr=template("productTpl",info);
                        $('.lt_product').append(htmlStr);
                        //当数据回来后，需要结束上拉加载
                        if(info.data.length === 0){
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }
                        else {
                            //还有数据，正常结束上拉加载
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }

                    });
                }
            }
        }
    });
    //
    //功能2 点击搜索按钮， 实现搜索功能
    $('.search_btn').click(function () {

        var key=$(".search_input").val();
        //获取数组
        if(key.trim()===""){
            mui.toast("请输入关键子");
            return;
        }
        // render();执行一次下拉刷新

        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();//执行下拉刷新
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
    $('.lt_sort a[data-type]').on("tap",function () {
        if($(this).hasClass("current")){
            //
            $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }
        else {
            //如果自己没有类 给自己加上
            $(this).addClass("current").siblings().removeClass("current");
        }
        //页面重新渲染即可
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();//执行下拉刷新
    });

//4.功能4：点击每个商品实现页面跳转
    $(".lt_product").on("tap","a",function () {
        var id=$(this).data("id");
        location.href="product.html?productId="+id;
    });



    var currentPage = 1;//当前页
    var pageSize=2;//每页多少条
    function render( callback) {
        // $('.lt_product').html('<div class="loading"></div>');
        var params = {};
        params. proName =$('.search_input').val();
        params.page =currentPage;
        params.pageSize=pageSize;
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
                    // console.log(info);
                    callback&& callback(info);
                }
            });
        },500);

    }
});