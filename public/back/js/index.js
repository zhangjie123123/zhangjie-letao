/**
 * Created by Administrator on 2019-06-13.
 */
$(function () {
    // 基于准备好的dom，初始化echarts实例
    var echarts_1 = echarts.init(document.querySelector(".echarts_1"));

    // 指定图表的配置项和数据
        var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["一月","二月","三月","四月","五月","六月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 100, 40, 20]
        }]
        };

// 使用刚指定的配置项和数据显示图表。
        echarts_1.setOption(option1);
//饼图
    var echarts_2 = echarts.init(document.querySelector(".echarts_2"));

    // 指定图表的配置项和数据
    option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年9月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 50,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


// 使用刚指定的配置项和数据显示图表。
    echarts_2.setOption(option2);
});