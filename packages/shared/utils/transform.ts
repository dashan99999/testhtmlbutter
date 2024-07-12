import dayjs from 'dayjs';

const keysParamSymble = Symbol('__keysParamSymble__');
const getterSymble = Symbol('__getter__');
interface IAttrParamValue {
  type: any;
  defaultValue: any;
  parse: (val: any, obj: any, options: any) => any;
  options: any;
}
type IAttrParam = { [key: string]: IAttrParamValue };

export function Transform(): any {
  return () => {};
}

const defaultParse = {
  string: (val: any) => String(val),
  number: (val: any) => Number(val),
  time: (val: string, _: any, options: { format: string }) => {
    const obj = Object.assign({ format: 'YYYY-MM-DD HH:mm:ss' }, options);
    return dayjs(val).format(obj.format);
  },
};

export function Field(type: keyof typeof defaultParse, options: any = {}) {
  return (target: any, attr: string) => {
    let attrParam: IAttrParam = target.constructor[keysParamSymble];
    if (!target.constructor[keysParamSymble]) {
      Object.defineProperty(target.constructor, keysParamSymble, {
        enumerable: false,
        value: {},
      });
      attrParam = target.constructor[keysParamSymble];
    }
    if (!attrParam[attr]) {
      attrParam[attr] = {
        type: type,
        defaultValue: target[attr],
        parse: defaultParse[type],
        options: options,
      };
    }
  };
}
type GetterParam = (instance: any) => any;
type MapParam = ((val: any) => any) | { [key: string | number | '_default']: any };
type AttrOpt = { getter?: GetterParam; setter?: () => void; map?: MapParam };
export function Getter(getter: GetterParam) {
  return (target: any, attr: string) => {
    let accessParams: AttrOpt = target.constructor[getterSymble];
    if (!target.constructor[getterSymble]) {
      Object.defineProperty(target.constructor, getterSymble, {
        enumerable: false,
        value: {},
      });
      accessParams = target.constructor[getterSymble];
    }
    if (!accessParams[attr]) {
      accessParams.getter = getter;
    }
  };
}

export function MapValue(map: MapParam) {
  return (target: any, attr: string) => {
    let accessParams: AttrOpt = target.constructor[getterSymble];
    if (!target.constructor[getterSymble]) {
      Object.defineProperty(target.constructor, getterSymble, {
        enumerable: false,
        value: {},
      });
      accessParams = target.constructor[getterSymble];
    }
    if (!accessParams[attr]) {
      accessParams[attr] = {};
    }
    accessParams[attr].map = map;
  };
}

export function objToClass<T = any>(cls: { new (...args: any): T }, json: any | any[]): T | T[] {
  let value: any = [];
  if (Array.isArray(json)) {
    value = json;
  } else {
    value = [json];
  }
  const result: any[] = [];
  for (const item of value) {
    const obj = new cls();
    for (const key in item) {
      const attr: IAttrParamValue = cls[keysParamSymble][key];
      if (attr) {
        obj[key] = attr.parse(item[key], item, attr.options);
      } else {
        obj[key] = item[key];
      }
    }
    const accessParams = cls[getterSymble] || {};
    for (const accessKey in accessParams) {
      const access = accessParams[accessKey] as AttrOpt;
      if (access.getter) {
        obj[accessKey] = access.getter(obj);
      }
      if (access.map) {
        if (typeof access.map === 'function') {
          obj[accessKey] = access.map(obj[accessKey]);
        }
        if (typeof access.map === 'object') {
          obj[accessKey] = access.map[obj[accessKey]];
        }
      }
    }
    result.push(obj);
  }
  return Array.isArray(value) ? result : result[0];
}
