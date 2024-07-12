import { showToast } from '../utils/vant';
import { ComputedRef, Ref } from 'vue';
import { clipboard } from '../../shared/utils/tools';
type MSG_TYPE<T> = T | Ref<T> | ComputedRef<T>;
interface IMsg {
  success: string;
  error: string;
}
export function useClipboard(copyMsg?: MSG_TYPE<IMsg>) {
  const { t } = useI18n();
  const _copyMsg = computed(() => {
    if (!copyMsg) {
      return {
        success: t('account.apiManagement.viewKey.copy'),
        error: '',
      };
    }
    if (isRef(copyMsg)) {
      return copyMsg.value;
    }
    return copyMsg;
  });
  return {
    copy: (str: string) => {
      clipboard.copy(str).then(() => {
        if (_copyMsg.value.success) {
          showToast(_copyMsg.value.success);
        }
      });
    },
  };
}
export function useClipboardPro() {
  const { t } = useI18n();
  return {
    copy: (str: string) => {
      clipboard.copy(str).then(() => {
        showToast(t('common.copy_success'));
      });
    },
  };
}

export function useClipboardPro2() {
  const { t } = useI18n();
  return {
    copy: (str: string) => {
      clipboard.copy(str).then(() => {
        showToast(t('common.copy_success2'));
      });
    },
  };
}
