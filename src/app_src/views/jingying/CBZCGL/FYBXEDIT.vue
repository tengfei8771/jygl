<template>
  <div id="FYBXEDIT" class="app-container calendar-list-container">
    <el-card class="table-d">
      <el-form
        ref="dataForm"
        id="dataForm"
        :model="temp"
        :rules="rules"
        label-width="120px"
        style="width: 99%;"
      >
        <table width="100%" border="0" cellspacing="1" cellpadding="0">
          <caption>
            中国石油大港油田公司
            <br />费用报销
          </caption>
          <tbody>
            <tr>
              <td>单位部门</td>
              <td width="25%">
                <el-form-item prop="S_OrgCode">
                  <treeselect
                    v-model="temp.S_OrgCode"
                    :multiple="false"
                    :options="treeData"
                    :load-options="loadOptions"
                    placeholder="请选择部门"
                    :normalizer="normalizer"
                    :disable-branch-nodes="false"
                    noResultsText="未搜索到结果"
                    noChildrenText=" "
                    style="font-size:14px;"
                    :clearable="true"
                    @select="getnode"
                    size="mini"
                  />
                </el-form-item>
              </td>
              <td>费用项目</td>
              <td>
                <!-- <el-select size="mini" style="width:100%;" v-model="temp.FYXM">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>-->
                <el-form-item prop="FYXM" style="width:77%;float:left;">
                  <el-input v-model="temp.FYXM" props="FYXM" disabled></el-input>
                </el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  @click="innerVisible=true"
                  style="width:20%;margin-left:1%;clear:both;"
                >选择项目</el-button>
              </td>
            </tr>
            <tr>
              <td>报销事由</td>
              <td :colspan="3">
                <el-form-item prop="BXSY">
                  <el-input v-model="temp.BXSY" type="textarea" :rows="3"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>报销金额小写</td>
              <td>
                <!-- <el-input v-model.number="temp.BXJE" @change="CapitalChinese(temp.BXJE)"></el-input> -->
                <el-form-item prop="BXJE">
                  <el-input
                    @input="oninput(temp.BXJE)"
                    style="width:100%"
                    placeholder
                    v-model="temp.BXJE"
                  ></el-input>
                </el-form-item>
              </td>
              <td>报销金额大写</td>
              <td>
                <el-form-item prop="BXJEDX">
                  <el-input v-model="temp.BXJEDX"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>原借款金额（小写）</td>
              <td>
                <el-form-item prop="YJKJE">
                  <el-input v-model="temp.YJKJE" @input="validataYJK(temp.YJKJE)"></el-input>
                </el-form-item>
              </td>
              <td>现付款（收回）金额（小写）</td>
              <td>
                <el-form-item prop="XFKJE">
                  <el-input v-model="temp.XFKJE" @input="validataXFK(temp.XFKJE)"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>付款方式</td>
              <td>
                <el-form-item prop="FKFS">
                  <el-select style="width:100%;" v-model="temp.FKFS">
                    <el-option
                      v-for="(item,key) in FKFSOptions"
                      :key="key"
                      :label="item.Name"
                      :value="item.Code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>附件张数</td>
              <td>
                <el-form-item prop="FJZS">
                  <el-input v-model="temp.FJZS"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>收款单位名称</td>
              <td>
                <el-form-item prop="SKDW">
                  <el-input v-model="temp.SKDW"></el-input>
                </el-form-item>
              </td>
              <td>开户行</td>
              <td>
                <el-form-item prop="KHH">
                  <el-input v-model="temp.KHH"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>账号</td>
              <td>
                <el-form-item prop="YHZH">
                  <el-input v-model="temp.YHZH"></el-input>
                </el-form-item>
              </td>
              <td>申请时间</td>
              <td>
                <el-form-item prop="SQSJ">
                  <el-date-picker
                    type="date"
                    v-model="temp.SQSJ"
                    placeholder="申请时间"
                    style="width:100%;"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="closetab">取消</el-button>
        <el-button v-if="this.$route.query.type=='create'" type="primary" @click="createData">保存</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
        <!-- <el-button type="success" @click="saveAndSend" v-if="this.$route.query.type=='create'">保存并提交</el-button> -->
        <!-- <el-button @click="printPdf" type="primary">打印</el-button> -->
      </div>
    </el-card>
    <el-dialog width="50%" title="项目信息" :visible.sync="innerVisible" append-to-body>
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
              @click="getXMList"
            >搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :key="tableKey"
        @row-click="showRow"
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
        <el-table-column align="center" label="选择" width="50px">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            <!-- <el-radio :label="scope.row.flagIndex" v-model="scope.row.flagValue" @change.native="getTemplateRow(scope.$index,scope.row)"></el-radio> -->
          </template>
        </el-table-column>

        <el-table-column align="center" label="项目编号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.XMBH}}</span>
          </template>
        </el-table-column>

        <el-table-column label="项目名称" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.XMMC}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="right" prop="XMLB" label="项目类别"></el-table-column>
        <el-table-column width="180px" align="right" prop="CBDW" label="承办单位"></el-table-column>
        <el-table-column width="180px" prop="PC" label="项目批次" align="right"></el-table-column>
        <!-- <el-table-column
              width="280px"
              align="right"
              prop="JSNR"
              label="建设内容"
              :show-overflow-tooltip="true"
        ></el-table-column>-->
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
        </el-table-column>-->
        <!-- <el-table-column width="100px" align="right" label="是否存在物资">
              <template slot-scope="scope">
                <span>{{scope.row.CZWZ|ChangeFlag}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="right" label="是否财务下达">
              <template slot-scope="scope">
                <span>{{scope.row.SFCW|ChangeFlag}}</span>
              </template>
        </el-table-column>-->
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
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { getLodop } from "@/frame_src/utils/LodopFuncs";
import { getToken } from "@/frame_src/utils/auth";
import { CapitalChinese } from "@/frame_src/utils/index";
import { fetchOrgList } from "@/frame_src/api/org";
import { sendFlow } from "@/app_src/api/jygl/WorkFlow";
import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { GetInfo } from "@/app_src/api/jygl/CBJHSQ";

import {
  CreateInfo,
  UpdateInfo,
  DeleteInfo,
  GetOpions
} from "@/app_src/api/jygl/FYBX";
export default {
  name: "FYBXEDIT",
  components: {
    Treeselect
  },
  directives: {
    waves
  },
  // filters: {
  //   },
  data() {
    return {
      tableKey: 0,
      FKFSOptions: [],
      temp: {
        BXDH: "",
        SQSJ: "",
        DWBM: "",
        S_OrgCode: this.$store.state.user.orgCode,
        FYXM: "",
        XMBH: "",
        BXSY: "",
        BXJEDX: "",
        BXJE: 0,
        YJKJE: "",
        XFKJE: "",
        FKFS: "",
        FJZS: "",
        SKDW: "",
        KHH: "",
        YHZH: "",
        CJR: this.$store.state.user.userId
      },
      treeData: [],
      listQuery: {
        limit: 10,
        page: 1,
        XMBH: "",
        XMMC: "",
        type: 1,
        userid: ""
      },
      list: [],
      innerVisible: false,
      normalizer(node) {
        return {
          id: node.orgCode,
          label: node.orgShortName,
          children: node.children
        };
      },
      selectOptions: [
        {
          value: 0,
          label: "日常管理"
        },
        {
          value: 1,
          label: "项目报销"
        },
        {
          value: 2,
          label: "差旅费报销"
        }
      ],
      radio: "",
      selected: {},
      editVisible: false,
      dialogStatus: "",
      total: 0,
      listLoading: false,
      SFCW: 0,
      TZHJHZJE: 0, //计划成本调整后总金额
      YBXJE: 0, //项目中已报销金额
      infiledList: [],
      rules: {
        BXJE: [{ required: true, message: " ", trigger: "change" }],
        FYXM: [{ required: true, message: " ", trigger: "change" }],
        BXSY: [{ required: true, message: " ", trigger: "change" }],
        BXJE: [{ required: true, message: " ", trigger: "change" }]
      }
    };
  },

  methods: {
    // printPdf() {
    //   let LODOP = getLodop();
    //   LODOP.PRINT_INIT("费用报销单");
    //   LODOP.SET_PRINT_STYLE("FontSize", 18);
    //   LODOP.SET_PRINT_STYLE("Bold", 1);
    //   // LODOP.ADD_PRINT_TEXT(50, 300, 260, 39, "费用报销单");
    //   LODOP.ADD_PRINT_HTM(
    //     88,
    //     200,
    //     350,
    //     600,
    //     document.getElementById("form1").innerHTML
    //   );
    //   LODOP.PREVIEW();
    // },
    oninput(e) {
      // 通过正则过滤小数点后两位
      if (!/^(([0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(e)) {
        this.temp.BXJE = "";
      } else {
        this.temp.BXJEDX = CapitalChinese(e);
      }
    },
    validataYJK(e) {
      // 通过正则过滤小数点后两位
      if (!/^(([0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(e)) {
        this.temp.YJKJE = "";
      }
    },
    validataXFK(e) {
      // 通过正则过滤小数点后两位
      if (!/^(([0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(e)) {
        this.temp.XFKJE = "";
      }
    },
    GetFKFSOpions() {
      let temp = {
        ParentCode: "FKFS"
      };
      GetOpions(temp).then(response => {
        if (response.data.code === 2000) {
          this.FKFSOptions = response.data.items;
        }
      });
    },
    showRow(row) {
      //赋值给radio
      this.radio = this.list.indexOf(row);
      this.selected = row;
      this.temp.FYXM = row.XMMC;
      this.temp.XMBH = row.XMBH;
      this.SFCW = row.SFCW; //是否财务下达
      this.TZHJHZJE = row.TZHJHZJE; //计划成本调整后总金额
      this.YBXJE = row.YBXJE; //项目中已报销金额
      this.innerVisible = false;
    },
    getnode(node, instanceId) {
      this.temp.DWBM = node.orgName;
    },
    getOrgDate() {
      // 查询组织结构数据this.treeListQuery
      fetchOrgList().then(response => {
        if (response.data.code === 2000) {
          this.treeData = [];
          this.treeData = response.data.items;
        } else {
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
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        if (parentNode.children == null) {
          parentNode.children = undefined;
          callback();
        }
      }
    },
    resetTemp() {
      this.temp = {
        BXDH: "",
        SQSJ: "",
        DWBM: "",
        S_OrgCode: this.$store.state.user.orgCode,
        FYXM: "",
        XMBH: "",
        BXSY: "",
        BXJEDX: "",
        BXJE: "",
        YJKJE: "",
        XFKJE: "",
        FKFS: "",
        FJZS: "",
        SKDW: "",
        KHH: "",
        YHZH: "",
        CJR: this.$store.state.user.userId
      };
    },
    closetab() {
      //   window.opener = null;
      // window.open("", "_top").close();
      this.$store.dispatch("delVisitedViews", this.$route);
      this.$router.go(-1);
      // this.$router.push({
      //   path: "/jingying/CBZCGL/FYBX"
      // });
    },

    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    getXMList() {
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
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getXMList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getXMList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getXMList();
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
    handleJE(e) {
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null;
    },
    createData() {
      // // 创建
      if (this.temp.FYXM == "") {
        this.$notify({
          position: "bottom-right",
          title: "提示",
          message: "请选择费用项目",
          type: "warning",
          duration: 3000
        });
        return false;
      }
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.SFCW != 1) {
            if (this.temp.BXJE > this.TZHJHZJE - this.YBXJE) {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message:
                  "您选的项目是生产计划项目，报销金额不能超过项目剩余报销金额：" +
                  (this.TZHJHZJE - this.YBXJE),
                type: "warning",
                duration: 3000
              });
              return false;
            }
          }
          CreateInfo(this.temp).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: "保存成功",
                type: response.data.message,
                duration: 3000
              });
              // this.getList();
              // this.editVisible = false;
              this.closetab();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: "保存失败:" + response.data.message,
                type: "warning",
                duration: 3000
              });
              this.closetab();
            }
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.SFCW != 1) {
            //如果是财务下达的项目金额才可以超
            if (this.temp.BXJE > this.TZHJHZJE - this.YBXJE) {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message:
                  "您选的项目是生产计划项目，报销金额不能超过项目剩余报销金额：" +
                  (this.TZHJHZJE - this.YBXJE),
                type: "warning",
                duration: 3000
              });
              return false;
            }
          }
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          //   tempData.S_UpdateBy = this.$store.state.user.userId;
          //   //tempData.NOTICE_CONTENT=this.content
          UpdateInfo(tempData).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: "保存成功",
                type: response.data.message,
                duration: 3000
              });
              this.closetab();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: "保存失败:" + response.data.message,
                type: "warning",
                duration: 3000
              });
            }
          });
        }
      });
    },
    saveAndSend() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.CJR = this.$store.state.user.userId;
          CreateInfo(this.temp).then(response => {
            if (response.data.code === 2000) {
              if (response.data.code === 2000) {
                let BXDH = response.data.BXDH;
                let fd = new FormData();
                fd.append("systemcode", "localhost");
                fd.append("stepid", "");
                fd.append("flowid", "0273B9EF-9903-4C29-8F1C-E3CF04A00FB7");
                fd.append("taskid", "");
                fd.append("instanceid", BXDH);
                fd.append("senderid", this.$store.state.user.userId);
                fd.append("tasktitle", BXDH + "费用报销审批");
                fd.append("comment", "");
                fd.append("type", "submit");
                fd.append("isFreeSend", false);
                fd.append("formtype", 1);
                sendFlow(fd).then(repon => {
                  if (repon.data.code === 2000) {
                    this.$notify({
                      position: "bottom-right",
                      title: "成功！",
                      message: "发起流程成功",
                      type: "success",
                      duration: 2000
                    });
                    this.closetab();
                  } else {
                    this.$notify({
                      position: "bottom-right",
                      title: "失败！",
                      message: "发起流程失败！",
                      type: "warning",
                      duration: 2000
                    });
                  }
                });
              } else {
                this.$notify({
                  position: "bottom-right",
                  title: "保存流程失败",
                  message: response.data.message,
                  type: "warning",
                  duration: 3000
                });
              }
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: response.data.message,
                type: "warning",
                duration: 3000
              });
              this.closetab();
            }
          });
        }
      });
    }
  },
  mounted() {
    //console.log(this.$store.state.user.orgName);
    //  console.log(this.$refs.orgtree.offsetWidth);
  },
  created() {
    // this.listLoading = false;
    //this.temp = this.$route.query.row;

    this.getOrgDate();
    this.GetFKFSOpions();
    this.getXMList();
    if (this.$route.query.type == "create") {
      this.temp.SQSJ = new Date(Date.now());
      this.temp.S_OrgCode = this.$store.state.user.orgCode;
      this.temp.DWBM = this.$store.state.user.orgName;
    } else {
      this.temp = Object.assign({}, this.$route.query.row); // copy obj
      this.SFCW = this.$route.query.row.SFCW; //如果是财务下达的项目金额才可以超
      this.TZHJHZJE = this.$route.query.row.TZHJHZJE; //成本计划调整后总金额
      this.YBXJE = this.$route.query.row.YBXJE; //项目已报销金额
    }
  }
};
</script>



<style lang="scss">
.topSearh {
  margin-bottom: 15px;
}
.page {
  text-align: center;
}
.vue-treeselect__control {
  height: 28px !important;
  width: 100%;
}
.vue-treeselect__placeholder,
.vue-treeselect__single-value {
  line-height: 28px;
}
.vue-treeselect--single .vue-treeselect__input-container {
  height: 28px;
  width: 100%;
}
#FYBXEDIT .table-d table {
  font-size: 16px;
  // background: #000;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}
#FYBXEDIT .table-d table td {
  // background: #fff;
  text-align: right;
  border: 1px solid #a8aeb2;
  padding: 5px 10px;
}
#FYBXEDIT .el-form-item {
  margin-bottom: 0px;
}
#FYBXEDIT /deep/.el-form-item__content {
  margin-left: 0px !important;
}
</style>


