<template>
  <div>
    <!-- <div v-for="page in pages" :key="page"> -->
    <!-- 分页 -->
    <el-form ref="dataForm" id="print" :model="tableData" label-width="120px" style="width: 99%;">
      <div class="tab_company_out">
        <h3>中国石油大港油田公司</h3>
        <div class="dan">
          费用报销审批单
          <!-- <span>{{tableData.id}}</span> -->
        </div>
        <p>
          <span>编号：{{tableData.BXDH}}</span>
          <time>时间：{{tableData.SQSJ}}</time>
          <!-- <span>金额单位：元</span> -->
        </p>
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td>单位(部门)</td>
            <td>{{tableData.DWBM}}</td>
            <td>费用项目</td>
            <td>{{tableData.FYXM}}</td>
          </tr>
          <tr>
            <td>报销事由</td>
            <td colspan="3">{{tableData.BXSY}}</td>
          </tr>
          <tr>
            <td>报销金额（大写）</td>
            <td>{{tableData.BXJEDX}}</td>
            <td>报销金额（小写）</td>
            <td>{{tableData.BXJE}}</td>
          </tr>
          <tr>
            <td>原借款金额（小写）</td>
            <td>{{tableData.YJKJE}}</td>
            <td>现付款（收回）金额（小写）</td>
            <td>{{tableData.XFKJE}}</td>
          </tr>
          <tr>
            <td>付款方式</td>
            <td>{{tableData.FKFS}}</td>
            <td>附件张数</td>
            <td>{{tableData.FJZS}}</td>
          </tr>
          <tr>
            <td>收款单位名称</td>
            <td>{{tableData.SKDW}}</td>
            <td>开户行</td>
            <td>{{tableData.KHH}}</td>
          </tr>
          <tr>
            <td>账号</td>
            <td>{{tableData.YHZH}}</td>
            <td colspan="2">省&nbsp;&nbsp;北京&nbsp;&nbsp;&nbsp;市（县）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          </tr>
        </table>

        <ul class="lu">
          <li>
            单位负责人：
            <label></label>
          </li>
          <li>
            财务负责人：
            <label id="teller"></label>
          </li>
          <li>
            业务部门负责人：
            <label id="single"></label>
          </li>
          <li>
            经办人：
            <label id="sign"></label>
          </li>
        </ul>
      </div>
    </el-form>
    <!-- </div> -->
      <div style="text-align:center;margin-top:20px;">
      <el-button type="success" style="width:57px;line-height:30px;" v-print="'#print'">打印</el-button>
    </div>
  </div>

</template>


<script>
export default {
  name: "FYBXPRINT",
  // 制作打印模版组件时，props区域尽量保留。
  // props: {
  //   // 接受的打印数据
  //   tableData: {
  //     type: Object,
  //     default() {
  //       return {
  //         S_ID: "38f56873-b784-4a6f-9ee9-4393c538c9c7",
  //         BXDH:"GY01JL9.11-01",
  //         SQSJ: "2019-08-06 15:21:35",
  //         DWBM:"北京项目部",
  //         FYXM:"房屋租赁费",
  //         BXSY:"缴纳房租",
  //         BXJEDX: "叁万捌仟叁佰肆拾壹元",
  //         BXJE:38341,
  //         YJKJE:"",
  //         XFKJE:"",
  //         FKFS:"电汇",
  //         FJZS:2,
  //         SKDW:"北京卓进房地产经纪有限公司",
  //         KHH:"中国工商银行股份有限公司北京香河园支行",
  //         YHZH:"0200019109000056680"
  //       };
  //     }
  //   },

  //   // 每页多少行
  //   onePageRow: {
  //     type: Number,
  //     default: 5
  //   },
  //   // 是否插入空白行
  //   blankLines: {
  //     type: Boolean,
  //     default: true
  //   },

  //   getChineseNumber: Function // 求数字的中文写法，从easyPrint组件传入
  // },
  data() {
    return {
      //  tableData: {
      //   S_ID: "38f56873-b784-4a6f-9ee9-4393c538c9c7",
      //   BXDH:"GY01JL9.11-01",
      //   SQSJ: "2019-08-06 15:21:35",
      //   DWBM:"北京项目部",
      //   FYXM:"房屋租赁费",
      //   BXSY:"缴纳房租",
      //   BXJEDX: "叁万捌仟叁佰肆拾壹元",
      //   BXJE:38341,
      //   YJKJE:"",
      //   XFKJE:"",
      //   FKFS:"电汇",
      //   FJZS:2,
      //   SKDW:"北京卓进房地产经纪有限公司",
      //   KHH:"中国工商银行股份有限公司北京香河园支行",
      //   YHZH:"0200019109000056680"
      // },
      tableData: {
        BXDH: "",
        SQSJ: "",
        DWBM: "",
        FYXM: "",
        BXSY: "",
        BXJEDX: "",
        BXJE: "",
        YJKJE: "",
        XFKJE: "",
        FKFS: "",
        FKFSName:"",
        FJZS: "",
        SKDW: "",
        KHH: "",
        YHZH: "",
        CJR: this.$store.state.user.userId
      }
    };
  },

  computed: {
    pages() {
      // 求当前数据能打印的页数
      var pages_ = Math.ceil(this.tableData.length / this.onePageRow); // 向上取整数
      // return pages_ <= 0 ? 1 : pages_;
      return 1;
    },
    chineseTotal() {
      // 计算中文合计，如果忘记传入
      return this.getChineseNumber != null
        ? this.getChineseNumber(this.tableData.total_amount)
        : "您还没有传入getChineseNumber";
    }
  },

  methods: {
    test() {
      console.log("test");
    }
  },
  mounted() {},
  created() {
    this.tableData = Object.assign({}, this.$route.query.row); // copy obj
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style-type: none;
  font-family: "微软雅黑";
  font-size: 14px;
}

.tab_company_out {
  padding-top: 25px;
  text-align: center;
  width: 90%;
  margin: auto;
  page-break-after: always;
}

h3 {
  font-size: 14px;
}

.dan {
  text-align: center;
  position: relative;
}

.dan span {
  position: absolute;
  right: 0;
}

p {
  overflow: hidden;
  padding: 10px 0;
}

p span {
  float: left;
}

p span ins {
  text-decoration: underline;
}

p time {
  float: right;
}

table {
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
}

table tr td {
  border: 1px solid #000;
  border-bottom: none;
  border-right: none;
  height: 40px;
  line-height: 40px;
}

table tr td:last-of-type,
table tr th:last-of-type {
  border-right: 1px solid #000;
}

.lu {
  display: inline-block;
  padding-top: 10px;
}

.lu li {
  float: left;
  text-align: left;
  margin-right: 5px;
}

.lu li label {
  width: 150px;
  display: inline-block;
}

.lu li:last-of-type {
  margin-right: 0;
}

@page {
  size: auto A4 landscape;
  margin: 3mm;
}
</style>
