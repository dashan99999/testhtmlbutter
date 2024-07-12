<template>
  <div :class="['login-or-registration  inline-block', props.fs]">
    <p class="color-text-2 flex items-center">
      <NuxtLink noPrefetch :to="localePath('/login')">
        <span class="color-text-brand-base m-r6">{{ $t('login.form.login') }}</span>
      </NuxtLink>
      <span>{{ $t('service.vip.or') }}</span>
      <NuxtLink noPrefetch :to="localePath('/register')">
        <span class="color-text-brand-base m-l6">{{ $t('register.form.register') }} </span>
      </NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(defineProps<{ fs?: string }>(), {
    fs: 'fs-28',
  });
  const localePath = useLocalePath();
</script>

<style lang="less" scoped></style>
