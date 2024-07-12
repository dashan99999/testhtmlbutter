import dsBridge from 'dsbridge';
/** @__NO_SIDE_EFFECTS__ */
export default {
  /**
   * 前端调用app声明的方法(同步)
   * @param name 方法名
   * @param data 参数 建议以string类型传递方便解析
   * @param callback 回调
   */
  syncMethod(name, data) {
    return dsBridge.call(name, data);
  },
  /**
   * 前端调用app声明的方法
   * @param name 方法名
   * @param data 参数 建议以string类型传递方便解析
   * @param callback 回调
   */
  callMethod(name, data, callback) {
    callback(dsBridge.call(name, data, callback));
  },
  /**
   * app调用前端声明的方法，在前端注册事件
   * @param tag 方法名
   * @param callback 回调
   */
  registerMethod(tag, callback) {
    dsBridge.register(tag, callback);
  },
};

// 官方示例

//同步调用
// var str=dsBridge.call("testSyn","testSyn");

//异步调用
// dsBridge.call("testAsyn","testAsyn", function (v) {
//   alert(v);
// })

//注册 javascript API
//  dsBridge.register('addValue',function(l,r){
//      return l+r;
//  })
