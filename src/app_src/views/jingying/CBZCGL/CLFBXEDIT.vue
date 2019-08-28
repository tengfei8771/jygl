<template>
  <div id="SWKC" class="app-container calendar-list-container">
      <el-card class="table-d">
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
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
                    </el-row> -->
    <table width="100%" border="0" cellspacing="1" cellpadding="0">
          <caption>
            中国石油大港油田公司
            <br>差旅费报销单
          </caption>
          <tbody>
            <tr>
            <td :colspan="2">出差人员姓名</td>
            <td :colspan="3">张三</td>
            <td :rowspan="2">起止日期</td>
            <td>2019-05-12</td>
            <td></td>
            <td></td>
            <td></td>
            <td :colspan="6" :rowspan="2">共3天</td>
            </tr>
            <tr>
            <td :colspan="2">出差事由</td>
            <td :colspan="3">联通学习</td>
            <td>2019-05-12</td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            <tr>
              <td :colspan="4">乘车船、飞机起止时间</td>
              <td :rowspan="2">起止地点</td>
              <td :colspan="3">出勤补助</td>
              <td :colspan="3">硬座、火车补助</td>
              <td :colspan="3">车船飞机费</td>
              <td :colspan="2">杂费</td>
            </tr>
            <tr>
              <td>月日</td>
              <td>时间</td>
              <td>月日</td>
              <td>时间</td>
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
              <td :colspan="5">合计</td>
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
              <td :colspan="2"> 总计（大写）</td>
              <td :colspan="5"> 贰佰元整</td>
              <td>￥(小写)</td>
              <td :colspan="4">200</td>
              <td :colspan="2">预借差旅费</td>
              <td :colspan="2"></td>
            </tr>
            <tr>
              <td :colspan="2">备注</td>
              <td :colspan="3"></td>
              <td :colspan="2">刷卡人姓名</td>
              <td :colspan="5"></td>
              <td :colspan="2">应交回（补付）金额</td>
              <td :colspan="2"></td>
            </tr>
          </tbody>
        </table>
        </el-form>
        <div style="text-align:center;margin-top:20px;">
          <el-button @click="closetab">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
                              <el-button type="success">提交</el-button>
        </div>
      </el-card>
  </div>
</template>

<script>
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
          YTBJE: 0,
          CHECK_STATE:1
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      fac: [
        {
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
          YTBJE: 0,
          CHECK_STATE:0
        },
        {
          BXDH: "GY01JL9.01-22",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          CCR: "王五",
          CCKSSJ: "2019-5-9",
          CCJSSJ: "219-5-10",
          CCSY: "系统运维",
          CCTS: 3,
          BXJE: 200,
          BXJEDX: "贰佰元",
          YJCLF: 0,
          YTBJE: 0,
          CHECK_STATE:2
        },
        {
          BXDH: "GY03JL9.10-08",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          CCR: "赵六",
          CCKSSJ: "2019-5-9",
          CCJSSJ: "219-5-10",
          CCSY: "商务接待",
          CCTS: 3,
          BXJE: 200,
          BXJEDX: "贰佰元",
          YJCLF: 0,
          YTBJE: 0,
          CHECK_STATE:0
        },
        {
          BXDH: "GY02JL9.12-05",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          CCR: "李雷",
          CCKSSJ: "2019-5-9",
          CCJSSJ: "219-5-10",
          CCSY: "程序开发",
          CCTS: 3,
          BXJE: 200,
          BXJEDX: "贰佰元",
          YJCLF: 0,
          YTBJE: 0,
          CHECK_STATE:1
        }
      ]
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
    closetab()
{

//   window.opener = null;
// window.open("", "_top").close();
this.$store.dispatch('delVisitedViews', this.$route);
  this.$router.go(-1); 
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
  }
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
  text-align: right;
  border:2px solid #a8aeb2;
  padding: 5px 10px;
}
</style>


