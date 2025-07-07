<template>
  <div class="crud-container">
    <n-space vertical>
      <n-space justify="space-between">
        <n-input-group>
          <n-input
            v-model:value="searchValue"
            placeholder="输入搜索内容"
            clearable
            @keyup.enter="handleSearch"
          />
          <n-button type="primary" @click="handleSearch" :focusable="false"
            >搜索</n-button
          >
        </n-input-group>
        <n-space>
          <n-button
            @click="handleRefresh"
            ghost
            circle
            :bordered="false"
            :focusable="false"
          >
            <template #icon>
              <n-icon><RefreshFilled /></n-icon>
            </template>
          </n-button>
          <n-button type="success" @click="handleCreate">
            <template #icon>
              <n-icon><AddOutlined /></n-icon>
            </template>
          </n-button>
        </n-space>
      </n-space>
    </n-space>

    <!-- 数据表格 -->
    <n-data-table
      remote
      class="mt-4"
      :columns="columns"
      :data="filteredData"
      :pagination="pagination"
      :row-key="(row: any) => row.id"
      :loading="tableLoading"
    />

    <!-- 新增/编辑弹窗 -->
    <n-modal v-model:show="showModal" :mask-closable="false">
      <n-card
        style="width: 600px"
        :title="isEditMode ? t('edit') + title : t('add') + title"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-spin :show="formLoading">
          <n-form
            ref="formRef"
            :model="formData"
            label-placement="left"
            label-width="auto"
          >
            <slot name="form"></slot> </n-form
        ></n-spin>

        <template #footer>
          <n-space justify="end">
            <n-button @click="showModal = false">取消</n-button>
            <n-button type="primary" @click="handleSubmit">提交</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumn, FormInst } from "naive-ui";
import { message, dialog } from "@/utils";
import { useI18n } from "vue-i18n";
import { AddOutlined, RefreshFilled } from "@vicons/material";
import instance from "@/services";
import { useDebounceFn } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    title: string;
    columns: DataTableColumn[];
    formData: any;
    path: string;
    sortBy?: string;
    sortOrder?: "desc" | "asc";
  }>(),
  {
    sortBy: "createdAt",
    sortOrder: "desc",
  },
);
const { t } = useI18n();
const initialFormData = ref();
// 状态管理
const searchValue = ref("");
const showModal = ref(false);
const isEditMode = ref(false);
const currentEditId = ref(null);
const formRef = ref<FormInst | null>(null);
const formLoading = ref(false);
const tableLoading = ref(false);

// 分页配置
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0, // 添加总条目数
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  // 分页变化处理
  onChange: (page: number) => {
    pagination.page = page;
    getAllRecords();
  },
  onPageSizeChange: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    getAllRecords();
  },
});

// 模拟数据
const tableData = ref([]);
// 计算属性 - 过滤后的数据
const filteredData = computed(() => {
  if (!searchValue.value) return tableData.value;

  return tableData.value.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.value.toLowerCase()),
    ),
  );
});

// 生命周期钩子
onMounted(() => {
  // 这里可以添加从API获取数据的逻辑
  // fetchData()
});

// 搜索处理
const handleSearch = useDebounceFn(() => {
  pagination.page = 1;
  getAllRecords();
}, 500);
// 刷新处理
const handleRefresh = () => {
  getAllRecords();
};
// 新增处理
const handleCreate = () => {
  resetForm();
  isEditMode.value = false;
  showModal.value = true;
};

// 编辑处理
const handleEdit = (row: any) => {
  formLoading.value = true;
  showModal.value = true;
  isEditMode.value = true;
  currentEditId.value = row.id;
  getRecord(row.id).finally(() => {
    formLoading.value = false;
  });
};

// 删除处理
const handleDelete = (id: string) => {
  dialog.warning({
    title: "确认删除",
    content: "确定要删除这条记录吗？此操作不可恢复",
    positiveText: "删除",
    negativeText: "取消",
    onPositiveClick: () => {
      // tableData.value = tableData.value.filter((item) => item.id !== id);
      deleteRecord(id);
    },
  });
};

// 表单提交
const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (isEditMode.value) {
        // 更新现有数据
        editRecord();
      } else {
        // 添加新数据
        createRecord();
      }
      showModal.value = false;
    } else {
      message.error("请正确填写表单");
    }
  });
};

// 重置表单
const resetForm = () => {
  Object.keys(props.formData).forEach((key: any) => {
    props.formData[key] = initialFormData.value[key];
  });
  currentEditId.value = null;
};

const getAllRecords = () => {
  tableLoading.value = true;
  instance
    .post(`${props.path}/pages`, {
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchValue.value,
      sortBy: props.sortBy,
      sortOrder: props.sortOrder,
    })
    .then((res) => {
      tableData.value = res.data;
      pagination.itemCount = res.total;
    })
    .finally(() => {
      tableLoading.value = false;
    });
};
const getRecord = async (id: string) => {
  return await instance.get(`${props.path}/${id}`).then((res) => {
    Object.assign(props.formData, res.data);
  });
};
const editRecord = () => {
  instance
    .put(`${props.path}/update/${currentEditId.value}`, props.formData)
    .then(() => {
      getRecord(props.formData.id);
      resetForm();
      message.success("更新成功");
    });
};
const deleteRecord = (id: string) => {
  instance.delete(`${props.path}/delete/${id}`).then(() => {
    getAllRecords();
    message.success("删除成功");
  });
};
const createRecord = () => {
  instance.post(`${props.path}/create`, props.formData).then(() => {
    getAllRecords();
    message.success("添加成功");
  });
};
onMounted(() => {
  initialFormData.value = { ...props.formData };
  getAllRecords();
});
defineExpose({
  handleSubmit,
  handleEdit,
  handleDelete,
  handleCreate,
  resetForm,
});
</script>

<style scoped lang="less">
.crud-container {
  padding: 20px;
  border-radius: 8px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
