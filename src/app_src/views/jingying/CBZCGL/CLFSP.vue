<template>
  <div id="SWKC" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input placeholder="报销单号" style="width:95%;" size="mini" clearable v-model="listQuery.CLBH"></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
        <!-- <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
        >新增</el-button>-->
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
          <el-table-column label="报销单号" prop="CLBH" fixed="left"></el-table-column>
          <el-table-column label="申请单位(部门)" prop="DWBM" fixed="left"></el-table-column>
          <el-table-column label="申请时间" fixed="left">
            <template slot-scope="scope">{{scope.row.CJSJ|parseTime}}</template>
          </el-table-column>
          <el-table-column label="出差人" prop="CCXM" fixed="left"></el-table-column>
          <el-table-column label="出差事由" prop="CCSY"></el-table-column>
          <el-table-column label="出差开始时间">
            <template slot-scope="scope">{{scope.row.CCKSSJ|parseTime}}</template>
          </el-table-column>
          <el-table-column label="出差结束时间">
            <template slot-scope="scope">{{scope.row.CCJSSJ|parseTime}}</template>
          </el-table-column>
          <el-table-column label="出差天数" prop="CCTS"></el-table-column>
          <el-table-column label="报销金额" prop="HJJE"></el-table-column>
          <el-table-column label="报销金额(大写)" prop="HJDX"></el-table-column>
          <el-table-column label="预借差旅费" prop="YJCLF"></el-table-column>
          <el-table-column label="应退补金额" prop="YTBJE"></el-table-column>
          <el-table-column align="center" width="300" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">审批</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">废弃</el-button>
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
              <el-form
                :model="inServForm"
                ref="inServForm"
                label-width="130px"
                size="mini"
                highlight-current-row
                border
              >
                <el-form-item label="行程明细" prop="servin">
                  <!-- <el-button type="primary" @click="addRow(infiledList)">新增</el-button> -->

                  <el-table
                    :data="infiledList"
                    size="mini"
                    highlight-current-row
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="fildna" label="出发地">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.fildna"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildna" label="目的地">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.fildnasl"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildtp" label="交通工具">
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
                    <el-table-column prop="remark" label="行程明细">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.remark"></el-input>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" 
                @click.native.prevent="deleteRow(scope.$index, infiledList)"
                size="small"
              >移除</el-button>
            </template>
                    </el-table-column>-->
                  </el-table>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>-->
          <el-button type="success">审核通过</el-button>
          <el-button type="danger">不通过</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1000px">
      <img src="../../../img/workflow2.png" style="width:980px;" />
    </el-dialog>
  </div>
</template>

<script>
import { GetInfo, CreateInfo, GetCLXCInfo } from "@/app_src/api/jygl/CLFBX";
export default {
  name: "SWKC",
  data() {
    return {
      infiledList: [],
      inServForm:[],
      fildtps: [{ text: "设备", value: "1" }, { text: "材料", value: "2" }],
      textMap: {
        update: "修改差旅费用报销",
        create: "添加差旅费用报销"
      },
      workFlowVisible: false,
      temp: {
        BXDH: "GY01JL9.11-02",
        SQBM: "北京项目部",
        SQSJ: "219-05-31",
        CCR: "张三,李四",
        CCKSSJ: "2019-5-9",
        CCJSSJ: "219-5-10",
        CCSY: "学习交流",
        CCTS: 3,
        BXJE: 200,
        BXJEDX: "贰佰元",
        YJCLF: 0,
        YTBJE: 0
      },
      listQuery: {
        CLBH: "",
        limit: 10,
        page: 1
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      fac: []
    };
  },
  methods: {
    getList() {
      this.listloading = true;
      GetInfo(this.listQuery).then(response => {
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
    handleProcess() {
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
    }
  },
  mounted() {
    this.getList();
  }
};
</script>



<style lang="scss" scoped>
</style>


