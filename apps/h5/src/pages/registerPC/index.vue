<template>
  <div class="wrapper h-full">
    <component :is="isInvite ? Invite : Register" />
  </div>
</template>

<script setup lang="ts">
  import Invite from './components/invite.vue';
  import Register from './components/register.vue';
  definePageMeta({
    pageLayouts: { footer: false, register: false },
    namespace: ['register', 'login', 'account'],
    middleware: ['register'],
    fullscreen: true,
  });
  const route = useRoute();
  const isInvite = computed(() => {
    return !!route.query?.vipCode || !!route.query.vipcode || !!route.query.invitecode || !!route.query.inviteCode;
  });
</script>

<style lang="less" scoped>
  .wrapper {
    background-color: var(--color-bg-fg);
    min-height: calc(100vh - 128px);
  }
</style>
