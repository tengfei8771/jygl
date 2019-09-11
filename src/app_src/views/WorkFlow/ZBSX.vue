
<template>
  <div id="CBJHSQ" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input placeholder="流程名称" style="width:95%;" size="mini" clearable></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input placeholder="标题" style="width:95%;" size="mini" clearable></el-input>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
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
            <el-table-column align="center" label="标题">
              <template slot-scope="scope">
                <span>{{scope.row.BT}}</span>
              </template>
            </el-table-column>

            <el-table-column label="流程" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.LC}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="MSEG" label="步骤">
              <template slot-scope="scope">
                <span>{{scope.row.BZ}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="right" prop="CBDW" label="发送人">
              <template slot-scope="scope">
                <span>{{scope.row.FSR}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              width="280px"
              align="right"
              prop="MSEG"
              label="建设内容"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.JSNR }}</span>
              </template>
            </el-table-column> -->
            <el-table-column width="120px" align="right" prop="ZGZSL" label="接收时间">
              <template slot-scope="scope">
                <span>{{scope.row.JSSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.ZT }}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.REMARK}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="120px" align="right" prop="ZGZSL" label="未来计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.WLJHZJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="ZGZSL" label="是否存在物资">
              <template slot-scope="scope">
                <span>{{scope.row.SFCZWZ}}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" width="300" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">处理</el-button>
                <el-button type="success" size="mini" @click="handleProcess()">查看流程</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">作废</el-button>
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
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
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
                                <span>{{temp.LSJHZJE}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="本年计划金额" prop="BNJHZJE">
                <!-- <el-input v-model="temp.XMBH"></el-input> -->
                  <span>{{temp.BNJHZJE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="未来计划金额" prop="WLJHZJE">
                <!-- <el-input v-model="temp.WLJHZJE"></el-input> -->
                  <span>{{temp.WLJHZJE}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否存在物资" prop="SFCZWZ">
                <span>否</span>
                <!-- <el-select size="mini" style="width:100%;" v-model="temp.SFCZWZ">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
 <el-row>
            <el-col :span="24">
               <el-form-item label="是否财务下达">
    <el-radio-group v-model="temp.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
            </el-col>
          
          </el-row>
          <el-row>
            <el-col :span="24" v-show="temp.SFCZWZ==!0">
              <el-form
                :model="inServForm"
                ref="inServForm"
                label-width="130px"
                size="mini"
                highlight-current-row
                border
              >
                <el-form-item label="物资明细" prop="servin">
                  <el-button type="primary" @click="addRow(infiledList)">新增</el-button>

                  <el-table
                    :data="infiledList"
                    size="mini"
                    highlight-current-row
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="fildna" label="物资名称">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.fildna"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildna" label="物资数量">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.fildnasl"></el-input>
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
                    <el-table-column prop="remark" label="物资说明">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.remark"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="danger"
                          @click.native.prevent="deleteRow(scope.$index, infiledList)"
                          size="small"
                        >移除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <!-- <el-col :span="24">
            <el-form-item label="入库时间" prop="RKSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="temp.RKSJ"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数量" prop="SL">
              <el-input v-model="temp.SL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="金额" prop="JE">
              <el-input v-model="temp.JE"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="仓库号" prop="CKH">
              <el-input v-model="temp.CKH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="库存地点" prop="KCDD">
              <el-input v-model="temp.KCDD"></el-input>
            </el-form-item>
          </el-col>-->
        </el-form>
        <div style="text-align:center">
          <el-button type="success" @click="editVisible = false" >通过</el-button>
          <el-button @click="editVisible = false" type="danger">退回</el-button>
          <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button> -->

        </div>
      </el-card>
    </el-dialog>
        <el-dialog
      :visible.sync="workFlowVisible"
      class="selecttrees"
      title="查看流程"
      width="1000px"
    >
      <img src="../../img/workflow2.png" style="width:980px;">
        </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
export default {
  name: "CBJHSQ",
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
      list: [
        {
          BT: "IP资源及交换机管理系统软件开发二期建设申请",
          LC: "成本计划申请流程",
          BZ: "主管",
          FSR: "张三",
          JSSJ:
            "2019-06-24",
          ZT: "正常",
          REMARK: "",
        },
       
        {

          BT: "无线基站光缆租用申请",
          LC: "成本计划申请流程",
          BZ: "部门负责人",
          FSR: "管控中心",
          JSSJ:
            "2019-06-20",
          ZT: "正常",
          REMARK: "",
        },
        {
          BT: "移动办公无线网核心交换机维保申请",
          LC: "成本计划申请流程",
          BZ: "部门负责人",
          FSR: "网络技术部",
          JSSJ:
            "2019-06-20",
          ZT: "正常",
          REMARK: "",
        },
        {
          BT: "桌面云维保技术服务申请",
          LC: "成本计划申请流程",
          BZ: "经理",
          FSR: "云计算技术部",
          JSSJ:
            "2019-06-20",
          ZT: "正常",
          REMARK: "",
        },
        {
          BT: "大港油田A8视频会议系统维保申请",
          LC: "成本计划申请流程",
          BZ: "经理",
          FSR: "云计算技术部",
          JSSJ:
            "2019-06-20",
          ZT: "正常",
          REMARK: "",
        },
        {
          BT: "IP资源及交换机管理系统软件开发二期建设",
          LC: "成本计划申请流程",
          BZ: "经理",
          FSR: "网络技术部",
          JSSJ:
            "2019-06-20",
          ZT: "正常",
          REMARK: "",
        },
      
      ],
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
      taxofficeoptions: [], //税务机关
      orgregionoptions: [], //机关所在地
      taxcodeoptions: [], //税号
      responsibilityoptions: [], //责任中心
      listQuery: {
        limit: 10,
        page: 1,
        S_OrgCode: null,
        ResponsibilityCenter: "",
        TaxOffice: "",
        ImportModel: "",
        TaxNumber: "",
        OrgRegion: ""
      },
      temp: {
        XMBH: "201802210987",
        XMMC: "大港油田车辆卫星定位系统维保",
        CBDW: "社区信息化部",
        XMLB: "运行维护",
        JSNR:
          "操作系统维护、业务处理系统维护、WEB系统维护、终端接入系统维护、地图升级、货运车辆公共监督与服务平台数据通信异常等系统故障处理",
        JHZJE: 90,
        LSJHZJE: 5,
        BNJHZJE: 45,
        WLJHZJE: 30,
        SFCZWZ: "否",
        resource:""
      },
      textMap: {
        update: "审批计划信息",
        create: "添加计划信息"
      },
      editVisible: false,
      workFlowVisible:false,
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
                resource:""
      };
    },

    getList() {
      //   this.listLoading = true;
      //   getTaxOrgList(this.listQuery).then(response => {
      //     if (response.data.code === 2000) {
      //       this.list = response.data.items;
      this.total = 15;
      //       this.listLoading = false;
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

    handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },
    handleUpdate() {
       
      this.temp = Object.assign({}, {
          XMBH: "201802210987",
          XMMC: "桌面云维保技术服务",
          CBDW: "云计算技术部",
          XMLB: "运行维护",
          JSNR:
            "负责数据库的定期运行检查；负责专业数据库运行优化配置；负责数据库故障处理技术支持",
          JHZJE: 290,
          LSJHZJE: 25,
          BNJHZJE: 45,
          WLJHZJE: 30,
          SFCZWZ: "否"
        }); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleProcess()
    {
 this.workFlowVisible = true;
    },
    handleDelete(row) {
      this.$confirm("确认作废记录吗?", "提示", {
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

