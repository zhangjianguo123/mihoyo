<template>
  <div>
    <el-button
      type="primary"
      class="add_item"
      size="mini"
      @click="$router.push({ path: 'EditDetails' })"
      >新增</el-button
    >

    <el-table
      :data="searchValue"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      highlight-current-row
      style="width: 100%"
      @row-click="RowClick"
      slot="reference"
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.UID"
        :label="item.label"
        :prop="item.prop"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]"
        :filter-method="filterHandler"
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
            @click="$router.push({ path: 'EditDetails', query: scope.row })"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除么？">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit('del', scope.row)"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="popover">这是一大堆内容</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popoverTranslateY: 0,
      tableLabel: [
        {
          label: "UID",
          prop: "UID",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "充值时间",
          prop: "date",
        },
        {
          label: "玩家等级",
          prop: "grade",
        },
      ],
      tableData: [
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
      ],
      search: "",
    };
  },
  computed: {
    searchValue() {
      console.log("%c>>>>>>>>>>>>>", "color:red;", this.search);
      return this.tableData;
    },
  },
  methods: {
    addItem() {},
    RowClick(row, column, event) {
      console.log(
        "%c>>>>>>>>>>>>>",
        "color:red;",
        "哈哈",
        row,
        column,
        event.y,
        event.layerY,
        event.y + 50 - event.layerY
      );
      this.popoverTranslateY = event.y + 53 - event.layerY + "px";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style>
.add_item {
  margin: 20px 20px 0;
}
.el-table_1_column_5 .cell {
  display: flex;
  justify-content: space-around;
}
.current-row {
  color: red;
}
.popover {
  width: 40%;
  text-align: center;
  color: #fff;
  background-color: green;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, v-bind(popoverTranslateY));
}
</style>
