
<template>
  <div id="CBJHSQ" class="app-container calendar-list-container">
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
          >新增</el-button>
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
                <span>{{scope.row.LSJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="本年计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.BNJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="right" prop="ZGZSL" label="未来计划总金额">
              <template slot-scope="scope">
                <span>{{scope.row.WLJE |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="ZGZSL" label="是否存在物资">
              <template slot-scope="scope">
                <span>{{scope.row.CZWZ|ChangeFlag}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="ZGZSL" label="是否财务下达">
              <template slot-scope="scope">
                <span>{{scope.row.SFCW|ChangeFlag}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="230" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                <el-button type="warning" size="mini" @click="handleUpdate(scope.row)">提交</el-button>
                <el-button type="success" size="mini" @click="handleProcess()">查看流程</el-button>
                <el-button type="info" size="mini">撤回</el-button>
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
          :rules="rules"
          label-width="120px"
          style="width: 99%;"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目编号" prop="XMBH">
                <el-input v-model="temp.XMBH" disabled></el-input>
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
              <el-form-item label="历史计划金额" prop="LSJE">
                <el-input v-model="temp.LSJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="本年计划金额" prop="BNJE">
                <el-input v-model="temp.BNJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="未来计划金额" prop="WLJE">
                <el-input v-model="temp.WLJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否存在物资" prop="CZWZ">
                <el-select size="mini" style="width:100%;" v-model="temp.CZWZ">
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
                <el-input v-model="temp.WZJHJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否财务下达">
                <el-select size="mini" style="width:100%;" v-model="temp.SFCW">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目批次">
                <el-select size="mini" style="width:100%;" v-model="temp.XMPC">
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
                        <el-input size="mini" v-model="scope.row.WZMC"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildna" label="物资数量">
                      <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.WZSL"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fildtp" label="类型">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.WZLX" clearable>
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
                        <el-input size="mini" v-model="scope.row.WZSM"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="warning"
                          @click.native.prevent="deleteRow(scope.$index, infiledList)"
                          size="small"
                        >移除</el-button>
                        <el-button
                          type="danger"
                          @click.native.prevent="deleteDetailInfo(scope.$index, infiledList,scope.row)"
                          size="small"
                          v-if="scope.row.WZID"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
          <el-button type="success">提交</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="查看流程" width="1000px">
      <img src="../../../img/workflow2.png" style="width:980px;" />
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import {
  GetInfo,
  CreateInfo,
  UpdateInfo,
  DeleteInfo,
  GetDetailInfo,
  DeleteDetailInfo
} from "@/app_src/api/jygl/CBJHSQ";
export default {
  name: "CBJHSQ",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    const changeNumber = (rule, value, callback) => {
      var str = /^[+|-]?\d+(.\d+)?$/;
      if (!str.test(value)) {
        return callback(new Error("数字格式不正确！"));
      } else {
        callback();
      }
    };
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
      rules: {
        XMMC: [
          { required: true, message: "请输入项目名称", trigger: "change" }
        ],
        // XMLB: [
        //   { required: true, message: "请输入项目类别", trigger: "change" }
        // ],
        CBDW: [
          { required: true, message: "请输入承办单位", trigger: "change" }
        ],
        JSNR: [
          { required: true, message: "请输入建设内容", trigger: "change" }
        ],
        JHZJE: [
          { required: true, message: "请输入计划总金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ],
        LSJE: [
          { required: true, message: "请输入计划总金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ],
        BNJE: [
          { required: true, message: "请输入计划总金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ],
        WLJE: [
          { required: true, message: "请输入计划总金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ]
      },
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
        XMBH: "",
        XMMC: ""
      },
      temp: {
        XMBH: "",
        XMMC: "",
        CBDW: "",
        JSNR: "",
        JHZJE: "",
        LSJE: "",
        BNJE: "",
        WLJE: "",
        XMPC: "",
        CJR: this.$store.state.user.userId,
        IS_DELETE: 0,
        CZWZ: "",
        SFCW: ""
      },
      inServForm: {},
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
      tableData.push({ WZMC: "", WZSL: "", WZLX: "", WZSM: "" });
    },
    handleProcess() {
      this.workFlowVisible = true;
    },
    resetTemp() {
      this.temp = {
        XMBH: "",
        XMMC: "",
        CBDW: "",
        JSNR: "",
        JHZJE: "",
        LSJE: "",
        BNJE: "",
        WLJE: "",
        XMPC: "",
        CJR: this.$store.state.user.userId,
        IS_DELETE: 0,
        CZWZ: "",
        SFCW: ""
      };
      this.infiledList = [];
    },

    getList() {
      this.listLoading = true;
      GetInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.totoal;
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
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
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
              this.editVisible = false;
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
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let arr = [...this.infiledList];
          arr.push(this.temp);
          //arr.push(this.temp);
          //console.log(arr);
          CreateInfo(arr).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: response.data.message,
                duration: 3000
              });
              this.getList();
              this.editVisible = false;
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
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let arr = [...this.infiledList];
          arr.push(this.temp);
          UpdateInfo(arr).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: response.data.message,
                duration: 3000
              });
              this.getList();
              this.editVisible = false;
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
        }
      });
    },
    deleteDetailInfo(index, rows, data) {
      let temp = {
        WZID: data.WZID
      };
      this.$confirm("确认删除本物资信息吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteDetailInfo(temp).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: response.data.message,
                duration: 3000
              });
              this.deleteRow(index,rows);
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: response.data.message,
                type: response.data.message,
                duration: 3000
              });
            }
          });
        })
        .catch(() => {});
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

