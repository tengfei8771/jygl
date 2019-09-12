<template>
  <div id="RKLR" class="app-container calendar-list-container">
    <!-- <div style="text-align: center; font-weight: bold;margin-bottom:15px;">
      <span>组织单位配置表</span>
    </div>-->
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :span="3">
          <el-input placeholder="项目编号" style="width:95%;" size="mini" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-date-picker
            size="mini"
            style="width:200px;"
            type="month"
            value-format="yyyy-MM-dd"
            placeholder="项目时间"
            v-model="listQuery.XMSJ"
            :clearable="true"
          ></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="项目名称" style="width:95%;" size="mini" clearable></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
          <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="exportSumExcel">导入</el-button> 
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
            <el-table-column align="center" label="项目编号" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.XMBH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="项目名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.XMMC}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目金额" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.XMJE}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="项目时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.XMSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="建设单位" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.JSDW}}</span>
              </template>
            </el-table-column>
          
            <el-table-column align="center" width="200" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
      width="500px"
    >
      <el-card>
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
          <el-col :span="24">
            <el-form-item label="项目编号" prop="XMBH">
              <el-input v-model="temp.XMBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目名称" prop="XMMC">
              <el-input v-model="temp.XMMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="项目金额" prop="XMJE">
              <el-input v-model="temp.XMJE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
       
            <el-form-item label="建设单位" prop="JSDW">
              <el-input v-model="temp.JSDW"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目时间" prop="XMSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="temp.XMSJ"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
         
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
export default {
  name: "RKLR",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      tableKey: 0,
      list: [
               {
          XMBH: "TJJS-201908175877",
          XMMC:"条件接收系统维护",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"大港加油站"
        },
        {
         XMBH: "SBWB-201908609982",
          XMMC:"油田公司生产视频会议系统运维及设备维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"综合服务部"
        },
        {
        XMBH: "XTJS-201908170984",
          XMMC:"通信电缆充气设备维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"网路技术部"
        },
        {
          XMBH: "JSFW-201908170987",
          XMMC:"GPS三级等保平台维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"办公信息化部"
        },
        {
         XMBH: "NBWB-201908170912",
          XMMC:"南部光缆维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"物联网技术部"
        },
        {
        XMBH: "SBWB-201908170912",
          XMMC:"中兴设备维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"物联网技术部"
        },
        {
        XMBH: "JSFW-201908170987",
          XMMC:"数据库维保技术服务",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"云计算部"
        },
         {
          XMBH: "TJJS-201908175877",
          XMMC:"条件接收系统维护",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"大港加油站"
        },
        {
         XMBH: "SBWB-201908609982",
          XMMC:"油田公司生产视频会议系统运维及设备维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"综合服务部"
        },
        {
        XMBH: "XTJS-201908170984",
          XMMC:"通信电缆充气设备维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"网路技术部"
        },
        {
        XMBH: "JSFW-201908170985",
          XMMC:"上海贝尔朗讯设备过保修技术维护",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"社区信息化部"
        },
        {
          XMBH: "SBWB-201908170912",
          XMMC:"中兴设备维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"物联网技术部"
        },
        {
        XMBH: "JSFW-201908170987",
          XMMC:"数据库维保技术服务",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"云计算部"
        },
         {
          XMBH: "TJJS-201908175877",
          XMMC:"条件接收系统维护",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"大港加油站"
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
        XMBH: "JSFW-201908170987",
          XMMC:"GPS三级等保平台维保",
          XMJE:200,
          XMSJ:"2019-03-23",
          JSDW:"大港加油站"
      },
      textMap: {
        update: "修改收入项目",
        create: "添加收入项目"
      },
      editVisible: false,
      dialogStatus: "",

      treeData: []
    };
  },
  methods: {
    resetTemp() {
      this.temp = {
        XMBH: "",
          XMMC:"",
          XMJE:"",
          XMSJ:"",
          JSDW:""
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
  }
};
</script>

<style lang="scss" >
#RKLR {
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

