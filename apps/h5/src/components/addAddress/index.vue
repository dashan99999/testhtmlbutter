<!-- 添加提币地址弹窗 -->
<template>
  <div class="_box">
    <a-modal
      v-model:visible="showModal"
      width="600px"
      top="20%"
      hide-cancel
      :mask-closable="false"
      :footer="false"
      :align-center="false"
      :ok-text="$t('assets.withdraw.confirm')"
      :ok-button-props="{
        long: true,
      }"
      :on-before-ok="confirm"
    >
      <template #title>{{ $t(`assets.addressManage.note${type === 'add' ? '2' : '10'}`) }}</template>
      <section class="addAddress_box">
        <a-form ref="formRef" :model="formWithdraw" @submit="showVisible">
          <a-form-item field="coinSymbol" hide-label>
            <div class="form_item">
              <p class="form_label">{{ $t('assets.table.coin') }}</p>
              <!-- <currencySelect v-if="showModal" ref="refCurrencySelect" :symbol="editItem?.coinSymbol" type="withdraw" @select="selectFn" /> -->
              <a-select
                v-model="formWithdraw.coinSymbol"
                value-key="coin"
                :placeholder="$t('assets.recharge.selectCoin')"
                @change="selectFn"
                :show-extra-options="false"
                allow-search
                :popup-container="symbolFormItem"
              >
                <template #label="{ data }">
                  <span class="select_input">
                    <img
                      class="input_icon"
                      :src="getIcon(formWithdraw.coinSymbol, defaultLogo)"
                      :onerror="`onerror=null;src='${defaultLogo}'`"
                    />
                    {{ data?.label }}
                  </span>
                </template>
                <template v-for="item in coinList" :key="item.coin">
                  <a-option v-if="item.isOpen" :value="item" class="log_body_item">
                    <img class="list_coin_logo" :src="item.logo || defaultLogo" :onerror="`onerror=null;src='${defaultLogo}'`" />
                    <div class="option_item">
                      <span>{{ item.coin }}</span>
                      <div v-if="Number(item.normalBalance) > 0" class="coin_balance">
                        <p class="balance_money b-8-cl">{{ fixD(item.normalBalance || '', getShowPrecision(item.coin, 2)) }}</p>
                        <p class="balance_rate">{{ fixD(item.usdtBalance || '', getShowPrecision(item.coin, 2)) }}</p>
                      </div>
                      <div v-else class="coin_balance">
                        <p class="balance_money b-8-cl">0.00</p>
                      </div>
                    </div>
                  </a-option>
                </template>
              </a-select>
              <div v-if="hotList.length" class="hot_currency_list">
                <template v-for="(item, index) in hotList">
                  <a-button v-if="index < 4" :key="item" class="hot_currency_btn" size="small" @click="selectHot(item)">
                    {{ item }}
                  </a-button>
                </template>
              </div>
            </div>
          </a-form-item>
          <a-form-item
            v-show="formWithdraw.coinSymbol"
            field="network"
            hide-label
            :rules="{ required: true, message: $t('assets.recharge.selectNetwork') }"
          >
            <div ref="netFormItem" class="form_item net_form_item">
              <p class="form_label">{{ $t('assets.recharge.network') }}</p>
              <a-select
                v-model="formWithdraw.network"
                value-key="network"
                :placeholder="$t('assets.recharge.selectNetwork')"
                @change="selectNet"
                :show-extra-options="false"
                allow-search
              >
                <a-option v-for="item in netList" :key="item.network" :value="item" :disabled="!item.withdrawOpen">
                  <p class="option_item">
                    <span>{{ item.network }}</span>
                    <span v-if="!item.withdrawOpen" class="option_fee">{{ item.isCloseCoin || $t('assets.withdraw.noet4') }}</span>
                  </p>
                </a-option>
              </a-select>
            </div>
          </a-form-item>
          <a-form-item field="address" hide-label :rules="{ validator: addressRul }" validate-trigger="blur">
            <div class="form_item">
              <p class="form_label">{{ $t('assets.withdraw.withdrawAddress') }}</p>
              <a-input v-model="formWithdraw.address" :placeholder="$t('assets.withdraw.PleaseAddress')" allow-clear />
            </div>
          </a-form-item>
          <template v-if="symbolConfig?.requireMemo">
            <a-form-item field="memo" hide-label :rules="{ required: symbolConfig?.requireMemo === 2, message: ' ' }">
              <div class="form_item">
                <p class="form_label">
                  MEMO
                  <a-tooltip :content="$t('common.bubble.withdrawMEMO')" position="rb">
                    <icon-exclamation-circle class="bubble_icon" size="large" />
                  </a-tooltip>
                  <span class="memo_rubric">{{ $t('common.bubble.withdrawMEMO.rubric') }}</span>
                </p>
                <a-input
                  v-model="formWithdraw.memo"
                  :placeholder="
                    symbolConfig?.requireMemo === 2 ? $t('assets.withdraw.PleaseEnter') : $t('assets.withdraw.PleaseEnterOptional')
                  "
                  allow-clear
                />
              </div>
            </a-form-item>
          </template>
          <a-form-item field="remarks" hide-label>
            <div class="form_item">
              <p class="form_label">{{ $t('assets.orderDetail.note10') }}</p>
              <a-input
                v-model="formWithdraw.remarks"
                :max-length="20"
                :placeholder="$t('assets.withdraw.PleaseEnterOptional')"
                allow-clear
              />
            </div>
          </a-form-item>
          <div class="modal_footer">
            <a-checkbox v-model="nextVerify">
              {{ $t('assets.addressManage.note3') }}
              <a-tooltip :content="$t('assets.addressManage.note4')" position="rb">
                <icon-info-circle class="modal_footer_icon" />
              </a-tooltip>
            </a-checkbox>
            <a-button class="modal_btn" :type="formRulType ? 'primary' : undefined" :disabled="!formRulType" long html-type="submit">
              {{ $t('assets.withdraw.confirm') }}
            </a-button>
          </div>
        </a-form>
      </section>
    </a-modal>
    <template v-if="showModal">
      <a-modal
        v-model:visible="securityVisible"
        width="600px"
        top="30%"
        hide-cancel
        :mask-closable="false"
        :align-center="false"
        :ok-button-props="{
          long: true,
        }"
      >
        <template #title>{{ $t('account.resetSecurity.step2.title') }}</template>
        <div class="security_verification">
          <a-form ref="verificationRef" :model="formSecurity">
            <a-form-item v-if="Number(userStore.emailAuthenticatorStatus) === 1" field="emailCode" hide-label class="security_item">
              <VerificationCodeInput
                v-model:value="formSecurity.emailCode"
                :input-label="$t('account.disable.tip14')"
                input-type="1"
                :send-type="type === 'add' ? '54' : '55'"
                :token="token || ''"
              />
            </a-form-item>
            <a-form-item v-if="Number(userStore.mobileAuthenticatorStatus) === 1" field="smsCode" hide-label class="security_item">
              <VerificationCodeInput
                v-model:value="formSecurity.smsCode"
                :input-label="$t('common.security.verification.phone')"
                input-type="0"
                :send-type="type === 'add' ? '54' : '55'"
                :token="token || ''"
              />
            </a-form-item>
            <a-form-item v-if="Number(userStore.googleAuthenticatorStatus) === 1" field="googleCode" hide-label class="security_item">
              <VerificationCodeInput
                v-model:value="formSecurity.googleCode"
                :input-label="$t('account.disable.tip13')"
                input-type="2"
                :send-type="type === 'add' ? '54' : '55'"
                un-show-btn
                :token="token || ''"
              />
            </a-form-item>
          </a-form>
        </div>
        <template #footer>
          <a-button type="primary" long @click="confirm">{{ $t('assets.withdraw.confirm') }}</a-button>
          <p class="not_available">
            <span @click="routeLink('/account/accountSecurity')">{{ $t('assets.withdraw.note2') }}</span>
          </p>
        </template>
      </a-modal>
    </template>
  </div>
