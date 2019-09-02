<template>
<div>
<!-- <IFRAME STYLE="width:100%;" id="roadflow_flowdesigner" name="roadflow_flowdesigner" src="http://localhost:8070/roadflowcore/flowdesigner/index?iframeid=roadflow_flowdesigner"></IFRAME> -->
<IFRAME STYLE="width:100%;" id="roadflow_flowdesigner" name="roadflow_flowdesigner" :src="this.baseUrl+this.frameUrl"></IFRAME>
</div>
</template>
<script>

export default {
 data() {
    return {
        baseUrl:process.env.BASE_API,
        frameUrl:"/roadflowcore/flowdesigner/index?iframeid=roadflow_flowdesigner"
    };
  },
     methods: {
   

  },
    mounted(){
            /**
             * iframe-宽高自适应显示   
             */
            const oIframe = document.getElementById('roadflow_flowdesigner');
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