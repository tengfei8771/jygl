<template>
<div>
<!-- <IFRAME STYLE="width:100%;" id="roadflow_Completed" name="roadflow_Completed" src="http://localhost:8070/roadflowcore/FlowTask/Completed"></IFRAME> -->

<IFRAME STYLE="width:100%;" id="roadflow_Completed" name="roadflow_Completed" :src="this.baseUrl+this.frameUrl"></IFRAME>
</div>
</template>
<script>
export default {
 data() {
    return {
        baseUrl:process.env.BASE_API,
        frameUrl:"/roadflowcore/FlowTask/Completed"
    };
  },
    mounted(){
            /**
             * iframe-宽高自适应显示   
             */
            const oIframe = document.getElementById('roadflow_Completed');
            // const deviceWidth = document.documentElement.clientWidth;
            //const deviceHeight = document.documentElement.clientHeight;
            const deviceHeight = document.body.clientHeight || document.documentElement.clientHeight;
            // oIframe.style.width = (Number(deviceWidth)-220) + 'px'; //数字是页面布局宽度差值
            oIframe.style.height = (Number(deviceHeight)-145) + 'px'; //数字是页面布局高度差
        },
    methods: {

    },
     created() {
       
    }
}
</script>