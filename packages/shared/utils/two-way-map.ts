/**
 * @description 内部生成key-value和value-key,方便查找处理，未处理一个value对应多个key的情况
 */
export class TwoWapMap {
  protected keyValueMap: Map<string, any> = new Map();
  protected valueKeyMap: Map<any, string> = new Map();
  get size() {
    return this.keyValueMap.size;
  }
  set(key: string, value: any) {
    this.keyValueMap.set(key, value);
    this.valueKeyMap.set(key, value);
  }
  getByKey(key: string) {
    return this.keyValueMap.get(key);
  }
  getByValue(value: any) {
    return this.valueKeyMap.get(value);
  }
  deleteByKey(key: string) {
    const value = this.keyValueMap.get(key);
    this.valueKeyMap.delete(value);
    this.keyValueMap.delete(key);
  }
  deleteByValue(value: any) {
    const key = this.valueKeyMap.get(value) as string;
    this.keyValueMap.delete(key);
    this.valueKeyMap.delete(value);
  }
  clear() {
    this.valueKeyMap.clear();
    this.keyValueMap.clear();
  }
}
