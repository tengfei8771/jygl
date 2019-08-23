
<template>
  <div id="SCJSCB" class="app-container calendar-list-container">
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
            <el-table-column align="center" label="项目编号" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.XMBH}}</span>
              </template>
            </el-table-column>

            <el-table-column label="项目名称" :show-overflow-tooltip="true" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.XMMC}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="MSEG" label="项目类别" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.XMLB}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="right" prop="CBDW" label="承办单位" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.CBDW}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="280px"
              align="right"
              prop="MSEG"
              label="建设内容"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.JSNR }}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.JHZJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="历史计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.LSJHZJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="本年计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.BNJHZJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="未来计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.WLJHZJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="ZGZSL" label="是否存在物资">
              <template slot-scope="scope">
                <span>{{scope.row.SFCZWZ}}</span>
              </template>
            </el-table-column>
                       <el-table-column align="center" width="230" label="操作" fixed="right">
              <template slot-scope="scope">

                <el-button type="success"  size="mini" @click="handleProcess(scope.row)">查看流程</el-button>
      
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
                <el-input v-model="temp.XMBH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称" prop="XMMC">
                <el-input v-model="temp.XMMC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目类别" prop="XMLB">
                <el-input v-model="temp.XMLB"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="承办单位" prop="CBDW">
                <el-input v-model="temp.CBDW"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="建设内容" prop="JSNR">
                <el-input v-model="temp.JSNR" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划总金额" prop="JHZJE">
                <el-input v-model="temp.JHZJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="历史计划金额" prop="LSJHZJE">
                <el-input v-model="temp.LSJHZJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="本年计划金额" prop="BNJHZJE">
                <el-input v-model="temp.BNJHZJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="未来计划金额" prop="WLJHZJE">
                <el-input v-model="temp.WLJHZJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
                              <el-form-item label="是否存在物资" prop="SFCZWZ">
                    <el-select size="mini" style="width:100%;" v-model="temp.SFCZWZ">
                      <el-option
                        v-for="(item,key) in selectOptions"
                        :key="key"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
            </el-col>
          </el-row>

                <el-row>
                 <el-col :span="24" v-show="temp.SFCZWZ==!0">
    <el-form :model="inServForm" ref="inServForm" label-width="130px" size="mini" highlight-current-row border >
      <el-form-item label="物资明细" prop="servin">
        <el-button type="primary" @click="addRow(infiledList)">新增</el-button>

        <el-table :data="infiledList" size="mini"  highlight-current-row border  style="width: 100%" >
          <el-table-column prop="fildna" label="物资名称" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.fildna"></el-input>
            </template>
          </el-table-column>
           <el-table-column prop="fildna" label="物资数量" >
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
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button type="danger" 
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
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
          <el-button type="success">提交</el-button>
        </div>
      </el-card>
    </el-dialog>
     <el-dialog
      :visible.sync="workFlowVisible"
      class="selecttrees"
      title="查看流程"
      width="1000px"
    >
      <img src="../../../img/workflow4.png" style="width:980px;">
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
      workFlowVisible:false,
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
          XMBH: "201802210987",
          XMMC: "大港油田车辆卫星定位系统维保",
          CBDW: "社区信息化部",
          XMLB: "运行维护",
          JSNR:
            "操作系统维护、业务处理系统维护、WEB系统维护、终端接入系统维护、地图升级、货运车辆公共监督与服务平台数据通信异常等系统故障处理",
          JHZJE: 100,
          LSJHZJE: 5,
          BNJHZJE: 45,
          WLJHZJE: 30,
          SFCZWZ: "否",
          CHECK_STATE:0
        },
        {
          XMBH: "20180620988",
          XMMC: "IP资源及交换机管理系统软件开发二期建设",
          CBDW: "网络技术部",
          XMLB: "系统建设",
          JSNR:
            "在现有系统基础上，增加管理系统与交换机数据的定期核查功能，并生成异常接入告警，同时完善系统查询、账号权限管理等功能模块",
          JHZJE: 240,
          LSJHZJE: 5,
          BNJHZJE: 55,
          WLJHZJE: 20,
          SFCZWZ: "否",
                    CHECK_STATE:2
        },
        {
          XMBH: "201901237578",
          XMMC: "无线基站光缆租用",
          CBDW: "管控中心",
          XMLB: "网络通信工程",
          JSNR:
            "为保障油区无线公网信号覆盖，需要对盛通自投建设的26座无线基站光缆线路进行业务光纤租赁",
          JHZJE: 30,
          LSJHZJE: 5,
          BNJHZJE: 15,
          WLJHZJE: 5,
          SFCZWZ: "否",
                    CHECK_STATE:0
        },
        {
          XMBH: "201802210987",
          XMMC: "移动办公无线网核心交换机维保",
          CBDW: "网络技术部",
          XMLB: "运行维护",
          JSNR:
            "2台华为S12708交换机、Agile Controller-Campus V100R003_站点1、eSight Network V300R007_站点1， 1年维保",
          JHZJE: 80,
          LSJHZJE: 15,
          BNJHZJE: 25,
          WLJHZJE: 30,
          SFCZWZ: "是",
                    CHECK_STATE:0
        },
        {
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
          SFCZWZ: "否",
                    CHECK_STATE:1
        },
        {
          XMBH: "201802210987",
          XMMC: "大港油田A8视频会议系统维保",
          CBDW: "云计算技术部",
          XMLB: "运行维护",
          JSNR:
            "提供大港油田A8视频会议系统的49类343台设备维护保障服务，包括硬件的维修、更换和软件的维护、升级",
          JHZJE: 190,
          LSJHZJE: 25,
          BNJHZJE: 35,
          WLJHZJE: 70,
          SFCZWZ: "是",
                    CHECK_STATE:1
        },
        {
          XMBH: "20180620988",
          XMMC: "IP资源及交换机管理系统软件开发二期建设",
          CBDW: "网络技术部",
          XMLB: "系统建设",
          JSNR:
            "在现有系统基础上，增加管理系统与交换机数据的定期核查功能，并生成异常接入告警，同时完善系统查询、账号权限管理等功能模块",
          JHZJE: 240,
          LSJHZJE: 5,
          BNJHZJE: 55,
          WLJHZJE: 20,
          SFCZWZ: "否",
                    CHECK_STATE:2
        },
        {
          XMBH: "201901237578",
          XMMC: "无线基站光缆租用",
          CBDW: "管控中心",
          XMLB: "网络通信工程",
          JSNR:
            "为保障油区无线公网信号覆盖，需要对盛通自投建设的26座无线基站光缆线路进行业务光纤租赁",
          JHZJE: 30,
          LSJHZJE: 5,
          BNJHZJE: 15,
          WLJHZJE: 5,
          SFCZWZ: "否",
                    CHECK_STATE:1
        },
        {
          XMBH: "201904215587",
          XMMC: "天津公安平台对接",
          CBDW: "社区信息化部",
          XMLB: "系统建设",
          JSNR: "天津公安平台对接所需设备，网管服务模块、防火墙、一对光猫等",
          JHZJE: 190,
          LSJHZJE: 25,
          BNJHZJE: 35,
          WLJHZJE: 70,
          SFCZWZ: "是",
                    CHECK_STATE:0
        },
        {
          XMBH: "201802210987",
          XMMC: "大港油田车辆卫星定位系统维保",
          CBDW: "社区信息化部",
          XMLB: "运行维护",
          JSNR:
            "操作系统维护、业务处理系统维护、WEB系统维护、终端接入系统维护、地图升级、货运车辆公共监督与服务平台数据通信异常等系统故障处理",
          JHZJE: 100,
          LSJHZJE: 5,
          BNJHZJE: 45,
          WLJHZJE: 30,
          SFCZWZ: "否",
                    CHECK_STATE:0
        },
        {
          XMBH: "20180620988",
          XMMC: "IP资源及交换机管理系统软件开发二期建设",
          CBDW: "网络技术部",
          XMLB: "系统建设",
          JSNR:
            "在现有系统基础上，增加管理系统与交换机数据的定期核查功能，并生成异常接入告警，同时完善系统查询、账号权限管理等功能模块",
          JHZJE: 240,
          LSJHZJE: 5,
          BNJHZJE: 55,
          WLJHZJE: 20,
          SFCZWZ: "否",
                    CHECK_STATE:2
        },

        {
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
          SFCZWZ: "否",
                    CHECK_STATE:0
        },
        {
          XMBH: "201802210987",
          XMMC: "大港油田A8视频会议系统维保",
          CBDW: "云计算技术部",
          XMLB: "运行维护",
          JSNR:
            "提供大港油田A8视频会议系统的49类343台设备维护保障服务，包括硬件的维修、更换和软件的维护、升级",
          JHZJE: 190,
          LSJHZJE: 25,
          BNJHZJE: 35,
          WLJHZJE: 70,
          SFCZWZ: "是",
                    CHECK_STATE:0
        },

        {
          XMBH: "201904215587",
          XMMC: "天津公安平台对接",
          CBDW: "社区信息化部",
          XMLB: "系统建设",
          JSNR: "天津公安平台对接所需设备，网管服务模块、防火墙、一对光猫等",
          JHZJE: 190,
          LSJHZJE: 25,
          BNJHZJE: 35,
          WLJHZJE: 70,
          SFCZWZ: "是",
                              CHECK_STATE:0
        }
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
        SFCZWZ: "否"
      },
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
    handleProcess()
    {
 this.workFlowVisible = true;
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
        SFCZWZ: ""
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$confirm("待实现！", "提示", {
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
#SCJSCB {
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

