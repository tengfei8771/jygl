<template>
  
</template>

<script>
export default {
  name: "ZHCX",
  data() {
    return {
      listloading: false,
      goods: [
        {
          BWKEY: "创智信息技术",
          MATKL: "服装类",
          MATKL1: "裙子",
          MATKL2: "超短裙",
          MATKL3: "未知类",
          SALK3: 1000000
        },
        {
          BWKEY: "辽河数码",
          MATKL: "鞋类",
          MATKL1: "凉鞋",
          MATKL2: "露脚凉鞋",
          MATKL3: "未知类",
          SALK3: 1000000
        },
        {
          BWKEY: "天津XX贸易公司",
          MATKL: "上衣",
          MATKL1: "女士上衣",
          MATKL2: "女士露肩上衣",
          MATKL3: "未知类",
          SALK3: 1000000
        },
         {
          BWKEY: "北京XX贸易公司",
          MATKL: "裤子",
          MATKL1: "七分裤",
          MATKL2: "男士休闲7分库",
          MATKL3: "未知类",
          SALK3: 1000000
        },
      ]
    };
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>



<style lang="scss" scoped>
</style>


