<template>
  <div id="JYKC" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input
          placeholder="报销单号"
          style="width:95%;"
          size="mini"
          v-model="listQuery.BXDH"
          clearable
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
        <el-button
          size="mini"
          class="filter-item"
          style="margin-left: 10px;"
          @click="handleCreate"
          type="primary"
          icon="el-icon-edit"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
          <el-table-column label="报销单号" prop="BXDH" fixed="left"></el-table-column>
          <el-table-column label="申请单位(部门)" prop="DWBM" fixed="left"></el-table-column>
          <el-table-column label="申请时间" prop="SQSJ" fixed="left">
            <template slot-scope="scope">
              <span>{{scope.row.SQSJ|parseDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用项目" prop="FYXM" fixed="left"></el-table-column>
          <el-table-column label="报销事由" prop="BXSY"></el-table-column>
          <el-table-column label="报销金额" prop="BXJE"></el-table-column>
          <el-table-column label="报销金额(大写)" prop="BXJEDX"></el-table-column>
          <el-table-column label="原借款金额" prop="YJKJE"></el-table-column>
          <el-table-column label="现付款金额" prop="XFKJE"></el-table-column>
          <el-table-column label="付款方式" prop="FKFSName"></el-table-column>
          <el-table-column label="附件张数" width="80" prop="FJZS"></el-table-column>
          <el-table-column label="收款单位名称" prop="SKDW" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="开户银行" prop="KHH" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="账户" prop="YHZH" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" width="230" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(scope.row)"
                v-if="scope.row.PROCESS_STATE===0"
              >修改</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
                v-if="scope.row.PROCESS_STATE===0"
              >删除</el-button>
              <el-button
                type="warning"
                size="mini"
                @click="handleSubmit(scope.row)"
                v-if="scope.row.PROCESS_STATE===0"
              >提交</el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleProcess(scope.row)"
                v-if="scope.row.PROCESS_STATE!=0"
              >流程</el-button>
              <el-button type="info" size="mini">撤回</el-button>
              <el-button type="success" size="mini" @click="Print(scope.row)">打印</el-button>
            </template>
          </el-table-column>
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
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1000px">
      <img src="../../../img/workflow2.png" style="width:980px;" />
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { parseTime, parseDate } from "@/frame_src/utils/index";
import { GetInfo, DeleteInfo } from "@/app_src/api/jygl/FYBX";
import { getStep, sendTask, sendFlow } from "@/app_src/api/jygl/WorkFlow";

export default {
  name: "FYBX",
  directives: {
    waves
  },
  data() {
    return {
      workFlowVisible: false,
      temp: {
        S_ID: "",
        BXDH: "",
        DWBM: "",
        FYXM: "",
        SQSJ: "",
        BXSY: "",
        BXJEDX: "",
        BXJE: null,
        YJKJE: null,
        XFKJE: null,
        FKFS: "",
        FJZS: null,
        SKDW: "",
        KHH: "",
        YHZH: "",
        SPZT: ""
      },
      editVisible: false,
      dialogStatus: "",
      listLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        limit: 10,
        page: 1,
        BXDH: "",
        XMMC: "",
        userid: this.$store.state.user.userId
      }
    };
  },
  filters: {
    parseTime,
    parseDate
  },
  methods: {
    // 查询数据
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

    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleProcess() {
      this.workFlowVisible = true;
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
    handleCreate() {
      this.$router.push({
        path: "/jingying/CBZCGL/FYBXEDIT",
        query: { type: "create" }
      });
    },
    Print(row) {
      console.log(row);
      this.$router.push({
        path: "/jingying/CBZCGL/FYBXPRINT",
        query: { type: "update", row: row }
      });
    },
    handleUpdate(row) {
      this.$router.push({
        path: "/jingying/CBZCGL/FYBXEDIT",
        query: { type: "update", row: row }
      });
    },
    handleSubmit(row) {
      let fd = new FormData();
      fd.append("systemcode", "localhost");
      fd.append("stepid", "");
      fd.append("flowid", "0273b9ef-9903-4c29-8f1c-e3cf04a00fb7");
      fd.append("taskid", "");
      fd.append("instanceid", row.S_ID);
      fd.append("senderid", this.$store.state.user.userId);
      fd.append("tasktitle", row.S_ID + "费用报销审批");
      fd.append("comment", "");
      fd.append("type", "submit");
      fd.append("isFreeSend", false);
      fd.append("formtype", 0);
      sendFlow(fd).then(repon => {
        if (repon.data.code === 2000) {
          this.$notify({
            position: "bottom-right",
            title: "成功！",
            message: "发起流程成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        }
      });
    },
    handleDelete(row) {
      this.$confirm("确认删除吗！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteInfo(row).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: response.data.message,
                duration: 3000
              });
              this.getList();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: response.data.message,
                type: "warning",
                duration: 3000
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.getList();
  }
};
</script>



<style lang="scss" scoped>
</style>


