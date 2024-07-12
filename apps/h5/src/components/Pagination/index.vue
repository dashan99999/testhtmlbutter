<script lang="ts" setup>
  interface IProps {
    page: number;
    pageSize: number;
    total: number;
  }
  const props = withDefaults(defineProps<IProps>(), {
    page: 1,
    pageSize: 10,
    total: 0,
  });
  watch(
    () => [props],
    () => {
      if (props.page === 0) {
        emit('update:page', 1);
      }
    },
    { immediate: true, deep: true },
  );
  const emit = defineEmits(['update:page', 'update:pageSize', 'change']);
  const onPageChange = (value: number) => {
    emit('update:page', value);
    emit('change', 'page');
  };
  const onPageSizeChange = (value: number) => {
    emit('update:pageSize', value);
    emit('change', 'pageSize');
  };
</script>
<template>
  <div class="flex justify-end">
    <a-pagination
      :total="props.total"
      :page-size="props.pageSize"
      :current="props.page"
      :hide-on-single-page="true"
      @update:current="onPageChange"
      @update:page-size="onPageSizeChange"
    />
  </div>
</template>
