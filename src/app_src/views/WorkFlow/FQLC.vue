<template>
<div>
<!-- <IFRAME STYLE="width:100%;" id="roadflow_flowrun" name="roadflow_flowrun" src="http://localhost:8070/RoadFlowCore/FlowRun/Index?flowid=4447d595-3a2a-4641-8447-c4f012791bae"></IFRAME> -->
<IFRAME STYLE="width:100%;" id="roadflow_flowrun" name="roadflow_flowrun" :src="this.baseUrl+this.frameUrl"></IFRAME>

</div>
</template>
<script>
export default {
 data() {
    return {
        baseUrl:process.env.BASE_API,
        frameUrl:"/RoadFlowCore/FlowRun/Index?flowid=4447d595-3a2a-4641-8447-c4f012791bae"
    };
  },
    mounted(){
            /**
             * iframe-宽高自适应显示   
             */
            const oIframe = document.getElementById('roadflow_flowrun');
            // const deviceWidth = document.documentElement.clientWidth;
            //const deviceHeight = document.documentElement.clientHeight;
            const deviceHeight = document.body.clientHeight || document.documentElement.clientHeight;
            // oIframe.style.width = (Number(deviceWidth)-220) + 'px'; //数字是页面布局宽度差值
            oIframe.style.height = (Number(deviceHeight)-145) + 'px'; //数字是页面布局高度差
        },
    methods: {

    }
}
</script>