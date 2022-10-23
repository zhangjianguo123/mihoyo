<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item
            v-for="item in formList"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
          >
            <el-date-picker
              v-if="item.label === '充值时间'"
              v-model="ruleForm[item.prop]"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>

            <template v-else-if="item.buttonList">
              <el-button
                v-for="post in item.buttonList"
                :key="post.label"
                type="primary"
                @click="btnClick('ruleForm', post.label)"
                >{{ post.label }}</el-button
              >
            </template>
            <el-input v-else v-model="ruleForm[item.prop]"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        grade: "",
        date: "",
        identityCard: "",
        remarks: "",
      },
      formList: Object.freeze([
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "等級",
          prop: "grade",
        },
        {
          label: "充值时间",
          prop: "date",
        },
        {
          label: "身份证",
          prop: "identityCard",
        },
        {
          label: "备注",
          prop: "remarks",
        },
        {
          buttonList: [
            {
              label: "提交",
            },
            {
              label: "重置",
            },
          ],
        },
      ]),
      rules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        grade: [{ required: true, message: "请输入用户等级", trigger: "blur" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择充值日期",
            trigger: "change",
          },
        ],
        identityCard: [
          {
            required: true,
            message: "请输入身份证",
            trigger: "blur",
          },
        ],
        remarks: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    console.log("%c>>>>>>>>>>>>>", "color:red;", this.$route);
  },
  methods: {
    btnClick(formName, type) {
      if (type === "重置") return this.$refs[formName].resetFields();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!", type);
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-date-editor.el-input {
  width: 100%;
}
</style>
