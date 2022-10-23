<template>
  <div ref="dom_event">
    <el-button type="primary" @click="$router.push({ path: 'EditDetails' })"
      >新增</el-button
    >

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border
      highlight-current-row
      style="width: 100%"
      @row-click="RowClick"
      @header-click="headerClick"
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.UID"
        :label="item.label"
        :prop="item.prop"
        @click="filtersList"
        :filters="filtersList()"
        :filter-method="filterHandler"
        filter-placement="bottom"
      >
      </el-table-column>
      <el-table-column>
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click.stop="handleEdit('edit', scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除么？">
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleEdit('del', scope.row)"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
    <div class="popover">这是一大堆内容</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popoverTranslateY: 0,
      popoverTranslateX: 0,
      popoverShow: 0,
      visibility: "hidden",
      currentPage: 1,
      pageSize: 10,
      tableLabel: [
        {
          label: "UID （筛选）",
          prop: "UID",
        },
        {
          label: "姓名（筛选）",
          prop: "name",
        },
        {
          label: "充值时间（筛选）",
          prop: "date",
        },
        {
          label: "玩家等级（筛选）",
          prop: "grade",
        },
      ],
      tableData: [],
      search: "",
      a: null,
    };
  },
  mounted() {
    document.addEventListener("click", this.eventClick);
    document.addEventListener("change", () => {
      console.log("%c>>>>>>>>>>>>>", "color:red;", "暗杀收到");
    });
  },
  destroyed() {
    document.removeEventListener("click", this.eventClick);
  },

  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    filtersList() {
      return [
        { text: "2016-05-01", value: "2016-05-01" },
        { text: "2016-05-02", value: "2016-05-02" },
        { text: "2016-05-03", value: "2016-05-03" },
        { text: "2016-05-04", value: "2016-05-04" },
      ];
    },
    headerClick() {
      this.visibility = "hidden";
    },
    eventClick() {
      if (this.popoverShow < 1) this.visibility = "hidden";
      this.popoverShow = 0;
    },
    RowClick(row, column, event) {
      this.popoverShow++;
      this.popoverTranslateY = event.y + 60 - event.layerY + "px";
      this.popoverTranslateX = event.x + "px";
      this.visibility = "visible";
    },
    handleEdit(type, row) {
      this.visibility = "hidden";
      if (type === "edit")
        return this.$router.push({ path: "EditDetails", query: row });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
  created() {
    setTimeout(() => {
      this.tableData = [
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
        {
          date: "2016-05-02",
          name: "张三",
          UID: "1",
          grade: "12",
          message:
            "第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本第一条的文本",
        },
        {
          date: "2016-05-04",
          name: "李四",
          UID: "115",
          grade: "18级",
          message:
            "第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本第二条的文本",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          UID: "85",
          grade: "99级",
          message:
            "第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本第三条的文本",
        },
        {
          date: "2016-05-03",
          name: "王五",
          UID: "2000",
          grade: "151级",
          message:
            "第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本第四条的文本",
        },
      ];
    }, 100);
  },
};
</script>
<style scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.add_item {
  margin: 20px 20px 0;
}
/deep/.el-table_1_column_5 .cell {
  display: flex;
  justify-content: space-around;
}
.current-row {
  color: red;
}
.el-table {
  margin-top: 20px;
}
.popover {
  visibility: v-bind(visibility);
  width: 200px;
  padding: 18px 20px;
  text-align: center;
  color: #606266;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  transform: translate(v-bind(popoverTranslateX), v-bind(popoverTranslateY));
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  font-size: 14px;
  border: 1px solid #ebeef5;
  z-index: 2;
}
/deep/.el-icon-arrow-down:before {
  content: "";
}
</style>
