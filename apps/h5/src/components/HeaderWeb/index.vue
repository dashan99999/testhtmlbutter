<template>
  <div class="wrapper flex justify-between items-center">
    <div>
      <!-- <IconFont name="a-Bitunixlogolight1" class="logo fs-47 color-text-1" @click="linkTo('/')" /> -->
      <!-- <UbitLogo class="logo fs-47 color-text-1" @click="linkTo('/')" /> -->
      <img class="ml-20 h-20" :src="Logo" alt="" @click="linkTo('/')" />
    </div>
    <!-- <SvgIcon v-show="showSetting" name="bx-icon-mobile-header-setting" class="right-icon" @click="showRate" /> -->
    <div class="right">
      <!-- 登录与未登录状态 -->
      <div v-show="isLogin" class="flex items-center text-12">
        <div class="px-6 py-1 flex justify-between items-center w-150 border-2 border-solid border-#ea4b64 rounded-40">
          <div class="flex items-center">
            <img class="w-12 h-auto" :src="Coin" alt="" />
            <span class="ml-5">{{ userStore?.userInfoDetail.gold_coin }}</span>
          </div>
          <div @click="openBuy"><van-icon class="w-12 h-12 font-bold" name="plus" /></div>
        </div>
        <!-- <div v-show="!isLogin" class="not-login">
          <NuxtLink noPrefetch v-show="!showSet.setting && showRegister" class="btn" :to="localPath('/register')">
            {{ $t('common.header.register') }}</NuxtLink
          >
        </div> -->
        <!-- <IconFont @click="handleRightClick" :name="isRegistered ? 'language' : 'hamburg'" class="right-icon fs-48" /> -->
        <Popover v-model:show="showPopover" placement="bottom-end">
          <div v-if="isLogin" class="p-5 bg-#ffffff text-10 text-#000000">
            <div v-for="item in actions2" :key="item.key" class="m-5" @click="item.handle">{{ item.text }}</div>
          </div>
          <div v-else class="p-5 bg-#ffffff text-10 text-#000000">
            <div v-for="item in actions" :key="item.key" class="m-5" @click="linkTo(item.path)">{{ item.text }}</div>
          </div>
          <template #reference>
            <div class="ml-20 flex justify-center items-center w-22 h-22 rounded-50% bg-#ea4b64">
              <img class="w-auto h-10" :src="Person" alt="" />
            </div>
          </template>
        </Popover>
      </div>
      <Popover v-if="!isLogin" v-model:show="showPopover" placement="bottom-end">
        <div class="p-5 bg-#ffffff text-10 text-#000000">
          <div v-for="item in actions" :key="item.key" class="m-5" @click="linkTo(item.path)">{{ item.text }}</div>
        </div>
        <template #reference>
          <div class="ml-20 flex justify-center items-center w-25 h-25 rounded-50% bg-#ea4b64">
            <img class="w-15 h-auto" :src="Person" alt="" />
          </div>
        </template>
      </Popover>
      <!-- <IconFont v-show="isCollapse" @click="closeCollapse" name="close" class="right-icon" /> -->
    </div>
  </div>
  <van-popup v-model:show="show" round>
    <div class="py-8 px-20 w-50vw h-80vh rounded-8">
      <div class="text-center text-18"> 储值 </div>
      <div class="mt-8 p-8 bg-#373737 rounded-10">
        <div class="text-#919191">当前持有</div>
        <div class="mt-5 flex items-center">
          <img class="w-12 h-auto" :src="Coin" alt="" />
          <span class="ml-10 text-12 font-black">{{ userStore?.userInfoDetail.gold_coin }}</span>
        </div>
      </div>
      <div class="mt-10 p-8 bg-#373737 rounded-10">
        <div class="text-#919191">充值方案</div>
        <div class="mt-20 flex overflow-x-auto text-22">
          <div
            v-for="(item, index) in goods"
            :key="item.id"
            :class="[
              'mr-5 p-20 min-w-80 rounded-10 bg-#151515 box-content',
              { 'border-2 border-solid border-#ea4b64': defaultCoinType == index },
            ]"
            @click="handleChangeCoinType(index)"
          >
            <div class="text-center">
              <img class="w-auto h-30" :src="getCoinImg(index)" alt="" />
            </div>
            <div class="mt-15 flex items-center">
              <img class="w-14 h-auto" :src="Coin" alt="" />
              <span class="ml-10 text-12">+ {{ item.gold_coin }}</span>
            </div>
            <div class="mt-8 flex items-center">
              <img class="w-14 h-auto" :src="Silver" alt="" />
              <span class="ml-10 text-12">+ {{ item.silver_coin }}</span>
            </div>
            <div class="mt-20 text-14 text-center">
              CNY <span>{{ item.price }}</span>
            </div>
          </div>
        </div>
        <div class="mt-20 text-8 text-#ea4b64"> 上方显示的金额可能与实际支付页面金额显示不同，请以支付页面金额为该支付金额。 </div>
      </div>
      <div class="mt-10 p-8 bg-#373737 rounded-10">
        <div class="text-#919191">支付</div>
        <div class="mt-8 px-8 text-12">
          <van-radio-group v-model="defaultChannel" shape="dot" direction="horizontal" :style="{ fontSize: '12px' }">
            <van-radio v-for="(item, index) in channel" :key="item.id" :name="index" :style="{ fontSize: '12px' }">{{
              item.name
            }}</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="mt-20 p-8 bg-#373737 rounded-10">
        <div class="text-#919191"> 点击下方图标或按钮前往支付页面 </div>
        <div class="flex flex-col justify-center items-center w-180" @click="handlePay">
          <div
            class="mt-10 flex flex-col justify-center items-center w-100 h-120 border-2 border-solid border-#4b4b4b inline-block rounded-10 bg-#414141"
          >
            <img class="w-40 h-auto" :src="PaymentAlipay" alt="" />
            <div class="mt-20 text-#919191 text-12">CNY</div>
          </div>
          <div class="mt-10 py-2 px-15 rounded-40 border-1 border-solid border-#ea4b64 text-#ea4b64 inline-block text-12">前往支付</div>
        </div>
      </div>
    </div>
  </van-popup>
  <!-- <ClientOnly>
    <HeaderSetting @close-panel="closeCollapse" :show="showSet.setting" />
    <PersonCenter @close-panel="closeCollapse" :show="showSet.personCenter" />
    <rateAndLan ref="rateRef" />
  </ClientOnly> -->
