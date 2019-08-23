<template>
  <div id="FCLTJ" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :span="24">
          <el-date-picker
            size="mini"
            v-model="listSumQuery.B_BUDAT"
            style="width:200px;"
            type="month"
            value-format="yyyy-MM-dd"
            placeholder="选择年月(起)"
            :clearable="true"
          ></el-date-picker>
          <el-date-picker
            size="mini"
            v-model="listSumQuery.E_BUDAT"
            style="width:200px;"
            type="month"
            value-format="yyyy-MM-dd"
            placeholder="选择年月(止)"
            :clearable="true"
          ></el-date-picker>
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
          <!-- <el-button size="mini" type="primary" icon="el-icon-edit" @click="exportSumExcel">导出</el-button> -->
        </el-col>
      </el-row>
    </div>

    <el-card class="box-card">
      <el-table
        size="mini"
        :data="sumlist"
        :header-cell-class-name="tableRowClassName"
        v-loading="sumlistLoading"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"

      >
 
        <el-table-column width="90px" align="center" label="时间月">
          <template slot-scope="scope">
            <span>{{scope.row.BUDAT|parseTime1}}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="right" prop="ZGZSL" label="承办部门">
          <template slot-scope="scope">
            <span>{{scope.row.CBBM}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="right" prop="MSEG" label="项目金额">
          <template slot-scope="scope">
            <span>{{scope.row.MSEG |NumFormat}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="150px"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="sumdetail(scope.row.BUDAT)" type="primary" plain>明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="showed" width="60%" title="项目明细">
      <div class="topSearh">
        <el-row>
          <el-col :span="24">
            <el-input
              style="width: 200px;"
              class="filter-item"
              placeholder="项目编号"
              v-model="listQuery.ZCKTZD"
              size="mini"
            ></el-input>
            <el-input
              style="width: 200px;"
              class="filter-item"
              placeholder="项目名称"
              v-model="listQuery.MATNR"
              size="mini"
            ></el-input>
            <el-button
              size="mini"
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleFilterDetail"
            >搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-card class="box-card">
        <el-table
          size="mini"
          :data="list"
          :header-cell-class-name="tableRowClassName"
          v-loading="listLoading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column   align="center" label="项目时间">
            <template slot-scope="scope">
              <span>{{scope.row.BUDAT|parseTime}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="项目编号">
            <template slot-scope="scope">
              <span>{{scope.row.ZCKTZD}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="项目名称">
            <template slot-scope="scope">
              <span>{{scope.row.ZGZSL}}</span>
            </template>
          </el-table-column>
          <el-table-column   align="center" label="金额">
            <template slot-scope="scope">
              <span>{{scope.row.DMBTR|NumFormat}}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column width="180px" align="right" label="物料">
            <template slot-scope="scope">
              <span>{{scope.row.MATNR }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="库存地点" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.LGORT }}</span>
            </template>
          </el-table-column>、 -->
        </el-table>
        <div class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.page"
            :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import panel from "@/frame_src/components/TreeList/panel.vue";
import { getToken } from "@/frame_src/utils/auth";
import { parseTime1 } from "@/frame_src/utils/index.js";
import { NumFormat } from "@/frame_src/filters/index.js";
export default {
  name: "FCLTJ",
  data() {
    return {
      showed: false,
      tableKey: 0,
      list: [],
      sumlist: [
          {
          BUDAT: "2019-01-08 12:00:00",
          CBBM: "社区信息化部",
          MSEG: 210000
        },
          {
          BUDAT: "2019-02-08 12:00:00",
          CBBM: "管控中心",
          MSEG: 210000
        },
          {
          BUDAT: "2019-03-08 12:00:00",
          CBBM: "勘探开发信息部",
          MSEG: 280000
        },
          {
          BUDAT: "2019-04-08 12:00:00",
          CBBM: "物联网技术部",
          MSEG: 210000
        },
        {
          BUDAT: "2019-05-08 12:00:00",
          CBBM: "办公信息化部",
          MSEG: 230000
        },
        {
          BUDAT: "2019-06-08 12:00:00",
          CBBM: "市场部",
          MSEG: 26000
        },
        {
          BUDAT: "2019-07-08 12:00:00",
          CBBM: "基建物资管理部",
          MSEG: 31000
        },
        {
          BUDAT: "2019-08-08 12:00:00",
          CBBM: "综合服务部",
          MSEG: 21000
        },
        {
          BUDAT: "2019-09-08 12:00:00",
          CBBM: "安全保卫科",
          MSEG: 24000
        },
        {
          BUDAT: "2019-10-08 12:00:00",
          CBBM: "大数据技术部",
          MSEG: 35000
        }
      ],
      sumlistLoading: false,
      list: [
        {
          ZCKTZD:"2-20170203-00032",
          BUDAT: "2019/01/31 00:00:00.000",
          ZGZSL: "大港油田车辆卫星定位系统维保",
          DMBTR: 35000,
          MATNR:"物料1",
          LGORT:"仓库1"
        },
         {
          ZCKTZD:"3-20191008-00033",
          BUDAT: "2019-10-08 12:00:00",
          ZGZSL:"信息网络服务",
          DMBTR: 35000,
          MATNR:"物料1",
          LGORT:"仓库1"
        },
         {
          ZCKTZD:"5-20191008-00035",
          BUDAT: "2019-10-08 12:00:00",
          ZGZSL: "通信开关电源维护服务",
          DMBTR: 35000,
          MATNR:"物料1",
          LGORT:"仓库1"
        },
         {
          ZCKTZD:"2-20191008-00011",
          BUDAT: "2019-10-08 12:00:00",
          ZGZSL: "铁塔维保",
          DMBTR: 35000,
          MATNR:"物料1",
          LGORT:"仓库1"
        },
         {
          ZCKTZD:"4-20191008-00031",
          BUDAT: "2019-10-08 12:00:00",
          ZGZSL: "综合办公平台推广",
          DMBTR: 35000,
          MATNR:"物料1",
          LGORT:"仓库1"
        },
         {
          ZCKTZD:"4-20191008-00051",
          BUDAT: "2019-10-08 12:00:00",
          ZGZSL: "中心站外围站房屋维修",
          DMBTR: 35000,
          MATNR:"物料1",
          LGORT:"仓库1"
        }
      ],
      total: null,
      totalDetail: null,
      listLoading: false,
      listSumQuery: {
        B_BUDAT: "",
        E_BUDAT: ""
        // S_OrgCode: this.$store.state.user.orgCode,
        // S_WorkDate: this.$store.state.user.sysTime,
        // S_OrgName: this.$store.state.user.departName,
        //TaxNumber: ""
      },
      listQuery: {
        page: 1,
        limit: 10,
        //Is_Page: "true",
        ZCKTZD: "",
        MATNR: ""
        // S_OrgCode: this.$store.state.user.orgCode,
        // // S_BeginWorkDate: '',
        // // S_EndWorkDate: this.$store.state.user.sysTime,
        // S_OrgName: this.$store.state.user.departName,
        // S_WorkDate: this.$store.state.user.sysTime,
        // TaxNumber: "",
        // TaxRate: ""
      }
    };
  },
  filters: {
    parseTime1,
    NumFormat
  },

  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => item[column.property]);
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 2) {
            sums[index] += " 元";
          } else {
            sums[index] = sums[index].toFixed(2);
            sums[index] += " 吨";
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    getSumList() {
      //  this.sumlistLoading = true;
      //   getGroupSumMonthTaxSalary(this.listSumQuery).then(response => {
      //     if (response.data.code === 2000) {
      //       this.sumlist = response.data.items;
      this.sumlistLoading = false;
      //     } else {
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
    sumdetail(orgName, orgCode) {
      this.title = "月度明细";
      this.showed = true;
      //   this.listQuery.S_OrgCode = orgCode;
      //   this.listQuery.S_OrgName = orgName;
      //   this.listQuery.S_WorkDate = this.listSumQuery.S_WorkDate;
      //   this.listQuery.S_Department = this.listSumQuery.S_Department;
      this.getList();
    },

    getList() {
      //   this.listLoading = true;
      //   getMonthTaxSalary(this.listQuery).then(response => {
      //     if (response.data.code === 2000) {
      //this.list = response.data.items;
      this.total = 15;
      this.listLoading = false;
      // } else {
      //   this.listLoading = false;
      //   this.$notify({
      //     position: "bottom-right",
      //     title: "失败",
      //     message: response.data.message,
      //     type: "error",
      //     duration: 2000
      //   });
      // }
      //});
    },
    created() {
      this.getSumList();
      //this.getList();
      //this.createTime();
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
      //this.listQuery.page = 1;
      this.getSumList();
    },

    handleFilterDetail() {
      this.listQuery.page = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
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


