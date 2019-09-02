<template>
  <div id="FYBXEDIT" class="app-container calendar-list-container">
  
    <el-card class="table-d">

      <el-form ref="dataForm" id="dataForm" :model="temp" label-width="120px" style="width: 99%;">
                <form id="form1">
   <!-- <table border="1" width="300" id="tb01" bgcolor="#CCFFCC" style="border:solid 1px black;border-collapse:collapse"><tr><td width="133" id="mtb001">
    <font face="黑体" color="#FF0000" size="3"><u> 《表单一》 </u></font></td></tr></table>
   <table border="1" width="300" height="106" cellspacing="0" bgcolor="#CCFFFF" style="border-collapse:collapse;table-layout:fixed;border:solid 1px black;"><tr>
    <td width="66" height="16" style="border:solid 1px black"><font color="#0000FF">A</font><font color="#0000FF">等</font></td>
    <td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">B</font><font color="#0000FF">等</font></td>
    <td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">C</font><font color="#0000FF">等</font></td></tr>
    <tr>
     <td width="66" height="16" style="border:solid 1px black">A<sub>01</sub></td>
     <td width="80" height="12" style="border:solid 1px black">中-001</td>
     <td width="51" height="12" style="border:solid 1px black">C1<sup>x</sup></td>
    </tr>
    <tr>
     <td width="66" height="16" style="border:solid 1px black">A<sub>02</sub>Φ</td>
     <td width="80" height="16" style="border:solid 1px black">日-スの</td>
     <td width="51" height="16" style="border:solid 1px black"><font face='Vernada'>7㎥</font></td>
    </tr>
    <tr><td width="66" height="16" style="border:solid 1px black;overflow:hidden">A<sub>03</sub><nobr>{{temp.BXSY}}</nobr>
    </td><td width="80" height="16" style="border:solid 1px black;overflow:hidden">韩-안녕</td><td width="51" height="16">C3<sup>x</sup>
    </td></tr> </table> -->
      <table width="100%" border="0" cellspacing="1" cellpadding="0">
          <caption>
            中国石油大港油田公司
            <br />费用报销
          </caption>
          <tbody>
            <tr>
              <td>单位部门</td>
              <td>
         
              </td>
              <td>费用项目</td>
              <td>
                
              </td>
            </tr>
            <tr>
              <td>报销事由</td>
              <td :colspan="3">
                
              </td>
            </tr>
            <tr>
              <td>报销金额大写</td>
              <td>
                
              </td>
              <td>报销金额小写</td>
              <td>
               
              </td>
            </tr>
            <tr>
              <td>原借款金额（小写）</td>
              <td>
             
              </td>
              <td>现付款（收回）金额（小写）</td>
              <td>
               {{temp.XFKJE}}
              </td>
            </tr>
            <tr>
              <td>付款方式</td>
              <td>

              </td>
              <td>附件张数</td>
              <td>
                {{temp.FJZS}}
              </td>
            </tr>
            <tr>
              <td>收款单位名称</td>
              <td>
               
              </td>
              <td>开户行</td>
              <td>
                
              </td>
            </tr>
            <tr>
              <td>账号</td>
              <td>
              
              </td>
              <td>申请时间</td>
              <td>
                
              </td>
            </tr>
          </tbody>
        </table>
  </form>
        <table width="100%" border="0" cellspacing="1" cellpadding="0">
          <caption>
            中国石油大港油田公司
            <br />费用报销
          </caption>
          <tbody>
            <tr>
              <td>单位部门</td>
              <td>
                <el-input v-model="temp.DWBM"></el-input>
              </td>
              <td>费用项目</td>
              <td>
                <el-select size="mini" style="width:100%;" v-model="temp.FYXM">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>报销事由</td>
              <td :colspan="3">
                <el-input v-model="temp.BXSY" type="textarea" :rows="3"></el-input>
              </td>
            </tr>
            <tr>
              <td>报销金额大写</td>
              <td>
                <el-input v-model="temp.BXJEDX"></el-input>
              </td>
              <td>报销金额小写</td>
              <td>
                <el-input v-model="temp.BXJE"></el-input>
              </td>
            </tr>
            <tr>
              <td>原借款金额（小写）</td>
              <td>
                <el-input v-model="temp.YJKJE"></el-input>
              </td>
              <td>现付款（收回）金额（小写）</td>
              <td>
                <el-input v-model="temp.XFKJE"></el-input>
              </td>
            </tr>
            <tr>
              <td>付款方式</td>
              <td>
                <el-input v-model="temp.FKFS"></el-input>
              </td>
              <td>附件张数</td>
              <td>
                <el-input v-model="temp.FJZS"></el-input>
              </td>
            </tr>
            <tr>
              <td>收款单位名称</td>
              <td>
                <el-input v-model="temp.SKDW"></el-input>
              </td>
              <td>开户行</td>
              <td>
                <el-input v-model="temp.KHH"></el-input>
              </td>
            </tr>
            <tr>
              <td>账号</td>
              <td>
                <el-input v-model="temp.YHZH"></el-input>
              </td>
              <td>申请时间</td>
              <td>
                  <el-date-picker
                      type="date"
                      v-model="temp.SQSJ"
                      placeholder="申请时间"
                      size="mini"
                      style="width:100%;"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="closetab">取消</el-button>
        <el-button v-if="this.$route.query.type=='create'" type="primary" @click="createData">保存</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
        <el-button type="success">提交</el-button>
        <el-button  @click="printPdf" type="primary">打印</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getLodop } from "@/frame_src/utils/LodopFuncs";