</template>
<script lang="ts" setup name="header-mobile">
  import HeaderSetting from './setting.vue';
  import PersonCenter from './personCenter.vue';
  import rateAndLan from './rateAndLan.vue';
  import UbitLogo from '@/components/UbitLogo/index.vue';
  import { useUserStore } from '@bitunix/shared/store';
  import { px2rem } from '@bitunix/shared/utils/methods';
  import { showToast } from '@bitunix/shared/utils/vant';
  import { goodsLists, channelLists, payOrders } from '@bitunix/shared/api/homeindex';
  import Logo from '~/assets/images/logo.svg';
  import Person from '~/assets/icons/svg/person.svg';
  import Coin from '~/assets/images/coin.svg';
  import Silver from '~/assets/images/coin-silver.svg';
  import Coin2 from '~/assets/images/coin2.svg';
  import Coin3 from '~/assets/images/coin3.svg';
  import Coin4 from '~/assets/images/coin4.svg';
  import Coin5 from '~/assets/images/coin5.svg';
  import Coin6 from '~/assets/images/coin6.svg';
  import PaymentAlipay from '~/assets/images/payment_alipay.svg';
  import { Popover } from 'vant';
  const isLogin = useLoginStatus();
  const switchLocale = useSwitchLocalePath();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const show = ref(false);
  const defaultCoinType = ref(0);
  const goods = ref([]);
  const channel = ref([]);
  const defaultChannel = ref(0);

  const getCoinImg = (index) => {
    switch (index) {
      case 0:
        return Coin;
      case 1:
        return Coin2;
      case 2:
        return Coin3;
      case 3:
        return Coin4;
      case 4:
        return Coin5;
      case 5:
        return Coin6;
      default:
        return Coin;
    }
  };

  onMounted(() => {
    console.log('userStore.gold_coin==>', userStore);
    fetchGoodsLists();
    fetchChannelLists();
  });

  const fetchGoodsLists = async () => {
    const { data } = await goodsLists();
    goods.value = data;
  };
  const fetchChannelLists = async () => {
    const { data } = await channelLists();
    channel.value = data;
  };

  const openBuy = () => {
    show.value = true;
  };
  const handleChangeCoinType = (index) => {
    defaultCoinType.value = index;
  };
  const handlePay = async () => {
    const params = {
      goods_id: goods.value[defaultCoinType.value]?.id,
      channel_id: channel.value[defaultChannel.value]?.id,
    };
    console.log(params);
    const { data } = await payOrders(params);
    if (data?.pay_url) {
      window.open(data.pay_url, '_blank');
    }
  };

  const linkTo = (url: string) => {
    console.log('linkTo==>', url);
    // navigateToLocale(url);
    router.push(url);
  };
  const handleUpdateLanguage = ref((lang: string) => {
    emits('toggleCollapse', false);
    nextTick(() => {
      navigateTo({
        path: switchLocale(lang),
        query: route.query,
      });
    });
  });
  const isRegistered = computed(() => {
    const regex = /register$/;
    return regex.test(route.path) || route.path.includes('register?');
  });
  provide('handleUpdateLanguage', handleUpdateLanguage);
  const localPath = useLocalePath();
  // const toBindGoogle = () => {
  //   if (userStore.googleAuthenticatorKey === '0') {
  //     router.push('/account/bindgoogle');
  //   }
  // };
  const showSet = reactive({
    personCenter: false,
    setting: false,
  });

  const isCollapse = computed(() => {
    return showSet.personCenter || showSet.setting;
  });

  const emits = defineEmits(['toggleCollapse']);
  watch(isCollapse, (v) => {
    emits('toggleCollapse', v);
  });
  const closeCollapse = () => {
    showSet.personCenter = false;
    showSet.setting = false;
  };
  const showGoogleBind = () => {
    linkTo(userStore.googleAuthenticatorKey == '0' ? '/account/bindGoogle' : '/account/bindGoogle/modify');
  };
  /**
   * 语言和汇率设置面板
   */
  const rateRef = ref<InstanceType<typeof rateAndLan> | null>(null);
  const showRate = () => {
    rateRef.value?.openSetting('lan');
  };
  const showSetting = computed(() => toValue(route.meta.pageLayouts?.settings) ?? false);
  const showRegister = computed(() => toValue(route.meta.pageLayouts?.register) ?? true);
  const handleRightClick = () => {
    if (isRegistered.value) {
      rateRef.value?.openSetting('lan');
    } else {
      showSet.setting = true;
    }
  };

  const showPopover = ref(false);

  // 通过 actions 属性来定义菜单选项
  const actions = [
    { text: '注册账号', key: 'register', path: '/registerPC' },
    { text: '登入', key: 'login', path: '/loginPC' },
    // { text: '切换语言', key: 'lang', path: '/login' },
  ];
  const actions2 = [
    {
      text: '我的游戏',
      key: 'lang',
      handle: () => {
        linkTo('/myGame');
      },
    },
    {
      text: '登出',
      key: 'logout',
      handle: () => {
        handleLogout();
      },
    },
  ];
  const onSelect = (action) => console.log(action.text);

  const loginOut = useLogout();
  const localpath = useLocalePath();
  const handleLogout = () => {
    console.log('点击退出');

    showToast('退出登录');
    loginOut(localpath('/'));
  };
