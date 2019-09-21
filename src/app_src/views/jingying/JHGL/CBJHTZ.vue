<template>
  <div id="CBJHTZ" class="app-container calendar-list-container">
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
          <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增调整</el-button>
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

            <el-table-column align="center" label="承办单位" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.CBDW}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="调整前计划总金额" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.TZQJE}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="调整金额" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.TZJE}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="调整说明" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.TZSM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="调整日期" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.TZSJ|parseDate}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="调整人" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.CJRName}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="200" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column> -->
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
    <el-dialog :visible.sync="editVisible" class="selecttrees" :title="textMap[dialogStatus]" width="700px">
      <el-card>
        <el-form
          :rules="rules"
          ref="dataForm"
          :model="temp"
          label-width="120px"
          style="width: 99%;"
        >
          <el-col :span="24">
            <el-form-item label="项目名称" prop="XMMC">
             <el-input v-model="temp.XMMC" disabled style="width:78%;"></el-input>
                 <el-button
                size="small"
                type="primary"
                @click="chooseXM()"
                style="width:20%;margin-left:1%;"
              >选择项目</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调整前计划金额" prop="TZQJE">
              <el-input v-model="temp.TZQJE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调整金额" prop="TZJE">
              <el-input v-model="temp.TZJE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调整说明" prop="TZSM">
              <el-input v-model="temp.TZSM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调整时间" prop="TZSJ">
              <el-date-picker
                  type="date"
                  v-model="temp.TZSJ"
                  placeholder="调整时间"
                  style="width:100%;"
                  value-format="yyyy-MM-dd"
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
    <el-dialog width="50%" title="项目信息" :visible.sync="innerVisible" append-to-body>
       <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="项目编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQueryXM.XMBH"
          ></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="项目名称"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQueryXM.XMMC"
          ></el-input>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="getXMList"
          >搜索</el-button>
         
        </el-col>
      </el-row>
    </div>
      <el-table
          :key="tableKey"
            @row-click="showRow"
            :data="listXM"
            size="mini"
            :header-cell-class-name="tableRowClassName"
            v-loading="listLoadingXM"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;text-align:left;"
      >
        <el-table-column align="center" label="选择" width="50px" >
          <template slot-scope="scope" >
            <el-radio class="radio" v-model="radio"  :label="scope.$index">&nbsp;</el-radio>
            <!-- <el-radio :label="scope.row.flagIndex" v-model="scope.row.flagValue" @change.native="getTemplateRow(scope.$index,scope.row)"></el-radio> -->
          </template>
        </el-table-column>

            <el-table-column align="center" label="项目编号" width="120px">
              <template slot-scope="scope">
                <span>{{scope.row.XMBH}}</span>
              </template>
            </el-table-column>

            <el-table-column label="项目名称" :show-overflow-tooltip="true" >
              <template slot-scope="scope">
                <span>{{scope.row.XMMC}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="XMLB" label="项目类别" ></el-table-column>
            <el-table-column width="180px" align="right" prop="CBDW" label="承办单位"></el-table-column>
            <el-table-column width="180px" prop="PC" label="项目批次" align="right"></el-table-column>
            <!-- <el-table-column
              width="280px"
              align="right"
              prop="JSNR"
              label="建设内容"
              :show-overflow-tooltip="true"
            ></el-table-column> -->
            <!-- <el-table-column width="120px" align="right" label="计划总金额">
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
            </el-table-column> -->
            <!-- <el-table-column width="100px" align="right" label="是否存在物资">
              <template slot-scope="scope">
                <span>{{scope.row.CZWZ|ChangeFlag}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" label="是否财务下达">
              <template slot-scope="scope">
                <span>{{scope.row.SFCW|ChangeFlag}}</span>
              </template>
            </el-table-column> -->
      </el-table>
        <div class="page">
            <el-pagination
              background
              @size-change="handleXMSizeChange"
              @current-change="handleXMCurrentChange"
              :current-page="listQueryXM.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQueryXM.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalXM"
            ></el-pagination>
          </div>
    </el-dialog>
  </div>
</template>



<script>
 import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import { fetchOrgListByCode } from "@/frame_src/api/org";
import { GetTZInfo,CreateInfo,UpdateInfo,GetOpions } from "@/app_src/api/jygl/CBJHTZ";
import { parseTime, parseDate } from "@/frame_src/utils/index";
import { GetInfo } from "@/app_src/api/jygl/CBJHSQ";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { getToken } from "@/frame_src/utils/auth";
export default {
  name: "CBJHTZ",
  directives: {
    waves
  },
  components: {
    Treeselect
  },
  data() {
    return {
      normalizer(node) {
        return {
          id: node.ORG_CODE,
          label: node.ORG_SHORT_NAME,
          children: node.children
        };
      },
      tableKey: 0,
      list: null,
      listXM: null,
      total: null,
      totalXM:null,
      listLoadingXM: false,
      listLoading: false,
      innerVisible:false,
      defaultProps: {
        children: "children",
        label: "ORG_SHORT_NAME",
        id: "id"
      },
      listQuery: {
        limit: 10,
        page: 1,
        XMBH: "",
        XMMC: ""
      },
      listQueryXM: {
        limit: 10,
        page: 1,
        XMBH: "",
        XMMC: ""
      },
      radio :null,
      temp: {
        S_ID: "",
        XMBH: "",
        XMMC:"",
        TZQJE:"",
        TZJE:"",
        TZSM:"",
        TZSJ:"",
        CJR: this.$store.state.user.userId,
      },
      textMap: {
        update: "修改计划调整",
        create: "添加计划调整"
      },
      editVisible: false,
      rules: {
        // S_OrgCode: [
        //   { required: true, message: "组织单位不能为空", trigger: "change" }
        // ],
        // ImportModel: [
        //   { required: true, message: "导入模板不能为空", trigger: "change" }
        // ],
        // TaxOffice: [
        //   { required: true, message: "税务机关不能为空", trigger: "change" }
        // ],
        // ResponsibilityCenter: [
        //   { required: true, message: "责任中心不能为空", trigger: "change" }
        // ],
        // TaxCode: [
        //   { required: true, message: "税号不能为空", trigger: "change" }
        // ],
        // OrgRegion: [
        //   { required: true, message: "机关所在地不能为空", trigger: "change" }
        // ]
        // PROJECT_AMOUNT: [
        //   {
        //     validator: (rule, value, callback) => {
        //       if (value != "") {
        //         if (
        //           /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
        //         ) {
        //           callback(new Error("请填写大于0的数字"));
        //         } else {
        //           callback();
        //         }
        //       } else {
        //         callback();
        //       }
        //     },
        //     trigger: "change"
        //   }
        // ]
      },
      dialogStatus: "",

      treeData: []
    };
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        if (parentNode.children == null) {
          parentNode.children = undefined;
          callback();
        }
      }
    },
    getnode(node, instanceId) {
      this.temp.S_OrgName = node.ORG_SHORT_NAME;
    },
   
    resetTemp() {
      this.temp = {
        S_ID: "",
        XMBH: "",
        XMMC:"",
        TZQJE:"",
        TZJE:"",
        TZSM:"",
        TZSJ:"",
        CJR: this.$store.state.user.userId, 
      };
    },
chooseXM()
{
  this.radio=null;
  this.getXMList();
this.innerVisible=true;
},
    getList() {
      this.listLoading = true;
      GetTZInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },

    // loadOrgByCode() {
    //   const query = { sysCode: this.$store.state.user.orgCode };
    //   fetchOrgListByCode(query).then(response => {
    //     this.treeData = JSON.parse(response.data);
    //   });
    // },

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
    // handleDelete(row) {
    //   this.$confirm("确认删除记录吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       const query = { S_ID: row.S_Id };
    //       deleteTaxOrg(query).then(response => {
    //         this.message = response.data.message;
    //         this.title = "失败";
    //         this.type = "error";
    //         if (response.data.code === 2000) {
    //           // const index = this.list.indexOf(row)
    //           // this.list.splice(index, 1)
    //           this.getList();
    //           this.title = "成功";
    //           this.type = "success";
    //         }
    //         this.$notify({
    //           position: "bottom-right",
    //           title: this.title,
    //           message: this.message,
    //           type: this.type,
    //           duration: 2000
    //         });
    //       });
    //     })
    //     .catch(() => {});
    // },
    createData() {
      this.temp.CJR=this.$store.state.user.userId
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          CreateInfo(this.temp).then(response => {
            var message = response.data.message;
            var title = "失败";
            var type = "error";
            if (response.data.code === 2000) {
              this.getList();
              title = "成功";
              type = "success";
              // this.list.unshift(this.temp)
            }
            this.editVisible = false;
            this.$notify({
              position: "bottom-right",
              title: title,
              message: message,
              type: type,
              duration: 3000
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          //tempData.NOTICE_CONTENT=this.content
          UpdateInfo(tempData).then(response => {
            var message = response.data.message;
            var title = "失败";
            var type = "error";
            if (response.data.code === 2000) {
              this.getList();
              title = "成功";
              type = "success";
            }
            this.editVisible = false;
            this.$notify({
              position: "bottom-right",
              title: title,
              message: message,
              type: type,
              duration: 3000
            });
          });
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
    },
    getXMList() {
      this.listLoadingXM = true;
      GetInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.listXM = response.data.items;
          this.totalXM = response.data.total;
          this.listLoadingXM = false;
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
        showRow(row) {
      //赋值给radio
      this.radio = this.list.indexOf(row);
      this.temp.XMMC = row.XMMC;
      this.temp.XMBH = row.XMBH;
      this.temp.TZQJE =row.TZHJHZJE;
      this.innerVisible = false;
    },
handleXMSizeChange(val) {
      this.listQueryXM.limit = val;
      this.getXMList();
    },
    handleXMCurrentChange(val) {
      this.listQueryXM.page = val;
      this.getXMList();
    },
    handleXMFilter() {
      this.listQueryXM.page = 1;
      this.getXMList();
    },
  },
  created() {
    this.listLoading = false;
    //this.loadOrgByCode();

    this.getList();
  },
    activated() {
this.listLoading = false;
    //this.loadOrgByCode();

    this.getList();
  },
  filters: {
        parseTime, parseDate,
    formatStatus(val) {
      if (val === 0) {
        return "否";
      } else if(val === 1) {
        return "是";
      }
      else{
        return "";
      }
    }
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
#CBJHTZ {
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
.selecttrees{
.vue-treeselect--searchable .vue-treeselect__input-container {
    height: 28px !important;
    width: 100%;
  }
  .el-dialog__body{
    padding:0px 10px 10px !important;
  }
}
</style>

