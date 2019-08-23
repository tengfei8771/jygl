<template>
  <div id="CK" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input placeholder="项目名称" style="width:95%;" size="mini" clearable></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-date-picker
          size="mini"
          style="width:200px;"
          type="month"
          value-format="yyyy-MM-dd"
          placeholder="选择年月"
          v-model="listQuery.ZCJRQ"
          :clearable="true"
        ></el-date-picker>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="11" :xl="10">
        <el-table
          size="mini"
          :data="list"
          :header-cell-class-name="tableRowClassName"
          v-loading="listloading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="项目名称" prop="LGORT"></el-table-column>
          <el-table-column label="月份" prop="ZCJRQ"></el-table-column>
          <el-table-column label="物资金额" prop="ZFHSL"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10,20,30, 50]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1"
          style="text-align: center;"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CK",
  data() {
    return {
      listloading: false,
        
      listQuery: {
        page: 1,
        limit: 10,
        //Is_Page: "true",
        ZCJRQ: "",
        // S_OrgCode: this.$store.state.user.orgCode,
        // // S_BeginWorkDate: '',
        // // S_EndWorkDate: this.$store.state.user.sysTime,
        // S_OrgName: this.$store.state.user.departName,
        // S_WorkDate: this.$store.state.user.sysTime,
        // TaxNumber: "",
        // TaxRate: ""
      },
      list: [
        {
          LGORT: "小区技防维保",
          ZCJRQ: "2019-06",
          ZFHSL: 150
        },
        {
          LGORT: "中兴设备维保",
          ZCJRQ: "2019-05",
          ZFHSL: 90
        },
        {
          LGORT: "通信电缆充气机大修",
          ZCJRQ: "2019-04",
          ZFHSL: 90
        },
        {
          LGORT: "港西新城电信综合室分光缆线路建设",
          ZCJRQ: "2019-03",
          ZFHSL: 60
        },
        {
          LGORT: "集团公司信息化考核项目发展规划咨询",
          ZCJRQ: "2019-02",
          ZFHSL: 60
        },
        {
          LGORT: "铁塔维保",
          ZCJRQ: "2019-01",
          ZFHSL: 350
        }
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








