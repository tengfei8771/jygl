<template>
  <div id="SWKC" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input
          placeholder="报销单号"
          style="width:95%;"
          size="mini"
          clearable
          v-model="listQuery.CLBH"
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          size="mini"
          :data="fac"
          :header-cell-class-name="tableRowClassName"
          v-loading="listloading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="报销单号" prop="CLBH" width="170" fixed="left"></el-table-column>
          <el-table-column label="申请单位(部门)" show-overflow-tooltip="true" prop="DWMC" width="150" fixed="left"></el-table-column>
          <el-table-column label="申请时间" fixed="left" width="150">
            <template slot-scope="scope">{{scope.row.CJSJ|parseTime}}</template>
          </el-table-column>
          <el-table-column label="出差人" show-overflow-tooltip="true" prop="CCXM" width="150" fixed="left"></el-table-column>
          <el-table-column label="出差事由" show-overflow-tooltip="true" width="150" prop="CCSY"></el-table-column>
          <el-table-column label="出差开始时间" width="150">
            <template slot-scope="scope">{{scope.row.CCKSSJ|subTime}}</template>
          </el-table-column>
          <el-table-column label="出差结束时间" width="150">
            <template slot-scope="scope">{{scope.row.CCJSSJ|subTime}}</template>
          </el-table-column>
          <el-table-column label="出差天数" width="150" prop="CCTS"></el-table-column>
          <el-table-column label="报销金额" width="150" prop="HJJE"></el-table-column>
          <el-table-column label="报销金额(大写)" show-overflow-tooltip="true" width="150" prop="HJDX"></el-table-column>
          <el-table-column label="预借差旅费" width="150" prop="YJCLF"></el-table-column>
          <el-table-column label="应退补金额" width="150" prop="YTBJE"></el-table-column>
          <el-table-column align="center" width="150" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="handleProcess(scope.row)">查看流程</el-button>
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
    <el-dialog :visible.sync="editVisible" class="selecttrees" title="审批" width="80%">
      <el-card>
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="报销时间" prop="SQSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.CJSJ"
                  style="width: 100%;"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报销单号" prop="BXDH">
                <el-input v-model="temp.CLBH" disabled></el-input>
              </el-form-item>
              <!-- <el-form-item label="费用项目" prop="FYXM">
                    <el-select size="mini" style="width:100%;" v-model="temp.FYXM">
                      <el-option
                        v-for="(item,key) in selectOptions"
                        :key="key"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
              </el-form-item>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请单位" prop="SQBM">
                <el-input v-model="temp.DWBM" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出差人" prop="CCR">
                <el-input v-model="temp.CCXM" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出差开始时间" prop="CCKSSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.CCKSSJ"
                  style="width: 100%;"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出差结束时间" prop="CCJSSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.CCJSSJ"
                  style="width: 100%;"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="报销金额" prop="BXJE">
                <el-input v-model="temp.HJJE" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额大写" prop="BXJEDX">
                <el-input v-model="temp.HJDX" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="出差事由" prop="BXSY">
                <el-input v-model="temp.CCSY" type="textarea" :rows="3" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预借差旅费" prop="YJCLF">
                <el-input v-model="temp.YJCLF" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应退补金额" prop="YTBJE">
                <el-input v-model="temp.YTBJE" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="行程明细" prop="servin">
                <!-- <el-button type="primary" @click="addRow(infiledList)">新增</el-button> -->

                <el-table
                  :data="infiledList"
                  size="mini"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column label="出发地点" prop="CFDD"></el-table-column>
                  <el-table-column label="乘车船、飞机起止时间">
                    <el-table-column label="出发日期">
                      <template slot-scope="scope">{{scope.row.CFRQ|subTime}}</template>
                    </el-table-column>
                    <el-table-column label="到达日期">
                      <template slot-scope="scope">{{scope.row.DDRQ|subTime}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="到达地点" prop="CCDD"></el-table-column>
                  <el-table-column label="出勤补助">
                    <el-table-column label="出差天数" prop="CCDD"></el-table-column>
                    <el-table-column label="出差标准" prop="CQBZ"></el-table-column>
                    <el-table-column label="补助金额" prop="BZJE"></el-table-column>
                  </el-table-column>
                  <el-table-column label="硬座、火车补助">
                    <el-table-column label="%" prop="BFB"></el-table-column>
                    <el-table-column label="天数" prop="TS"></el-table-column>
                    <el-table-column label="费用" prop="HCFY"></el-table-column>
                  </el-table-column>
                  <el-table-column label="车船飞机费">
                    <el-table-column label="车船类别" prop="FCLB"></el-table-column>
                    <el-table-column label="席别" prop="FCXB"></el-table-column>
                    <el-table-column label="金额" prop="FCJE"></el-table-column>
                  </el-table-column>
                  <el-table-column label="杂费">
                    <el-table-column label="类别" prop="ZFLB"></el-table-column>
                    <el-table-column label="金额" prop="ZFJE"></el-table-column>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1000px">
      <IFRAME
        style="width:900px;height:600px;"
        id="roadflow_Completed"
        name="roadflow_Completed"
        :src="this.baseUrl+this.frameUrl"
      ></IFRAME>
    </el-dialog>
   
  </div>
</template>

<script>
import { GetCLXCInfo, GetYBInfo, GetSPXCInfo } from "@/app_src/api/jygl/CLFBX";
import { sendFlow, backFlow, flowProcess } from "@/app_src/api/jygl/WorkFlow";
export default {
  name: "SWKC",
  data() {
    return {
      baseUrl: process.env.BASE_API,
      frameUrl: "",
      infiledList: [],
      fildtps: [{ text: "设备", value: "1" }, { text: "材料", value: "2" }],
      textMap: {
        update: "修改差旅费用报销",
        create: "添加差旅费用报销"
      },
      workFlowVisible: false,
      temp: {},
      listQuery: {
        userid: this.$store.state.user.userId,
        CLBH: "",
        limit: 10,
        page: 1
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      fac: [],
      tempTZ: {
        XMBH: "",
        XMMC: "",
        TZQJE: "",
        YBXJE: "",
        BXJE: "",
        TZJE: "",
        TZSM: "",
        TZSJ: "",
        CJR: this.$store.state.user.userId
      },
      editTZJEVisible:false
    };
  },
  methods: {
    getList() {
      this.listloading = true;
      GetYBInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.fac = response.data.items;
          this.total = response.data.total;
          this.listloading = false;
        } else {
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: response.data.message,
            type: "warning",
            duration: 2000
          });
          this.listloading = false;
        }
      });
    },
    handleProcess(row) {
      let fd = new FormData();
      fd.append("instanceid", row.CLBH);
      flowProcess(fd).then(repon => {
        if (repon.data.code === 2000) {
          this.frameUrl =
            "/roadflowcore/FlowTask/Detail?flowid=" +
            repon.data.data.flowId +
            "&groupid=" +
            repon.data.data.groupId;
        }
        this.workFlowVisible = true;
      });
    },
    resetTemp() {
      this.temp = {
        BXDH: "",
        SQBM: "",
        SQSJ: "",
        CCR: "",
        CCKSSJ: "",
        CCJSSJ: "",
        CCSY: "",
        CCTS: "",
        BXJE: "",
        BXJEDX: "",
        YJCLF: "",
        YTBJE: ""
      };
    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },
     validataYJK(e) {
      // 通过正则过滤小数点后两位
      if (!/^-*(([0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(e)) {
        this.tempTZ.TZJE = "";
      }
    },
  },
  filters: {
    subTime(val) {
      if (val != "" && val != null && val != undefined) {
        return val.substring(0, 10);
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>



<style lang="scss" scoped>
</style>


