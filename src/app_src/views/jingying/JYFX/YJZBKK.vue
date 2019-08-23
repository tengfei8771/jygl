<template>
  <div id="KCWZ" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input placeholder="部门" style="width:95%;" size="mini" clearable></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          size="mini"
          :data="list"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >

          <!-- <el-table-column prop="MATKL" align="center" label="大类名称"></el-table-column> -->

          <el-table-column prop="CDBM" align="center" label="承担部门"></el-table-column>
          <el-table-column prop="XMFL" align="center" label="项目分类"></el-table-column>
          <!-- <el-table-column align="center" label="期末库存"> -->
            <el-table-column align="center" label="项目">
              <el-table-column align="center" label="上一年预算">
                <el-table-column prop="SNYSJCSR" align="center" label="基础收入"></el-table-column>
                <el-table-column prop="SNYSZLSR" align="center" label="增量收入"></el-table-column>
                <el-table-column prop="SNYSCB" align="center" label="成本"></el-table-column>
                <el-table-column prop="SNYSLR" align="center" label="利润"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="上一年实际">
                <el-table-column prop="SNSJJCSR" align="center" label="基础收入"></el-table-column>
                <el-table-column prop="SNSJZLSR" align="center" label="增量收入"></el-table-column>
                <el-table-column prop="SNSJCB" align="center" label="成本"></el-table-column>
                <el-table-column prop="SNSJLR" align="center" label="利润"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="今年预算">
                <el-table-column prop="JNYSJCSR" align="center" label="基础收入"></el-table-column>
                <el-table-column prop="JNYSZLSR" align="center" label="增量收入"></el-table-column>
                <el-table-column prop="JNYSCB" align="center" label="成本"></el-table-column>
                <el-table-column prop="JNYSLR" align="center" label="利润"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="与去年实际差异">
                <el-table-column prop="CYJCSR" align="center" label="基础收入"></el-table-column>
                <el-table-column prop="CYZLSR" align="center" label="增量收入"></el-table-column>
                <el-table-column prop="CYCB" align="center" label="成本"></el-table-column>
                <el-table-column prop="CYLR" align="center" label="利润"></el-table-column>
              </el-table-column>
            </el-table-column>
          <!-- </el-table-column> -->
          <!-- <el-table-column prop="ZGZSL" align="center" label="本年度入库库存"></el-table-column> -->
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
      tableKey: 0,
      list: [
        {
         CDBM:"大数据技术部",
XMFL:"全部",
SNYSJCSR:100,
SNYSZLSR:80,
SNYSCB:110,
SNYSLR:87,
SNSJJCSR:66,
SNSJZLSR:77,
SNSJCB:65,
SNSJLR:74,
JNYSJCSR:88,
JNYSZLSR:102,
JNYSCB:80,
JNYSLR:59,
CYJCSR:88,
CYZLSR:96,
CYCB:90,
CYLR:55
        },
         {
          CDBM:"云计算技术部",
XMFL:"全部",
SNYSJCSR:59,
SNYSZLSR:87,
SNYSCB:32,
SNYSLR:76,
SNSJJCSR:97,
SNSJZLSR:86,
SNSJCB:56,
SNSJLR:98,
JNYSJCSR:89,
JNYSZLSR:45,
JNYSCB:102,
JNYSLR:84,
CYJCSR:12,
CYZLSR:9,
CYCB:12,
CYLR:6
        },
         {
                    CDBM:"勘探开发信息部",
XMFL:"全部",
SNYSJCSR:159,
SNYSZLSR:187,
SNYSCB:132,
SNYSLR:176,
SNSJJCSR:197,
SNSJZLSR:186,
SNSJCB:156,
SNSJLR:198,
JNYSJCSR:189,
JNYSZLSR:145,
JNYSCB:92,
JNYSLR:104,
CYJCSR:12,
CYZLSR:9,
CYCB:12,
CYLR:6
        },
         {
          CDBM:"办公信息化部",
XMFL:"全部",
SNYSJCSR:79,
SNYSZLSR:47,
SNYSCB:52,
SNYSLR:66,
SNSJJCSR:67,
SNSJZLSR:56,
SNSJCB:86,
SNSJLR:78,
JNYSJCSR:99,
JNYSZLSR:75,
JNYSCB:92,
JNYSLR:84,
CYJCSR:2,
CYZLSR:9,
CYCB:12,
CYLR:6
        },
         {
             CDBM:"管控中心",
XMFL:"全部",
SNYSJCSR:99,
SNYSZLSR:97,
SNYSCB:92,
SNYSLR:96,
SNSJJCSR:97,
SNSJZLSR:96,
SNSJCB:56,
SNSJLR:78,
JNYSJCSR:79,
JNYSZLSR:75,
JNYSCB:72,
JNYSLR:74,
CYJCSR:22,
CYZLSR:19,
CYCB:12,
CYLR:6
        },
                {
      CDBM:"软件工程部",
XMFL:"全部",
SNYSJCSR:69,
SNYSZLSR:67,
SNYSCB:52,
SNYSLR:46,
SNSJJCSR:57,
SNSJZLSR:76,
SNSJCB:56,
SNSJLR:68,
JNYSJCSR:69,
JNYSZLSR:65,
JNYSCB:72,
JNYSLR:34,
CYJCSR:12,
CYZLSR:9,
CYCB:2,
CYLR:16
        },
                {
         CDBM:"物联网技术部",
XMFL:"全部",
SNYSJCSR:919,
SNYSZLSR:917,
SNYSCB:912,
SNYSLR:916,
SNSJJCSR:917,
SNSJZLSR:926,
SNSJCB:99,
SNSJLR:98,
JNYSJCSR:109,
JNYSZLSR:85,
JNYSCB:80,
JNYSLR:84,
CYJCSR:12,
CYZLSR:17,
CYCB:15,
CYLR:6
        },        {
   CDBM:"综合服务部",
XMFL:"全部",
SNYSJCSR:719,
SNYSZLSR:707,
SNYSCB:712,
SNYSLR:716,
SNSJJCSR:97,
SNSJZLSR:206,
SNSJCB:109,
SNSJLR:98,
JNYSJCSR:101,
JNYSZLSR:75,
JNYSCB:81,
JNYSLR:34,
CYJCSR:10,
CYZLSR:11,
CYCB:10,
CYLR:6
        },
                {
         CDBM:"社区信息化部",
XMFL:"信息系统",
SNYSJCSR:69,
SNYSZLSR:67,
SNYSCB:52,
SNYSLR:46,
SNSJJCSR:57,
SNSJZLSR:76,
SNSJCB:56,
SNSJLR:68,
JNYSJCSR:69,
JNYSZLSR:65,
JNYSCB:72,
JNYSLR:34,
CYJCSR:12,
CYZLSR:9,
CYCB:2,
CYLR:16
        },
                {
          CDBM:"社区信息化部",
XMFL:"GPS业务",
SNYSJCSR:99,
SNYSZLSR:97,
SNYSCB:92,
SNYSLR:96,
SNSJJCSR:97,
SNSJZLSR:96,
SNSJCB:56,
SNSJLR:78,
JNYSJCSR:79,
JNYSZLSR:75,
JNYSCB:72,
JNYSLR:74,
CYJCSR:22,
CYZLSR:19,
CYCB:12,
CYLR:6
        },
         {
           CDBM:"社区信息化部",
XMFL:"基站业务",
SNYSJCSR:159,
SNYSZLSR:187,
SNYSCB:132,
SNYSLR:176,
SNSJJCSR:197,
SNSJZLSR:186,
SNSJCB:156,
SNSJLR:198,
JNYSJCSR:189,
JNYSZLSR:145,
JNYSCB:92,
JNYSLR:104,
CYJCSR:12,
CYZLSR:9,
CYCB:12,
CYLR:6
        }

      ],
      importList: [],
      total: null,
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
    getList() {
      //          this.listLoading = true;
      //   getOneBonusList(this.listQuery).then(response => {
      //     if (response.data.code === 2000) {
      //       this.list = response.data.items;
      this.total = 20;
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







