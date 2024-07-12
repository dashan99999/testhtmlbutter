import i18nMiddleware from './middleware/i18n';
import axiosMiddleware from './middleware/axios';
import authMiddleware from './middleware/auth';
import webviewMiddleware from './middleware/webview';
export default defineNuxtPlugin(() => {
  addRouteMiddleware('i18n-init', i18nMiddleware, { global: true });
  addRouteMiddleware('axios-init', axiosMiddleware, { global: true });
  addRouteMiddleware('auth-init', authMiddleware, { global: true });
  addRouteMiddleware('webview', webviewMiddleware, { global: true });
});
