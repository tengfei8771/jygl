<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      mainDialog :null,
      roadflowCurrentWindow:null
    }
  },
  methods: {
    openApp(url) {
        if(!url || $.trim(url).length==0){
            return;
        }
        roadflowCurrentWindow = document.getElementById("roadflow_mainiframe").contentWindow;
        roadflowCurrentWindow.location = url;
    }

  }
};
</script>
