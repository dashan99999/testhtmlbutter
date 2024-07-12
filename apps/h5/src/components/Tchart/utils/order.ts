import i18n from '../locale/index';
import { createOrderLineIcon, getTvCssAttr } from './index';
import { BaseConfig, LimitOrder } from '../interfaces';
import { toThousands, fillZero } from '../utils/index';
import { DISPLAY_MENUS, EVENTS, ORDER_LINE_BORDER_COLOR, ORDER_TYPE } from '../constants';
import { CrossHairMovedEventParams } from '../public/charting_library/charting_library';
import { EntityId } from '../public/charting_library/charting_library';

const limitOrderLineCache = new Map<string, any>();
const historyOrderMarksCache = new Map<string, any>();
// 渲染限价委托线
export function createLimitOrderLine(
  emit: any,
  baseConfig: BaseConfig,
  tvWidget: any,
  limits: LimitOrder[],
  setting: typeof DISPLAY_MENUS,
) {
  limitOrderLineCache.forEach((orderLine: any) => {
    orderLine.remove();
  });
  limitOrderLineCache.clear();

  // 空对象、TV未实例化、没有开启限价委托线则不创建
  if (!limits.length || !setting.limitOrderLine || tvWidget === undefined || !tvWidget._ready) return;

  const chart = tvWidget.activeChart();
  const lang = baseConfig.lang;
  const riseDownColor = baseConfig.chartStyle.riseDownColor;
  const quotePrecision = baseConfig.quotePrecision as number;
  const basePrecision = baseConfig.basePrecision as number;
  const t = i18n[lang as keyof typeof i18n] || i18n.en_US;

  limits.forEach((items) => {
    const color = ORDER_TYPE.BUY === items.side ? riseDownColor[0] : riseDownColor[1];
    const bgColor = getTvCssAttr().getPropertyValue('--color-bg-3');
    const volume = toThousands(fillZero(items.amount || '0', basePrecision));
    const side = ORDER_TYPE.BUY === items.side ? t.order.limitBuy : t.order.limitSell;
    const price = toThousands(fillZero(items.price || '0', quotePrecision));

    const orderLine = chart
      .createOrderLine()
      .setPrice(parseFloat(items.price))
      .setEditable(true)
      .setTooltip(`${side} ${price}`)
      .setModifyTooltip(`${t.order.tipsy.orderQuantity} ${volume} ${items.base}`)
      .setCancelTooltip(t.order.tipsy.cancel)
      .setLineStyle(2)
      .setBodyBorderColor(ORDER_LINE_BORDER_COLOR)
      .setBodyBackgroundColor(color)
      .setLineColor(color)
      .setBodyTextColor('#FFF')
      .setQuantityFont('bold 12px HarmonyOS_Sans_Medium')
      .setBodyFont('bold 12px HarmonyOS_Sans_Medium')
      .setText(t.order.tipsy.limitPrice)
      .setQuantity(volume)
      .setQuantityTextColor(color)
      .setQuantityBorderColor(ORDER_LINE_BORDER_COLOR)
      .setQuantityBackgroundColor(bgColor)
      .setCancelButtonBackgroundColor(bgColor)
      .setCancelButtonBorderColor(ORDER_LINE_BORDER_COLOR)
      .setCancelButtonIconColor(getTvCssAttr().getPropertyValue('--color-text-3'));

    // 合约并且是首次创建才能更新订单 | 限价委托线 - 快捷改价
    if (baseConfig.exType === 'contract' && !limitOrderLineCache.get(items.id) && setting.quickPriceAdjustmentLimit) {
      orderLine.onMove(() => {
        emit(EVENTS.UPDATE_LIMIT, {
          id: items.id,
          price: orderLine.getPrice(),
        });
      });
    }

    // 首次创建才添加事件 | 快捷改价 - 快捷撤单
    if (!limitOrderLineCache.get(items.id)) {
      // 限价委托线 - 快捷改价
      if (setting.quickPriceAdjustmentLimit) {
        orderLine.onModify(() => {
          emit(EVENTS.EDIT_LIMIT, { ...items });
        });
      }

      // 限价委托线 - 快捷撤单
      if (setting.quickOrderCancellationLimit) {
        orderLine.onCancel(() => {
          emit(EVENTS.CANCEL_LIMIT, { ...items });
        });
      }

      limitOrderLineCache.set(items.id, orderLine);
    }
  });
}

// 移除订单线
export function removeOrderLine(target: Map<string, any>, orderId: string) {
  const result = target.get(orderId);
  if (result) {
    result.remove();
    target.delete(orderId);
  }
}
