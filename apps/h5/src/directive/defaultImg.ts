import type { App } from 'vue';
import DefaultImg from '../assets/images/default-img.png';
import DefaultIcon from '../assets/images/default-icon.png';

const defaultImg = {
  mounted(el, binding) {
    const { arg = 'img' } = binding;
    if (el.tagName === 'IMG') {
      el.onerror = function () {
        if (arg === 'img') {
          el.src = DefaultImg;
        } else {
          el.src = DefaultIcon;
        }
        el.onerror = null;
      };
    }
  },
};
export default function SingUpDirective(app: App) {
  app.directive('def', defaultImg);
}
