<template>
  <div class="login-wrapper h-full">
    <LoginForm />
  </div>
</template>
<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
  definePageMeta({
    namespace: ['login', 'register', 'account', 'home'],
    pageLayouts: {
      footer: false,
      register: false,
    },
  });
</script>
<style lang="less" scoped>
  .login-wrapper {
    background-color: var(--color-bg-fg);
    min-height: calc(100vh - 128px);
  }
</style>
