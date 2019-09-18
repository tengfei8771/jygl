
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
                <span>{{scope.row.XMCODE}}</span>
              </template>
            </el-table-column>

            <el-table-column label="项目名称" :show-overflow-tooltip="true" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.XMMC}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" prop="LB" label="项目类别" fixed="left"></el-table-column>
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
            <el-table-column width="100px" align="right" label="是否财务下达">
              <template slot-scope="scope">
                <span>{{scope.row.SFCW|ChangeFlag}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="230" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                <el-button type="warning" size="mini" @click="handleSubmit(scope.row)">提交</el-button>
                <el-button type="success" size="mini" @click="handleProcess()">流程</el-button>
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
              <el-form-item label="项目批次" prop="XMPC">
                <el-select style="width:100%;" v-model="temp.XMPC" @change="selectChange">
                  <el-option
                    v-for="(item,key) in BatchOptions"
                    :key="key"
                    :label="item.Name"
                    :value="item.Code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划年度" prop="JHND">
                <el-date-picker
                  v-model="temp.JHND"
                  type="year"
                  value-format="yyyy-MM-dd"
                  placeholder="选择年月"
                  :clearable="true"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目编号" prop="XMCODE">
                <el-input v-model="temp.XMCODE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称" prop="XMMC">
                <el-input v-model="temp.XMMC" v-if="!finallFlag"></el-input>
                <el-select style="width:100%;" v-model="temp.XMMC" v-else-if="finallFlag">
                  <el-option
                    v-for="(item,key) in XMOptions"
                    :key="key"
                    :label="item.XMCODE+'-'+item.XMMC"
                    :value="item.XMMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目类别" prop="XMLB">
                <treeselect
                  v-model="temp.XMLB"
                  :multiple="false"
                  :options="treeData"
                  :load-options="loadOptions"
                  placeholder="请选择项目类别"
                  :normalizer="normalizer"
                  :disable-branch-nodes="false"
                  noResultsText="未搜索到结果"
                  noChildrenText=" "
                  style="font-size:14px;"
                  :clearable="true"
                  size="mini"
                />
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
              <el-form-item label="历史计划金额" >
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
              <el-form-item label="未来计划金额" >
                <el-input v-model="temp.WLJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否财务下达" prop="SFCW">
                <el-select style="width:100%;" v-model="temp.SFCW">
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
              <el-form-item label="是否有收入" prop="HASINCOME">
                <el-select style="width:100%;" v-model="temp.HASINCOME">
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
            <el-col :span="12">
              <el-form-item label="是否存在物资" prop="CZWZ">
                <el-select style="width:100%;" v-model="temp.CZWZ">
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
                    :header-cell-class-name="tableRowClassName"
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
    <el-dialog :visible.sync="workFlowVisible" class="selecttrees" title="流程" width="1000px">
      <img src="../../../img/workflow2.png" style="width:980px;" />
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import {flowSend} from '@/app_src/api/workflow/common.js' //注意路径
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { sendFlow } from "@/app_src/api/jygl/WorkFlow";
import {
  GetInfo,
  CreateInfo,
  UpdateInfo,
  DeleteInfo,
  GetDetailInfo,
  DeleteDetailInfo,
  GetOptions,
  GetTreeOptions,
  GetYearProject
} from "@/app_src/api/jygl/CBJHSQ";
import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "CBJHSQ",
  directives: {
    waves
  },
  components: {
    Treeselect
  },
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
      treeData: [],
      finallFlag: false,
      fildtps: [{ text: "设备", value: "1" }, { text: "材料", value: "2" }],
      tableKey: 0,
      workFlowVisible: false,
      normalizer(node) {
        return {
          id: node.Code,
          label: node.Name,
          children: node.children
        };
      },
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
      BatchOptions: [],
      XMOptions:[],
      rules: {
        XMMC: [
          { required: true, message: "请输入项目名称", trigger: "change" }
        ],
        XMLB: [
          { required: true, message: "请输入项目类别", trigger: "change" }
        ],
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
          { required: true, message: "请输入历史金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ],
        BNJE: [
          { required: true, message: "请输入本年金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ],
        WLJE: [
          { required: true, message: "请输入蔚来金额", trigger: "change" },
          { validator: changeNumber, trigger: "change" }
        ],
        CZWZ: [
          { required: true, message: "请选择是否存在物资", trigger: "change" }
        ],
        SFCW: [
          { required: true, message: "请选择是否财务", trigger: "change" }
        ],
        HASINCOME: [
          { required: true, message: "请选择是否有收入", trigger: "change" }
        ],
        XMCODE: [
          { required: true, message: "请输入项目编号", trigger: "change" }
        ],
        JHND: [{ required: true, message: "请选择计划年度", trigger: "change" }]
      },
      total: 0,
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
        SFCW: "",
        XMLE: "",
        XMCODE: "",
        HASINCOME: "",
        JHND: ""
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
    handleSubmit(row)
{

  

      let fd = new FormData();
            fd.append("systemcode", "localhost");
            fd.append("stepid","")
            fd.append("flowid", "0273b9ef-9903-4c29-8f1c-e3cf04a00fb7"); 
            fd.append("taskid", ""); 
            fd.append("instanceid", row.S_ID); 
            fd.append("senderid", this.$store.state.user.userId); 
            fd.append("tasktitle",row.XMBH+"成本计划报销审批");
            fd.append("comment","");
            fd.append("type","submit");
            fd.append("isFreeSend",false);
            console.log(fd);
      sendFlow(fd).then(repon=>{
           
            console.log(repon);
      })
 

},
    selectChange(val) {
      if (
        this.BatchOptions.length - 1 ===
        this.BatchOptions.findIndex(t => t.Code === val)
      ) {
        this.finallFlag = true;
        GetYearProject().then(response=>{
          this.XMOptions=response.data.items;
        })
      } else {
        this.finallFlag = false;
      }
    },
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
        SFCW: "",
        XMLE: "",
        XMCODE: "",
        HASINCOME: "",
        JHND: ""
      };
      this.infiledList = [];
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
      this.infiledList = [];
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
              this.deleteRow(index, rows);
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
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        if (parentNode.children == null) {
          parentNode.children = undefined;
          callback();
        }
      }
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
    GetOpions() {
      let temp = {
        ParentCode: "PC"
      };
      GetOptions(temp).then(response => {
        if (response.data.code === 2000) {
          this.BatchOptions = response.data.items;
        }
      });
    },
    GetTreeOptions() {
      let temp = {
        code: "XMLB"
      };
      GetTreeOptions(temp).then(response => {
        this.treeData = response.data.items;
      });
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
    this.GetOpions();
    this.GetTreeOptions();
    this.getList();
    // flowSend();
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
  //   .vue-treeselect__control {
  //     height: 28px !important;
  //     width: 100%;
  //   }
  //   .vue-treeselect__placeholder,
  //   .vue-treeselect__single-value {
  //     line-height: 28px;
  //   }
  // }
  // .selecttrees {
  //   .vue-treeselect--searchable .vue-treeselect__input-container {
  //     height: 28px !important;
  //     width: 100%;
  //   }
  //   .el-dialog__body {
  //     padding: 0px 10px 10px !important;
  //   }
}
</style>