</template>

<script lang="ts" setup>
  // import currencySelect from '@/components/currencySelect/currencySelect.vue';
  import {
    NewWorksListType,
    CoinListRes,
    WithdrawConfigRes,
    addAddress,
    withdrawConfigAll,
    AddressListRes,
    AddAddressConfig,
    editAddress,
    ResponseData,
    withdrawList,
    getCoinNetwork,
    withdrawHotList,
  } from '@bitunix/shared/api/assets';
  import { fixD } from '@bitunix/shared/utils/maths';
  import { getShowPrecision, getIcon } from '@bitunix/shared/hooks/getSymbolInfo';
  import { IconExclamationCircle, IconInfoCircle } from '@arco-design/web-vue/es/icon';
  import { useUserStore } from '@bitunix/shared/store';
  import { useToken } from '@bitunix/shared/utils/auth';
  import VerificationCodeInput from '@/components/Modules/VerificationCodeInput/index.vue';
  import { showSuccessToast, showFailToast } from '@bitunix/shared/utils/vant';
  import defaultLogo from '@/assets/images/defaultCurrency.png';

  const { t } = useI18n();
  const userStore = useUserStore();
  const token = useToken();
  const securityVisible = ref(false); // 安全验证弹窗
  // 安全验证
  const formSecurity = reactive({
    emailCode: '',
    smsCode: '',
    googleCode: '',
  });

  // 打开弹窗
  const type = ref<'add' | 'edit'>('add');
  const resetFieldsType = ref(true); // 重置表单状态，为true时，选择币种不重置
  const showModal = ref(false);
  const editItem = ref<AddressListRes>();
  const openModal = (key: 'add' | 'edit', item?: AddressListRes) => {
    formRef.value.resetFields(); // 打开弹窗前重置表单内容
    type.value = key;
    resetFieldsType.value = key === 'edit';
    showModal.value = true;
    if (item) {
      const keys = ['address', 'memo', 'remarks'];
      keys.forEach((k) => {
        if (item[k]) formWithdraw[k] = item[k];
      });
      selectHot(item.coinSymbol, item.network);
      nextVerify.value = !!item.trustType;
    }
    editItem.value = item;
  };
  defineExpose({
    openModal,
  });

  // 表单数据
  const formWithdraw = reactive({
    coinSymbol: '',
    network: '',
    address: '',
    memo: '',
    remarks: '',
  });
  const nextVerify = ref(false);
  const emit = defineEmits(['changeAddress']);
  const formRef = ref(); // 表单dom
  const symbolFormItem = ref();
  const netFormItem = ref();
  // 提交表单
  const confirm = async () => {
    const data: AddAddressConfig = {
      trustType: nextVerify.value ? 1 : 0,
      ...formSecurity,
      ...formWithdraw,
    };
    const response = (res: ResponseData<boolean>) => {
      if (res.data) {
        showSuccessToast(type.value === 'add' ? t('assets.addressManage.note5') : t('assets.addressManage.note11'));
        securityVisible.value = false;
        showModal.value = false;
        emit('changeAddress');
      } else {
        showFailToast(res.msg);
      }
    };
    if (type.value === 'add') {
      addAddress(data)
        .then((res) => {
          response(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      editAddress(data, editItem.value?.id || 0)
        .then((res) => {
          response(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showVisible = ({ errors }) => {
    if (!errors) {
      securityVisible.value = true;
    }
  };

  const symbolConfig = ref({
    requireMemo: 0,
    withdrawMin: 0,
    withdrawMax: 0,
    regular: '',
  }); // 主链币币种信息
  // const symbolMain = ref<CoinListRes>(); // 选中的币种信息
  const symbolNet = ref<NewWorksListType>(); // 选中的转账网络信息
  const netList = ref<NewWorksListType[]>([]); // 网络列表
  const withdrawConfig = ref<WithdrawConfigRes>(); // 提币信息

  const coinList = ref<CoinListRes[]>([]);
  const hotList = ref<string[]>([]);
  const getWithdrawList = async () => {
    const data = await withdrawList();
    coinList.value = data;
  };
  const getWithdrawHotList = async () => {
    const data = await withdrawHotList();
    hotList.value = data;
  };
  const selectHot = (coin: string, network?: string) => {
    const list = coinList.value.filter((element) => {
      return element.coin === coin;
    });
    if (list.length) {
      selectFn(list[0], network);
    }
  };

  // 币种选择事件
  const selectFn = async (item: CoinListRes, network?: string) => {
    try {
      // 重置表单选项
      if (type.value === 'edit' && resetFieldsType.value) {
        resetFieldsType.value = false;
      } else {
        formRef.value.resetFields();
      }
      formWithdraw.network = '';
      symbolNet.value = undefined;
      const { networks } = await getCoinNetwork({ coin: item.coin });
      for (let index = 0; index < networks.length; index++) {
        // 获取从链是否支持提现和手续费信息
        const element = networks[index];
        const result = await withdrawConfigAll({ coinSymbol: item.coin, network: element.network });
        if (result.code.toString() === '0') {
          const fee = fixD(result.data.defaultFee, getShowPrecision(result.data.coinSymbol));
          element.defaultFee = fee;
          result.data.defaultFee = fee;
          element.withdrawConfig = result.data;
          if (item.coin === element.coinSymbol) {
            withdrawConfig.value = result.data;
          }
        } else {
          element.isCloseCoin = result.msg;
        }
      }
      netList.value = networks;

      if (networks && networks.length === 1) {
        selectNet(networks[0]);
      } else if (network) {
        // network字段只有编辑提币地址时才有
        // 网络数量大于1时，通过network匹配对应的网络选项
        const editNet = netList.value.filter((element) => {
          return element.network === network;
        });
        selectNet(editNet[0]);
      } else {
        const mainData = await withdrawConfigAll({ coinSymbol: item.coin });
        if (mainData.code.toString() === '0') {
          mainData.data.defaultFee = fixD(mainData.data.defaultFee, getShowPrecision(mainData.data.coinSymbol));
          withdrawConfig.value = mainData.data;
        }
      }
      formWithdraw.coinSymbol = item.coin;
    } catch (error) {
      console.log('error-', error);
    }
  };
  // 网络选择事件
  const selectNet = (item: NewWorksListType) => {
    // formRef.value.resetFields();
    formWithdraw.network = item.network;
    if (item.withdrawConfig) {
      withdrawConfig.value = item.withdrawConfig as WithdrawConfigRes;
      symbolNet.value = item;
    }
    const data = {
      withdrawMax: Number(item.withdrawMax), // 提现最大值
      withdrawMin: Number(item.withdrawMin), // 提现最小值
      requireMemo: item.requireMemo, // 是否需要memo.0:不必填,1:选填,2:必填
      regular: item.addressRegular, // 地址正则表达式（如果为空说明没有配置，则不做校验） JSON串，解析后是string[]
    };
    symbolConfig.value = data;
    formRef.value.validateField('address');
  };

  // 地址校验
  const addressRul = (value: string, callback: (error?: string | undefined) => void) => {
    try {
      if (!value) {
        callback();
        return false;
      }
      if (symbolConfig.value?.regular === '') {
        callback();
        return true;
      }
      const symbolReg = symbolConfig.value?.regular.replace('\\', `\\\\`);
      let txt: string | undefined = t('assets.withdraw.addressError');
      if (value && symbolReg) {
        const reg = new RegExp(symbolReg);
        if (reg.test(value)) {
          txt = undefined;
        }
      }
      callback(txt);
      return !txt;
    } catch (error) {
      console.log(error);
      callback();
      return false;
    }
  };

  // 提币按钮状态
  const formRulType = computed(() => {
    const callback = (_error?: string | undefined) => {};
    if (!addressRul(formWithdraw.address, callback)) return false;
    if (symbolConfig.value?.requireMemo === 2 && !formWithdraw.memo) return false;
    if (!formWithdraw.network) return false;
    return true;
  });

  const routeLink = (page: string) => {
    navigateToLocale({
      path: page,
    });
  };
  onMounted(() => {
    getWithdrawList();
    getWithdrawHotList();
  });
</script>
<style lang="less" scoped>
  .form_item {
    width: 100%;
    // margin-bottom: 20px;
    .form_label {
      height: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 10px;
      color: var(--color-text-2);
      position: relative;
      .bubble_icon {
        margin: -2px 0 0 8px;
        cursor: pointer;
      }
      .memo_rubric {
        color: rgb(var(--danger-6));
        font-size: 14px;
      }
    }
    .money_input {
      position: relative;
    }
    .withdraw_all {
      position: absolute;
      top: 8px;
      right: 5px;
    }
  }
  .log_body_item {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 44px;
    cursor: pointer;
    user-select: none;
    .list_coin_logo {
      position: absolute;
      top: 10px;
      left: 20px;
      width: 16px;
      height: 16px;
    }
  }
  :deep(.arco-select-option-content) {
    width: 100%;
  }
  :deep(.verification-code-input) {
    width: 100%;
  }
  .select_input {
    display: flex;
    align-items: center;
    .input_icon {
      width: 22px;
      display: block;
      margin-right: 8px;
    }
  }
  .hot_currency_list {
    margin-top: 10px;
    .hot_currency_btn {
      height: 30px;
      padding: 0 10px;
      margin-right: 10px;
    }
  }
  .option_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .option_fee {
      color: var(--color-text-3);
    }
    .coin_balance {
      position: absolute;
      top: 0;
      right: 6px;
      text-align: right;
      .balance_money {
        font-size: 14px;
        height: 18px;
        line-height: 20px;
      }
      .balance_money_none {
        height: 36px;
        line-height: 36px;
      }
      .balance_rate {
        color: var(--color-text-2);
        font-size: 12px;
        height: 16px;
        line-height: 12px;
      }
    }
  }
  .modal_footer {
    text-align: left;
    .modal_btn {
      margin-top: 6px;
    }
    .modal_footer_icon {
      width: 16px;
      height: 16px;
      color: var(--color-text-3);
    }
  }
  .security_item {
    margin-bottom: 48px;
  }

  .not_available {
    color: rgb(var(--primary-6));
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 8px;
    span {
      cursor: pointer;
    }
  }
</style>
