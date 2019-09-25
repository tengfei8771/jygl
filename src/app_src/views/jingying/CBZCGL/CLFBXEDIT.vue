<template>
  <div id="SWKC" class="app-container calendar-list-container">
    <el-card class="table-d">
      <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
        <el-button type="primary" size="mini" @click="addRow">增加行程</el-button>
        <table width="100%" border="0" cellspacing="0.5" cellpadding="0">
          <caption>
            中国石油大港油田公司
            <br />差旅费报销单
          </caption>
          <tbody>
            <tr>
              <td :colspan="2">出差人员姓名</td>
              <td :colspan="5">
                <el-input v-model="temp.CCXM"></el-input>
              </td>
              <td :colspan="2">部门</td>
              <td :colspan="5">
                <treeselect
                  v-model="temp.DWBM"
                  :multiple="false"
                  :options="treeData"
                  :load-options="loadOptions"
                  placeholder="请选择部门"
                  :normalizer="normalizer"
                  :disable-branch-nodes="false"
                  noResultsText="未搜索到结果"
                  noChildrenText=" "
                  style="font-size:14px;width:410px;"
                  :clearable="true"
                  @select="getnode"
                  size="mini"
                />
              </td>
              <td :colspan="1">出差原因</td>
              <td :colspan="5">
                <el-input v-model="temp.CCSY"></el-input>
              </td>
            </tr>
            <tr>
              <td :rowspan="1" colspan="2">开始日期</td>
              <td :colspan="5">
                <el-date-picker style="width:100%" v-model="temp.CCKSSJ" @change="StarTime"></el-date-picker>
              </td>
              <td :rowspan="1" colspan="2 ">结束日期</td>
              <td :colspan="5">
                <el-date-picker
                  style="width:100%"
                  v-model="temp.CCJSSJ"
                  @change="EndTime"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </td>
              <td colspan="1">出差天数</td>
              <td colspan="1">共{{temp.CCTS}}天</td>
              <td colspan="1">所属项目</td>
              <td colspan="2">{{temp.XMMC}}</td>
              <td colspan="1">
                <el-button type="primary" size="mini" @click="innerVisible=true">项目</el-button>
              </td>
            </tr>
            <tr>
              <td :rowspan="2">出发地点</td>
              <td :colspan="6">乘车船、飞机起止时间</td>
              <td :rowspan="2">到达地点</td>
              <td :colspan="3">出勤补助</td>
              <td :colspan="3">硬座、火车补助</td>
              <td :colspan="3">车船飞机费</td>
              <td :colspan="2">杂费</td>
              <td :colspan="1" :rowspan="2">操作</td>
            </tr>
            <tr>
              <td :colspan="3">出发日期</td>
              <td :colspan="3">结束日期</td>
              <td>天数</td>
              <td>标准</td>
              <td>金额</td>
              <td>%</td>
              <td>天数</td>
              <td>金额</td>
              <td>类别</td>
              <td>席别</td>
              <td>金额</td>
              <td>费别</td>
              <td>金额</td>
            </tr>
            <tr v-for="(item,key) in temp.XCList" :key="key">
              <td>
                <el-input v-model="item.CFDD"></el-input>
              </td>
              <td :colspan="3">
                <el-date-picker
                  v-model="item.CFRQ"
                  style="max-width:140px;"
                  type="datetime"
                  @change="startTime1(key)"
                ></el-date-picker>
              </td>
              <td :colspan="3">
                <el-date-picker
                  v-model="item.DDRQ"
                  style="max-width:140px;"
                  type="datetime"
                  @change="endTime1(key)"
                  :picker-options="pickerOptionsList[key]"
                ></el-date-picker>
              </td>
              <td>
                <el-input v-model="item.CCDD"></el-input>
              </td>
              <td>
                <el-input v-model="item.CQTS" @change="getTotal" disabled></el-input>
              </td>
              <td>
                <el-input v-model="item.CQBZ" @change="getTotal"></el-input>
              </td>
              <td>
                <el-input v-model="item.BZJE" @change="getTotal"></el-input>
              </td>
              <td>
                <el-input v-model="item.BFB"></el-input>
              </td>
              <td>
                <el-input v-model="item.TS"></el-input>
              </td>
              <td>
                <el-input v-model="item.HCFY" @change="getTotal"></el-input>
              </td>
              <td>
                <el-input v-model="item.FCLB"></el-input>
              </td>
              <td>
                <el-input v-model="item.FCXB"></el-input>
              </td>
              <td>
                <el-input v-model="item.FCJE" @change="getTotal"></el-input>
              </td>
              <td>
                <el-input v-model="item.ZFLB"></el-input>
              </td>
              <td>
                <el-input v-model="item.ZFJE" @change="getTotal"></el-input>
              </td>
              <td>
                <!-- <el-button type="primary" size="mini" @click="deleteRow(key,item)">移除</el-button> -->
                <el-button type="danger" size="mini" @click="handleDelete(item)" v-if="item.XCID">删除</el-button>
                <el-button
                  type="warning"
                  size="mini"
          
                  @click="delRow(item)"
                  v-else-if="!item.XCID"
                >移除</el-button>
              </td>
            </tr>
            <tr>
              <td :colspan="2">总计（大写）</td>
              <td :colspan="6">{{temp.HJDX}}</td>
              <td :colspan="2">￥(小写)</td>
              <!-- <td :colspan="3">{{temp.HJJE}}</td> -->
              <td :colspan="4">{{temp.HJJE}}</td>
              <td :colspan="2">预借差旅费</td>
              <td :colspan="4">
                <el-input v-model="temp.YJCLF"></el-input>
              </td>
            </tr>
            <tr>
              <td :colspan="2">备注</td>
              <td :colspan="6">
                <el-input v-model="temp.REMARK"></el-input>
              </td>
              <td :colspan="2">刷卡人姓名</td>
              <td :colspan="4">
                <el-input v-model="temp.SKRXM"></el-input>
              </td>
              <td :colspan="2">应交回（补付）金额</td>
              <td :colspan="4">
                <el-input v-model="temp.YTBJE"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="closetab">取消</el-button>
        <el-button type="primary" @click="createData" v-if="PageFlag===0">保存</el-button>
        <el-button type="primary" @click="UpdateData" v-if="PageFlag===1">保存</el-button>
        <el-button type="success" @click="saveAndSend">提交</el-button>
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
        @row-click="showRow"
        :data="list"
        size="mini"
        :header-cell-class-name="tableRowClassName"
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
import {
  GetCLXCInfo,
  UpdateInfo,
  DeleteXCInfo,
  CreateInfo
} from "@/app_src/api/jygl/CLFBX";
import { CapitalChinese } from "@/frame_src/utils/index";
import { sendFlow } from "@/app_src/api/jygl/WorkFlow";
import { UpdateAddCBJHJE, UpdateDesCBJHJE } from "@/app_src/api/jygl/CBJHSQ";
import { fetchOrgList } from "@/frame_src/api/org";
import { GetInfo } from "@/app_src/api/jygl/CBJHSQ";
import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "SWKC",
  components: {
    Treeselect
  },
  data() {
    return {
      list: [],
      infiledList: [],
      treeData: [],
      total: 0,
      innerVisible: false,
      fildtps: [{ text: "火车", value: "1" }, { text: "汽车", value: "2" }],
      textMap: {
        update: "修改差旅费用报销",
        create: "添加差旅费用报销"
      },
      listQuery: {
        limit: 10,
        page: 1,
        XMBH: "",
        XMMC: "",
        userid: this.$store.state.user.userId,
        type: 1
      },
      pickerOptions: {},
      pickerOptionsList: [],
      temp: {
        DWBM: null,
        CCXM: "",
        CCSY: "",
        CCKSSJ: "",
        CCJSSJ: "",
        CCTS: 0,
        DDRQ:"",
        HJJE: "",
        HJDX: "",
        YJCLF: "",
        YTBJE: "",
        REMARK: "",
        SKRXM: "",
        CJR: "",
        CJSJ: "",
        CJSJ: "",
        BJSJ: "",
        XMBH: "",
        XMMC: "",
        DWMC: "",
        userId: this.$store.state.user.userId,
        XCList: [
          {
            CFRQ: "",
            CFSJ: "",
            DDRQ: "",
            CFDD: "",
            CCDD: "",
            CQTS: 0,
            CQBZ: 0,
            BZJE: 0,
            BFB: "",
            TS: 0,
            HCFY: 0,
            FCLB: "",
            FCXB: "",
            FCJE: 0,
            ZFLB: "",
            ZFJE: 0
          }
        ]
      },
      normalizer(node) {
        return {
          id: node.orgCode,
          label: node.orgShortName,
          children: node.children
        };
      },
      editVisible: false,
      PageFlag: 0, //页面状态；0代表创建，1代表修改
      listloading: false,
      ZE: 0
    };
  },
  methods: {
    deleteRow(index, rows) {
      //删除改行
      this.temp.XCList.splice(index, 1);
    },
    addRow(tableData, event) {
      tableData.push({ fildna: "", fildtp: "", remark: "" });
    },
    StarTime() {
      this.pickerOptions = {
        disabledDate: time => {
          return time.getTime() < this.temp.CCKSSJ;
        }
      };
      this.EndTime();
    },
    EndTime() {
      if (this.temp.CCJSSJ != "" && this.temp.CCKSSJ != "") {
        this.temp.CCTS = (this.temp.CCJSSJ - this.temp.CCKSSJ) / 86400000 + 1;
      }
    },
    startTime1(index) {
      let pickerOptions = {
        disabledDate: time => {
          return time.getTime() < this.temp.XCList[index].CFRQ;
        }
      };
      this.pickerOptionsList.push(pickerOptions);
      this.endTime1(index);
    },
    endTime1(index) {
      if (
        this.temp.XCList[index].CFRQ != "" &&
        this.temp.XCList[index].DDRQ != ""
      ) {
        this.temp.XCList[index].CQTS =
          (this.temp.XCList[index].DDRQ - this.temp.XCList[index].CFRQ) /
            86400000 +
          1;
      }
    },
    addRow() {
     
      let obj = {
        CFRQ: "",
        CFSJ: "",
        CFDD: "",
        CCDD: "",
        DDRQ:"",
        CQTS: 0,
        CQBZ: 0,
        BZJE: 0,
        BFB: "",
        TS: 0,
        HCFY: 0,
        FCLB: "",
        FCXB: "",
        FCJE: 0,
        ZFLB: "",
        ZFJE: 0
      };
      this.temp.XCList.push(obj);
    },
    delRow(item) {
      if(this.temp.XCList.length===1){
         this.$notify({
            position: "bottom-right",
            title: "提示",
            message: "必须有一条行程！",
            type: "warning",
            duration: 2000
          });
          return false;
      }
      let _index=this.temp.XCList.indexOf(item);
      this.temp.XCList.splice(_index, 1);
      this.pickerOptionsList.splice(_index, 1);
      this.getTotal();
    },
    showRow(row) {
      //赋值给radio
      this.radio = this.list.indexOf(row);
      this.selected = row;
      this.temp.XMMC = row.XMMC;
      this.temp.XMBH = row.XMBH;
      this.innerVisible = false;
    },
    getList() {
      if (this.$route.query.CLBH != null && this.$route.query.CLBH != "") {
        this.PageFlag = 1;
        let temp = {
          CLBH: this.$route.query.CLBH
        };
        GetCLXCInfo(temp).then(response => {
          if (response.data.code === 2000) {
            this.temp = response.data.items;
            this.temp.userId = this.$store.state.user.userId;
          }
        });
      }
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
    getnode(node, instanceId) {
      this.temp.DWMC = node.orgName;
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
    resetTemp() {
      this.temp = {
        DWBM: "",
        CCXM: "",
        CCSY: "",
        CCKSSJ: "",
        CCJSSJ: "",
        CCTS: 0,
        HJJE: "",
        HJDX: "",
        YJCLF: "",
        YTBJE: "",
        REMARK: "",
        SKRXM: "",
        CJR: "",
        CJSJ: "",
        DDRQ:"",
        CJSJ: "",
        BJSJ: "",
        userId: this.$store.state.user.userId,
        XMBH: "",
        XMMC: "",
        DWMC: "",
        XCList: [
          {
            CFRQ: "",
            CFSJ: "",
            DDRQ: "",
            CFDD: "",
            CCDD: "",
            CQTS: 0,
            CQBZ: 0,
            BZJE: 0,
            BFB: "",
            TS: 0,
            HCFY: 0,
            FCLB: "",
            FCXB: "",
            FCJE: 0,
            ZFLB: "",
            ZFJE: 0
          }
        ]
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(data) {
      this.$confirm("确认删除吗！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            XCID: data.XCID
          };
          DeleteXCInfo(temp).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: response.data.message,
                message: "删除行程成功！",
                type: "success",
                duration: 3000
              });
              this.temp.XCList.splice(
                this.temp.XCList.find(t => t.XCID === data.XCID),
                1
              );
            } else {
              this.$notify({
                position: "bottom-right",
                title: response.data.message,
                message: "删除失败！",
                type: "waring",
                duration: 3000
              });
            }
          });
        })
        .catch(() => {});
    },
    closetab() {
      this.$store.dispatch("delVisitedViews", this.$route);
      this.$router.go(-1);
    },
    UpdateData() {
      UpdateInfo(this.temp).then(response => {
        if (response.data.code === 2000) {
          this.$notify({
            position: "bottom-right",
            title: response.data.message,
            message: "操作成功，3秒后返回原界面",
            type: "success",
            duration: 3000
          });
          setTimeout(this.closetab, 3000);
        } else {
          this.$notify({
            position: "bottom-right",
            title: response.data.message,
            message: "操作失败",
            type: "warning",
            duration: 3000
          });
        }
      });
    },
    createData() {
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          CreateInfo(this.temp).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: response.data.message,
                message: "操作成功，3秒后返回原界面",
                type: "success",
                duration: 3000
              });
              setTimeout(this.closetab, 3000);
            } else {
              this.$notify({
                position: "bottom-right",
                title: response.data.message,
                message: "操作失败",
                type: "warning",
                duration: 3000
              });
            }
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
    saveAndSend() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          CreateInfo(this.temp).then(response => {
            if (response.data.code === 2000) {
              let CLBH = response.data.CLBH;
              let fd = new FormData();
              fd.append("systemcode", "localhost");
              fd.append("stepid", "");
              fd.append("flowid", "ABC11A11-EFF2-4588-8FAE-0EE8687874E1");
              fd.append("taskid", "");
              fd.append("instanceid", CLBH);
              fd.append("senderid", this.$store.state.user.userId);
              fd.append("tasktitle", CLBH + "差旅报销审批");
              fd.append("comment", "");
              fd.append("type", "submit");
              fd.append("isFreeSend", false);
              fd.append("formtype", 2);
              sendFlow(fd).then(repon => {
                if (repon.data.code === 2000) {
                  let bxtemp = {
                    BXJE: this.temp.HJJE,
                    XMBH: this.temp.XMBH
                  };
                  UpdateAddCBJHJE(bxtemp).then(res => {
                    if (res.data.code === 2000) {
                      this.$notify({
                        position: "bottom-right",
                        title: "成功！",
                        message: "发起流程成功",
                        type: "success",
                        duration: 2000
                      });
                      setTimeout(this.closetab, 3000);
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
                    title: "失败！",
                    message: "提交流程失败！",
                    type: "warning",
                    duration: 2000
                  });
                }
              });
            } else {
              this.$notify({
                position: "bottom-right",
                title: response.data.message,
                message: "保存表单失败",
                type: "warning",
                duration: 3000
              });
            }
          });
        }
      });
    },
    getTotal() {
      let data = this.temp.XCList;
      let total = 0;
      let DXJE = "";
      data.forEach(item => {
        total +=
          parseFloat(item.CQTS) * parseFloat(item.CQBZ) +
          parseFloat(item.BZJE) +
          parseFloat(item.HCFY) +
          parseFloat(item.FCJE) +
          parseFloat(item.ZFJE);
        this.temp.HJJE = total;
        this.temp.HJDX = CapitalChinese(total);
        //this.CapitalChinese(total);
      });
    },
    CapitalChinese(data) {
      const Unit = ["拾", "佰", "仟", "万", "亿", "圆", "角", "分"];
      const map = new Map([
        ["0", "零"],
        ["1", "壹"],
        ["2", "贰"],
        ["3", "叁"],
        ["4", "肆"],
        ["5", "伍"],
        ["6", "陆"],
        ["7", "柒"],
        ["8", "捌"],
        ["9", "玖"]
      ]);
      let ChineseStr = "";
      let val = data.toString();
      let reg = /^[-|+]?\d+/;
      if (reg.test(val)) {
        let arr = [...val];
        let PointIndex = arr.findIndex((value, index, arr) => {
          return value === ".";
        });
        let intNum = 0;
        let PointNum = "0";
        if (PointIndex === -1) {
          intNum = val;
        } else {
          intNum = val.substring(0, PointIndex);
          PointNum = val.substring(PointIndex + 1, val.length);
        }
        let Strlen = intNum.length;
        if (Strlen < 6) {
          for (let i = 0; i < Strlen; i++) {
            if (ChineseStr[ChineseStr.length - 1] == "零" && intNum[i] == "0") {
              continue;
            }
            ChineseStr += map.get(intNum[i]);
            if (Strlen - 2 - i >= 0) {
              if (intNum[i] != "0") {
                ChineseStr += Unit[Strlen - 2 - i];
              }
            }
          }
          if (ChineseStr.endsWith("零")) {
            ChineseStr = ChineseStr.substring(0, ChineseStr.length - 1);
          }
        }
        if (Strlen >= 6) {
          let str1 = intNum.substring(0, intNum.length - 4);
          let str2 = intNum.substring(intNum.length - 4, intNum.length);
          let heightStr = "";
          let lowStr = "";
          for (let i = 0; i < str1.length; i++) {
            heightStr += map.get(str1[i]);
            if (str1.length - i - 2 >= 0) {
              if (str1[i] != "0") {
                heightStr += Unit[str1.length - 2 - i];
              }
            }
          }
          if (heightStr.endsWith("零")) {
            heightStr = heightStr.substring(0, heightStr.length - 1);
          }
          if (heightStr.endsWith("拾") || str2.startsWith("0")) {
            heightStr += "万零";
          } else {
            heightStr += "万";
          }
          for (let i = 0; i < str2.length; i++) {
            if (lowStr[lowStr.length - 1] == "零" && str2[i] == "0") {
              continue;
            }
            lowStr += map.get(str2[i]);
            if (str2.length - 2 - i >= 0) {
              if (str2[i] != "0") {
                lowStr += Unit[str2.length - 2 - i];
              }
            }
            // if (str2[i] == "0" && i < str2.length - 1) {
            //   if (str2[i + 1] == "0") {
            //     continue;
            //   }
            // } else {
            //   lowStr += map.get(str2[i]);
            //   if (str2.length- 2 - i >= 0) {
            //     if (str2[i] != "0") {
            //       lowStr += Unit[str2.length - 2 - i];
            //     }
            //   }
            // }
          }
          if (lowStr.endsWith("零")) {
            lowStr = lowStr.substring(0, lowStr.length - 1);
          }
          if (lowStr.startsWith("零")) {
            lowStr = lowStr.substring(1, lowStr.length);
          }
          ChineseStr = heightStr + lowStr;
        }
        if (PointNum != "0") {
          let pointStr = "";

          PointNum = PointNum.substring(0, 2);
          for (let i = 0; i < PointNum.length; i++) {
            if (PointNum[i] != "0") {
              pointStr += map.get(PointNum[i]) + Unit[6 + i];
            } else {
              continue;
            }
          }
          if (
            ChineseStr.endsWith("万") ||
            ChineseStr.endsWith("仟") ||
            ChineseStr.endsWith("佰")
          ) {
            ChineseStr += "圆零" + pointStr;
          } else {
            ChineseStr += "圆" + pointStr;
          }
        } else {
          if (ChineseStr == "") {
            ChineseStr += "零圆整";
          } else {
            ChineseStr += "圆整";
          }
        }
        this.temp.HJDX = ChineseStr;
      }
    }
  },
  mounted() {
    this.getList();
    this.getOrgDate();
    this.getXMList();
  },
  watch: {}
};
</script>



<style lang="scss" scoped>
#SWKC .table-d table {
  font-size: 16px;
  // background: #000;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}
#SWKC .table-d table td {
  min-width: 80px;
  min-height: 50px;
  // background: #fff;
  //max-width:300px;
  text-align: right;
  border: 2px solid #a8aeb2;
  padding: 5px 10px;
}
</style>


