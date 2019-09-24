<template>
  <div id="JYKC" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input placeholder="报销单号" style="width:95%;" size="mini" clearable></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input
          placeholder="项目名称"
          style="width:95%;"
          size="mini"
          clearable
          v-model="listQuery.XMMC"
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" @click="getList" size="mini">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          size="mini"
          :data="list"
          :header-cell-class-name="tableRowClassName"
          v-loading="listloading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%; border-collapse:separate;"
        >
          <el-table-column
            label="报销单号"
            prop="BXDH"
            fixed="left"
            show-overflow-tooltip="true"
            width="160"
          ></el-table-column>
          <el-table-column label="申请单位(部门)" prop="DWBM" fixed="left" width="160"></el-table-column>
          <el-table-column label="申请时间" prop="SQSJ" fixed="left" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SQSJ|parseDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用项目" prop="FYXM" fixed="left"></el-table-column>
          <el-table-column label="报销事由" prop="BXSY"></el-table-column>
          <el-table-column label="报销金额" prop="BXJE"></el-table-column>
          <el-table-column label="报销金额(大写)" prop="BXJEDX" width="120"></el-table-column>
          <el-table-column label="原借款金额" prop="YJKJE" width="120"></el-table-column>
          <el-table-column label="现付款金额" prop="XFKJE" width="120"></el-table-column>
          <el-table-column label="付款方式" prop="FKFSName" width="120"></el-table-column>
          <el-table-column label="附件张数" width="80" prop="FJZS"></el-table-column>
          <el-table-column label="收款单位名称" prop="SKDW" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="开户银行" prop="KHH" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="账户" prop="YHZH" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" width="270" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleOpenTZJEDialog(scope.row)">预算调整</el-button>
              <!-- sd v-if="temp.StepId==='6AF91852-B861-4ABB-A90A-A76803D76208'"-->
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">审批</el-button>
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

    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
    >
      <el-card>
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="报销时间" prop="SQSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.SQSJ"
                  style="width: 100%;"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="费用项目" prop="FYXM">
                <!-- <el-select size="mini" style="width:100%;" disabled v-model="temp.FYXM">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                    enabled="enabled"
                  ></el-option>
                   
                </el-select> -->
                 <el-input v-model="temp.FYXM" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请单位" prop="SQBM">
                <el-input v-model="temp.DWBM" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="附件张数" prop="FJZS">
                <el-input v-model="temp.FJZS" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="报销金额" prop="BXJE">
                <el-input v-model="temp.BXJE" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额大写" prop="BXJEDX">
                <el-input v-model="temp.BXJEDX" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="报销事由" prop="BXSY">
                <el-input v-model="temp.BXSY" type="textarea" disabled :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="原借款金额" prop="YJKJE">
                <el-input v-model="temp.YJKJE" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现付款金额" prop="XFKJE">
                <el-input v-model="temp.XFKJE" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="付款方式" prop="FKFS">
                <el-input v-model="temp.FKFS" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收款单位" prop="SKDW">
                <el-input v-model="temp.SKDW" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开户银行" prop="KHYH">
                <el-input v-model="temp.KHH" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户" prop="ZH">
                <el-input v-model="temp.YHZH" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <!-- <el-button @click="editVisible = false">取消</el-button> -->
          <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>-->
          <el-button type="success" @click="handleSubmit(temp)">同意</el-button>
          <el-button type="danger" @click="handleBack(temp)">不同意</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1100px">
      <IFRAME
        style="width:1050px;height:600px;"
        id="roadflow_Completed"
        name="roadflow_Completed"
        :src="this.baseUrl+this.frameUrl"
      ></IFRAME>
    </el-dialog>
    <el-dialog :visible.sync="editTZJEVisible" class="selecttrees" title="调整金额表单" width="1000px">
      <el-card>
        <el-form ref="dataFormTZ" :model="tempTZ" label-width="120px" style="width: 99%;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="成本计划编号" prop="XMBH">
                <el-input v-model="tempTZ.XMBH" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="费用项目" prop="XMMC">
                <el-input v-model="tempTZ.XMMC" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目总金额" prop="TZQJE">
                <el-input v-model="tempTZ.TZQJE" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="已报销金额" prop="YBXJE">
                <el-input v-model="tempTZ.YBXJE" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="本次申请金额" prop="BXJE">
                <el-input v-model="tempTZ.BXJE" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="需调整金额" prop="TZJE">
                <el-input v-model="tempTZ.TZJE" @input="validataYJK(tempTZ.TZJE)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调整时间" prop="TZSJ">
                <el-date-picker style="width:100%" v-model="tempTZ.TZSJ"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="调整说明" prop="TZSM">
                <el-input v-model="tempTZ.TZSM"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center;margin-top:20px;">
          <el-button @click="()=>{this.editTZJEVisible=false;}">取消</el-button>
          <el-button type="primary" @click="createDataTZ">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { parseTime, parseDate } from "@/frame_src/utils/index";
