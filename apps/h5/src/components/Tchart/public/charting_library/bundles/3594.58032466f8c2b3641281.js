(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[3594,959,6437],{259142:function(e,t){var n,r,o;r=[t],n=function(e){"use strict";function t(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var n=!1;if("undefined"!=typeof window){var r={get passive(){n=!0}};window.addEventListener("testPassive",null,r),window.removeEventListener("testPassive",null,r)}var o="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),u=[],c=!1,i=-1,a=void 0,l=void 0,s=function(e){return u.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},f=function(e){var t=e||window.event;return!!s(t.target)||1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1)},d=function(){setTimeout((function(){void 0!==l&&(document.body.style.paddingRight=l,l=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)}))};e.disableBodyScroll=function(e,r){if(o){if(!e)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(e&&!u.some((function(t){return t.targetElement===e}))){var d={targetElement:e,options:r||{}};u=[].concat(t(u),[d]),e.ontouchstart=function(e){1===e.targetTouches.length&&(i=e.targetTouches[0].clientY)},e.ontouchmove=function(t){var n,r,o,u;1===t.targetTouches.length&&(r=e,u=(n=t).targetTouches[0].clientY-i,!s(n.target)&&(r&&0===r.scrollTop&&0<u||(o=r)&&o.scrollHeight-o.scrollTop<=o.clientHeight&&u<0?f(n):n.stopPropagation()))},c||(document.addEventListener("touchmove",f,n?{passive:!1}:void 0),c=!0)}}else{m=r,setTimeout((function(){if(void 0===l){var e=!!m&&!0===m.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(l=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}));var v={targetElement:e,options:r||{}};u=[].concat(t(u),[v])}var m},e.clearAllBodyScrollLocks=function(){o?(u.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),c&&(document.removeEventListener("touchmove",f,n?{passive:!1}:void 0),c=!1),u=[],i=-1):(d(),u=[])},e.enableBodyScroll=function(e){if(o){if(!e)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");e.ontouchstart=null,e.ontouchmove=null,u=u.filter((function(t){return t.targetElement!==e})),c&&0===u.length&&(document.removeEventListener("touchmove",f,n?{passive:!1}:void 0),c=!1)}else 1===u.length&&u[0].targetElement===e?(d(),u=[]):u=u.filter((function(t){return t.targetElement!==e}))}},void 0===(o="function"==typeof n?n.apply(t,r):n)||(e.exports=o)},718736:(e,t,n)=>{"use strict";n.d(t,{useFunctionalRefObject:()=>u});var r=n(50959),o=n(855393);function u(e){const t=(0,r.useMemo)((()=>function(e){const t=n=>{e(n),t.current=n};return t.current=null,t
}((e=>{i.current(e)}))),[]),n=(0,r.useRef)(null),u=t=>{if(null===t)return c(n.current,t),void(n.current=null);n.current!==e&&(n.current=e,c(n.current,t))},i=(0,r.useRef)(u);return i.current=u,(0,o.useIsomorphicLayoutEffect)((()=>{if(null!==t.current)return i.current(t.current),()=>i.current(null)}),[e]),t}function c(e,t){null!==e&&("function"==typeof e?e(t):e.current=t)}},855393:(e,t,n)=>{"use strict";n.d(t,{useIsomorphicLayoutEffect:()=>o});var r=n(50959);function o(e,t){("undefined"==typeof window?r.useEffect:r.useLayoutEffect)(e,t)}},72571:(e,t,n)=>{"use strict";n.d(t,{Icon:()=>o});var r=n(50959);const o=r.forwardRef(((e,t)=>{const{icon:n="",...o}=e;return r.createElement("span",{...o,ref:t,dangerouslySetInnerHTML:{__html:n}})}))},111706:(e,t,n)=>{"use strict";function r(e){return 0===e.detail}n.d(t,{isKeyboardClick:()=>r})},269842:(e,t,n)=>{"use strict";function r(...e){return t=>{for(const n of e)void 0!==n&&n(t)}}n.d(t,{createSafeMulticastEventHandler:()=>r})},865266:(e,t,n)=>{"use strict";n.d(t,{useRovingTabindexElement:()=>c});var r=n(50959),o=n(718736),u=n(892932);function c(e,t=[]){const[n,c]=(0,r.useState)(!1),i=(0,o.useFunctionalRefObject)(e);return(0,r.useLayoutEffect)((()=>{if(!u.PLATFORM_ACCESSIBILITY_ENABLED)return;const e=i.current;if(null===e)return;const t=e=>{switch(e.type){case"roving-tabindex:main-element":c(!0);break;case"roving-tabindex:secondary-element":c(!1)}};return e.addEventListener("roving-tabindex:main-element",t),e.addEventListener("roving-tabindex:secondary-element",t),()=>{e.removeEventListener("roving-tabindex:main-element",t),e.removeEventListener("roving-tabindex:secondary-element",t)}}),t),[i,u.PLATFORM_ACCESSIBILITY_ENABLED?n?0:-1:void 0]}},695257:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},p=Object.assign,y={};function E(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||m}function b(){}function h(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||m}E.prototype.isReactComponent={},E.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},E.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=E.prototype;var g=h.prototype=new b;g.constructor=h,p(g,E.prototype),g.isPureReactComponent=!0;var _=Array.isArray,S=Object.prototype.hasOwnProperty,w={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};function T(e,t,r){var o,u={},c=null,i=null
;if(null!=t)for(o in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(c=""+t.key),t)S.call(t,o)&&!L.hasOwnProperty(o)&&(u[o]=t[o]);var a=arguments.length-2;if(1===a)u.children=r;else if(1<a){for(var l=Array(a),s=0;s<a;s++)l[s]=arguments[s+2];u.children=l}if(e&&e.defaultProps)for(o in a=e.defaultProps)void 0===u[o]&&(u[o]=a[o]);return{$$typeof:n,type:e,key:c,ref:i,props:u,_owner:w.current}}function I(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var A=/\/+/g;function R(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function C(e,t,o,u,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var a=!1;if(null===e)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case n:case r:a=!0}}if(a)return c=c(a=e),e=""===u?"."+R(a,0):u,_(c)?(o="",null!=e&&(o=e.replace(A,"$&/")+"/"),C(c,t,o,"",(function(e){return e}))):null!=c&&(I(c)&&(c=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,o+(!c.key||a&&a.key===c.key?"":(""+c.key).replace(A,"$&/")+"/")+e)),t.push(c)),1;if(a=0,u=""===u?".":u+":",_(e))for(var l=0;l<e.length;l++){var s=u+R(i=e[l],l);a+=C(i,t,o,s,c)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=v&&e[v]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),l=0;!(i=e.next()).done;)a+=C(i=i.value,t,o,s=u+R(i,l++),c);else if("object"===i)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function k(e,t,n){if(null==e)return e;var r=[],o=0;return C(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function M(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var B={current:null},x={transition:null},O={ReactCurrentDispatcher:B,ReactCurrentBatchConfig:x,ReactCurrentOwner:w};t.Children={map:k,forEach:function(e,t,n){k(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return k(e,(function(){t++})),t},toArray:function(e){return k(e,(function(e){return e}))||[]},only:function(e){if(!I(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=E,t.Fragment=o,t.Profiler=c,t.PureComponent=h,t.StrictMode=u,t.Suspense=s,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=p({},e.props),u=e.key,c=e.ref,i=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,i=w.current),void 0!==t.key&&(u=""+t.key),
e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)S.call(t,l)&&!L.hasOwnProperty(l)&&(o[l]=void 0===t[l]&&void 0!==a?a[l]:t[l])}var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){a=Array(l);for(var s=0;s<l;s++)a[s]=arguments[s+2];o.children=a}return{$$typeof:n,type:e.type,key:u,ref:c,props:o,_owner:i}},t.createContext=function(e){return(e={$$typeof:a,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=T,t.createFactory=function(e){var t=T.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=I,t.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:M}},t.memo=function(e,t){return{$$typeof:f,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=x.transition;x.transition={};try{e()}finally{x.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return B.current.useCallback(e,t)},t.useContext=function(e){return B.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return B.current.useDeferredValue(e)},t.useEffect=function(e,t){return B.current.useEffect(e,t)},t.useId=function(){return B.current.useId()},t.useImperativeHandle=function(e,t,n){return B.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return B.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return B.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return B.current.useMemo(e,t)},t.useReducer=function(e,t,n){return B.current.useReducer(e,t,n)},t.useRef=function(e){return B.current.useRef(e)},t.useState=function(e){return B.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return B.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return B.current.useTransition()},t.version="18.2.0"},50959:(e,t,n)=>{"use strict";e.exports=n(695257)},502869:e=>{e.exports={button:"button-xNqEcuN2"}},179807:(e,t,n)=>{"use strict";n.d(t,{focusFirstMenuItem:()=>l,handleAccessibleMenuFocus:()=>i,handleAccessibleMenuKeyDown:()=>a,queryMenuElements:()=>d});var r=n(892932),o=n(27164),u=n(180185);const c=[37,39,38,40];function i(e,t){e.target&&r.PLATFORM_ACCESSIBILITY_ENABLED&&e.relatedTarget===t.current&&l(e.target)}function a(e){if(!r.PLATFORM_ACCESSIBILITY_ENABLED)return;if(e.defaultPrevented)return;const t=(0,u.hashFromEvent)(e);if(!c.includes(t))return;const n=document.activeElement;if(!(document.activeElement instanceof HTMLElement))return;const i=d(e.currentTarget).sort(r.navigationOrderComparator);if(0===i.length)return;const a=document.activeElement.closest('[data-role="menuitem"]');if(!(a instanceof HTMLElement))return;const l=i.indexOf(a);if(-1===l)return;const m=v(a),p=m.indexOf(document.activeElement),y=-1!==p,E=e=>{n&&(0,o.becomeSecondaryElement)(n),(0,o.becomeMainElement)(e),e.focus()};switch(t){case 37:
if(!m.length)return;e.preventDefault(),E(0===p?i[l]:y?s(m,p,-1):m[m.length-1]);break;case 39:if(!m.length)return;e.preventDefault(),p===m.length-1?E(i[l]):E(y?s(m,p,1):m[0]);break;case 38:{e.preventDefault();const t=s(i,l,-1);if(y){const e=f(t,p);E(e||t);break}E(t);break}case 40:{e.preventDefault();const t=s(i,l,1);if(y){const e=f(t,p);E(e||t);break}E(t)}}}function l(e){const[t]=d(e);t&&((0,o.becomeMainElement)(t),t.focus())}function s(e,t,n){return e[(t+e.length+n)%e.length]}function f(e,t){const n=v(e);return n.length?n[(t+n.length)%n.length]:null}function d(e){return Array.from(e.querySelectorAll('[data-role="menuitem"]:not([disabled], [aria-disabled])')).filter((0,r.createScopedVisibleElementFilter)(e))}function v(e){return Array.from(e.querySelectorAll("[tabindex]:not([disabled], [aria-disabled])")).filter((0,r.createScopedVisibleElementFilter)(e))}},27164:(e,t,n)=>{"use strict";function r(e){e.dispatchEvent(new CustomEvent("roving-tabindex:main-element"))}function o(e){e.dispatchEvent(new CustomEvent("roving-tabindex:secondary-element"))}n.d(t,{becomeMainElement:()=>r,becomeSecondaryElement:()=>o})},869194:(e,t,n)=>{"use strict";n.d(t,{useMouseClickAutoBlur:()=>c});var r=n(50959),o=n(111706),u=n(892932);function c(e){(0,r.useEffect)((()=>{if(!u.PLATFORM_ACCESSIBILITY_ENABLED)return;const t=t=>{const n=e.current;null!==n&&document.activeElement instanceof HTMLElement&&((0,o.isKeyboardClick)(t)||n.contains(document.activeElement)&&"INPUT"!==document.activeElement.tagName&&document.activeElement.blur())};return window.addEventListener("click",t,!0),()=>window.removeEventListener("click",t,!0)}),[])}},395907:(e,t,n)=>{"use strict";n.d(t,{ToolWidgetIconButton:()=>i});var r=n(50959),o=n(497754),u=n(747633),c=n(502869);const i=r.forwardRef((function(e,t){const{className:n,id:i,...a}=e;return r.createElement(u.ToolWidgetButton,{"data-name":i,...a,ref:t,className:o(n,c.button)})}))},332913:(e,t,n)=>{"use strict";n.d(t,{ToolbarIconButton:()=>i});var r=n(50959),o=n(865266),u=n(892932),c=n(395907);const i=(0,r.forwardRef)((function(e,t){const{tooltip:n,...i}=e,[a,l]=(0,o.useRovingTabindexElement)(t);return r.createElement(c.ToolWidgetIconButton,{"aria-label":u.PLATFORM_ACCESSIBILITY_ENABLED?n:void 0,...i,tag:u.PLATFORM_ACCESSIBILITY_ENABLED?"button":"div",ref:a,tabIndex:l,"data-tooltip":n})}))},53431:(e,t,n)=>{"use strict";n.d(t,{ToolbarMenuButton:()=>s});var r=n(50959),o=n(718736),u=n(518799),c=n(865266),i=n(892932),a=n(869194),l=n(179807);const s=(0,r.forwardRef)((function(e,t){const{tooltip:n,menuReference:s=null,...f}=e,[d,v]=(0,c.useRovingTabindexElement)(null),m=(0,o.useFunctionalRefObject)(s);return(0,a.useMouseClickAutoBlur)(m),r.createElement(u.ToolWidgetMenu,{"aria-label":i.PLATFORM_ACCESSIBILITY_ENABLED?n:void 0,...f,ref:t,tag:i.PLATFORM_ACCESSIBILITY_ENABLED?"button":"div",reference:d,tabIndex:v,"data-tooltip":n,menuReference:m,onMenuKeyDown:l.handleAccessibleMenuKeyDown,onMenuFocus:e=>(0,l.handleAccessibleMenuFocus)(e,d)})}))}}]);