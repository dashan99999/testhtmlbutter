(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[1754],{758222:e=>{e.exports={"light-button":"light-button-bYDQcOkp",link:"link-bYDQcOkp",content:"content-bYDQcOkp","visually-hidden":"visually-hidden-bYDQcOkp",nowrap:"nowrap-bYDQcOkp","ellipsis-container":"ellipsis-container-bYDQcOkp","text-wrap-container":"text-wrap-container-bYDQcOkp","text-wrap-with-ellipsis":"text-wrap-with-ellipsis-bYDQcOkp",icon:"icon-bYDQcOkp","force-direction-ltr":"force-direction-ltr-bYDQcOkp","force-direction-rtl":"force-direction-rtl-bYDQcOkp","with-grouped":"with-grouped-bYDQcOkp","variant-quiet-primary":"variant-quiet-primary-bYDQcOkp",selected:"selected-bYDQcOkp","typography-regular16px":"typography-regular16px-bYDQcOkp","typography-medium16px":"typography-medium16px-bYDQcOkp","typography-regular14px":"typography-regular14px-bYDQcOkp","typography-semibold14px":"typography-semibold14px-bYDQcOkp","typography-semibold16px":"typography-semibold16px-bYDQcOkp","size-xsmall":"size-xsmall-bYDQcOkp","with-start-icon":"with-start-icon-bYDQcOkp","with-end-icon":"with-end-icon-bYDQcOkp","no-content":"no-content-bYDQcOkp",wrap:"wrap-bYDQcOkp","size-small":"size-small-bYDQcOkp","size-medium":"size-medium-bYDQcOkp","variant-primary":"variant-primary-bYDQcOkp","color-gray":"color-gray-bYDQcOkp",caret:"caret-bYDQcOkp",grouped:"grouped-bYDQcOkp",pills:"pills-bYDQcOkp","disable-active-on-touch":"disable-active-on-touch-bYDQcOkp","disable-active-state-styles":"disable-active-state-styles-bYDQcOkp","color-green":"color-green-bYDQcOkp","color-red":"color-red-bYDQcOkp","variant-secondary":"variant-secondary-bYDQcOkp","variant-ghost":"variant-ghost-bYDQcOkp"}},897646:e=>{e.exports={dialog:"dialog-LfNchNNG",tabletDialog:"tabletDialog-LfNchNNG",desktopDialog:"desktopDialog-LfNchNNG"}},186928:e=>{e.exports={button:"button-w6lVe_oI",hovered:"hovered-w6lVe_oI",disabled:"disabled-w6lVe_oI"}},959189:(e,t,o)=>{"use strict";function r(e,t){return t||null==e||("string"==typeof e||Array.isArray(e))&&0===e.length}o.d(t,{isIconOnly:()=>r})},223392:(e,t,o)=>{"use strict";o.d(t,{LightButton:()=>b});var r=o(50959),i=o(497754),a=o(72571),s=o(234539),n=o(959189),l=o(380327);const c=r.createContext({isInButtonGroup:!1,isGroupPrimary:!1});var d=o(602948),h=o(758222),u=o.n(h);const m=(e,t)=>{const o=(0,r.useContext)(s.CustomBehaviourContext),a=(0,r.useContext)(l.ControlGroupContext),{isInButtonGroup:d,isGroupPrimary:h}=(0,r.useContext)(c),{className:m,isSelected:p,children:b,startIcon:y,showCaret:f,endIcon:g,forceDirection:S,iconOnly:_,color:v="gray",variant:k="primary",size:I="medium",enableActiveStateStyles:x=o.enableActiveStateStyles,typography:D,isLink:w=!1,textWrap:W,isPills:C}=e,z=D?u()[`typography-${D}`]:u()[`typography-${((e,t)=>"xsmall"===e?t?"semibold14px":"regular14px":"small"===e||"medium"===e?t?"semibold16px":"regular16px":"")(I,p||C)}`];return i(m,u()["light-button"],w&&u().link,p&&u().selected,(0,
n.isIconOnly)(b,_)&&u()["no-content"],y&&u()["with-start-icon"],(f||g)&&u()["with-end-icon"],t&&u()["with-grouped"],S&&u()[`force-direction-${S}`],u()[`variant-${h?"primary":k}`],u()[`color-${h?"gray":v}`],u()[`size-${I}`],z,!x&&u()["disable-active-state-styles"],a.isGrouped&&u().grouped,W&&u().wrap,d&&u()["disable-active-on-touch"],C&&u().pills)};function p(e){const{startIcon:t,endIcon:o,showCaret:s,iconOnly:l,ellipsis:c=!0,textWrap:h,children:m}=e;return r.createElement(r.Fragment,null,t&&r.createElement(a.Icon,{className:u().icon,icon:t}),!(0,n.isIconOnly)(m,l)&&r.createElement("span",{className:i(u().content,!h&&u().nowrap)},h||c?r.createElement(r.Fragment,null,r.createElement("span",{className:i(!h&&c&&u()["ellipsis-container"],h&&u()["text-wrap-container"],h&&c&&u()["text-wrap-with-ellipsis"])},m),r.createElement("span",{className:u()["visually-hidden"],"aria-hidden":!0},m)):r.createElement(r.Fragment,null,m,r.createElement("span",{className:u()["visually-hidden"],"aria-hidden":!0},m))),(o||s)&&(e=>r.createElement(a.Icon,{className:i(u().icon,e.showCaret&&u().caret),icon:e.showCaret?d:e.endIcon}))(e))}function b(e){const{isGrouped:t}=r.useContext(l.ControlGroupContext),{reference:o,className:i,isSelected:a,children:s,startIcon:n,iconOnly:c,ellipsis:d,showCaret:h,forceDirection:u,endIcon:b,color:y,variant:f,size:g,enableActiveStateStyles:S,typography:_,textWrap:v=!1,maxLines:k,style:I={},isPills:x,...D}=e,w=v?null!=k?k:2:1,W=w>0?{...I,"--ui-lib-light-button-content-max-lines":w}:I;return r.createElement("button",{...D,className:m({className:i,isSelected:a,children:s,startIcon:n,iconOnly:c,showCaret:h,forceDirection:u,endIcon:b,color:y,variant:f,size:g,enableActiveStateStyles:S,typography:_,textWrap:v,isPills:x},t),ref:o,style:W},r.createElement(p,{showCaret:h,startIcon:n,endIcon:b,iconOnly:c,ellipsis:d,textWrap:v},s))}o(591365)},409245:(e,t,o)=>{"use strict";function r(e){const{reference:t,...o}=e;return{...o,ref:t}}o.d(t,{renameRef:()=>r})},591365:(e,t,o)=>{"use strict";o.d(t,{CustomComponentDefaultLink:()=>a});var r=o(50959),i=o(409245);function a(e){return r.createElement("a",{...(0,i.renameRef)(e)})}r.PureComponent},234539:(e,t,o)=>{"use strict";o.d(t,{CustomBehaviourContext:()=>r});const r=(0,o(50959).createContext)({enableActiveStateStyles:!0});r.displayName="CustomBehaviourContext"},912015:(e,t,o)=>{"use strict";o.d(t,{isPlatformMobile:()=>i});var r=o(69111);o(156963),o(601227);function i(){return!(0,r.isOnMobileAppPage)("any")&&(window.matchMedia("(min-width: 602px) and (min-height: 445px)").matches,!1)}},723698:(e,t,o)=>{"use strict";o.r(t),o.d(t,{Components:()=>z,showDefaultSearchDialog:()=>C,showSymbolSearchItemsDialog:()=>n.showSymbolSearchItemsDialog});var r=o(688401),i=o(972535),a=o(248166),s=o(265831),n=o(558323),l=o(50959),c=o(650151),d=o(855441),h=o(113060),u=o(944080),m=o(497754),p=o.n(m),b=o(509806),y=o(800296),f=o(581384),g=o(398120),S=o(177042),_=o(339339);function v(e){const{isSelected:t,existInWatchlist:r,findInWatchlist:i,addToWatchlist:a,removeFromWatchlist:s}=e,{selectedAction:n}=(0,
c.ensureNotNull)((0,l.useContext)(h.SymbolSearchWatchlistContext));return l.createElement(l.Fragment,null,r?l.createElement(l.Fragment,null,l.createElement(y.ListItemButton,{className:p()(_.action,_.removeAction,t&&2===n&&_.selected,"apply-common-tooltip"),onClick:s,icon:f,title:b.t(null,void 0,o(366702))}),l.createElement(y.ListItemButton,{className:p()(_.action,_.targetAction,t&&1===n&&_.selected,"apply-common-tooltip"),onClick:i,icon:S,title:b.t(null,void 0,o(708682))})):l.createElement(y.ListItemButton,{className:p()(_.action,_.addAction,t&&0===n&&_.selected,"apply-common-tooltip"),onClick:a,icon:g,title:b.t(null,void 0,o(445976))}))}var k=o(180185),I=o(32133),x=o(979359),D=o(190266);var w=o(533408),W=o(897646);(0,o(912015).isPlatformMobile)();function C(e){const t=(0,s.getSymbolSearchCompleteOverrideFunction)(),{defaultValue:o,showSpreadActions:i,source:l,onSearchComplete:c,...d}=e,h={...d,showSpreadActions:null!=i?i:(0,a.canShowSpreadActions)(),onSearchComplete:(e,o)=>{null==o||o.symbolType;t(e[0].symbol,e[0].result).then((e=>{r.linking.symbol.setValue(e.symbol),null==c||c(e.symbol)}))}};(0,n.showSymbolSearchItemsDialog)({...h,defaultValue:o})}const z={SymbolSearchWatchlistDialogContentItem:function(e){const{addToWatchlist:t,removeFromWatchlist:o,findInWatchlist:r,existInWatchlist:a,isSelected:s,fullSymbolName:n,...m}=e,{onClose:p,searchRef:b,searchSpreads:y}=(0,c.ensureNotNull)((0,l.useContext)(u.SymbolSearchItemsDialogContext)),{setSelectedAction:f,isSpreadOrMultipleMode:g,addAfter:S,clearTargetSymbol:_,highlighted:w,highlight:W}=(0,c.ensureNotNull)((0,l.useContext)(h.SymbolSearchWatchlistContext)),C=g(y,b);return(0,l.useLayoutEffect)((()=>{s&&f(void 0!==a?a?2:0:null)}),[s,a]),l.createElement(d.SymbolSearchDialogContentItem,{...m,fullSymbolName:n,onClick:C?e.onClick:function(r){if(void 0===n)return;if(void 0===a)return void(0,c.ensureDefined)(e.onClick)(r);a?(o(x.WATCHLIST_WIDGET_ID,n),N("watchlist remove click",r),S===n&&_()):((0,D.runOrSignIn)((()=>{t(x.WATCHLIST_WIDGET_ID,[n],S),e.id&&W(e.id)}),{source:"add symbol to watchlist"}),N("watchlist add click",r));z(r)},isHighlighted:w===e.id,isSelected:s,actions:void 0===a||C?void 0:l.createElement(v,{isSelected:s,existInWatchlist:a,addToWatchlist:function(o){if(o.stopPropagation(),void 0===n)return;(0,D.runOrSignIn)((()=>{t(x.WATCHLIST_WIDGET_ID,[n],S),e.id&&W(e.id)}),{source:"add symbol to watchlist"}),z(o),N("watchlist add button",o)},removeFromWatchlist:function(e){if(e.stopPropagation(),void 0===n)return;o(x.WATCHLIST_WIDGET_ID,n),z(e),N("watchlist remove button",e),S===n&&_()},findInWatchlist:function(e){if(e.stopPropagation(),void 0===n)return;r(x.WATCHLIST_WIDGET_ID,n),p(),N("watchlist goto button")}})});function z(e){var t;e&&(0,k.modifiersFromEvent)(e)===k.Modifiers.Shift?p():i.mobiletouch||null===(t=b.current)||void 0===t||t.select()}function N(e,t){let o=e;t&&(0,k.modifiersFromEvent)(t)===k.Modifiers.Shift&&(o+=" shift"),(0,I.trackEvent)("GUI","SS",o)}},SymbolSearchWatchlistDialog:function(e){
const{addToWatchlist:t,removeFromWatchlist:o,findInWatchlist:r,...i}=e,{feedItems:a,searchRef:s,searchSpreads:n,selectedIndex:d,onSubmit:m,setSelectedIndex:b,onClose:y,isMobile:f,isTablet:g,mode:S,setMode:_}=(0,c.ensureNotNull)((0,l.useContext)(u.SymbolSearchItemsDialogContext)),{selectedAction:v,setSelectedAction:I,isSpreadOrMultipleMode:C,addAfter:z,clearTargetSymbol:N,highlight:T}=(0,c.ensureNotNull)((0,l.useContext)(h.SymbolSearchWatchlistContext)),L=a[d],A="exchange"===S;return l.createElement(w.AdaptivePopupDialog,{...i,className:p()(W.dialog,!f&&(g?W.tabletDialog:W.desktopDialog)),dataName:"watchlist-symbol-search-dialog",onKeyDown:function(e){var t;switch((0,k.hashFromEvent)(e)){case 38:if(e.preventDefault(),0===d)return;if(-1===d)return void b(0);b(d-1);break;case 40:if(e.preventDefault(),d===a.length-1)return;b(d+1);break;case 37:if(!L)return;1===v&&(e.preventDefault(),I(2));break;case 39:if(!L)return;2===v&&(e.preventDefault(),I(1));break;case 13:if(C(n,s))return void m(!0);L?O(!1):m(!1),null===(t=s.current)||void 0===t||t.select();break;case 13+k.Modifiers.Shift:if(C(n,s))return void m(!0);L?O(!0):m(!0);break;case 27:if(e.preventDefault(),A)return void _("symbolSearch");y()}},backdrop:!0,draggable:!1});function O(e){if(!L||void 0===L.fullSymbolName)return;const{fullSymbolName:i}=L;switch(v){case 0:(0,D.runOrSignIn)((()=>{t(x.WATCHLIST_WIDGET_ID,[i],z),L.id&&T(L.id)}),{source:"add symbol to watchlist"});break;case 1:return r(x.WATCHLIST_WIDGET_ID,i),void y();case 2:o(x.WATCHLIST_WIDGET_ID,i),z===i&&N()}e&&y()}}}},558323:(e,t,o)=>{"use strict";o.d(t,{showSymbolSearchItemsDialog:()=>l});var r=o(50959),i=o(500962),a=o(630795),s=o(63192),n=o(21922);function l(e){const{initialMode:t="symbolSearch",autofocus:o=!0,defaultValue:l,showSpreadActions:c,selectSearchOnInit:d,onSearchComplete:h,dialogTitle:u,placeholder:m,fullscreen:p,initialScreen:b,wrapper:y,dialog:f,contentItem:g,onClose:S,onOpen:_,footer:v,symbolTypes:k,searchInput:I,emptyState:x,hideMarkedListFlag:D,dialogWidth:w="auto",manager:W,shouldReturnFocus:C}=e;if(s.dialogsOpenerManager.isOpened("SymbolSearch")||s.dialogsOpenerManager.isOpened("ChangeIntervalDialog"))return;const z=document.createElement("div"),N=r.createElement(a.SlotContext.Provider,{value:null!=W?W:null},r.createElement(n.SymbolSearchItemsDialog,{onClose:T,initialMode:t,defaultValue:l,showSpreadActions:c,hideMarkedListFlag:D,selectSearchOnInit:d,onSearchComplete:h,dialogTitle:u,placeholder:m,fullscreen:p,initialScreen:b,wrapper:y,dialog:f,contentItem:g,footer:v,symbolTypes:k,searchInput:I,emptyState:x,autofocus:o,dialogWidth:w,shouldReturnFocus:C}));function T(){i.unmountComponentAtNode(z),s.dialogsOpenerManager.setAsClosed("SymbolSearch"),S&&S()}return i.render(N,z),s.dialogsOpenerManager.setAsOpened("SymbolSearch"),_&&_(),{close:T}}},113060:(e,t,o)=>{"use strict";o.d(t,{SymbolSearchWatchlistContext:()=>r});const r=o(50959).createContext(null)},63192:(e,t,o)=>{"use strict";o.d(t,{DialogsOpenerManager:()=>r,dialogsOpenerManager:()=>i});class r{constructor(){this._storage=new Map}
setAsOpened(e,t){this._storage.set(e,t)}setAsClosed(e){this._storage.delete(e)}isOpened(e){return this._storage.has(e)}getDialogPayload(e){return this._storage.get(e)}}const i=new r},190266:(e,t,o)=>{"use strict";o.d(t,{runOrSignIn:()=>r});function r(e,t){e()}},800296:(e,t,o)=>{"use strict";o.d(t,{ListItemButton:()=>l});var r=o(50959),i=o(497754),a=o.n(i),s=o(72571),n=o(186928);function l(e){const{className:t,disabled:o,...i}=e;return r.createElement(s.Icon,{className:a()(n.button,o&&n.disabled,t),...i})}},602948:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M5.5 6.44a.75.75 0 1 0-1 1.12l1-1.12zM9 10.5l-.5.56c.29.25.71.25 1 0L9 10.5zm4.5-2.94a.75.75 0 0 0-1-1.12l1 1.12zm-9 0l4 3.5 1-1.12-4-3.5-1 1.12zm5 3.5l4-3.5-1-1.12-4 3.5 1 1.12z"/></svg>'},581384:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-width="1.2" d="M8 8l13 13m0-13L8 21"/></svg>'},398120:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M13.9 14.1V22h1.2v-7.9H23v-1.2h-7.9V5h-1.2v7.9H6v1.2h7.9z"/></svg>'},177042:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14 9.5a.5.5 0 0 0 1 0V7.02A6.5 6.5 0 0 1 20.98 13H18.5a.5.5 0 0 0 0 1h2.48A6.5 6.5 0 0 1 15 19.98V17.5a.5.5 0 0 0-1 0v2.48A6.5 6.5 0 0 1 8.02 14h2.48a.5.5 0 0 0 0-1H8.02A6.5 6.5 0 0 1 14 7.02V9.5zm1-3.48V4.5a.5.5 0 0 0-1 0v1.52A7.5 7.5 0 0 0 7.02 13H5.5a.5.5 0 0 0 0 1h1.52A7.5 7.5 0 0 0 14 20.98v1.52a.5.5 0 0 0 1 0v-1.52A7.5 7.5 0 0 0 21.98 14h1.52a.5.5 0 0 0 0-1h-1.52A7.5 7.5 0 0 0 15 6.02z"/></svg>'},716936:e=>{e.exports={ar:["عودة"],ca_ES:["Enrere"],cs:"Back",de:["Zurück"],el:"Back",en:"Back",es:["Atrás"],fa:"Back",fr:["Retour"],he_IL:["חזור"],hu_HU:"Back",id_ID:["Kembali"],it:["Indietro"],ja:["戻る"],ko:["뒤로"],ms_MY:["Kembali"],nl_NL:"Back",pl:["Cofnij"],pt:["Voltar"],ro:"Back",ru:["Назад"],sv:["Tillbaka"],th:["กลับไป"],tr:["Geri"],vi:["Quay lại"],zh:["返回"],zh_TW:["返回"]}},709898:e=>{e.exports={ar:["حق"],ca_ES:["Right (dret de subscripció)"],cs:"Right",de:["Rechter"],el:"Right",en:"Right",es:["Right (derecho de suscripción)"],fa:"Right",fr:["De droite"],he_IL:["זכות Right"],hu_HU:"Right",id_ID:["Kanan"],it:["Diritto"],ja:["ストックオプション"],ko:["라이트"],ms_MY:["Benar"],nl_NL:"Right",pl:["Prawo do udostępniania"],pt:["Direita"],ro:"Right",ru:["Право на акцию"],sv:["Höger"],th:["สิทธิ"],tr:["Sağ"],vi:["Phải"],zh:["认股权"],zh_TW:["認股權"]}},620036:e=>{e.exports={ar:["إلغاء"],ca_ES:["Cancel·la"],cs:["Zrušit"],de:["Abbrechen"],el:["Άκυρο"],en:"Cancel",es:["Cancelar"],fa:["لغو"],fr:["Annuler"],he_IL:["ביטול"],hu_HU:["Törlés"],id_ID:["Batal"],it:["Annulla"],ja:["キャンセル"],ko:["취소"],ms_MY:["Batal"],nl_NL:["Annuleren"],pl:["Anuluj"],pt:["Cancelar"],ro:"Cancel",ru:["Отмена"],sv:["Avbryt"],
th:["ยกเลิก"],tr:["İptal"],vi:["Hủy bỏ"],zh:["取消"],zh_TW:["取消"]}},445976:e=>{e.exports={ar:["أضف إلى قائمة المراقبة"],ca_ES:["Afegeix a la llista de seguiment"],cs:"Add to Watchlist",de:["Zur Watchlist hinzufügen"],el:"Add to Watchlist",en:"Add to Watchlist",es:["Añadir a la lista de seguimiento"],fa:"Add to Watchlist",fr:["Ajouter à la liste de surveillance"],he_IL:["הוסף רשימת מעקב"],hu_HU:"Add to Watchlist",id_ID:["Tambah ke Daftar Pantau"],it:["Aggiungi alla watchlist"],ja:["ウォッチリストに追加"],ko:["왓치리스트에 넣기"],ms_MY:["Tambah ke Senarai Amatan"],nl_NL:"Add to Watchlist",pl:["Dodaj do listy obserwowanych"],pt:["Adicionar à lista"],ro:"Add to Watchlist",ru:["Добавить в Список котировок"],sv:["Lägg till i Bevakningslista"],th:["เพิ่มไปในรายการเฝ้าระวัง"],tr:["Watchlist'e ekle"],vi:["Thêm vào danh sách theo dõi"],zh:["添加到自选表"],zh_TW:["增加到觀察清單"]}},64498:e=>{e.exports={ar:["كل المصادر"],ca_ES:["Totes les fonts"],cs:"All sources",de:["Alle Quellen"],el:"All sources",en:"All sources",es:["Todas las fuentes"],fa:"All sources",fr:["Toutes les sources"],he_IL:["כל המקורות"],hu_HU:"All sources",id_ID:["Seluruh sumber"],it:["Tutte le fonti"],ja:["すべての提供元"],ko:["모든 자료"],ms_MY:["Kesemua sumber"],nl_NL:"All sources",pl:["Wszystkie źródła"],pt:["Todas as fontes"],ro:"All sources",ru:["Все источники"],sv:["Samtliga källor"],th:["แหล่งที่มาทั้งหมด"],tr:["Tüm kaynaklar"],vi:["Tất cả các nguồn"],zh:["全部来源"],zh_TW:["全部來源"]}},879852:e=>{e.exports={ar:["سند"],ca_ES:["Bo"],cs:"Bond",de:["Anleihe"],el:"Bond",en:"Bond",es:["Bono"],fa:"Bond",fr:["Obligation"],he_IL:["אגרת חוב"],hu_HU:"Bond",id_ID:["Surat hutang"],it:["Obbligazione"],ja:["債券"],ko:["채권"],ms_MY:["Bon"],nl_NL:"Bond",pl:["Obligacja"],pt:["Título"],ro:"Bond",ru:["Облигации"],sv:["Obligation"],th:["พันธบัตร"],tr:["Tahvil"],vi:["Trái phiếu"],zh:["债券"],zh_TW:["債券"]}},708682:e=>{e.exports={ar:["انتقل إلى الرمز"],ca_ES:["Ves al símbol"],cs:"Go to symbol",de:["Gehe zu Symbol"],el:"Go to symbol",en:"Go to symbol",es:["Ir al símbolo"],fa:"Go to symbol",fr:["Aller au symbole"],he_IL:["עבור לסימול"],hu_HU:"Go to symbol",id_ID:["Menuju simbol"],it:["Vai al simbolo"],ja:["シンボルに移動"],ko:["심볼로 가기"],ms_MY:["Pergi ke simbol"],nl_NL:"Go to symbol",pl:["Przejdź do symbolu"],pt:["Vá para o símbolo"],ro:"Go to symbol",ru:["Перейти к символу"],sv:["Gå till symbolen"],th:["ไปที่สัญลักษณ์"],tr:["Sembole git"],vi:["Tới mã giao dịch"],zh:["前往商品"],zh_TW:["前往商品"]}},629601:e=>{e.exports={ar:["الوصف"],ca_ES:["Descripció"],cs:["Popis"],de:["Beschreibung"],el:"Description",en:"Description",es:["Descripción"],fa:["شرح"],fr:"Description",he_IL:["תיאור"],hu_HU:["Leírás"],id_ID:["Deskripsi"],it:["Descrizione"],ja:["詳細"],ko:["설명"],ms_MY:["Huraian"],nl_NL:["Beschrijving"],pl:["Opis"],pt:["Descrição"],ro:"Description",ru:["Описание"],sv:["Beskrivning"],th:["คำอธิบาย"],tr:["Açıklama"],vi:["Mô tả"],zh:["描述"],zh_TW:["描述"]}},929673:e=>{e.exports={ar:["لا توجد أسواق تطابق المعايير التي عينتها"],ca_ES:["No hi ha mercats de valors que coincideixin amb els vostres criteris."],cs:"No exchanges match your criteria",
de:["Keine Börsen entsprechen Ihren Kriterien"],el:"No exchanges match your criteria",en:"No exchanges match your criteria",es:["No hay mercados de valores que coincidan con sus criterios."],fa:"No exchanges match your criteria",fr:["Aucun échange ne correspond à vos critères"],he_IL:["אין בורסות התואמות את הקריטריונים שלך"],hu_HU:"No exchanges match your criteria",id_ID:["Tidak ada bursa yang sesuai dengan kriteria anda"],it:["Nessuna borsa corrisponde ai tuoi criteri"],ja:["条件に合致する取引所はありません"],ko:["조건에 맞는 익스체인지가 없음"],ms_MY:["Tiada bursa saham yang memenuhi kriteria anda."],nl_NL:"No exchanges match your criteria",pl:["Brak giełd spełniających Twoje kryteria"],pt:["Nenhuma exchange corresponde ao seu critério"],ro:"No exchanges match your criteria",ru:["Нет подходящих бирж"],sv:["Inga börser matchar dina kriterier"],th:["ไม่มีตลาดแลกเปลี่ยนใดๆ ตรงตามเงื่อนไขของคุณ"],tr:["Kriterlerinize uygun borsa yok"],vi:["Không có sàn giao dịch nào khớp với yêu cầu của bạn"],zh:["没有交易所符合您的条件"],zh_TW:["沒有交易所符合您的條件"]}},641379:e=>{e.exports={ar:["لا توجد رموز تطابق معاييرك"],ca_ES:["Cap símbol coincideix amb els vostres criteris"],cs:"No symbols match your criteria",de:["Für Ihre Kriterien gibt es keine übereinstimmenden Symbole"],el:"No symbols match your criteria",en:"No symbols match your criteria",es:["Ningún símbolo coincide con sus criterios"],fa:"No symbols match your criteria",fr:["Aucun symbole ne correspond à vos critères"],he_IL:["אין סימולים תואמים את הקריטריונים שלך"],hu_HU:"No symbols match your criteria",id_ID:["Tidak ada Simbol yang sesuai dengan kriteria anda"],it:["Nessun simbolo corrisponde ai criteri"],ja:["条件に合致するシンボルはありません"],ko:["조건에 맞는 심볼이 없음"],ms_MY:["Tiada Simbol yang menepati kriteria anda"],nl_NL:"No symbols match your criteria",pl:["Brak symboli spełniających Twoje kryteria"],pt:["Nenhum símbolo compatível com seu critério"],ro:"No symbols match your criteria",ru:["Нет подходящих символов"],sv:["Inga symboler matchar dina kriterier"],th:["ไม่มีสัญลักษณ์ที่ตรงกับการค้นหาของคุณ"],tr:["Kriterlerinize uygun sembol yok"],vi:["Không có mã giao dịch nào khớp với tiêu chí của bạn"],zh:["没有代码符合您的条件"],zh_TW:["沒有商品符合您的條件"]}},719724:e=>{e.exports={ar:["مصادر"],ca_ES:["Fonts"],cs:"Sources",de:["Quellen"],el:"Sources",en:"Sources",es:["Fuentes"],fa:"Sources",fr:"Sources",he_IL:["מקורות"],hu_HU:"Sources",id_ID:["Sumber"],it:["Fonti"],ja:["情報源"],ko:["자료"],ms_MY:["Sumber-sumber"],nl_NL:"Sources",pl:["Źródła"],pt:["Fontes"],ro:"Sources",ru:["Источники"],sv:["Källor"],th:["แหล่งที่มา"],tr:["Kaynak"],vi:["Nguồn"],zh:["来源"],zh_TW:["來源"]}},252298:e=>{e.exports={ar:["بحث"],ca_ES:["Cercar"],cs:["Hledat"],de:["Suche"],el:["Αναζήτησή"],en:"Search",es:["Buscar"],fa:["جستجو"],fr:["Chercher"],he_IL:["חפש"],hu_HU:["Keresés"],id_ID:["Cari"],it:["Cerca"],ja:["検索"],ko:["찾기"],ms_MY:["Cari"],nl_NL:["Zoeken"],pl:["Szukaj"],pt:["Pesquisar"],ro:"Search",ru:["Поиск"],sv:["Sök"],th:["ค้นหา"],tr:["Ara"],vi:["Tìm kiếm"],zh:["搜索"],zh_TW:["搜尋"]}},313269:e=>{e.exports={ar:["اختر مصدراً"],ca_ES:["Selecciona font"],cs:"Select source",
de:["Quelle wählen"],el:"Select source",en:"Select source",es:["Seleccionar fuente"],fa:"Select source",fr:["Sélectionner la source"],he_IL:["בחר מקור"],hu_HU:"Select source",id_ID:["Pilih sumber"],it:["Seleziona fonte"],ja:["情報源を選択"],ko:["자료 선택"],ms_MY:["Pilih sumber"],nl_NL:"Select source",pl:["Wybierz źródło"],pt:["Selecionar fonte"],ro:"Select source",ru:["Выбрать источник"],sv:["Välj källa"],th:["เลือกแหล่งที่มา"],tr:["Kaynak seç"],vi:["Chọn nguồn"],zh:["选择来源"],zh_TW:["選擇來源"]}},589053:e=>{e.exports={ar:["رمز"],ca_ES:["Símbol"],cs:"Symbol",de:"Symbol",el:["Σύμβολο"],en:"Symbol",es:["Símbolo"],fa:["نماد"],fr:["Symbole"],he_IL:["סימול"],hu_HU:["Szimbólum"],id_ID:["Simbol"],it:["Simbolo"],ja:["シンボル"],ko:["심볼"],ms_MY:["Simbol"],nl_NL:["Symbool"],pl:"Symbol",pt:["Símbolo"],ro:"Symbol",ru:["Инструмент"],sv:"Symbol",th:["สัญลักษณ์"],tr:["Sembol"],vi:["Mã"],zh:["商品代码"],zh_TW:["商品代碼"]}},948490:e=>{e.exports={ar:["الرمز والوصف"],ca_ES:["Símbol i descripció"],cs:"Symbol & description",de:["Symbol & Beschreibung"],el:"Symbol & description",en:"Symbol & description",es:["Símbolo y descripción"],fa:"Symbol & description",fr:["Symbole & description"],he_IL:["סימול ותיאור"],hu_HU:"Symbol & description",id_ID:["Simbol & deskripsi"],it:["Simbolo e descrizione"],ja:["シンボル & 詳細"],ko:["심볼 & 설명"],ms_MY:["Simbol & penjelasan"],nl_NL:"Symbol & description",pl:["Symbol i opis"],pt:["Símbolo & descrição"],ro:"Symbol & description",ru:["Инструмент и описание"],sv:["Symbol & beskrivning"],th:["สัญลักษณ์และคำอธิบาย"],tr:["Sembol ve açıklama"],vi:["Mã giao dịch & mô tả"],zh:["商品和描述"],zh_TW:["商品&描述"]}},882719:e=>{e.exports={ar:["بحث عن الرموز"],ca_ES:["Cerca de símbols"],cs:"Symbol Search",de:["Symbol Suche"],el:"Symbol Search",en:"Symbol Search",es:["Búsqueda de símbolos"],fa:"Symbol Search",fr:["Recherche de symbole"],he_IL:["חיפוש סימולים"],hu_HU:"Symbol Search",id_ID:["Pencarian Simbol"],it:["Ricerca simbolo"],ja:["シンボル検索"],ko:["심볼 찾기"],ms_MY:["Cari simbol"],nl_NL:"Symbol Search",pl:["Wyszukiwanie symboli"],pt:["Pesquisa de Símbolo"],ro:"Symbol Search",ru:["Поиск инструментов"],sv:["Symbolsök"],th:["ค้นหาตัวย่อ"],tr:["Sembol Arama"],vi:["Tìm kiếm Mã giao dịch"],zh:["商品代码搜索"],zh_TW:["商品搜尋"]}},366702:e=>{e.exports={ar:["حذف من قائمة المراقبة"],ca_ES:["Elimina de la llista de seguiment"],cs:"Remove from Watchlist",de:["Von Watchlist entfernen"],el:"Remove from Watchlist",en:"Remove from Watchlist",es:["Eliminar de la lista de seguimiento"],fa:"Remove from Watchlist",fr:["Supprimer de la liste de surveillance"],he_IL:["הסר מרשימת המעקב"],hu_HU:"Remove from Watchlist",id_ID:["Hilangkan dari Daftar Pantau"],it:["Rimuovi da watchlist"],ja:["ウォッチリストから削除"],ko:["왓치리스트에서 없애기"],ms_MY:["Buang dari Senarai Amatan"],nl_NL:"Remove from Watchlist",pl:["Usuń z Listy Obserwowanych"],pt:["Remover da lista de observação"],ro:"Remove from Watchlist",ru:["Удалить из списка котировок"],sv:["Ta bort från Bevakningslista"],th:["ลบออกจากรายการเฝ้าระวัง"],tr:["Watchlist'ten Kaldır"],vi:["Loại bỏ khỏi Danh sách theo dõi"],zh:["從觀察清單中刪除"],zh_TW:["從觀察清單中移除"]}},
812629:e=>{e.exports={ar:["السلع"],ca_ES:"commodity",cs:"commodity",de:["Rohstoff"],el:"commodity",en:"commodity",es:["materia prima"],fa:"commodity",fr:["produit de base"],he_IL:["סחורה"],hu_HU:"commodity",id_ID:["komiditas"],it:["materia prima"],ja:["コモディティ"],ko:["상품"],ms_MY:["komoditi"],nl_NL:"commodity",pl:["towar"],pt:"commodity",ro:"commodity",ru:["товары"],sv:["Råvaror"],th:["คอมมอดิตี้"],tr:["Emtia"],vi:["hàng hóa"],zh:["商品"],zh_TW:["商品"]}},487592:e=>{e.exports={ar:["عقود الفروقات"],ca_ES:"cfd",cs:"cfd",de:"cfd",el:"cfd",en:"cfd",es:"cfd",fa:"cfd",fr:"cfd",he_IL:["חוזה הפרשים cfd"],hu_HU:"cfd",id_ID:"cfd",it:"cfd",ja:["CFD"],ko:["씨에프디"],ms_MY:"cfd",nl_NL:"cfd",pl:"cfd",pt:"cfd",ro:"cfd",ru:"cfd",sv:"cfd",th:"cfd",tr:"cfd",vi:"cfd",zh:["差价合约"],zh_TW:"cfd"}},308448:e=>{e.exports={ar:["العملات الرقمية"],ca_ES:["cripto"],cs:"crypto",de:"crypto",el:"crypto",en:"crypto",es:["cripto"],fa:"crypto",fr:"crypto",he_IL:["קריפטו"],hu_HU:["kripto"],id_ID:"crypto",it:["cripto"],ja:["暗号"],ko:["크립토"],ms_MY:["kripto"],nl_NL:"crypto",pl:["krypto"],pt:["Cripto"],ro:"crypto",ru:["криптовалюты"],sv:["krypto"],th:["คริปโต"],tr:["kripto"],vi:["tiền điện tử"],zh:["加密"],zh_TW:"crypto"}},667245:e=>{e.exports={ar:["إيصال إيداع"],ca_ES:"dr",cs:"dr",de:"dr",el:"dr",en:"dr",es:"dr",fa:"dr",fr:"dr",he_IL:"dr",hu_HU:"dr",id_ID:"dr",it:"dr",ja:["預託証券"],ko:"dr",ms_MY:"dr",nl_NL:"dr",pl:["Potwierdzenie wpłaty"],pt:"dr",ro:"dr",ru:["Депоз. расписки"],sv:"dr",th:"dr",tr:"dr",vi:"dr",zh:"dr",zh_TW:"dr"}},488720:e=>{e.exports={ar:["اقتصاد"],ca_ES:["economia"],cs:"economy",de:["Wirtschaft"],el:"economy",en:"economy",es:["economía"],fa:"economy",fr:["économie"],he_IL:["כַּלְכָּלָה"],hu_HU:"economy",id_ID:["ekonomi"],it:["economia"],ja:["経済指標"],ko:["경제"],ms_MY:["ekonomi"],nl_NL:"economy",pl:["gospodarka"],pt:["economia"],ro:"economy",ru:["экономические данные"],sv:["ekonomi"],th:["เศรษฐกิจ"],tr:["ekonomi"],vi:["kinh tế"],zh:["经济"],zh_TW:["經濟"]}},739512:e=>{e.exports={ar:["فوركس"],ca_ES:["Forex"],cs:"forex",de:["Devisen"],el:"forex",en:"forex",es:["Forex"],fa:"forex",fr:["Forex"],he_IL:['מט"ח'],hu_HU:"forex",id_ID:"forex",it:"forex",ja:["FX"],ko:["외환"],ms_MY:"forex",nl_NL:"forex",pl:"forex",pt:"forex",ro:"forex",ru:["форекс"],sv:["valutor"],th:["ฟอเร็กซ์"],tr:["döviz"],vi:"forex",zh:["外汇"],zh_TW:["外匯"]}},781859:e=>{e.exports={ar:["العقود الآجلة"],ca_ES:["futurs"],cs:"futures",de:["Futures"],el:"futures",en:"futures",es:["futuros"],fa:"futures",fr:"futures",he_IL:["חוזים עתידיים"],hu_HU:"futures",id_ID:["kontrak berjangka"],it:["future"],ja:["先物"],ko:["퓨쳐스"],ms_MY:["pasaran hadapan"],nl_NL:"futures",pl:["Kontrakty terminowe"],pt:["futuros"],ro:"futures",ru:["фьючерсы"],sv:["terminer"],th:["ฟิวเจอร์ส"],tr:["vadeli"],vi:["hợp đồng tương lai"],zh:["期货"],zh_TW:["期貨"]}},612754:e=>{e.exports={ar:["مؤشر"],ca_ES:["índex"],cs:"index",de:["Index"],el:"index",en:"index",es:["índice"],fa:"index",fr:["indice"],he_IL:["מדד"],hu_HU:"index",id_ID:["indeks"],it:["indice"],ja:["指数"],ko:["지수"],ms_MY:["indeks"],nl_NL:"index",pl:["indeks"],pt:["índice"],ro:"index",
ru:["индексы"],sv:"index",th:["ดัชนี"],tr:["endeks"],vi:["chỉ số"],zh:["指数"],zh_TW:["指數"]}},138071:e=>{e.exports={ar:["المؤشرات"],ca_ES:"indices",cs:"indices",de:["Indizes"],el:"indices",en:"indices",es:["índices"],fa:"indices",fr:"indices",he_IL:["מדדים"],hu_HU:"indices",id_ID:["indeks"],it:["Indici"],ja:["指数"],ko:["지수"],ms_MY:["indeks"],nl_NL:["indexen"],pl:["indeksy"],pt:["índices"],ro:"indices",ru:["индексы"],sv:["index"],th:["ดัชนี"],tr:["endeks"],vi:["các chỉ báo"],zh:["指数"],zh_TW:["指數"]}},636931:e=>{e.exports={ar:["سهم"],ca_ES:["accions"],cs:"stock",de:["Aktie"],el:"stock",en:"stock",es:["acciones"],fa:"stock",fr:"stock",he_IL:["מניה"],hu_HU:"stock",id_ID:["saham"],it:["azione"],ja:["株式"],ko:["스탁"],ms_MY:["saham"],nl_NL:"stock",pl:["akcja"],pt:["ação"],ro:"stock",ru:["акция"],sv:["aktier"],th:["หุ้น"],tr:["hisse"],vi:["cổ phiếu"],zh:["股票"],zh_TW:["股票"]}}}]);