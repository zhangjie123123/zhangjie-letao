/**
 * Created by Administrator on 2019-06-16.
 */
$(function () {
   var currentPage = 1;//当前页
    var pageSize=5;//每页条数
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
    });
});