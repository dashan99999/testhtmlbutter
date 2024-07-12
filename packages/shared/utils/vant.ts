import { showToast as vantToast, showFailToast as vantFailToast, showSuccessToast as vantSuccessToast, ToastOptions } from 'vant';
export const showToast = (message: string, options?: Omit<ToastOptions, 'message'>) => {
  vantToast({
    message: message,
    className: 'util-axios-toast',
    ...options,
  });
};
export const showFailToast = (message: string, options?: Omit<ToastOptions, 'message'>) => {
  vantFailToast({
    message: message,
    className: 'util-axios-toast',
    ...options,
  });
};
export const showSuccessToast = (message: string, options?: Omit<ToastOptions, 'message'>) => {
  vantSuccessToast({
    message: message,
    className: 'util-axios-toast',
    ...options,
  });
};
