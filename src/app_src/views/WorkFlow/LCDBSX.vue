<template>
<div>
<!-- <IFRAME STYLE="width:100%;" id="roadflow_Wait" name="roadflow_Wait" src="http://localhost:8070/roadflowcore/FlowTask/Wait"></IFRAME> -->
<IFRAME STYLE="width:100%;" id="roadflow_Wait" name="roadflow_Wait" :src="this.baseUrl+this.frameUrl"></IFRAME>
</div>
</template>
<script>
export default {
 data() {
    return {
        baseUrl:process.env.BASE_API,
        frameUrl:"/roadflowcore/FlowTask/Wait"
    };
  },
    mounted(){
            /**
             * iframe-宽高自适应显示   
             */
            const oIframe = document.getElementById('roadflow_Wait');
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