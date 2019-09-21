
<template>
  <div id="CBJHSP" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="项目编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.XMBH"
          ></el-input>
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

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="getList"
          >搜索</el-button>
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
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">审批</el-button>
                <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)">退回</el-button> -->
                                <el-button
                  type="success"
                  size="mini"
                  @click="handleProcess(scope.row)"
                  v-if="scope.row.PROCESS_STATE!=0"
                >查看流程</el-button>
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
      :title="textMap[dialogStatus]"
      width="1000px"
    >
      <el-card>
        <el-form
          ref="dataForm"
          :model="temp"
          label-width="120px"
          style="width: 99%;"
          :rules="rules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目编号" prop="XMBH">
                <!-- <el-input v-model="temp.XMBH"></el-input> -->
                <span>{{temp.XMBH}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称" prop="XMMC">
                <!-- <el-input v-model="temp.XMMC"></el-input> -->
                <span>{{temp.XMMC}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目类别" prop="XMLB">
                <!-- <el-input v-model="temp.XMBH"></el-input> -->
                <span>{{temp.XMLB}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="承办单位" prop="CBDW">
                <!-- <el-input v-model="temp.XMMC"></el-input> -->
                <span>{{temp.CBDW}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="建设内容" prop="JSNR">
                <!-- <el-input v-model="temp.JSNR" type="textarea" :rows="3"></el-input> -->
                <span>{{temp.JSNR}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划总金额" prop="JHZJE">
                <!-- <el-input v-model="temp.JHZJE"></el-input> -->
                <span>{{temp.JHZJE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="历史计划金额" prop="LSJHZJE">
                <!-- <el-input v-model="temp.LSJHZJE"></el-input> -->
                <span>{{temp.LSJE}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="本年计划金额" prop="BNJHZJE">
                <!-- <el-input v-model="temp.XMBH"></el-input> -->
                <span>{{temp.BNJE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="未来计划金额" prop="WLJHZJE">
                <!-- <el-input v-model="temp.WLJHZJE"></el-input> -->
                <span>{{temp.WLJE}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否存在物资" prop="CZWZ">
                <el-select size="mini" style="width:100%;" v-model="temp.CZWZ" disabled>
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
                        <el-col :span="12" v-show="temp.CZWZ==!0">
              <el-form-item label="物资计划金额" prop="WZJHJE">
                <el-input v-model="temp.WZJHJE" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="12"
              v-if="temp.StepId.toUpperCase()==='457F9912-9002-4DDC-914A-B141698FAECC'"
            >
              <el-form-item label="是否财务下达" prop="SFCW">
                <el-radio-group v-model="temp.SFCW">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="项目批次">{{temp.PC}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="temp.CZWZ==!0">
              <el-form
                :model="inServForm"
                ref="inServForm"
                label-width="130px"
                size="mini"
                highlight-current-row
                border
              >
                <el-form-item label="物资明细" prop="servin">
                  <el-table
                    :data="infiledList"
                    size="mini"
                    highlight-current-row
                    border
                    style="width: 100%"
                    :header-cell-class-name="tableRowClassName"
                  >
                    <el-table-column prop="fildna" label="物资名称">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.WZMC" disabled></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildna" label="物资数量">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.WZSL" disabled></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildtp" label="类型">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.WZLX" clearable disabled>
                          <el-option
                            v-for="(item,index) in fildtps"
                            :key="index"
                            :label="item.text"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="物资说明">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.WZSM" disabled></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button type="success" @click="handleSubmit(temp)">同意</el-button>
          <el-button @click="handleBack(temp)" type="danger">不同意</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1100px">
      <IFRAME STYLE="width:1050px;height:750px;" id="roadflow_Completed" name="roadflow_Completed" :src="this.baseUrl+this.frameUrl"></IFRAME>
      <!-- <img src="../../../img/workflow.png" style="width:980px;" /> -->
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { GetInfo, GetDetailInfo, UpdateSFCW } from "@/app_src/api/jygl/CBJHSP";
import { executeFlow, sendFlow, backFlow,flowProcess } from "@/app_src/api/jygl/WorkFlow";
export default {
  name: "CBJHSQP",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      rules: {
        SFCW: [{ required: true, message: "请选择类型", trigger: "change" }]
      },
      baseUrl:process.env.BASE_API,
      frameUrl:"",
      inServForm: {},
      infiledList: [],
      fildtps: [{ text: "设备", value: "1" }, { text: "材料", value: "2" }],
      tableKey: 0,
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
      workFlowVisible: false,
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
        userid: this.$store.state.user.userId,
        XMBH: "",
        XMMC: ""
      },
      temp: {StepId:""},
      textMap: {
        update: "审批计划信息",
        create: "添加计划信息"
      },
      editVisible: false,
      dialogStatus: "",

      treeData: []
    };
  },
  methods: {
    handleBack(temp) {
      let fd = new FormData();
      fd.append("systemcode", "localhost");
      fd.append("flowid", "0273b9ef-9903-4c29-8f1c-e3cf04a00fb7");
      fd.append("taskid", temp.Id);
      fd.append("instanceid", temp.XMBH);
      fd.append("senderid", this.$store.state.user.userId);
      fd.append("tasktitle", temp.XMBH + "成本计划报销审批");
      fd.append("comment", "");
      fd.append("formtype", 0);
      backFlow(fd).then(repon => {
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
    },
    handleSubmit(temp) {
      //  if (temp.StepId === "457F9912-9002-4DDC-914A-B141698FAECC") {
       this.$refs["dataForm"].validate(valid => {
        if (valid) {
         let fd = new FormData();
      fd.append("systemcode", "localhost");
      fd.append("stepid", temp.StepId);
      fd.append("flowid", "0273b9ef-9903-4c29-8f1c-e3cf04a00fb7");
      fd.append("taskid", temp.Id);
      fd.append("instanceid", temp.XMBH);
      fd.append("senderid", this.$store.state.user.userId);
      fd.append("tasktitle", temp.XMBH + "成本计划报销审批");
      fd.append("comment", "");
      fd.append("type", "submit");
      fd.append("isFreeSend", false);
      fd.append("formtype", 0);
      sendFlow(fd).then(repon => {
        if (repon.data.code === 2000) {
          if (temp.StepId.toUpperCase() === "457F9912-9002-4DDC-914A-B141698FAECC") {
            let updateData = {
              XMBH: temp.XMBH,
              sfcw: temp.SFCW
            };
            UpdateSFCW(updateData).then(response => {
              if (response.data.code === 2000) {
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
                  title: "失败",
                  message: response.data.message,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          } else {
            this.$notify({
              position: "bottom-right",
              title: "成功！",
              message: "处理成功",
              type: "success",
              duration: 2000
            });
            this.editVisible = false;
            this.getList();
          }
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
       //}
      
    },
    deleteRow(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
    addRow(tableData, event) {
      tableData.push({ fildna: "", fildtp: "", remark: "" });
    },

    resetTemp() {
      this.temp = {
        XMBH: "",
        XMMC: "",
        CBDW: "",
        XMLB: "",
        JSNR: "",
        JHZJE: "",
        LSJHZJE: "",
        BNJHZJE: "",
        WLJHZJE: "",
        SFCZWZ: "",
        resource: ""
      };
    },
    handleProcess(row) {
        let fd = new FormData();
      fd.append("instanceid", row.XMBH);
      flowProcess(fd).then(repon => {
      if (repon.data.code === 2000) {
        this.frameUrl="/roadflowcore/FlowTask/Detail?flowid=" + repon.data.data.flowId + "&groupid=" + repon.data.data.groupId 
             console.log(this.frameUrl); 
      }
            this.workFlowVisible = true;

});

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

    handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
      if (this.temp.CZWZ === 1) {
        let temp = {
          XMBH: this.temp.XMBH
        };
        GetDetailInfo(temp).then(response => {
          if (response.data.code === 2000) {
            this.infiledList = response.data.items;
          }
        });
      }
    },
    handleDelete(row) {
      this.$confirm("确认删除记录吗?", "提示", {
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
    createData() {
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          //   createTaxOrg(this.temp).then(response => {
          //     var message = response.data.message;
          var message = "成功";
          var title = "失败";
          var type = "error";
          //     if (response.data.code === 2000) {
          this.getList();
          title = "成功";
          type = "success";
          // this.list.unshift(this.temp)
          //     }
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
#CBJHSP {
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

