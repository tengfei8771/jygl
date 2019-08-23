<template>
  <div id="JYKC" class="app-container calendar-list-container">
    <el-card class="table-d">
      <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
        <table width="100%" border="0" cellspacing="1" cellpadding="0">
          <caption>
            中国石油大港油田公司
            <br>费用报销
          </caption>
          <tbody>
            <tr>
              <td>单位部门</td>
              <td>
                <el-input v-model="temp.SQBM"></el-input>
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
                <el-input v-model="temp.KHYH"></el-input>
              </td>
            </tr>
            <tr>
              <td>账号</td>
              <td>
                <el-input v-model="temp.ZH"></el-input>
              </td>
              <td :colspan="2">
                <el-input></el-input>
              </td>
            </tr>
            <!-- <tr><td></td><td></td><td></td><td></td></tr> -->
          </tbody>
        </table>
      </el-form>
       <div style="text-align:center;margin-top:20px;">
          <el-button @click="closetab">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
                              <el-button type="success">提交</el-button>
        </div>
      <!-- 
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
           <el-row>
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

            <el-form-item label="费用项目" prop="FYXM">
                    <el-select size="mini" style="width:100%;" v-model="temp.FYXM">
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
              <el-form-item label="申请单位" prop="SQBM">
                <el-input v-model="temp.SQBM"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="附件张数" prop="FJZS">
                <el-input v-model="temp.FJZS"></el-input>
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
              <el-form-item label="报销事由" prop="BXSY">
                <el-input v-model="temp.BXSY" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="原借款金额" prop="YJKJE">
                <el-input v-model="temp.YJKJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现付款金额" prop="XFKJE">
                <el-input v-model="temp.XFKJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="付款方式" prop="FKFS">
                <el-input v-model="temp.FKFS"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收款单位" prop="SKDW">
                <el-input v-model="temp.SKDW"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
              <el-form-item label="开户银行" prop="KHYH">
                <el-input v-model="temp.KHYH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户" prop="ZH">
                <el-input v-model="temp.ZH"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


        
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
           <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button> 
          <el-button type="success">审核通过</el-button>
                    <el-button type="danger">不通过</el-button>
      </div>-->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "JYKC",
  data() {
    return {
      temp: {
        BXDH: "GY01JL9.11-02",
        SQBM: "北京项目部",
        SQSJ: "219-05-31",
        FYXM: "房屋租赁费",
        BXSY: "缴纳房租",

        BXJE: 200,
        BXJEDX: "贰佰元",
        YJKJE: 0,
        XFKJE: 0,
        FKFS: "电汇",
        FJZS: 2,
        SKDW: "北京卓进房地产经济有限公司",
        KHYH: "中国工商银行",
        ZH: "7893777726500043943094"
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      goods: [
        {
          BXDH: "GY01JL9.11-02",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          FYXM: "房屋租赁费",
          BXSY: "缴纳房租",

          BXJE: 200,
          BXJEDX: "贰佰元",
          YJKJE: 0,
          XFKJE: 0,
          FKFS: "电汇",
          FJZS: 2,
          SKDW: "北京卓进房地产经济有限公司",
          KHYH: "中国工商银行",
          ZH: "7893777726500043943094"
        },
        {
          BXDH: "GY01JL9.11-02",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          FYXM: "房屋租赁费",
          BXSY: "缴纳房租",

          BXJE: 200,
          BXJEDX: "贰佰元",
          YJKJE: 0,
          XFKJE: 0,
          FKFS: "电汇",
          FJZS: 2,
          SKDW: "北京卓进房地产经济有限公司",
          KHYH: "中国工商银行",
          ZH: "7893777726500043943094"
        },
        {
          BXDH: "GY01JL9.11-02",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          FYXM: "房屋租赁费",
          BXSY: "缴纳房租",

          BXJE: 200,
          BXJEDX: "贰佰元",
          YJKJE: 0,
          XFKJE: 0,
          FKFS: "电汇",
          FJZS: 2,
          SKDW: "北京卓进房地产经济有限公司",
          KHYH: "中国工商银行",
          ZH: "7893777726500043943094"
        },
        {
          BXDH: "GY01JL9.11-02",
          SQBM: "北京项目部",
          SQSJ: "219-05-31",
          FYXM: "房屋租赁费",
          BXSY: "缴纳房租",

          BXJE: 200,
          BXJEDX: "贰佰元",
          YJKJE: 0,
          XFKJE: 0,
          FKFS: "电汇",
          FJZS: 2,
          SKDW: "北京卓进房地产经济有限公司",
          KHYH: "中国工商银行",
          ZH: "7893777726500043943094"
        }
      ]
    };
  },

  methods: {
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
    closetab()
{

//   window.opener = null;
// window.open("", "_top").close();
this.$store.dispatch('delVisitedViews', this.$route);
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
               this.closetab();
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
               this.closetab();
        }
      });
    }
  }
};
</script>



<style lang="scss">
#JYKC .table-d table {
  background: #000;
}
#JYKC .table-d table td {
  background: #fff;
}
</style>


