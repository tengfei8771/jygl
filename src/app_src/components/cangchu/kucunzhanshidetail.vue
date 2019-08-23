<template>
  <div class="app-container calendar-list-container ">
    <el-dialog
      title="库存明细"
      :visible.sync="kcmxdialog"
      @close="CloseDialog"
      :modal="false"
      :modal-append-to-body="false"
      style="margin-top:10vh;margin-left:100px;"
      width="50%"
    >
      <el-table
        :key="tableKey"
        :data="list"
        :header-cell-class-name="tableRowClassName"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
        size="mini"
        id="table"
      >
        <el-table-column min-width="100px" align="center" label="仓库号" fixed="left">
          <template slot-scope="scope">
            <span>{{scope.row.ckh}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="入库时间" fixed="left">
          <template slot-scope="scope">
            <span>{{scope.row.rksj}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="厂家" fixed="left">
          <template slot-scope="scope">
            <span>{{scope.row.cj}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="数量" fixed="left">
          <template slot-scope="scope">
            <span>{{scope.row.sl}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="金额" fixed="left">
          <template slot-scope="scope">
            <span>{{scope.row.je}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:center;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30,40]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "kucunzhanshidetail",
  data() {
    return {
      kcmxdialog: false,
      tableKey: 0,
      total: 5,
      list: [
        {
          ckh: "01",
          rksj: "2019-05-01",
          cj: "A厂",
          sl: 5000,
          je: 1000
        },
        {
          ckh: "01",
          rksj: "2019-05-01",
          cj: "B厂",
          sl: 3400,
          je: 91000
        },
        {
          ckh: "01",
          rksj: "2019-05-01",
          cj: "C厂",
          sl: 15000,
          je: 10500
        },
        {
          ckh: "01",
          rksj: "2019-05-01",
          cj: "D厂",
          sl: 65000,
          je: 881000
        },
        {
          ckh: "01",
          rksj: "2019-05-01",
          cj: "E厂",
          sl: 53000,
          je: 14000
        }
      ],
      listQuery: {
        page: 1,
        limit: 10
      },
      listLoading: false
    };
  },
  props: ["kcmxdialogVisible"],
  methods: {
    CloseDialog() {
      this.$emit("listenToChildEvent", false);
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  },
  watch: {
    kcmxdialogVisible(val) {
      this.kcmxdialog = val; //新增result的watch，监听变更并同步到myResult上
     // var aa=document.querySelectorAll('.el-dialog__header');
      // aa[0].style.background="#C0C0C0";
    }
  }
 
};
</script>
<style  lang="scss" scoped>
   
</style>