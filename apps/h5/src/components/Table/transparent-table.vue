<template>
  <div class="table-class overflow-x-auto">
    <table cellpadding="0" cellspacing="0" class="table w-100%" border="0">
      <thead>
        <tr>
          <th class="th" v-for="(item, index) in columns" :key="index">
            <p :style="{ width: item.width ? `${item.width}px` : 'auto' }">{{ item.title }}</p>
          </th>
        </tr>
      </thead>
      <tbody class="t-body">
        <tr v-for="(item, index) in props.data" :key="index" class="list-tr">
          <td v-for="(context, i) in columns" :key="i">
            <template v-if="context.slotName">
              <slot :name="context.slotName" :record="item" :index="index"></slot>
            </template>
            <template v-else>
              {{ item[context.dataIndex] }}
            </template>
          </td>
        </tr>
        <div v-if="!props.data.length" class="h-100% grid place-items-center fs-26 color-text-2">
          {{ $t('common.noData') }}
        </div>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
  import { TableColumnData } from './type';
  const props = withDefaults(
    defineProps<{
      data: any[];
      columns: TableColumnData[];
      scrollHeight?: number;
    }>(),
    {},
  );
</script>

<style lang="less" scoped>
  .table {
    .th {
      height: 68px;
      color: #a0b6af;
      white-space: nowrap;
      font-size: 24px;
      text-align: left;
      &:last-child {
        text-align: right;
      }
    }

    .list-tr {
      height: 80px;
      color: #f5f5f5;
      width: 100%;
      td {
        text-align: left;
        font-size: 24px;
        white-space: nowrap;
        // padding: 0 50px;
        &:last-child {
          text-align: right;
          border-right: 0;
        }
      }
    }
  }
  table tbody {
    display: block;
    height: 800px;
    overflow-y: scroll;
  }

  table thead,
  tbody tr {
    display: table;
    width: 100%;
  }
  tbody tr {
    table-layout: fixed; /*重要  表格固定算法*/
  }

  /*滚动条整体粗细样式*/
  ::-webkit-scrollbar {
    /*高宽分别对应横竖滚动条的尺寸*/
    // width: 5px;
    height: 8px;
  }

  /*滚动条里面小方块*/
  ::-webkit-scrollbar-thumb {
    background: #b6c3d7;
    border-radius: 20px;
    height: 8px;
  }

  /*滚动条轨道*/
  ::-webkit-scrollbar-track {
    border-radius: 20px;
    background: transparent;
  }
</style>
