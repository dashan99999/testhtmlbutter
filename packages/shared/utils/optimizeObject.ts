export function removeAtrr<T extends object>(obj: T, remainAttr: string[]): any {
  const res: { [key: string]: any } = {};
  for (const key in obj) {
    if (remainAttr.indexOf(key) !== -1) {
      res[key] = obj[key];
    }
  }
  return res;
}
export function optimizeObject<T>(data: T, remainAttr: string[]): any {
  if (typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    const res: any[] = [];
    for (const item of data) {
      res.push(removeAtrr(item, remainAttr));
    }
    return res;
  } else {
    // @ts-ignore
    return removeAtrr(data, remainAttr);
  }
}
