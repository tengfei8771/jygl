<template>
<div>
<!-- <IFRAME STYLE="width:100%;" id="roadflow_formdesigner" name="roadflow_formdesigner" src="http://localhost:8070/roadflowcore/formdesigner/index?iframeid=roadflow_formdesigner"></IFRAME> -->
<IFRAME STYLE="width:100%;" id="roadflow_formdesigner" name="roadflow_formdesigner" :src="this.baseUrl+this.frameUrl"></IFRAME>
</div>
</template>
<script>
export default {
 data() {
    return {
        baseUrl:process.env.BASE_API,
        frameUrl:"/roadflowcore/formdesigner/index?iframeid=roadflow_formdesigner"
    };
  },
    mounted(){
            /**
             * iframe-宽高自适应显示
             */
            const oIframe = document.getElementById('roadflow_formdesigner');
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