<template>
  <div class="display-menu-item">
    <div
      class="display-menu-header"
      @click="() => (props.handle && props.item && !props.item.subMenu ? props.handle(props.item.key, config && !config[props.item.key]) : null)"
    >
      <div class="display-menu-name">
        {{ Array.isArray(props.item?.name) ? props.item?.name[0] : props.item?.name }}
      </div>
      <div class="display-menu-icons">
        <span v-if="props.item?.subMenu" class="menu-icon-arrow"></span>
        <span v-else :class="config && config[props.item?.key] ? 'active' : ''" class="menu-icon-round"></span>
      </div>
    </div>
    <p v-if="Array.isArray(props.item?.name)" class="display-menu-desc">{{ props.item?.name[1] }}</p>
  </div>
</template>
<script lang="ts" name="DisplayMenuItem" setup>
const props = defineProps({
  item: Object,
  config: Object,
  handle: Function
});
</script>
<style lang="scss">
.display-menu-item {
  padding: 10px;
  cursor: pointer;
  min-width: 180px;
  box-sizing: content-box;

  &:hover {
    background-color: var(--color-bg-4);
  }

  .display-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .display-menu-name {
      color: var(--color-text-2);
      font-size: 12px;
      line-height: 14px;
    }
    .display-menu-icons {
      .menu-icon-arrow {
        display: block;
        width: 8px;
        height: 8px;
        background-color: transparent;
        border-color: var(--color-text-2);
        border-style: solid;
        border-width: 2px 2px 0 0;
        transform: rotate(45deg);
        margin-right: 3px;
      }

      .menu-icon-round {
        width: 28px;
        height: 16px;
        position: relative;
        border: 1px solid var(--color-bg-5);
        background-color: var(--color-bg-5);
        box-shadow: var(--color-bg-5) 0 0 0 0 inset;
        border-radius: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background-clip: content-box;
        display: inline-block;
        -webkit-appearance: none;
        user-select: none;
        outline: none;
        transition: background-color ease 0.4s;

        &::before {
          content: '';
          width: 12px;
          height: 12px;
          position: absolute;
          top: 2px;
          left: 2px;
          border-radius: 20px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          background-color: var(--color-text-icon-check);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          transition: left 0.3s;
        }

        &.active {
          box-shadow: #dfdfdf 0 0 0 0 inset;
          transition: border-color 0.4s, background-color ease 0.4s;
          background-color: var(--color-text-button);
          border-color: var(--color-text-button);
          box-shadow: var(--color-text-button) 0 0 0 16px inset;

          &::before {
            left: 14px;
            transition: left 0.3s;
          }
        }
      }
    }
  }

  .display-menu-desc {
    font-size: 12px;
    line-height: 14px;
    color: var(--color-text-2);
    max-width: 180px;
    margin: 5px 0 0;
    opacity: 0.5;
  }
}

.v-popper__popper:where(.v-popper__arrow-outer:empty) {
  display: none;
}
</style>
