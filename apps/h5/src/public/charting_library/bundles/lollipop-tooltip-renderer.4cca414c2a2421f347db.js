(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[9039,959,6437],{259142:function(e,t){var n,o,r;o=[t],n=function(e){"use strict";function t(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var n=!1;if("undefined"!=typeof window){var o={get passive(){n=!0}};window.addEventListener("testPassive",null,o),window.removeEventListener("testPassive",null,o)}var r="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),l=[],i=!1,a=-1,s=void 0,c=void 0,u=function(e){return l.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},d=function(e){var t=e||window.event;return!!u(t.target)||1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1)},f=function(){setTimeout((function(){void 0!==c&&(document.body.style.paddingRight=c,c=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0)}))};e.disableBodyScroll=function(e,o){if(r){if(!e)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(e&&!l.some((function(t){return t.targetElement===e}))){var f={targetElement:e,options:o||{}};l=[].concat(t(l),[f]),e.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},e.ontouchmove=function(t){var n,o,r,l;1===t.targetTouches.length&&(o=e,l=(n=t).targetTouches[0].clientY-a,!u(n.target)&&(o&&0===o.scrollTop&&0<l||(r=o)&&r.scrollHeight-r.scrollTop<=r.clientHeight&&l<0?d(n):n.stopPropagation()))},i||(document.addEventListener("touchmove",d,n?{passive:!1}:void 0),i=!0)}}else{m=o,setTimeout((function(){if(void 0===c){var e=!!m&&!0===m.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(c=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden")}));var p={targetElement:e,options:o||{}};l=[].concat(t(l),[p])}var m},e.clearAllBodyScrollLocks=function(){r?(l.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),i&&(document.removeEventListener("touchmove",d,n?{passive:!1}:void 0),i=!1),l=[],a=-1):(f(),l=[])},e.enableBodyScroll=function(e){if(r){if(!e)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");e.ontouchstart=null,e.ontouchmove=null,l=l.filter((function(t){return t.targetElement!==e})),i&&0===l.length&&(document.removeEventListener("touchmove",d,n?{passive:!1}:void 0),i=!1)}else 1===l.length&&l[0].targetElement===e?(f(),l=[]):l=l.filter((function(t){return t.targetElement!==e}))}},void 0===(r="function"==typeof n?n.apply(t,o):n)||(e.exports=r)},966076:e=>{e.exports={"default-drawer-min-top-distance":"100px",wrap:"wrap-_HnK0UIN",positionBottom:"positionBottom-_HnK0UIN",backdrop:"backdrop-_HnK0UIN",drawer:"drawer-_HnK0UIN",
positionLeft:"positionLeft-_HnK0UIN"}},778199:(e,t,n)=>{"use strict";function o(e,t,n,o,r){function l(r){if(e>r.timeStamp)return;const l=r.target;void 0!==n&&null!==t&&null!==l&&l.ownerDocument===o&&(t.contains(l)||n(r))}return r.click&&o.addEventListener("click",l,!1),r.mouseDown&&o.addEventListener("mousedown",l,!1),r.touchEnd&&o.addEventListener("touchend",l,!1),r.touchStart&&o.addEventListener("touchstart",l,!1),()=>{o.removeEventListener("click",l,!1),o.removeEventListener("mousedown",l,!1),o.removeEventListener("touchend",l,!1),o.removeEventListener("touchstart",l,!1)}}n.d(t,{addOutsideEventListener:()=>o})},72571:(e,t,n)=>{"use strict";n.d(t,{Icon:()=>r});var o=n(50959);const r=o.forwardRef(((e,t)=>{const{icon:n="",...r}=e;return o.createElement("span",{...r,ref:t,dangerouslySetInnerHTML:{__html:n}})}))},163694:(e,t,n)=>{"use strict";n.d(t,{DrawerContext:()=>i,DrawerManager:()=>l});var o=n(50959),r=n(285089);class l extends o.PureComponent{constructor(e){super(e),this._isBodyFixed=!1,this._addDrawer=e=>{this.setState((t=>({stack:[...t.stack,e]})))},this._removeDrawer=e=>{this.setState((t=>({stack:t.stack.filter((t=>t!==e))})))},this.state={stack:[]}}componentDidUpdate(e,t){!t.stack.length&&this.state.stack.length&&((0,r.setFixedBodyState)(!0),this._isBodyFixed=!0),t.stack.length&&!this.state.stack.length&&this._isBodyFixed&&((0,r.setFixedBodyState)(!1),this._isBodyFixed=!1)}componentWillUnmount(){this.state.stack.length&&this._isBodyFixed&&(0,r.setFixedBodyState)(!1)}render(){return o.createElement(i.Provider,{value:{addDrawer:this._addDrawer,removeDrawer:this._removeDrawer,currentDrawer:this.state.stack.length?this.state.stack[this.state.stack.length-1]:null}},this.props.children)}}const i=o.createContext(null)},759339:(e,t,n)=>{"use strict";n.d(t,{Drawer:()=>f});var o=n(50959),r=n(650151),l=n(497754),i=n(189904),a=n(8361),s=n(163694),c=n(28466),u=n(742554),d=n(966076);function f(e){const{position:t="Bottom",onClose:n,children:u,className:f,theme:m=d}=e,h=(0,r.ensureNotNull)((0,o.useContext)(s.DrawerContext)),[v]=(0,o.useState)((()=>(0,i.randomHash)())),y=(0,o.useRef)(null),g=(0,o.useContext)(c.CloseDelegateContext);return(0,o.useLayoutEffect)((()=>((0,r.ensureNotNull)(y.current).focus({preventScroll:!0}),g.subscribe(h,n),h.addDrawer(v),()=>{h.removeDrawer(v),g.unsubscribe(h,n)})),[]),o.createElement(a.Portal,null,o.createElement("div",{className:l(d.wrap,d[`position${t}`])},v===h.currentDrawer&&o.createElement("div",{className:d.backdrop,onClick:n}),o.createElement(p,{className:l(m.drawer,d[`position${t}`],f),ref:y,"data-name":e["data-name"]},u)))}const p=(0,o.forwardRef)(((e,t)=>{const{className:n,...r}=e;return o.createElement(u.TouchScrollContainer,{className:l(d.drawer,n),tabIndex:-1,ref:t,...r})}))},683614:(e,t,n)=>{"use strict";n.d(t,{useVisibility:()=>r});var o=n(50959);function r(e,t,n){(0,o.useEffect)((()=>{const o=new IntersectionObserver((e=>{e[e.length-1].intersectionRatio<.25?n():t()}),{threshold:[0,.25,.5,.75,1],root:null,rootMargin:"0px"});return e.current&&o.observe(e.current),
()=>o.disconnect()}),[])}},624216:(e,t,n)=>{"use strict";n.d(t,{PopupMenu:()=>f});var o=n(50959),r=n(500962),l=n(162942),i=n(8361),a=n(510618),s=n(28466);const c=o.createContext(void 0);var u=n(908783);const d=o.createContext({setMenuMaxWidth:!1});function f(e){const{controller:t,children:n,isOpened:f,closeOnClickOutside:p=!0,doNotCloseOn:m,onClickOutside:h,onClose:v,onKeyboardClose:y,"data-name":g="popup-menu-container",...b}=e,E=(0,o.useContext)(s.CloseDelegateContext),w=o.useContext(d),C=(0,o.useContext)(c),k=(0,u.useOutsideEvent)({handler:function(e){h&&h(e);if(!p)return;const t=(0,l.default)(m)?m():null==m?[]:[m];if(t.length>0&&e.target instanceof Node)for(const n of t){const t=r.findDOMNode(n);if(t instanceof Node&&t.contains(e.target))return}v()},mouseDown:!0,touchStart:!0});return f?o.createElement(i.Portal,{top:"0",left:"0",right:"0",bottom:"0",pointerEvents:"none"},o.createElement("span",{ref:k,style:{pointerEvents:"auto"}},o.createElement(a.Menu,{...b,onClose:v,onKeyboardClose:y,onScroll:function(t){const{onScroll:n}=e;n&&n(t)},customCloseDelegate:E,customRemeasureDelegate:C,ref:t,"data-name":g,limitMaxWidth:w.setMenuMaxWidth},n))):null}},734602:(e,t,n)=>{"use strict";n.d(t,{useGlobalCloseOnScrollAndCustomEvents:()=>l});var o=n(50959),r=n(370981);function l(e){(0,o.useEffect)((()=>{return e=i,window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e);var e}),[]),(0,o.useEffect)((()=>{if(e.length)return function(e,t){for(const n of e)n.subscribe(null,t);return()=>{for(const n of e)n.unsubscribe(null,t)}}(e,i)}),e)}function i(){(0,r.globalCloseMenu)()}},914090:(e,t,n)=>{"use strict";n.d(t,{TooltipPopup:()=>s});var o=n(50959),r=n(624216),l=n(370981),i=n(180185),a=n(372605);const s=(0,o.forwardRef)(((e,t)=>{const{onClose:n,onForceClose:s,onClickOutside:c,className:u,...d}=e,f=(0,o.useRef)(null);(0,o.useEffect)((()=>(l.globalCloseDelegate.subscribe(null,s),()=>{l.globalCloseDelegate.unsubscribe(null,s)})),[s]);const p=(0,o.useCallback)((e=>{27===(0,i.hashFromEvent)(e)&&(e.preventDefault(),s())}),[s]),m=(0,o.useCallback)((()=>{f.current&&f.current.focus({preventScroll:!0})}),[]);return o.createElement(r.PopupMenu,{className:u,isOpened:!0,tabIndex:-1,reference:e=>{"function"==typeof t?t(e):(0,a.isObject)(t)&&(t.current=e),f.current=e},onClose:n,onClickOutside:c,onKeyDown:p,onOpen:m,...d},e.children)}));s.displayName="TooltipPopup"},742554:(e,t,n)=>{"use strict";n.d(t,{TouchScrollContainer:()=>a});var o=n(50959),r=n(259142),l=n(650151),i=n(601227);const a=(0,o.forwardRef)(((e,t)=>{const{children:n,...l}=e,a=(0,o.useRef)(null);return(0,o.useImperativeHandle)(t,(()=>a.current)),(0,o.useLayoutEffect)((()=>{if(i.CheckMobile.iOS())return null!==a.current&&(0,r.disableBodyScroll)(a.current,{allowTouchMove:s(a)}),()=>{null!==a.current&&(0,r.enableBodyScroll)(a.current)}}),[]),o.createElement("div",{ref:a,...l},n)}));function s(e){return t=>{const n=(0,l.ensureNotNull)(e.current),o=document.activeElement;return!n.contains(t)||null!==o&&n.contains(o)&&o.contains(t)}}},493173:(e,t,n)=>{"use strict"
;function o(e,t,n={}){return Object.assign({},e,function(e,t,n={}){const o=Object.assign({},t);for(const r of Object.keys(t)){const l=n[r]||r;l in e&&(o[r]=[e[l],t[r]].join(" "))}return o}(e,t,n))}n.d(t,{mergeThemes:()=>o})},695257:(e,t)=>{"use strict";var n=Symbol.for("react.element"),o=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}function g(){}function b(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=y.prototype;var E=b.prototype=new g;E.constructor=b,h(E,y.prototype),E.isPureReactComponent=!0;var w=Array.isArray,C=Object.prototype.hasOwnProperty,k={current:null},_={key:!0,ref:!0,__self:!0,__source:!0};function T(e,t,o){var r,l={},i=null,a=null;if(null!=t)for(r in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(i=""+t.key),t)C.call(t,r)&&!_.hasOwnProperty(r)&&(l[r]=t[r]);var s=arguments.length-2;if(1===s)l.children=o;else if(1<s){for(var c=Array(s),u=0;u<s;u++)c[u]=arguments[u+2];l.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps)void 0===l[r]&&(l[r]=s[r]);return{$$typeof:n,type:e,key:i,ref:a,props:l,_owner:k.current}}function x(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var S=/\/+/g;function O(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function N(e,t,r,l,i){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var s=!1;if(null===e)s=!0;else switch(a){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case n:case o:s=!0}}if(s)return i=i(s=e),e=""===l?"."+O(s,0):l,w(i)?(r="",null!=e&&(r=e.replace(S,"$&/")+"/"),N(i,t,r,"",(function(e){return e}))):null!=i&&(x(i)&&(i=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(S,"$&/")+"/")+e)),t.push(i)),1;if(s=0,l=""===l?".":l+":",w(e))for(var c=0;c<e.length;c++){var u=l+O(a=e[c],c);s+=N(a,t,r,u,i)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),
c=0;!(a=e.next()).done;)s+=N(a=a.value,t,r,u=l+O(a,c++),i);else if("object"===a)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function R(e,t,n){if(null==e)return e;var o=[],r=0;return N(e,o,"","",(function(e){return t.call(n,e,r++)})),o}function B(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var M={current:null},F={transition:null},D={ReactCurrentDispatcher:M,ReactCurrentBatchConfig:F,ReactCurrentOwner:k};t.Children={map:R,forEach:function(e,t,n){R(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return R(e,(function(){t++})),t},toArray:function(e){return R(e,(function(e){return e}))||[]},only:function(e){if(!x(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=y,t.Fragment=r,t.Profiler=i,t.PureComponent=b,t.StrictMode=l,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,t.cloneElement=function(e,t,o){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=h({},e.props),l=e.key,i=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,a=k.current),void 0!==t.key&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)C.call(t,c)&&!_.hasOwnProperty(c)&&(r[c]=void 0===t[c]&&void 0!==s?s[c]:t[c])}var c=arguments.length-2;if(1===c)r.children=o;else if(1<c){s=Array(c);for(var u=0;u<c;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:n,type:e.type,key:l,ref:i,props:r,_owner:a}},t.createContext=function(e){return(e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=T,t.createFactory=function(e){var t=T.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=x,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:B}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=F.transition;F.transition={};try{e()}finally{F.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return M.current.useCallback(e,t)},t.useContext=function(e){return M.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return M.current.useDeferredValue(e)},t.useEffect=function(e,t){return M.current.useEffect(e,t)},t.useId=function(){return M.current.useId()},t.useImperativeHandle=function(e,t,n){
return M.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return M.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return M.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return M.current.useMemo(e,t)},t.useReducer=function(e,t,n){return M.current.useReducer(e,t,n)},t.useRef=function(e){return M.current.useRef(e)},t.useState=function(e){return M.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return M.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return M.current.useTransition()},t.version="18.2.0"},50959:(e,t,n)=>{"use strict";e.exports=n(695257)},825105:e=>{e.exports={drawer:"drawer-xBKhVqal",drawerItem:"drawerItem-xBKhVqal",menuWrap:"menuWrap-xBKhVqal",scrollWrap:"scrollWrap-xBKhVqal",menuBox:"menuBox-xBKhVqal",card:"card-xBKhVqal",cardRow:"cardRow-xBKhVqal",mini:"mini-xBKhVqal",fadeTop:"fadeTop-xBKhVqal",fadeBottom:"fadeBottom-xBKhVqal"}},895795:e=>{e.exports={lollipopTooltipTitle:"lollipopTooltipTitle-hkWvPxQc",lollipopTooltipTitle_minimal:"lollipopTooltipTitle_minimal-hkWvPxQc",lollipopTooltipTitle__title:"lollipopTooltipTitle__title-hkWvPxQc",lollipopTooltipTitle_mobile:"lollipopTooltipTitle_mobile-hkWvPxQc",lollipopTooltipTitle__icon:"lollipopTooltipTitle__icon-hkWvPxQc"}},713668:e=>{e.exports={content:"content-tm3FiOQl",contentWithTab:"contentWithTab-tm3FiOQl",group:"group-tm3FiOQl",subtitle:"subtitle-tm3FiOQl",text:"text-tm3FiOQl",tabsWrapper:"tabsWrapper-tm3FiOQl",tabsContentWrapper:"tabsContentWrapper-tm3FiOQl",groupIcon:"groupIcon-tm3FiOQl",beforeMarketOpen:"beforeMarketOpen-tm3FiOQl",afterMarketClose:"afterMarketClose-tm3FiOQl",groupTitle:"groupTitle-tm3FiOQl",groupRow:"groupRow-tm3FiOQl",groupCell:"groupCell-tm3FiOQl",link:"link-tm3FiOQl",mob:"mob-tm3FiOQl",mini:"mini-tm3FiOQl",generalContent:"generalContent-tm3FiOQl"}},698793:(e,t,n)=>{"use strict";n.r(t),n.d(t,{showLollipopTooltip:()=>N});var o=n(50959),r=n(500962),l=n(650151),i=n(497754),a=n.n(i),s=n(683614),c=n(930052),u=n(759339),d=n(163694),f=n(914090),p=n(734602),m=n(493173),h=n(510618),v=n(72571),y=n(895795);function g(e){const{title:t,icon:n,iconStyle:r,className:l,cardType:i}=e;return o.createElement("div",{className:a()(y.lollipopTooltipTitle,["mob"===i&&y.lollipopTooltipTitle_mobile,"mini"===i&&y.lollipopTooltipTitle_minimal],l)},n&&o.createElement(v.Icon,{icon:n,className:y.lollipopTooltipTitle__icon,style:r}),o.createElement("span",{className:y.lollipopTooltipTitle__title},t))}var b,E=n(713668);function w(e){const{text:t,href:n,onClick:r}=e;return o.createElement("a",{href:n,onClick:r&&(e=>{e.preventDefault(),r()}),className:E.link},t)}function C(e){const{name:t,value:n,style:r,valueStyle:l,onValueClick:i,valueRightIcon:s,className:c}=e;return o.createElement("div",{className:a()(E.groupRow,c),style:r},t&&o.createElement("div",{className:E.groupCell},o.createElement("span",{className:E.text},t)),o.createElement("div",{className:E.groupCell},o.createElement("span",{className:E.text,style:l,onClick:i},n),s&&o.createElement(v.Icon,{icon:s.iconContent,
className:a()(E.groupIcon,s.iconClass,"apply-common-tooltip"),title:s.tooltipText})))}function k(e){const{content:t=[],subTitle:n,cardRowClass:r}=e,l=t.map(((e,t)=>{const{title:n,content:r}=e;return o.createElement("div",{key:`group${t}`,className:E.group},n&&o.createElement("span",{className:E.groupTitle},n),r.map(((e,t)=>o.createElement(C,{key:`contentRow${t}`,...e}))))})),i="string"==typeof n?n:n.map(((e,t)=>o.createElement(C,{key:`subTitle${t}`,...e})));return o.createElement("div",{className:r},o.createElement("span",{className:E.subtitle},i),l.length>0&&o.createElement("div",null,l))}!function(e){e[e.BeforeMarketOpen=E.beforeMarketOpen]="BeforeMarketOpen",e[e.AfterMarketClose=E.afterMarketClose]="AfterMarketClose"}(b||(b={}));function _(e){var t;const{cardType:n,anchor:r,title:l,tooltipIcon:i,...s}=e,c=n?a()(E.content,E[n]):E.content,u=(0,o.useMemo)((()=>{var t;return l&&i?{color:null===(t=e.style)||void 0===t?void 0:t.color}:void 0}),[!!l,!!i,null===(t=e.style)||void 0===t?void 0:t.color]);return o.createElement("div",{className:c},l&&o.createElement(g,{title:l,icon:i,iconStyle:u,cardType:n}),"common"===s.type&&o.createElement(k,{...s}),r&&("mob"!==n||!r.hideInMobileMode)&&o.createElement("div",{className:E.group},o.createElement(w,{...r})))}var T=n(825105);const x=(0,m.mergeThemes)(h.DEFAULT_MENU_THEME,{menuWrap:T.menuWrap,menuBox:T.menuBox});function S(e){const{tooltips:t,onClose:n,onForceClose:r,onClickOutside:l,position:i,customCloseSubscriptions:m=[],showScrollFades:h,cardType:v,doNotCloseOn:y}=e,g=(0,o.useRef)(null),b=(0,o.useRef)(null),E=(0,o.useRef)(null),w=(0,o.useRef)(null),[C,k]=(0,o.useState)("100%"),S=e=>{null!==e&&k(`${e.clientWidth}px`)},[O,N]=(0,o.useState)(!1);(0,s.useVisibility)(E,(()=>N(!1)),(()=>N(!0)));const R={display:O?"block":"none",width:C},[B,M]=(0,o.useState)(!1);(0,s.useVisibility)(w,(()=>M(!1)),(()=>M(!0)));const F={display:B?"block":"none",width:C};(0,p.useGlobalCloseOnScrollAndCustomEvents)(m);const D=v?a()(T.card,T[v]):T.card;return o.createElement(d.DrawerManager,null,o.createElement(c.MatchMedia,{rule:"screen and (max-width: 419px)"},(e=>e?o.createElement(u.Drawer,{className:T.drawer,onClose:r||n,position:"Bottom"},t.map(((e,t)=>o.createElement("div",{key:`${t}`,className:T.drawerItem},o.createElement(_,{cardType:"mob",...e}))))):o.createElement(f.TooltipPopup,{position:i,theme:x,onClose:n,onForceClose:r||n,onClickOutside:l,doNotCloseOn:y},h&&o.createElement(o.Fragment,null,o.createElement("div",{ref:g,className:T.fadeTop,style:R}),o.createElement("div",{ref:E})),o.createElement("div",{ref:S},t.map(((e,t)=>{var n;return o.createElement("div",{key:`${t}`,className:D,style:{borderColor:null===(n=e.style)||void 0===n?void 0:n.color}},o.createElement(_,{cardType:v,...e}))}))),h&&o.createElement(o.Fragment,null,o.createElement("div",{ref:w}),o.createElement("div",{ref:b,className:T.fadeBottom,style:F}))))))}let O=null;function N(e){if(!e.items.length)return()=>{};const t={tooltips:e.items,onClose:R,onForceClose:()=>{R(),"function"==typeof e.onCustomClose&&e.onCustomClose()},
onClickOutside:e.onClickOutside,doNotCloseOn:e.doNotCloseOn,position:B.bind(null,e.position),customCloseSubscriptions:e.customCloseSubscriptions,showScrollFades:e.showScrollFades,cardType:e.cardType};return null===O&&(O=document.createElement("div"),document.body.appendChild(O)),r.render(o.createElement(S,{...t}),O),R}function R(){null!==O&&(r.unmountComponentAtNode(O),O.remove(),O=null)}function B(e,t,n){const o=e.target,r=o.getBoundingClientRect(),i=r.width-e.targetSize.width,a=r.height-e.targetSize.height,s=(0,l.ensureNotNull)(o.closest(".chart-container")),c=s.getBoundingClientRect(),u=(0,l.ensureNotNull)(s.parentElement).getBoundingClientRect(),d=r.left+e.point.x+i,f=Math.round(d-t/2),p=Math.min(f+t,c.right,u.right);let m,h,v=Math.max(p-t,c.left,u.left);v+t>=u.right&&(v=u.right-t);const y=c.bottom-(r.top+e.point.y+a),g=c.height-y-e.marginTop;return g<n?(h=e.marginTop+c.top,m=Math.max(g,0)):h=c.height+c.top-y-n,{x:v,y:h,overrideHeight:m}}}}]);