</script>
<style lang="less" scoped>
  :deep(.van-radio__icon) {
    font-size: 12px;
  }
  :deep(.van-radio__label) {
    margin-left: 4px;
    line-height: 0;
  }
  .wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid var(--color-border-base);
    background-color: var(--bx-bg);
    padding: 0 30px 0 0;
    z-index: 100;
    .logo {
      background-image: linear-gradient(to right, #ea4b64 42px, var(--color-text-1) 50px);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    .right-icon {
      font-size: 48px;
    }
    .right {
      display: flex;
      align-items: center;
      .right-icon {
        font-size: 48px;
      }
      .not-login {
        .btn {
          min-width: 140px;
          padding: 0 24px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #ea4b64;
          color: var(--bx-btn-text-color);
          border-radius: 8px;
          margin-right: 40px;
          font-size: var(--bx-font-size-base);
          display: block;
          font-weight: var(--van-font-regular);
        }
      }
      .in-login {
        display: flex;
        .icon-wrapper {
          position: relative;
          margin-right: 40px;
          display: flex;
          align-items: center;
          .warning {
            display: flex;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: var(--color-text-warning);
            align-items: center;
            justify-content: center;
            position: absolute;
            right: -11px;
            bottom: 6px;
            font-size: 22px;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  /* 隐藏滚动条但保留滚动功能 */
  .hide-scrollbar {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
</style>
