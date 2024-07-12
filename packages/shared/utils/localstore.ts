import dayjs from 'dayjs';
import { Ref } from 'vue';
import { useEffect } from '#shared/hooks/useEffect';
const valueHandle: { [kye: string]: { stringify: (val: any) => void; parse: (val: any) => any; equal: (now: any, init: any) => boolean } } =
  {
    '[object String]': {
      stringify: (val: string) => val,
      parse: (val: string) => val,
      equal: (now: any, init: any) => now === init,
    },
    '[object Number]': {
      stringify: (val: number) => val,
      parse: (val: number) => Number(val),
      equal: (now, init) => now === init,
    },
    '[object Boolean]': {
      stringify: (val: boolean) => val,
      parse: (val: string) => JSON.parse(val),
      equal: (now, init) => now === init,
    },
    '[object Object]': {
      stringify: (val: Object) => {
        try {
          const valStr = JSON.stringify(val);
          return valStr;
        } catch (error) {
          return JSON.stringify({ __error: 'stringify error!' });
        }
      },
      parse: (val: string) => {
        try {
          return JSON.parse(val);
        } catch (error) {
          return error;
        }
      },
      equal: (now, init) => now === init,
    },
    '[object Date]': {
      stringify: (val: Date) => {
        return val.getTime();
      },
      parse: (val: number) => {
        return new Date(val);
      },
      equal: (now, init) => now.getTime() === init.getTime(),
    },
  };
const changelistenersMap: Map<string, any> = new Map();

function setValue(name: string, val: any) {
  if (val === undefined) {
    localStorage.removeItem(name);
    return;
  }
  const type = Object.prototype.toString.call(val);
  if (!valueHandle[type]) {
    throw new Error('不支持这种类型存储');
  }
  const storeValue = valueHandle[type].stringify(val);
  const _value = {
    type: type,
    value: storeValue,
    updateDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    from: '',
    originValue: val,
  };
  if (import.meta.env.DEV) {
    try {
      throw new Error('123');
    } catch (error: any) {
      const from = (error.stack as string).split('\n')[3].trim().replace('http://localhost:3000', '');
      _value.from = from.substring(0, from.indexOf('?')) + ')';
    }
  }

  localStorage.setItem(name, JSON.stringify(_value));
  const listeners: Set<() => void> = changelistenersMap.get(name) || new Set();
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error(error);
    }
  });
}

function getValue(name: string, defaultValue: any) {
  const storeValue = process.server ? undefined : localStorage.getItem(name);
  if (storeValue === undefined || storeValue === null) return defaultValue;
  try {
    const val = JSON.parse(storeValue) as { type: string; value: any };
    if (!valueHandle[val.type]) {
      throw new Error('异常数据！');
    }
    const result = valueHandle[val.type].parse(val.value);
    return result;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
}

/**
 * @description 本地存储，在vue 的setup方法中使用监听数据变化，非setup中请使用 localStore
 * @param name
 * @param defaultValue
 * @returns
 */
export function useLocalStore<T = any>(nameRef: Ref<string>, defaultValue: () => any) {
  const valueRef = ref<T>(defaultValue());
  useEffect(() => {
    const name = `__${nameRef.value}__`;
    valueRef.value = getValue(name, defaultValue());
    const listener = () => {
      valueRef.value = getValue(name, defaultValue());
    };
    if (!changelistenersMap.has(name)) {
      changelistenersMap.set(name, new Set());
    }
    changelistenersMap.get(name)!.add(listener);
    return () => {
      changelistenersMap.get(name)!.delete(listener);
    };
  }, [nameRef]);
  return {
    unitRef: valueRef,
    update: (val: any) => {
      setValue(`__${nameRef.value}__`, val);
    },
  };
}

// export function useLocalStore()
/**
 * @description 本地存储，一般的使用，不会监听数据变化 在vue的setup中使用 useLocalStore
 * @param name
 * @param defaultValue
 * @returns
 */
export function localStore<T = any>(name: string, defaultValue: T) {
  const realName = '__' + name + '__';
  return {
    value: getValue(realName, defaultValue),
    update: (val: any) => {
      setValue(realName, val);
    },
  };
}
