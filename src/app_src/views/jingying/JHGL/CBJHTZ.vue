<template>
  <div id="SRXM" class="app-container calendar-list-container">
    <!-- <el-form :model="inServForm" ref="inServForm" label-width="130px" size="mini" highlight-current-row border >
      <el-form-item label="输入参数列表" prop="servin">
        <el-button type="primary" @click="addRow(infiledList)">新增</el-button>

        <el-table :data="infiledList" size="mini"  highlight-current-row border  style="width: 100%" >
          <el-table-column prop="fildna" label="名称" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.fildna"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="fildtp" label="类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.fildtp" clearable>
                <el-option
                  v-for="(item,index) in fildtps"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, infiledList)"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form> -->
  </div>
</template>



<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import panel from "@/frame_src/components/TreeList/panel.vue";
import { getToken } from "@/frame_src/utils/auth";
import { parseTime1 } from "@/frame_src/utils/index.js";
import { NumFormat } from "@/frame_src/filters/index.js";

export default {
  directives: {
    waves
  },
  name: "JYWZ",
  data() {
    return {
      infiledList: [],
      fildtps: [{ text: "字符", value: "1" }, { text: "数字", value: "2" }],
      tableKey: 0,
      list: [
        {
          MATKLNO: "一",
          MATKL: "六十大类合计",
          WERKS: "工厂一",
          HJUO: 4,
          LBKUMUO: 2,
          XCKUMUO: 2,
          HJOT: 0,
          LBKUMOT: 0,
          KUMOTNS: 0,
          XCKUMOT: 0,
          HJTH: 6,
          LBKUMTH: 1,
          KUMTHNS: 2,
          XCKUMTH: 3,
          HJUH: 10,
          LBKUMUH: 0,
          KUMUHNS: 0,
          XCKUMUH: 10,
          ZGZSL: 100
        },
        {
          MATKLNO: "01",
          MATKL: "冶金原料及铸铁管",
          WERKS: "工厂一",
          HJUO: 3,
          LBKUMUO: 1,
          XCKUMUO: 2,
          HJOT: 0,
          LBKUMOT: 6,
          KUMOTNS: 6,
          XCKUMOT: 0,
          HJTH: 0,
          LBKUMTH: 0,
          KUMTHNS: 0,
          XCKUMTH: 0,
          HJUH: 20,
          LBKUMUH: 0,
          KUMUHNS: 0,
          XCKUMUH: 20,
          ZGZSL: 130
        },
        {
          MATKLNO: "02",
          MATKL: "石油专用管材",
          WERKS: "工厂一",
          HJUO: 0,
          LBKUMUO: 0,
          XCKUMUO: 0,
          HJOT: 6,
          LBKUMOT: 6,
          KUMOTNS: 0,
          XCKUMOT: 0,
          HJTH: 3,
          LBKUMTH: 0,
          KUMTHNS: 0,
          XCKUMTH: 3,
          HJUH: 32,
          LBKUMUH: 0,
          KUMUHNS: 2,
          XCKUMUH: 30,
          ZGZSL: 105
        },
        {
          MATKLNO: "03",
          MATKL: "普通钢材",
          WERKS: "工厂一",
          HJUO: 0,
          LBKUMUO: 0,
          XCKUMUO: 0,
          HJOT: 0,
          LBKUMOT: 9,
          KUMOTNS: 0,
          XCKUMOT: 0,
          HJTH: 7,
          LBKUMTH: 0,
          KUMTHNS: 7,
          XCKUMTH: 0,
          HJUH: 40,
          LBKUMUH: 0,
          KUMUHNS: 5,
          XCKUMUH: 35,
          ZGZSL: 54
        },
        {
          MATKLNO: "04",
          MATKL: "金属丝、金属绳",
          WERKS: "工厂一",
          HJUO: 0,
          LBKUMUO: 0,
          XCKUMUO: 0,
          HJOT: 0,
          LBKUMOT: 0,
          KUMOTNS: 0,
          XCKUMOT: 5,
          HJTH: 0,
          LBKUMTH: 0,
          KUMTHNS: 10,
          XCKUMTH: 0,
          HJUH: 60,
          LBKUMUH: 0,
          KUMUHNS: 0,
          XCKUMUH: 60,
          ZGZSL: 100
        }
      ],
      importList: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        SJD: "",
        LGNUM: ""
        // S_OrgCode: this.$store.state.user.orgCode,
        // S_WorkDate: this.$store.state.user.sysTime
      },
      treeData: []
    };
  },
  filters: {
    parseTime1,
    NumFormat
  },
  methods: {
    deleteRow(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
    addRow(tableData, event) {
      tableData.push({ fildna: "", fildtp: "", remark: "" });
    },

    getList() {
      //          this.listLoading = true;
      //   getOneBonusList(this.listQuery).then(response => {
      //     if (response.data.code === 2000) {
      //       this.list = response.data.items;
      this.total = 20;
      this.listLoading = false;
      //     } else {
      //       this.listLoading = false;
      //       this.$notify({
      //         position: "bottom-right",
      //         title: "失败",
      //         message: response.data.message,
      //         type: "error",
      //         duration: 2000
      //       });
      //     }
      //   });
    },

    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },

    exportExcelInfo() {
      import("@/frame_src/vendor/Export2Excel").then(excel => {
        const tHeader = ["工号", "姓名", "单位", "奖金", "预扣税"];
        const filterVal = [
          "S_WorkerCode",
          "S_WorkerName",
          "S_OrgName",
          "OneTimeBonus",
          "DeductibleTax"
        ];
        const data = this.formatJson(filterVal, this.importList);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename:
            this.exportComp + this.listQuery.S_WorkDate.substr(0, 7) + "奖金表"
        });
      });
    }
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return false;
      }
    },
    headers() {
      return {
        "X-Token": getToken()
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.topSearh {
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.page {
  text-align: center;
}
.vue-treeselect__control {
  height: 28px !important;
  width: 100%;
}
.vue-treeselect__placeholder,
.vue-treeselect__single-value {
  line-height: 28px;
}
</style>







