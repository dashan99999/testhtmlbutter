import { createUniqId } from './tools';
import { TwoWapMap } from './two-way-map';
type BaseListener = {
  [key: string | number]: (...args: any) => void;
};

/**
 * @description 发布订阅类
 */
export class Observable<T extends BaseListener> {
  protected eventListenerMap: Map<keyof T, Set<any>> = new Map();
  protected eventDestroyMap: Set<() => void> = new Set();
  protected eventALLMap: Set<() => void> = new Set();
  protected listenerIdMap = new TwoWapMap();
  constructor() {}
  public subscribe<E extends keyof T>(type: E, listener: T[E]) {
    if (!this.eventListenerMap.has(type)) {
      this.eventListenerMap.set(type, new Set());
    }
    this.eventListenerMap.get(type)?.add(listener);
  }
  /**
   * @description 添加全部事件订阅
   * @param listener
   */
  public subscribeAll(listener: any) {
    const id = createUniqId();
    this.listenerIdMap.set(id, listener);
    this.eventALLMap.add(listener);
    return id;
  }
  public remove<E extends keyof T>(type: E, listener: T[E]) {
    if (!this.eventListenerMap.has(type)) {
      this.eventListenerMap.set(type, new Set());
    }
    const listeners = this.eventListenerMap.get(type);
    listeners?.delete(listener);
    if (listeners?.size === 0) {
      this.eventListenerMap.delete(type);
    }
  }
  public trigger<E extends keyof T>(type: E, data: any) {
    const listeners = this.eventListenerMap.get(type) || new Set();
    listeners.forEach((listener) => {
      this.executeEvent(listener, [data]);
    });
    this.eventALLMap.forEach((listener) => {
      this.executeEvent(listener, [{ type: type, data: data }]);
    });
  }
  /**
   * @description 取消订阅全部事件的订阅，不是清空订阅
   * @param listener
   */
  public removeALL(listener: any) {
    if (typeof listener === 'string') {
      const realListener = this.listenerIdMap.getByKey(listener);
      if (realListener) {
        this.eventALLMap.delete(realListener);
      }
      this.listenerIdMap.deleteByKey(listener);
    } else {
      this.eventALLMap.delete(listener);
      this.listenerIdMap.deleteByValue(listener);
    }
  }
  public subscribeDestroy(listener: () => void) {
    this.eventDestroyMap.add(listener);
  }
  public removeOnDestroy(listener: () => void) {
    this.eventDestroyMap.delete(listener);
  }
  protected executeEvent(func: (...args: any) => any, args: any[]) {
    try {
      func(...args);
    } catch (error) {
      console.error(error);
    }
  }
  public destroy() {
    this.eventDestroyMap.forEach((listener) => {
      this.executeEvent(listener, []);
    });
  }
}
