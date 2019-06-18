/**
 * Created by Administrator on 2019-06-17.
 */
//初始化
mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

////获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

//用于解析地址栏参数的
function getSearch(k) {
    var search=location.search;
    //中文需要需要转码
    search = decodeURI( search);
//去掉?号
    //去处第一个？号
    search=search.slice(1);
    //通过分割获取数组
    var arr= search.split("&");
    var obj={};
    arr.forEach(function (v,i) {
        var key=v.split("=")[0];
        var value=v.split("=")[1];
        obj[key]=value;
    });
    return obj[k];
};