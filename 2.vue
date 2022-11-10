<template>
  <div ref="dom_event" class="table_list">
    <el-button type="primary" @click="$router.push({ path: 'EditDetails' })">新增</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      :data="searchPuted"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border
      highlight-current-row
      style="width: 100%"
      @row-click="RowClick"
      @header-click="headerClick"
      ref="filterTable"
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :filters="filterList[item.prop]"
        :filter-method="filterHandler"
        filter-placement="bottom"
      >
      <template slot-scope="scope">
        <span>{{scope.row[item.prop]}}</span>
        <div class="popover">这是一大堆内容</div>
      </template>
      </el-table-column>
      <el-table-column>
        <!-- eslint-disable-next-line -->
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            @input="searchEvent(search)"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除么？" @confirm="confirm(scope.row)">
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleEdit(scope.row)"
              slot="reference"
            >删除</el-button>
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
    ></el-pagination>
  </div>
</template>

<script>
import myModel from "../../models/newTest";
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
          prop: "UID"
        },
        {
          label: "姓名（筛选）",
          prop: "name"
        },
        {
          label: "充值时间（筛选）",
          prop: "date"
        },
        {
          label: "玩家等级（筛选）",
          prop: "grade"
        }
      ],
      tableData: [],
      search: "",
      filterList: { UID: [], name: [], date: [], grade: [] }
    };
  },
  mounted() {
    document.addEventListener("click", this.eventClick);
  },
  destroyed() {
    document.removeEventListener("click", this.eventClick);
  },
  computed: {
    tableDatas() {
      let list = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      let setObj = {};
      list.forEach((v, i) => {
        for (let key in v) {
          if (this.filterList[key]) {
            if (!setObj[v[key]]) {
              setObj[v[key]] = v[key];
              this.filterList[key].push({
                text: v[key],
                value: v[key] + `&${v.UID}`
              });
            }
          }
        }
      });
      return list;
    },
    searchPuted() {
      return this.search
        ? this.tableDatas.filter(v => Object.values(v).includes(this.search))
        : this.tableDatas;
    }
  },
  methods: {
    async getList() {
      const { list } = await myModel.getTableList();
      this.tableData = list;
    },
    searchEvent(value) {},
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
    async confirm(row) {
      const res = await myModel.removeItem({ UID: row.UID });
    },
    clearFilter() {
      this.search = "";
      this.$refs.filterTable.clearFilter();
    },
    headerClick() {
      this.visibility = "hidden";
    },
    eventClick() {
      if (this.popoverShow < 1) this.visibility = "hidden";
      this.popoverShow = 0;
    },
    RowClick(row, column, event) {
      console.log('打印啊', column, column.property, event.x - event.layerX);
      const indexY = this.searchPuted.findIndex(v => v.UID === row.UID);
      const indexX = this.tableLabel.findIndex(v => v.prop === column.property);

      if (indexX !== -1) {
        if (indexY < this.searchPuted.length / 2) {
        // 展示在下面
        this.popoverTranslateY = indexY * 53 + 70 + event.layerY + "px";
      } else {
        // 展示在上面
        this.popoverTranslateY = indexY * 53 + 50 - (53 - event.layerY) + "px";
      }
        // 展示在中间
        this.popoverTranslateX = event.layerX + "px";
      }
      this.popoverShow++;
      this.visibility = "visible";
    },
    async handleEdit(row) {
      this.visibility = "hidden";
      this.$router.push({ path: "editDetails", query: row });
    },
    filterHandler(value, row, column) {
      // console.log("筛选", value, row, column);
      const property = column["property"];
      return row[property] == value.split("&")[0];
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.table_list {
  position: relative;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
}

.add_item {
  margin: 20px 20px 0;
}

.current-row {
  color: red;
}

.el-table {
  margin-top: 20px;

  .el-button {
    margin: 0 20px;
  }
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

::v-deep {
  .el-icon-arrow-down:before {
    content: "";
  }
  .el-table .hidden-columns {
    z-index: 2;
  }
}
</style>
