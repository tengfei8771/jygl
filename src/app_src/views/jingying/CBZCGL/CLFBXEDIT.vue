<template>
  <div id="SWKC" class="app-container calendar-list-container">
    <el-card class="table-d">
      <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
        <el-button type="primary" size="mini" @click="addRow">增加行程</el-button>
        <!-- <el-row>
            <el-col :span="12">
             <el-form-item label="报销时间" prop="SQSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="temp.SQSJ"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报销单号" prop="BXDH">
                <el-input v-model="temp.BXDH"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请单位" prop="SQBM">
                <el-input v-model="temp.SQBM"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出差人" prop="CCR">
                <el-input v-model="temp.CCR"></el-input>
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
              ></el-date-picker>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="报销金额" prop="BXJE">
                <el-input v-model="temp.BXJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额大写" prop="BXJEDX">
                <el-input v-model="temp.BXJEDX"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="出差事由" prop="BXSY">
                <el-input v-model="temp.BXSY" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预借差旅费" prop="YJCLF">
                <el-input v-model="temp.YJCLF"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应退补金额" prop="YTBJE">
                <el-input v-model="temp.YTBJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
    <el-row>
                 <el-col :span="24">
    <el-form :model="inServForm" ref="inServForm" label-width="130px" size="mini" highlight-current-row border >
      <el-form-item label="行程明细" prop="servin">
        <el-button type="primary" @click="addRow(infiledList)">新增</el-button>

        <el-table :data="infiledList" size="mini"  highlight-current-row border  style="width: 100%" >
          <el-table-column prop="fildna" label="出发地" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.fildna"></el-input>
            </template>
          </el-table-column>
           <el-table-column prop="fildna" label="目的地" >
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
          <el-table-column fixed="right" label="操作">
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
        </el-row>-->
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
              <td :colspan="4">
                <el-select style="width:100%" placeholder="请选择部门" v-model="temp.DWBM"></el-select>
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
              <td :colspan="4">
                <el-date-picker
                  style="width:100%"
                  v-model="temp.CCJSSJ"
                  @change="EndTime"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </td>
              <td colspan="1">出差天数</td>
              <td colspan="5">共{{temp.CCTS}}天</td>
            </tr>
            <tr>
              <td :rowspan="2">出发地点</td>
              <td :colspan="6">乘车船、飞机起止时间</td>
              <td :rowspan="2">到达地点</td>
              <td :colspan="4">出勤补助</td>
              <td :colspan="4">硬座、火车补助</td>
              <td :colspan="2">车船飞机费</td>
              <td :colspan="1">杂费</td>
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
                <el-date-picker v-model="item.CFRQ" style="max-width:140px;"></el-date-picker>
              </td>
              <td :colspan="3">
                <el-date-picker v-model="item.DDRQ" style="max-width:140px;"></el-date-picker>
              </td>
              <td>
                <el-input v-model="item.CCDD"></el-input>
              </td>
              <td>
                <el-input v-model="item.CQTS" @change="getTotal"></el-input>
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
            </tr>
            <!-- <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            -->
            <!-- <tr>
              <td :colspan="5"></td>
              <td>合计</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>-->
            <tr>
              <td :colspan="2">总计（大写）</td>
              <td :colspan="6">
                {{temp.HJDX}}
              </td>
              <td :colspan="2">￥(小写)</td>
              <td :colspan="3">{{temp.HJJE}}</td>
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
              <td :colspan="3">
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
        <el-button type="primary" @click="createData">保存</el-button>
        <el-button type="success">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetInfo, CreateInfo } from "@/app_src/api/jygl/CLFBX";
export default {
  name: "SWKC",
  data() {
    return {
      infiledList: [],
      fildtps: [{ text: "火车", value: "1" }, { text: "汽车", value: "2" }],
      textMap: {
        update: "修改差旅费用报销",
        create: "添加差旅费用报销"
      },
      pickerOptions: {},
      temp: {
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
        CJSJ: "",
        BJSJ: "",
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
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      ZE:0,
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
    StarTime() {
      this.pickerOptions = {
        disabledDate: time => {
          return time.getTime() < this.temp.CCKSSJ;
        }
      };
    },
    EndTime() {
      this.temp.CCTS = (this.temp.CCJSSJ - this.temp.CCKSSJ) / 86400000;
    },
    addRow() {
      let obj = {
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
        HCFY: "",
        FCLB: "",
        FCXB: "",
        FCJE: 0,
        ZFLB: "",
        ZFJE: 0
      };
      this.temp.XCList.push(obj);
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
        CJSJ: "",
        BJSJ: "",
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
    handleDelete(row) {
      this.$confirm("待实现!", "提示", {
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
    closetab() {
      //   window.opener = null;
      // window.open("", "_top").close();
      this.$store.dispatch("delVisitedViews", this.$route);
      this.$router.go(-1);
    },
    createData() {
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          CreateInfo(this.temp).then(response => {
            if (response.data.code === 2000) {
            }
          });
        }
        this.closetab();
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
        this.closetab();
      });
    },
    getTotal() {
      let data = this.temp.XCList;
      let total=0;
      data.forEach(item => {
        total+=(parseFloat(item.CQTS)*parseFloat(item.CQBZ)+parseFloat(item.BZJE)+parseFloat(item.HCFY)+parseFloat(item.FCJE)+parseFloat(item.ZFJE));
        //console.log(parseFloat(item.CQTS)*parseFloat(item.CQBZ)+parseFloat(item.BZJE)+parseFloat(item.HCFY)+parseFloat(item.FCJE)+parseFloat(item.ZFJE))
        this.temp.HJJE=total;
        this.CapitalChinese(total);
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
        console.log(intNum);
        console.log(PointNum);
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
        heightStr += "万";
        for (let i = 0; i < str2.length; i++) {
          if (str2[i] == "0" && i < str2.length - 1) {
            if (str2[i + 1] == "0") {
              continue;
            }
          } else {
            lowStr += map.get(str2[i]);
            if (str2 - 2 - i >= 0) {
              if (str2[i] != "0") {
                lowStr += Unit[str2.length - 2 - i];
              }
            }
          }
        }
        console.log(lowStr + "qqqq");
        if (lowStr.endsWith("零")) {
          lowStr = lowStr.substring(0, lowStr.length - 1);
        }
        if (
          lowStr.startsWith("零") &&
          !(
            ChineseStr.endsWith("万") ||
            ChineseStr.endsWith("仟") ||
            ChineseStr.endsWith("佰")
          )
        ) {
          lowStr = lowStr.substring(1, lowStr.length);
        }
        ChineseStr = heightStr + lowStr;
        console.log(ChineseStr);
      }
      if (PointNum != "0") {
        let pointStr = "";
        
        PointNum = PointNum.substring(0, 2);
        console.log(PointNum);
        for (let i = 0; i < PointNum.length; i++) {
          if (PointNum[i] != "0") {
            pointStr += map.get(PointNum[i]) + Unit[6 + i];
          } else {
            continue;
          }
        }
        console.log(pointStr)
        if (
          ChineseStr.endsWith("万") ||
          ChineseStr.endsWith("仟") ||
          ChineseStr.endsWith("佰")
        ) {
          ChineseStr += "圆零" + pointStr;
        }
        else{
          ChineseStr += "圆" + pointStr;
        }
      } else {
        ChineseStr += "圆整";
      }
      this.temp.HJDX=ChineseStr;
    }
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


