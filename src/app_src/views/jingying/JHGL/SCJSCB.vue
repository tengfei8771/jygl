
<template>
  <div id="CWCBCX" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input placeholder="项目编号" style="width:95%;" size="mini" clearable></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input placeholder="项目名称" style="width:95%;" size="mini" clearable></el-input>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-document" size="mini">导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-table
            :key="tableKey"
            :data="list"
            size="mini"
            :header-cell-class-name="tableRowClassName"
            v-loading="listLoading"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;text-align:left;"
          >
             <el-table-column align="center" label="项目编号" fixed="left" width="120px">
              <template slot-scope="scope">
                <span>{{scope.row.XMBH}}</span>
              </template>
            </el-table-column>

            <el-table-column label="项目名称" :show-overflow-tooltip="true" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.XMMC}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="XMLB" label="项目类别" fixed="left"></el-table-column>
            <el-table-column width="180px" align="right" prop="CBDW" label="承办单位" fixed="left"></el-table-column>
            <el-table-column width="180px" prop="PC" label="项目批次" align="right"></el-table-column>
            <el-table-column
              width="280px"
              align="right"
              prop="JSNR"
              label="建设内容"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column width="120px" align="right" label="计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.JHZJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" label="历史计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.LSJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" label="本年计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.BNJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" label="未来计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.WLJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" label="是否存在物资">
              <template slot-scope="scope">
                <span>{{scope.row.CZWZ|ChangeFlag}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="230" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleGetWZDetail(scope.row)"
                  v-if="scope.row.CZWZ===1"
                >查看物资</el-button>
                <el-button type="success" size="mini" @click="handleProcess(scope.row)">查看流程</el-button>
              </template>
            </el-table-column>
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
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      width="1000px"
      title="物资详情"
    >
      <el-card>
        <el-table
          :key="tableKey"
          :data="infiledList"
          size="mini"
          :header-cell-class-name="tableRowClassName"
          v-loading="listLoading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%;text-align:left;"
        >
          <el-table-column prop="WZMC" label="物资名称"></el-table-column>
          <el-table-column prop="WZSL" label="物资数量"></el-table-column>
          <el-table-column prop="WZSL" label="物资类型"></el-table-column>
          <el-table-column prop="WZSM" label="物资说明"></el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1000px">
      <img src="../../../img/workflow4.png" style="width:980px;" />
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { GetInfo,GetDetailInfo } from "@/app_src/api/jygl/SCJSCB";
export default {
  name: "CWCBCX",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      infiledList: [],
      fildtps: [{ text: "设备", value: "1" }, { text: "材料", value: "2" }],
      tableKey: 0,
      workFlowVisible: false,
      selectOptions: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      list: [],
      total: 15,
      listLoading: false,
      importmodeloptions: [
        {
          value: "样表一",
          label: "样表一"
        },
        {
          value: "样表二",
          label: "样表二"
        }
      ],
      listQuery: {
        limit: 10,
        page: 1,
        XMBH: "",
        XMMC: ""
      },
      temp: {},
      textMap: {
        update: "修改计划信息",
        create: "添加计划信息"
      },
      editVisible: false,
      dialogStatus: "",
      treeData: []
    };
  },
  methods: {
    deleteRow(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
    addRow(tableData, event) {
      tableData.push({ fildna: "", fildtp: "", remark: "" });
    },
    handleProcess() {
      this.workFlowVisible = true;
    },
    getList() {
      this.listLoading = true;
      GetInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: response.data.message,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    handleGetWZDetail(row) {
      this.editVisible = true;
      let temp = {
        XMBH: row.XMBH
      };
      GetDetailInfo(temp).then(response => {
        if (response.data.code === 2000) {
          this.infiledList = response.data.items;
        }
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
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
    }
  },
  created() {
    this.listLoading = false;
    this.getList();
  },

  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return false;
      }
    }
  },
  filters: {
    ChangeFlag(val) {
      if (val === 1) {
        return "是";
      } else {
        return "否";
      }
    }
  }
};
</script>

<style lang="scss" >
#CBJHSQ {
  .topSearh {
    margin-bottom: 15px;
  }
  .page {
    text-align: center;
  }
  .buttom {
    float: right;
  }
  .vue-treeselect__control {
    height: 28px !important;
    width: 100%;
  }
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    line-height: 28px;
  }
}
.selecttrees {
  .vue-treeselect--searchable .vue-treeselect__input-container {
    height: 28px !important;
    width: 100%;
  }
  .el-dialog__body {
    padding: 0px 10px 10px !important;
  }
}
</style>