import { getToken } from "@/frame_src/utils/auth";
import {
  GetInfo,
  CreateInfo,
  UpdateInfo,
  DeleteInfo,
  GetOpions
} from "@/app_src/api/jygl/FYBX";
export default {
  name: "FYBXEDIT",
  data() {
    return {
      temp: { CJR:this.$store.state.user.userId},
      // {
      //   BXDH: "GY01JL9.11-02",
      //   SQBM: "北京项目部",
      //   SQSJ: "219-05-31",
      //   FYXM: "房屋租赁费",
      //   BXSY: "缴纳房租",
      //   BXJE: 200,
      //   BXJEDX: "贰佰元",
      //   YJKJE: 0,
      //   XFKJE: 0,
      //   FKFS: "电汇",
      //   FJZS: 2,
      //   SKDW: "北京卓进房地产经济有限公司",
      //   KHYH: "中国工商银行",
      //   ZH: "7893777726500043943094"
      // },
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
      editVisible: false,
      dialogStatus: "",
      listloading: false
    };
  },

  methods: {
          printPdf() {
            let LODOP = getLodop();
            LODOP.PRINT_INIT("费用报销单");
            LODOP.SET_PRINT_STYLE("FontSize", 18);
            LODOP.SET_PRINT_STYLE("Bold", 1);
            // LODOP.ADD_PRINT_TEXT(50, 300, 260, 39, "费用报销单");
            LODOP.ADD_PRINT_HTM(
                88,
                200,
                350,
                600,
                document.getElementById("form1").innerHTML
            );
            LODOP.PREVIEW();
        },
    resetTemp() {
      this.temp = {
        BXDH: "",
        SQBM: "",
        SQSJ: "",
        FYXM: "",
        BXSY: "",

        BXJE: "",
        BXJEDX: "",
        YJKJE: "",
        XFKJE: "",
        FKFS: "",
        FJZS: "",
        SKDW: "",
        KHYH: "",
        ZH: ""
      };
    },
    closetab() {
      //   window.opener = null;
      // window.open("", "_top").close();
      this.$store.dispatch("delVisitedViews", this.$route);
      this.$router.go(-1);
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
      this.$confirm("确认退回记录吗?", "提示", {
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
      // // 创建
      // this.$refs["dataForm"].validate(valid => {
      //   if (valid) {
      //     //   createTaxOrg(this.temp).then(response => {
      //     //     var message = response.data.message;
      //     var message = "成功";
      //     var title = "失败";
      //     var type = "error";
      //     //     if (response.data.code === 2000) {
      //     this.getList();
      //     title = "成功";
      //     type = "success";
      //     // this.list.unshift(this.temp)
      //     //     }
      //     this.editVisible = false;
      //     this.$notify({
      //       position: "bottom-right",
      //       title: title,
      //       message: message,
      //       type: type,
      //       duration: 3000
      //     });
      //     //   });
      //     this.closetab();
      //   }
      // });
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // let arr = [...this.infiledList];
          // arr.push(this.temp);
          // //arr.push(this.temp);
          // //console.log(arr);
          CreateInfo(this.temp).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
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
                message: response.data.message,
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
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          //   tempData.S_UpdateBy = this.$store.state.user.userId;
          //   //tempData.NOTICE_CONTENT=this.content
          UpdateInfo(tempData).then(response => {
            // //   var message = response.data.message;
            // var message = "成功";
            // var title = "失败";
            // var type = "error";
            // //     if (response.data.code === 2000) {
            // this.getList();
            // title = "成功";
            // type = "success";
            // // }
            // this.editVisible = false;
            // this.$notify({
            //   position: "bottom-right",
            //   title: title,
            //   message: message,
            //   type: type,
            //   duration: 3000
            // });
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: response.data.message,
                duration: 3000
              });
              this.closetab();
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
          this.closetab();
        }
      });
    },
     created() {
    // this.listLoading = false;
    this.temp= this.$route.query.row;
    // this.GetOpions();
    // this.getList();
  }

  }
};
</script>



<style lang="scss">
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
</style>


