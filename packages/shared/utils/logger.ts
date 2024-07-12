// import { throttle } from './tools';
const storeKey = '__LOGGER_CONFIG__';
export const CURRENT_ENV = (() => {
  const host = window.location.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'local_dev';
  }
  if (host === 'exchange.dev') {
    return 'dev';
  }
  if (host === 'exchange.test') {
    return 'test';
  }
  if (host === 'exchange.uat') {
    return 'uat';
  }
  return 'pro';
})();
const logMap: Map<string, any> = new Map();

class _Logger {
  protected errorStyle = 'background-color:#ff4d4f;padding: 1px 3px;border-radius:4px;color:#fff;';
  protected warnStyle = 'background-color:#faad14;padding: 1px 3px;border-radius:4px;color:#fff;';
  protected infoStyle = 'background-color:rgb(16, 142, 233);padding: 1px 3px;border-radius:4px;color:#fff;';
  protected open = {
    error: true,
    warn: true,
    info: true,
    tag: '',
  };
  constructor() {
    const optionStr = localStorage.getItem(storeKey) as string;
    try {
      const opt = JSON.parse(optionStr);
      this.open = Object.assign(this.open, opt);
    } catch (_error) {}
  }
  protected getTrace(err?: Error) {
    const errTrace = err || new Error();
    const trace = (errTrace.stack || '')
      .split('\n')
      .slice(3)
      .map((item) => {
        if (typeof item === 'string') return item.replace('    at ', '');
        return item;
      });
    return trace;
  }
  info(tag: string, msg: string, ...args: any[]) {
    if (this.open.tag != '' && this.open.tag !== tag) {
      return;
    }
    const trace = this.getTrace();
    console.log(`%c${tag}`, this.infoStyle, msg, { trace, args: args });
  }
  warn(tag: string, msg: string, ...args: any[]) {
    if (this.open.tag != '' && this.open.tag !== tag) {
      return;
    }
    const trace = this.getTrace();
    console.log(`%c${tag}`, this.warnStyle, msg, { trace, args: args });
  }
  error(tag: string, msg: string, ...args: any[]) {
    if (this.open.tag != '' && this.open.tag !== tag) {
      return;
    }
    const trace = this.getTrace();
    console.log(`%c${tag}`, this.errorStyle, msg, { trace, args: args });
  }
  start(name: string) {
    const start = new Date().getTime();
    return () => {
      const now = new Date().getTime();
      this.info(name, `耗时: ${now - start}ms`);
    };
  }
  /**
   * @description 节流打印
   * @param delay
   */
  public throttle(delay = 10000) {
    const timer: any = null;
    return (type: keyof _Logger, tag: string, msg: string, ...args: any[]) => {
      if (!timer) {
        clearTimeout(timer);
      }
      setTimeout(() => {
        // @ts-ignore
        this[type](tag, msg, ...args);
      }, delay);
    };
  }
  /**
   * @description 给测试人员查看的信息
   * @param symbol 唯一标识，方便筛选
   */
  public debug(symbol: string): (name: string, msg: string, info?: Info[]) => void {
    return (name: string, msg: string, info?: Info[]) => {
      logMap.set(symbol, { name, info, msg });
    };
  }
  public printDebug(symbol: string) {
    const val = logMap.get(symbol);
    if (val) {
      let msgStr = `%c调试%c${val.name}%c${val.msg}%c`;
      if (val.info) {
        for (const item of val.info) {
          msgStr += `\n ${item.desc}: ${item.value}`;
        }
      }
      const msgArr = [
        msgStr,
        'background-color:#0099ff;padding: 1px 3px;border-radius:4px;color:#fff;margin-bottom: 1px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;',
        'background-color:#999933;padding: 1px 3px;border-radius:4px;color:#fff;margin: 1px 0px 0px 1px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;',
        'padding: 1px 3px;border-radius:4px;color:rgba(0,0,0,0.8);margin: 1px 0px 0px 1px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;',
        'padding: 1px 3px;border-radius:4px;color:rgba(0,0,0,0.8);margin: 1px 0px 0px 1px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;',
      ];
      console.log(...msgArr);
    }
  }
  protected prinedIds = new Set();
  /**
   * @description 只打印一次
   * @param id 唯一ID用来确定是否打印过
   * @param msg
   */
  public once(id: string, tag: string, msg: string, ...args: any[]) {
    if (!this.prinedIds.has(id)) {
      this.info(tag, msg, ...args);
      this.prinedIds.add(id);
    }
  }
}

export const Logger = new _Logger();
interface Info {
  desc: string;
  value: any;
}
