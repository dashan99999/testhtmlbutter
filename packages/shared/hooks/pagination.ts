// 分页hooks

import { reactive, toRefs } from 'vue';
import type { PaginationProps } from '@arco-design/web-vue';

type Callback = () => void;

interface Options extends PaginationProps {
  defaultPageSize: number;
}

export default function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  const pagination = reactive({
    showPageSize: true,
    current: 1,
    pageSize: options.defaultPageSize,
    total: 0,
    onChange: (size: number) => {
      pagination.current = size;
      callback && callback();
    },
    onPageSizeChange: (size: number) => {
      pagination.current = 1;
      pagination.pageSize = size;
      callback && callback();
    },
  });

  const changeCurrent = pagination.onChange;
  const changePageSize = pagination.onPageSizeChange;
  function setTotal(value: number) {
    pagination.total = value;
  }

  const { current, pageSize, total } = toRefs(pagination);

  return {
    current,
    pageSize,
    total,
    pagination,
    changeCurrent,
    changePageSize,
    setTotal,
  };
}

// 用法示例
//  <script setup lang="ts">
// import { usePagination } from '@/hooks'

// const { pagination, setTotal } = usePagination(() => {
//   form.current = pagination.current
//   form.pageSize = pagination.pageSize
//   getTableData()
// })

// const form = reactive({
//   name: '',
//   status: '',
//   current: pagination.current,
//   pageSize: pagination.pageSize
// })

// const getTableData = async () => {
//   const res = await getData(form)
// }
// </script>