import { GetFYSPInfo } from "@/app_src/api/jygl/FYBX";
import {
  executeFlow,
  sendFlow,
  backFlow,
  flowProcess
} from "@/app_src/api/jygl/WorkFlow";
import { CreateInfo } from "@/app_src/api/jygl/CBJHTZ";
import { UpdateDesCBJHJE } from "@/app_src/api/jygl/CBJHSQ";
export default {
  name: "FYBXSP",
  directives: {
    waves
  },
  data() {
    return {
      textMap: {
        update: "修改费用报销",
        create: "添加费用报销"
      },
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
      workFlowVisible: false,
      baseUrl: process.env.BASE_API,
      frameUrl: "",
      temp: {
        BXDH: "",
        SQBM: "",
        SQSJ: "",
        FYXM: "",
        BXSY: "",
        BXJE: 0,
        BXJEDX: "",
        YJKJE: 0,
        XFKJE: 0,
        FKFS: "",
        FJZS: 2,
        SKDW: "",
        KHYH: "",
        ZH: ""
      },
      editVisible: false,
      editTZJEVisible: false, //调整金额表单弹窗
      dialogStatus: "",
      listLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        limit: 10,
        page: 1,
        BXDH: "",
        userid: this.$store.state.user.userId,
        XMMC: ""
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
      GetFYSPInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
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
      this.listLoading = false;
    },

    resetTemp() {
      this.temp = {
        BXDH: "",
        SQBM: "",
        SQSJ: "",
        FYXM: "",
        BXSY: "",
        BXJE: "",
        BXJEDX: "",
        YJKJE: "",
        XFKJE: "",
        FKFS: "",
        FJZS: "",
        SKDW: "",
        KHYH: "",
        ZH: ""
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
    handleProcess(row) {
      let fd = new FormData();
      fd.append("instanceid", row.BXDH);
      flowProcess(fd).then(repon => {
        if (repon.data.code === 2000) {
          this.frameUrl =
            "/roadflowcore/FlowTask/Detail?flowid=" +
            repon.data.data.flowId +
            "&groupid=" +
            repon.data.data.groupId;
        }
      });
      this.workFlowVisible = true;
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$confirm("确认退回记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   const query = { S_ID: row.S_Id };
          //   deleteTaxOrg(query).then(response => {
          //     this.message = response.data.message;
          //     this.title = "失败";
          //     this.type = "error";
          //     if (response.data.code === 2000) {
          //       // const index = this.list.indexOf(row)
          //       // this.list.splice(index, 1)
          this.getList();
          this.title = "成功";
          this.type = "success";
          //     }
          this.$notify({
            position: "bottom-right",
            title: this.title,
            message: this.message,
            type: this.type,
            duration: 2000
          });
          //   });
        })
        .catch(() => {});
    },
    createDataTZ() {
      // 创建调整单
      this.$refs["dataFormTZ"].validate(valid => {
        if (valid) {
          CreateInfo(this.tempTZ).then(response => {
            var message = response.data.message;
            var title = "失败";
            var type = "error";
            if (response.data.code === 2000) {
              this.getList();
              title = "成功";
              type = "保存成功";
            } else {
              this.$notify({
                position: "bottom-right",
                title:type,
                message: "保存失败："+message,
                type: type,
                duration: 3000
              });
            }
          });
          this.editTZJEVisible = false;
        }
      });
    },
    validataYJK(e) {
      // 通过正则过滤小数点后两位
      if (!/^-*(([0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(e)) {
        this.tempTZ.TZJE = "";
      }
    },
    resetTempTZ() {
      this.tempTZ.XMBH = "";
      this.tempTZ.XMMC = "";
      this.tempTZ.TZQJE = "";
      this.tempTZ.YBXJE = "";
      this.tempTZ.BXJE = "";
      this.tempTZ.TZJE = "";
      this.tempTZ.TZSM = "";
      this.tempTZ.TZSJ = "";
    },
    handleOpenTZJEDialog(row) {
      this.resetTempTZ();
      this.tempTZ.XMBH = row.XMBH;
      this.tempTZ.XMMC = row.FYXM;
      this.tempTZ.TZQJE = row.TZHJHZJE; //TZHJHZJE
      this.tempTZ.YBXJE = row.YBXJE;
      this.tempTZ.BXJE = row.BXJE;
      this.tempTZ.TZSJ = new Date(Date.now());
      // this.tempTZ.TZJE="";
      // this.tempTZ.TZSM="";
      // this.tempTZ.CJR=this.$store.state.user.userId;
      this.editTZJEVisible = true;
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          //   tempData.S_UpdateBy = this.$store.state.user.userId;
          //   //tempData.NOTICE_CONTENT=this.content
          //   updateTaxOrg(tempData).then(response => {
          //     var message = response.data.message;
          var message = "成功";
          var title = "失败";
          var type = "error";
          //     if (response.data.code === 2000) {
          this.getList();
          title = "成功";
          type = "success";
          // }
          this.editVisible = false;
          this.$notify({
            position: "bottom-right",
            title: title,
            message: message,
            type: type,
            duration: 3000
          });
          //   });
        }
      });
    },
    handleSubmit(temp) {
      //同意提交
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let fd = new FormData();
          fd.append("systemcode", "localhost");
          fd.append("stepid", temp.StepId);
          //fd.append("flowid", "ABC11A11-EFF2-4588-8FAE-0EE8687874E1");
          fd.append("flowid", temp.FlowId);
          fd.append("taskid", temp.Id);
          fd.append("instanceid", temp.BXDH);
          fd.append("senderid", this.$store.state.user.userId);
          fd.append("tasktitle", temp.BXDH + "费用报销审批同意");
          fd.append("comment", "");
          fd.append("type", "submit");
          fd.append("isFreeSend", false);
          fd.append("formtype", 1);
          sendFlow(fd).then(repon => {
            if (repon.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功！",
                message: "处理成功",
                type: "success",
                duration: 2000
              });
              this.editVisible = false;
              this.getList();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败!",
                message: repon.data.message,
                type: "error",
                duration: 2000
              });
            }
            this.editVisible = false;
            this.getList();
          });
        }
      });
    },
    handleBack(temp) {
      //t退回
      let fd = new FormData();
      fd.append("systemcode", "localhost");
      //fd.append("flowid", "ABC11A11-EFF2-4588-8FAE-0EE8687874E1");
      fd.append("flowid", temp.FlowId);
      fd.append("groupid", temp.GroupId);
      fd.append("taskid", temp.Id);
      fd.append("instanceid", temp.BXDH);
      fd.append("senderid", this.$store.state.user.userId);
      fd.append("tasktitle", temp.BXDH + "费用报销审批退回");
      fd.append("comment", "");
      fd.append("formtype", 1);
      backFlow(fd).then(repon => {
        if (repon.data.code === 2000) {
          let bxtemp = {
            BXJE: temp.BXJE,
            XMBH: temp.XMBH
          };
          UpdateDesCBJHJE(bxtemp).then(res => {
            if (res.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功！",
                message: "流程撤回成功！",
                type: "success",
                duration: 2000
              });
              this.getList();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败！",
                message: "业务数据更新失败，系统数据将回滚",
                type: "warning",
                duration: 2000
              });
            }
          });
        } else {
          this.$notify({
            position: "bottom-right",
            title: "失败!",
            message: repon.data.message,
            type: "error",
            duration: 2000
          });
        }
        this.editVisible = false;
        this.getList();
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>



<style lang="scss" scoped>
</style>


