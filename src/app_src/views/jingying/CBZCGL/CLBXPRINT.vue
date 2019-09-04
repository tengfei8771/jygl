<template>
  <div id="CLBXPRINT">
    <el-card class="table-d">
      <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;" id="dataForm">
        <div id="print">
          <table width="100%" border="0" cellspacing="1" cellpadding="0">
            编码：{{temp.CLBH}}
            <br />
            部门：{{temp.DWBM}}
            <caption>
              中国石油大港油田公司
              <br />差旅费报销单
            </caption>
            <tbody>
              <tr>
                <td :colspan="2">姓名</td>
                <td :colspan="4">{{temp.CCXM}}</td>
                <td :colspan="1" :rowspan="2">起止日期</td>
                <td :colspan="3">自{{CCKSSJ}}</td>
                <td :colspan="3"></td>
                <td :colspan="1" :rowspan="2">出差天数</td>
                <td :colspan="3" :rowspan="2">共{{temp.CCTS}}天</td>
              </tr>
              <tr>
                <td :rowspan="1" :colspan="2">出差事由</td>
                <td :colspan="4">{{temp.CCKSSJ}}</td>
                <td :colspan="3">至{{CCJSSJ}}</td>
                <td :colspan="3"></td>
              </tr>
              <tr>
                <td :colspan="4">乘车船、飞机起止时间</td>
                <td :rowspan="2" colspan="2">起止地点</td>
                <td :colspan="4">出勤补助</td>
                <td :colspan="4">硬座、火车补助</td>
                <td :colspan="2">车船飞机费</td>
                <td :colspan="1">杂费</td>
              </tr>
              <tr>
                <td :colspan="1">月日</td>
                <td :colspan="1">时间</td>
                <td :colspan="1">月日</td>
                <td :colspan="1">时间</td>
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
                <td :colspan="1"></td>
                <td :colspan="1"></td>
                <td :colspan="1"></td>
                <td :colspan="1"></td>
                <td :colspan="2"></td>
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
                <td :colspan="2">总计（大写）</td>
                <td :colspan="4">{{temp.HJDX}}</td>
                <td :colspan="2">￥(小写)</td>
                <!-- <td :colspan="3">{{temp.HJJE}}</td> -->
                <td :colspan="4">{{temp.HJJE}}</td>
                <td :colspan="2">预借差旅费</td>
                <td :colspan="4">{{temp.YJCLF}}</td>
              </tr>
              <tr>
                <td :colspan="2">备注</td>
                <td :colspan="4">{{temp.REMARK}}</td>
                <td :colspan="2">刷卡人姓名</td>
                <td :colspan="4">{{temp.SKRXM}}</td>
                <td :colspan="2">应交回（补付）金额</td>
                <td :colspan="4">{{temp.YTBJE}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <button v-print="'#print'">打印</button>
      </div>
    </el-card>
  </div>
</template>


<script>
import { GetCLXCInfo } from "@/app_src/api/jygl/CLFBX";
export default {
  data() {
    return {
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
      }
    };
  },
  method: {
    getList() {
      if (this.$route.query.CLBH != null && this.$route.query.CLBH != "") {
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
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    GetDate(val) {
      if (val != "" && val != null) {
        return val.subString(0, 8);
      } else {
        return "";
      }
    },
    GetTime(val) {
      if (val != "" && val != null) {
        return val.subString(8, val.length);
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#print {
  table {
    font-size: 16px;
    // background: #000;
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
  }
  table td {
    min-width: 60px;
    min-height: 50px;
    // background: #fff;
    //max-width:300px;
    text-align: center;
    border: 1px solid #a8aeb2;
    padding: 5px 10px;
  }
}
</style>