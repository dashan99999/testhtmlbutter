(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[4664,959,6437],{531899:e=>{e.exports={"close-button":"close-button-FuMQAaGA","close-icon":"close-icon-FuMQAaGA","button-l":"button-l-FuMQAaGA","button-m":"button-m-FuMQAaGA","button-s":"button-s-FuMQAaGA","button-xs":"button-xs-FuMQAaGA","button-xxs":"button-xxs-FuMQAaGA"}},937301:e=>{e.exports={description:"description-JwsSKrC3"}},330233:e=>{e.exports={title:"title-KX2tCBZq",body:"body-KX2tCBZq"}},19175:e=>{e.exports={dialog:"dialog-CPGBbsmc",rounded:"rounded-CPGBbsmc",shadowed:"shadowed-CPGBbsmc",fullscreen:"fullscreen-CPGBbsmc",darker:"darker-CPGBbsmc",backdrop:"backdrop-CPGBbsmc"}},955677:e=>{e.exports={wrap:"wrap-VeoIyDt4",container:"container-VeoIyDt4",backdrop:"backdrop-VeoIyDt4",modal:"modal-VeoIyDt4",dialog:"dialog-VeoIyDt4"}},778199:(e,t,n)=>{"use strict";function r(e,t,n,r,o){function s(o){if(e>o.timeStamp)return;const s=o.target;void 0!==n&&null!==t&&null!==s&&s.ownerDocument===r&&(t.contains(s)||n(o))}return o.click&&r.addEventListener("click",s,!1),o.mouseDown&&r.addEventListener("mousedown",s,!1),o.touchEnd&&r.addEventListener("touchend",s,!1),o.touchStart&&r.addEventListener("touchstart",s,!1),()=>{r.removeEventListener("click",s,!1),r.removeEventListener("mousedown",s,!1),r.removeEventListener("touchend",s,!1),r.removeEventListener("touchstart",s,!1)}}n.d(t,{addOutsideEventListener:()=>r})},908783:(e,t,n)=>{"use strict";n.d(t,{useOutsideEvent:()=>s});var r=n(50959),o=n(778199);function s(e){const{click:t,mouseDown:n,touchEnd:s,touchStart:i,handler:a,reference:u,ownerDocument:c=document}=e,l=(0,r.useRef)(null),d=(0,r.useRef)(new CustomEvent("timestamp").timeStamp);return(0,r.useLayoutEffect)((()=>{const e={click:t,mouseDown:n,touchEnd:s,touchStart:i},r=u?u.current:l.current;return(0,o.addOutsideEventListener)(d.current,r,a,c,e)}),[t,n,s,i,a]),u||l}},72571:(e,t,n)=>{"use strict";n.d(t,{Icon:()=>o});var r=n(50959);const o=r.forwardRef(((e,t)=>{const{icon:n="",...o}=e;return r.createElement("span",{...o,ref:t,dangerouslySetInnerHTML:{__html:n}})}))},800417:(e,t,n)=>{"use strict";function r(e){return s(e,i)}function o(e){return s(e,a)}function s(e,t){const n=Object.entries(e).filter(t),r={};for(const[e,t]of n)r[e]=t;return r}function i(e){const[t,n]=e;return 0===t.indexOf("data-")&&"string"==typeof n}function a(e){return 0===e[0].indexOf("aria-")}n.d(t,{filterAriaProps:()=>o,filterDataProps:()=>r,filterProps:()=>s,isAriaAttribute:()=>a,isDataAttribute:()=>i})},801808:(e,t,n)=>{"use strict";n.d(t,{OverlapManager:()=>s,getRootOverlapManager:()=>a});var r=n(650151);class o{constructor(){this._storage=[]}add(e){this._storage.push(e)}remove(e){this._storage=this._storage.filter((t=>e!==t))}has(e){return this._storage.includes(e)}getItems(){return this._storage}}class s{constructor(e=document){this._storage=new o,this._windows=new Map,this._index=0,this._document=e,this._container=e.createDocumentFragment()}setContainer(e){const t=this._container,n=null===e?this._document.createDocumentFragment():e;!function(e,t){
Array.from(e.childNodes).forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&t.appendChild(e)}))}(t,n),this._container=n}registerWindow(e){this._storage.has(e)||this._storage.add(e)}ensureWindow(e,t={position:"fixed",direction:"normal"}){const n=this._windows.get(e);if(void 0!==n)return n;this.registerWindow(e);const r=this._document.createElement("div");if(r.style.position=t.position,r.style.zIndex=this._index.toString(),r.dataset.id=e,void 0!==t.index){const e=this._container.childNodes.length;if(t.index>=e)this._container.appendChild(r);else if(t.index<=0)this._container.insertBefore(r,this._container.firstChild);else{const e=this._container.childNodes[t.index];this._container.insertBefore(r,e)}}else"reverse"===t.direction?this._container.insertBefore(r,this._container.firstChild):this._container.appendChild(r);return this._windows.set(e,r),++this._index,r}unregisterWindow(e){this._storage.remove(e);const t=this._windows.get(e);void 0!==t&&(null!==t.parentElement&&t.parentElement.removeChild(t),this._windows.delete(e))}getZindex(e){const t=this.ensureWindow(e);return parseInt(t.style.zIndex||"0")}moveToTop(e){if(this.getZindex(e)!==this._index){this.ensureWindow(e).style.zIndex=(++this._index).toString()}}removeWindow(e){this.unregisterWindow(e)}}const i=new WeakMap;function a(e=document){const t=e.getElementById("overlap-manager-root");if(null!==t)return(0,r.ensureDefined)(i.get(t));{const t=new s(e),n=function(e){const t=e.createElement("div");return t.style.position="absolute",t.style.zIndex=150..toString(),t.style.top="0px",t.style.left="0px",t.id="overlap-manager-root",t}(e);return i.set(n,t),t.setContainer(n),e.body.appendChild(n),t}}},131537:(e,t,n)=>{"use strict";n.d(t,{Dialog:()=>c});var r=n(50959),o=n(497754),s=n(630795),i=n(801808),a=n(800417),u=n(19175);class c extends r.PureComponent{constructor(){super(...arguments),this._manager=new i.OverlapManager,this._handleSlot=e=>{this._manager.setContainer(e)}}render(){const{rounded:e=!0,shadowed:t=!0,fullscreen:n=!1,darker:i=!1,className:c,backdrop:l,containerTabIndex:d=-1}=this.props,p=o(c,u.dialog,e&&u.rounded,t&&u.shadowed,n&&u.fullscreen,i&&u.darker),h=(0,a.filterDataProps)(this.props),f=this.props.style?{...this._createStyles(),...this.props.style}:this._createStyles();return r.createElement(r.Fragment,null,r.createElement(s.SlotContext.Provider,{value:this._manager},l&&r.createElement("div",{onClick:this.props.onClickBackdrop,className:u.backdrop}),r.createElement("div",{...h,className:p,style:f,ref:this.props.reference,onFocus:this.props.onFocus,onMouseDown:this.props.onMouseDown,onMouseUp:this.props.onMouseUp,onClick:this.props.onClick,onKeyDown:this.props.onKeyDown,tabIndex:d,"aria-label":this.props.containerAriaLabel},this.props.children)),r.createElement(s.Slot,{reference:this._handleSlot}))}_createStyles(){const{bottom:e,left:t,width:n,right:r,top:o,zIndex:s,height:i}=this.props;return{bottom:e,left:t,right:r,top:o,zIndex:s,maxWidth:n,height:i}}}},249161:(e,t,n)=>{"use strict";n.d(t,{KeyboardDocumentListener:()=>o});var r=n(50959)
;class o extends r.PureComponent{constructor(){super(...arguments),this._handleKeyDown=e=>{e.keyCode===this.props.keyCode&&this.props.handler(e)}}componentDidMount(){document.addEventListener(this.props.eventType||"keydown",this._handleKeyDown,!1)}componentWillUnmount(){document.removeEventListener(this.props.eventType||"keydown",this._handleKeyDown,!1)}render(){return null}}},930052:(e,t,n)=>{"use strict";n.d(t,{MatchMedia:()=>o});var r=n(50959);class o extends r.PureComponent{constructor(e){super(e),this._handleChange=()=>{this.forceUpdate()},this.state={query:window.matchMedia(this.props.rule)}}componentDidMount(){this._subscribe(this.state.query)}componentDidUpdate(e,t){this.state.query!==t.query&&(this._unsubscribe(t.query),this._subscribe(this.state.query))}componentWillUnmount(){this._unsubscribe(this.state.query)}render(){return this.props.children(this.state.query.matches)}static getDerivedStateFromProps(e,t){return e.rule!==t.query.media?{query:window.matchMedia(e.rule)}:null}_subscribe(e){e.addListener(this._handleChange)}_unsubscribe(e){e.removeListener(this._handleChange)}}},923235:(e,t,n)=>{"use strict";n.d(t,{OutsideEvent:()=>o});var r=n(908783);function o(e){const{children:t,...n}=e;return t((0,r.useOutsideEvent)(n))}},874485:(e,t,n)=>{"use strict";n.d(t,{makeOverlapable:()=>s});var r=n(50959),o=n(8361);function s(e){return class extends r.PureComponent{render(){const{isOpened:t,root:n}=this.props;if(!t)return null;const s=r.createElement(e,{...this.props,zIndex:150});return"parent"===n?s:r.createElement(o.Portal,null,s)}}}},8361:(e,t,n)=>{"use strict";n.d(t,{Portal:()=>u,PortalContext:()=>c});var r=n(50959),o=n(500962),s=n(189904),i=n(801808),a=n(630795);class u extends r.PureComponent{constructor(){super(...arguments),this._uuid=(0,s.guid)()}componentWillUnmount(){this._manager().removeWindow(this._uuid)}render(){const e=this._manager().ensureWindow(this._uuid,this.props.layerOptions);return e.style.top=this.props.top||"",e.style.bottom=this.props.bottom||"",e.style.left=this.props.left||"",e.style.right=this.props.right||"",e.style.pointerEvents=this.props.pointerEvents||"",o.createPortal(r.createElement(c.Provider,{value:this},this.props.children),e)}moveToTop(){this._manager().moveToTop(this._uuid)}_manager(){return null===this.context?(0,i.getRootOverlapManager)():this.context}}u.contextType=a.SlotContext;const c=r.createContext(null)},630795:(e,t,n)=>{"use strict";n.d(t,{Slot:()=>o,SlotContext:()=>s});var r=n(50959);class o extends r.Component{shouldComponentUpdate(){return!1}render(){return r.createElement("div",{style:{position:"fixed",zIndex:150,left:0,top:0},ref:this.props.reference})}}const s=r.createContext(null)},695257:(e,t)=>{"use strict"
;var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),u=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,y={};function v(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||f}function _(){}function w(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||f}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},_.prototype=v.prototype;var g=w.prototype=new _;g.constructor=w,m(g,v.prototype),g.isPureReactComponent=!0;var b=Array.isArray,x=Object.prototype.hasOwnProperty,E={current:null},C={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var o,s={},i=null,a=null;if(null!=t)for(o in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(i=""+t.key),t)x.call(t,o)&&!C.hasOwnProperty(o)&&(s[o]=t[o]);var u=arguments.length-2;if(1===u)s.children=r;else if(1<u){for(var c=Array(u),l=0;l<u;l++)c[l]=arguments[l+2];s.children=c}if(e&&e.defaultProps)for(o in u=e.defaultProps)void 0===s[o]&&(s[o]=u[o]);return{$$typeof:n,type:e,key:i,ref:a,props:s,_owner:E.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var D=/\/+/g;function O(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function I(e,t,o,s,i){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var u=!1;if(null===e)u=!0;else switch(a){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case n:case r:u=!0}}if(u)return i=i(u=e),e=""===s?"."+O(u,0):s,b(i)?(o="",null!=e&&(o=e.replace(D,"$&/")+"/"),I(i,t,o,"",(function(e){return e}))):null!=i&&(S(i)&&(i=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,o+(!i.key||u&&u.key===i.key?"":(""+i.key).replace(D,"$&/")+"/")+e)),t.push(i)),1;if(u=0,s=""===s?".":s+":",b(e))for(var c=0;c<e.length;c++){var l=s+O(a=e[c],c);u+=I(a,t,o,l,i)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=h&&e[h]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),c=0;!(a=e.next()).done;)u+=I(a=a.value,t,o,l=s+O(a,c++),i);else if("object"===a)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")
;return u}function P(e,t,n){if(null==e)return e;var r=[],o=0;return I(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function M(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var N={current:null},R={transition:null},L={ReactCurrentDispatcher:N,ReactCurrentBatchConfig:R,ReactCurrentOwner:E};t.Children={map:P,forEach:function(e,t,n){P(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return P(e,(function(){t++})),t},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=o,t.Profiler=i,t.PureComponent=w,t.StrictMode=s,t.Suspense=l,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),s=e.key,i=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,a=E.current),void 0!==t.key&&(s=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)x.call(t,c)&&!C.hasOwnProperty(c)&&(o[c]=void 0===t[c]&&void 0!==u?u[c]:t[c])}var c=arguments.length-2;if(1===c)o.children=r;else if(1<c){u=Array(c);for(var l=0;l<c;l++)u[l]=arguments[l+2];o.children=u}return{$$typeof:n,type:e.type,key:s,ref:i,props:o,_owner:a}},t.createContext=function(e){return(e={$$typeof:u,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:M}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=R.transition;R.transition={};try{e()}finally{R.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return N.current.useCallback(e,t)},t.useContext=function(e){return N.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return N.current.useDeferredValue(e)},t.useEffect=function(e,t){return N.current.useEffect(e,t)},t.useId=function(){return N.current.useId()},t.useImperativeHandle=function(e,t,n){return N.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return N.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return N.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return N.current.useMemo(e,t)},t.useReducer=function(e,t,n){return N.current.useReducer(e,t,n)},t.useRef=function(e){
return N.current.useRef(e)},t.useState=function(e){return N.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return N.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return N.current.useTransition()},t.version="18.2.0"},50959:(e,t,n)=>{"use strict";e.exports=n(695257)},829766:e=>{e.exports={dialog:"dialog-bqT9_WoX",closeButton:"closeButton-bqT9_WoX",actions:"actions-bqT9_WoX"}},863984:(e,t,n)=>{"use strict";n.r(t),n.d(t,{openLibraryNewsDescriptionDialogImpl:()=>R});var r=n(50959),o=n(500962),s=n(509806),i=n(497754),a=n(930052),u=n(131537),c=n(874485),l=n(923235),d=n(955677);class p extends r.PureComponent{constructor(){super(...arguments),this._containerRef=null,this._handleContainerRef=e=>{this._containerRef=e}}componentDidMount(){var e;this.props.autofocus&&(null===(e=this._containerRef)||void 0===e||e.focus())}render(){const{zIndex:e,onClickOutside:t,children:n,className:o}=this.props;return r.createElement("div",{ref:this._handleContainerRef,style:{zIndex:e},"data-dialog-name":this.props["data-dialog-name"],tabIndex:-1},r.createElement("div",{className:d.backdrop}),r.createElement("div",{className:d.wrap},r.createElement("div",{className:d.container},r.createElement(l.OutsideEvent,{mouseDown:!0,touchStart:!0,handler:t},(e=>r.createElement("div",{className:d.modal,ref:e},r.createElement(u.Dialog,{...this.props,className:i(o,d.dialog)},n)))))))}}p.defaultProps={width:500};const h=(0,c.makeOverlapable)(p);var f=n(72571),m=n(117105),y=n(315130),v=n(238822),_=n(663346),w=n(534983),g=n(531899),b=n.n(g);function x(e="l"){switch(e){case"l":return m;case"m":default:return y;case"s":return v;case"xs":return _;case"xxs":return w}}const E=r.forwardRef(((e,t)=>{const{className:n,size:o,...s}=e,a=i(b()["close-button"],b()[`button-${o}`],n);return r.createElement("button",{...s,type:"button",className:a,ref:t},r.createElement(f.Icon,{icon:x(o),className:b()["close-icon"],"aria-hidden":!0}))}));var C=n(249161),k=n(586240),S=n(829766);function D(e){const{className:t,children:o,isOpened:u,maxWidth:c,onCloseIntent:l,closeOnOutsideClick:d=!0,closeOnEsc:p=!0,showCloseButton:f=!0,actions:m,fullscreenMode:y=1}=e,v=s.t(null,{context:"input"},n(309633));return r.createElement(a.MatchMedia,{rule:k["media-phone-vertical"]},(e=>{const n=0===y||e;return r.createElement(h,{width:O(c,n),className:i(S.dialog,t),isOpened:u,onClickOutside:d?l:void 0,fullscreen:n,rounded:!n},f&&r.createElement(E,{className:S.closeButton,"aria-label":v,onClick:l,size:"m"}),l&&p&&r.createElement(C.KeyboardDocumentListener,{keyCode:27,handler:l}),"function"==typeof o?o(n):o,m&&r.createElement("div",{className:S.actions},m(n)))}))}function O(e,t){return t?"100%":e||"100%"}const I=n(330233);function P(e){const{title:t,content:n,theme:o=I,header:s}=e;return r.createElement("article",{className:o.container},t&&r.createElement("h2",{className:o.title},t),s,r.createElement("div",{className:o.body},n))}var M=n(937301);function N(e){const{title:t,description:n}=e;return r.createElement(P,{title:t,content:r.createElement("div",{
className:M.description},n)})}function R(e){const t=document.createElement("div");o.render(r.createElement(D,{isOpened:!0,onCloseIntent:()=>o.unmountComponentAtNode(t),maxWidth:800},r.createElement(N,{...e})),t)}},117105:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path stroke="currentColor" stroke-width="1.2" d="m1.5 1.5 21 21m0-21-21 21"/></svg>'},315130:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path stroke="currentColor" stroke-width="1.2" d="m1.5 1.5 15 15m0-15-15 15"/></svg>'},238822:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path stroke="currentColor" stroke-width="1.2" d="m1.5 1.5 11 11m0-11-11 11"/></svg>'},663346:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path stroke="currentColor" stroke-width="1.2" d="m1.5 1.5 9 9m0-9-9 9"/></svg>'},534983:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10"><path stroke="currentColor" stroke-width="1.2" d="m1.5 1.5 7 7m0-7-7 7"/></svg>'},586240:e=>{"use strict";e.exports=JSON.parse('{"size-header-height":"64px","media-phone-vertical":"screen and (max-width: 479px)","media-mf-phone-landscape":"screen and (min-width: 568px)"}')},309633:e=>{e.exports={ar:["إغلاق"],ca_ES:["Tancament"],cs:"Close",de:"Close",el:"Close",en:"Close",es:["Cierre"],fa:"Close",fr:["Fermeture"],he_IL:["סגירה"],hu_HU:["Zárás"],id_ID:["Tutup"],it:["Chiudi"],ja:["閉じる"],ko:["닫기"],ms_MY:["Tutup"],nl_NL:"Close",pl:["Zamknij"],pt:["Fechar"],ro:"Close",ru:["Закрыть"],sv:["Stängning"],th:["ปิด"],tr:["Kapat"],vi:["Đóng"],zh:["关闭"],zh_TW:["關閉"]}}}]);