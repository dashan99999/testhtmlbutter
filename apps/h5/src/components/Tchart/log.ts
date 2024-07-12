import { query } from './utils/index';

const storeKey = '__LOGGER_CONFIG__';
/**
 * @description 控制台日志打印
 */
class _Logger {
  protected errorStyle =
    'background-color:#ff4d4f;padding: 1px 3px;border-radius:4px;color:#fff;';
  protected warnStyle =
    'background-color:#faad14;padding: 1px 3px;border-radius:4px;color:#fff;';
  protected infoStyle =
    'background-color:rgb(16, 142, 233);padding: 1px 3px;border-radius:4px;color:#fff;';
  protected open = {
    error: true,
    warn: true,
    info: true,
    tag: ''
  };

  constructor() {
    const optionStr = localStorage.getItem(storeKey) as string;
    try {
      const opt = JSON.parse(optionStr);
      this.open = Object.assign(this.open, opt);
    } catch (_error) {
      console.error(_error);
    }
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
  info(tag: string, msg: string) {
    if (this.open.tag != '' && this.open.tag !== tag) {
      return;
    }

    console.log(`%c${tag}`, this.infoStyle, msg);
  }
  warn(tag: string, msg: string) {
    if (this.open.tag != '' && this.open.tag !== tag) {
      return;
    }
    console.log(`%c${tag}`, this.warnStyle, msg);
  }
  error(tag: string, msg: string) {
    if (this.open.tag != '' && this.open.tag !== tag) {
      return;
    }
    console.log(`%c${tag}`, this.errorStyle, msg);
  }
  start(name: string) {
    const start = new Date().getTime();
    return () => {
      const now = new Date().getTime();
      this.info(name, `耗时: ${now - start}ms`);
    };
  }
}

const Logger = new _Logger();

export function _generateHistoryBarsLog(
  j: number,
  subscriptionHistoryList: any[],
  countBack: number,
  from: number,
  to: number
) {
  query('log') &&
    Logger.info(
      `(${j})` + 'Ws received：',
      `${subscriptionHistoryList.length} 条【 ${new Date(
        subscriptionHistoryList[0]?.time * 1000
      ).toLocaleString()} ~ ${new Date(
        subscriptionHistoryList[subscriptionHistoryList.length - 1]?.time * 1000
      ).toLocaleString()} 】`
    );

  query('log') &&
    Logger.error(
      `(${j})` + 'Chart need：',
      `${countBack} 条【 ${new Date(
        from * 1000
      ).toLocaleString()} ～ ${new Date(to * 1000).toLocaleString()} 】`
    );
}

export function _generateHistoryBarsLog2(j: number, bars: any[]) {
  if (bars.length) {
    query('log') &&
      Logger.warn(
        `(${j})` + 'Chart render：',
        `${bars.length} 条【 ${new Date(
          bars[0]?.time
        ).toLocaleString()} ～ ${new Date(
          bars[bars.length - 1]?.time
        ).toLocaleString()} 】`
      );
  } else {
    query('log') && Logger.warn(`(${j})` + 'Render complete', '^.^');
  }
}

export default Logger;
