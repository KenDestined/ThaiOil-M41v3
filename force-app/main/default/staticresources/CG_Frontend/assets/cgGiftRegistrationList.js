var wn=Object.defineProperty,$n=Object.defineProperties;var kn=Object.getOwnPropertyDescriptors;var Qe=Object.getOwnPropertySymbols;var Cn=Object.prototype.hasOwnProperty,Rn=Object.prototype.propertyIsEnumerable;var Ve=(e,o,t)=>o in e?wn(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,Xe=(e,o)=>{for(var t in o||(o={}))Cn.call(o,t)&&Ve(e,t,o[t]);if(Qe)for(var t of Qe(o))Rn.call(o,t)&&Ve(e,t,o[t]);return e},Ye=(e,o)=>$n(e,kn(o));import{S as an,i as sn,s as ln,C as Ze,e as v,b as I,c as C,g as w,h as W,j as f,m as R,D as Sn,t as h,a as $,n as J,d as S,w as Nn,ae as un,ad as In,K as xe,o as Dn,B as A,y as z,P as L,f as yn,E as An,k as Gn,q as Ln,r as Pn,U as P,H as Tn,L as Mn,x as en,M as ie,R as pn}from"./Layout.js";import{P as qn,B as nn}from"./Button.js";import{B as tn}from"./BaseInput.js";import{C as T}from"./CG_Gift_Reporting.service.js";import{C as on,T as En}from"./Table.js";import{A as Bn}from"./AdminActionTemplate.js";import{r as Fn}from"./App.js";import{M as Un,R as Hn}from"./ReportDetailModal.js";import{C as jn}from"./CompanyDropdown.js";import{F as zn,D as Kn,S as On,U as Wn}from"./UnitDropdown.js";import"./BaseDropdown.js";import"./CG_COI_Reporting.service.js";import"./AvatarIcon.js";import"./Workflow.js";function Jn(e){return{c:z,m:z,p:z,i:z,o:z,d:z}}function Qn(e){var G;let o,t,i,p=((G=e[2])==null?void 0:G.totalReport)+"",n,_,a,b,m,d,u=e[2]&&rn(e);return{c(){o=v("div"),t=v("div"),i=v("div"),n=yn(p),_=I(),a=v("div"),a.textContent="\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",b=I(),u&&u.c(),m=An(),w(i,"class","text-size-xlarge"),w(a,"class","text-center text-gray-700"),w(t,"class","text-center font-weight-bold"),w(o,"class","tablet:flex tablet:justify-center mb-4")},m(g,k){W(g,o,k),f(o,t),f(t,i),f(i,n),f(t,_),f(t,a),W(g,b,k),u&&u.m(g,k),W(g,m,k),d=!0},p(g,k){var N;(!d||k&4)&&p!==(p=((N=g[2])==null?void 0:N.totalReport)+"")&&Gn(n,p),g[2]?u?(u.p(g,k),k&4&&h(u,1)):(u=rn(g),u.c(),h(u,1),u.m(m.parentNode,m)):u&&(Ln(),$(u,1,1,()=>{u=null}),Pn())},i(g){d||(h(u),d=!0)},o(g){$(u),d=!1},d(g){g&&J(o),g&&J(b),u&&u.d(g),g&&J(m)}}}function rn(e){let o,t,i,p;function n(a){e[13](a)}let _={tableConfig:e[7]};return e[4]!==void 0&&(_.pageParam=e[4]),t=new En({props:_}),e[12](t),A.push(()=>P(t,"pageParam",n)),{c(){o=v("div"),C(t.$$.fragment),w(o,"class","text-black")},m(a,b){W(a,o,b),R(t,o,null),p=!0},p(a,b){const m={};!i&&b&16&&(i=!0,m.pageParam=a[4],L(()=>i=!1)),t.$set(m)},i(a){p||(h(t.$$.fragment,a),p=!0)},o(a){$(t.$$.fragment,a),p=!1},d(a){a&&J(o),e[12](null),S(t)}}}function Vn(e){let o,t;return o=new Tn({props:{isShow:!0,isbgTransparent:!0}}),{c(){C(o.$$.fragment)},m(i,p){R(o,i,p),t=!0},p:z,i(i){t||(h(o.$$.fragment,i),t=!0)},o(i){$(o.$$.fragment,i),t=!1},d(i){S(o,i)}}}function Xn(e){let o,t;return o=new Hn({props:{type:"gift",item:e[5],modal:e[6],service:e[0].reportDetail}}),{c(){C(o.$$.fragment)},m(i,p){R(o,i,p),t=!0},p(i,p){const n={};p&32&&(n.item=i[5]),p&64&&(n.modal=i[6]),p&1&&(n.service=i[0].reportDetail),o.$set(n)},i(i){t||(h(o.$$.fragment,i),t=!0)},o(i){$(o.$$.fragment,i),t=!1},d(i){S(o,i)}}}function Yn(e){let o,t,i,p,n,_,a={ctx:e,current:null,token:null,hasCatch:!1,pending:Vn,then:Qn,catch:Jn,blocks:[,,,]};Ze(t=e[1],a);let b={$$slots:{default:[Xn]},$$scope:{ctx:e}};return n=new Un({props:b}),e[14](n),{c(){o=v("div"),a.block.c(),i=I(),p=v("div"),C(n.$$.fragment),w(p,"class","text-black"),w(o,"class","relative _container svelte-ym3wdv")},m(m,d){W(m,o,d),a.block.m(o,a.anchor=null),a.mount=()=>o,a.anchor=i,f(o,i),f(o,p),R(n,p,null),_=!0},p(m,[d]){e=m,a.ctx=e,d&2&&t!==(t=e[1])&&Ze(t,a)||Sn(a,e,d);const u={};d&524385&&(u.$$scope={dirty:d,ctx:e}),n.$set(u)},i(m){_||(h(a.block),h(n.$$.fragment,m),_=!0)},o(m){for(let d=0;d<3;d+=1){const u=a.blocks[d];$(u)}$(n.$$.fragment,m),_=!1},d(m){m&&J(o),a.block.d(),a.token=null,a=null,e[14](null),S(n)}}}function Zn(e,o,t){let{filter:i}=o,{isSearching:p=!1}=o,{services:n}=o,{reportRoute:_}=o,a,b,m,d,u,G,g;function k(s){t(5,G=s),g.open()}const N={columns:[{name:"Report Number",prop:"reportNumber",cellTemplate:on.Link,onClick:(s,l)=>{console.log("onClick",l),Nn(_,{reportId:l.id,parent:un.currentMenu})}},{name:"Name",prop:"owner",sortBy:"ownerName",render:s=>s.fullName},{name:"Supervisor's Decision",prop:"supervisorApproverStatus",render:s=>s==null?void 0:s.value},{name:"Report Status",prop:"status",cellClasses:"cursor-pointer",render:Fn,onClick:(s,l)=>{k(l)}},{name:"Gift Status",prop:"giftStatus",render:s=>s?In[s]:"-"},{name:"Submitted Date",prop:"lastUpdated",cellTemplate:on.Date},{name:"Function",prop:"position",sortable:!1},{name:"Action",prop:"_action",Component:Bn,actions:{onResend:s=>n.resend({reportId:s.id}).then(l=>{xe.success("Resend Successfully")}),onCancel:s=>n.cancel({reportId:s.id}).then(l=>{xe.success("Cancel Successfully"),M().finally(()=>{d.reload()})})}}],getData(s,l){return Promise.all([m,n.list(Ye(Xe({},F()),{sortByParam:l,pageParam:s})).finally(()=>{t(8,p=!1)})])}};Dn(()=>{M()});function M(){return t(1,a=n.count(F()).then(s=>{t(2,b=s),m=b.totalReport})),a}function F(){var s;return{ownerId:i.ownerId.trim(),ownerName:i.ownerName.trim(),companyId:((s=i.company)==null?void 0:s.id)||"all",function:i.function||"all",department:i.department||"all",section:i.section||"all",unit:i.unit||"all"}}function D(){t(8,p=!0),M().finally(()=>{t(4,u.pageNo=1,u)})}function U(s){A[s?"unshift":"push"](()=>{d=s,t(3,d)})}function K(s){u=s,t(4,u)}function y(s){A[s?"unshift":"push"](()=>{g=s,t(6,g)})}return e.$$set=s=>{"filter"in s&&t(9,i=s.filter),"isSearching"in s&&t(8,p=s.isSearching),"services"in s&&t(0,n=s.services),"reportRoute"in s&&t(10,_=s.reportRoute)},[n,a,b,d,u,G,g,N,p,i,_,D,U,K,y]}class xn extends an{constructor(o){super(),sn(this,o,Zn,Yn,ln,{filter:9,isSearching:8,services:0,reportRoute:10,search:11})}get search(){return this.$$.ctx[11]}}function et(e){var Se,Ne,Ie,De,ye,Ae,Ge,Le,Pe,Te;let o,t,i,p,n,_,a,b,m,d,u,G,g,k,N,M,F,D,U,K,y,s,l,Y,E,ae,ce,Z,B,se,me,x,H,ge,ee,j,_e,O,ne,be,q,le,ue,te;t=new qn({props:{menu:ie.giftRegistrationList,nameTH:e[3],showNameEN:!1}});function fn(r){e[7](r)}let he={label:"Employee Name"};e[0].ownerName!==void 0&&(he.value=e[0].ownerName),a=new tn({props:he}),A.push(()=>P(a,"value",fn));function dn(r){e[8](r)}let ve={label:"Employee ID"};e[0].ownerId!==void 0&&(ve.value=e[0].ownerId),u=new tn({props:ve}),A.push(()=>P(u,"value",dn));function cn(r){e[10](r)}let we={placeholder:"All",service:T.CGGlobal_GetCompanies,onChange:e[9]};e[0].company!==void 0&&(we.value=e[0].company),N=new jn({props:we}),A.push(()=>P(N,"value",cn));function mn(r){e[12](r)}let $e={placeholder:"All",service:T,companyId:(Ne=(Se=e[0])==null?void 0:Se.company)==null?void 0:Ne.id,disabled:!((De=(Ie=e[0])==null?void 0:Ie.company)!=null&&De.id),onChange:e[11]};e[0].function!==void 0&&($e.value=e[0].function),D=new zn({props:$e}),A.push(()=>P(D,"value",mn));function gn(r){e[14](r)}let ke={placeholder:"All",service:T,functionId:(ye=e[0])==null?void 0:ye.function,disabled:!((Ae=e[0])!=null&&Ae.function),onChange:e[13]};e[0].department!==void 0&&(ke.value=e[0].department),y=new Kn({props:ke}),A.push(()=>P(y,"value",gn));function _n(r){e[16](r)}let Ce={placeholder:"All",service:T,department:(Ge=e[0])==null?void 0:Ge.department,disabled:!((Le=e[0])!=null&&Le.department),onChange:e[15]};e[0].section!==void 0&&(Ce.value=e[0].section),E=new On({props:Ce}),A.push(()=>P(E,"value",_n));function bn(r){e[17](r)}let Re={placeholder:"All",service:T,section:(Pe=e[0])==null?void 0:Pe.section,disabled:!((Te=e[0])!=null&&Te.section)};e[0].unit!==void 0&&(Re.value=e[0].unit),B=new Wn({props:Re}),A.push(()=>P(B,"value",bn)),H=new nn({props:{icon:"ic-search",label:"Search",isLoading:e[2],onClick:e[1],classes:"w-full"}}),j=new nn({props:{icon:"ic-clear",label:"Clear",primary:!1,outline:!0,isLoading:e[2],onClick:e[6],classes:"w-full"}});function hn(r){e[18](r)}function vn(r){e[19](r)}let pe={filter:e[0],services:e[5],reportRoute:pn.GiftRegistrationDetail};return e[1]!==void 0&&(pe.search=e[1]),e[2]!==void 0&&(pe.isSearching=e[2]),q=new xn({props:pe}),A.push(()=>P(q,"search",hn)),A.push(()=>P(q,"isSearching",vn)),{c(){o=v("div"),C(t.$$.fragment),i=I(),p=v("div"),n=v("div"),_=v("div"),C(a.$$.fragment),m=I(),d=v("div"),C(u.$$.fragment),g=I(),k=v("div"),C(N.$$.fragment),F=I(),C(D.$$.fragment),K=I(),C(y.$$.fragment),l=I(),Y=v("div"),C(E.$$.fragment),ce=I(),Z=v("div"),C(B.$$.fragment),me=I(),x=v("div"),C(H.$$.fragment),ge=I(),ee=v("div"),C(j.$$.fragment),_e=I(),O=v("div"),ne=v("div"),ne.textContent=`${e[3]}`,be=I(),C(q.$$.fragment),w(_,"class","desktop:col-span-2"),w(d,"class","desktop:col-span-2"),w(k,"class","col-span-2 desktop:col-start-1 desktop:col-span-1"),w(Y,"class","mb-2 desktop:mb-0"),w(Z,"class","mb-2 desktop:mb-0"),w(x,"class","desktop:pt-4.5"),w(ee,"class","desktop:pt-4.5"),w(n,"class","grid grid-cols-2 gap-2 gap-y-1 desktop:grid-cols-7"),w(p,"class","bg-gray-100 -mx-2 my-2 p-2 pb-4 desktop:px-9"),w(ne,"class","text-center text-size-xlarge font-weight-bold mb-3"),w(O,"class","text-gift bg-gift-light border border-gray-400 px-2 pt-4 pb-3"),w(o,"class","_g-card-body")},m(r,c){W(r,o,c),R(t,o,null),f(o,i),f(o,p),f(p,n),f(n,_),R(a,_,null),f(n,m),f(n,d),R(u,d,null),f(n,g),f(n,k),R(N,k,null),f(n,F),R(D,n,null),f(n,K),R(y,n,null),f(n,l),f(n,Y),R(E,Y,null),f(n,ce),f(n,Z),R(B,Z,null),f(n,me),f(n,x),R(H,x,null),f(n,ge),f(n,ee),R(j,ee,null),f(o,_e),f(o,O),f(O,ne),f(O,be),R(q,O,null),te=!0},p(r,c){var Be,Fe,Ue,He,je,ze,Ke,Oe,We,Je;const Me={};!b&&c&1&&(b=!0,Me.value=r[0].ownerName,L(()=>b=!1)),a.$set(Me);const qe={};!G&&c&1&&(G=!0,qe.value=r[0].ownerId,L(()=>G=!1)),u.$set(qe);const fe={};c&1&&(fe.onChange=r[9]),!M&&c&1&&(M=!0,fe.value=r[0].company,L(()=>M=!1)),N.$set(fe);const Q={};c&1&&(Q.companyId=(Fe=(Be=r[0])==null?void 0:Be.company)==null?void 0:Fe.id),c&1&&(Q.disabled=!((He=(Ue=r[0])==null?void 0:Ue.company)!=null&&He.id)),c&1&&(Q.onChange=r[11]),!U&&c&1&&(U=!0,Q.value=r[0].function,L(()=>U=!1)),D.$set(Q);const V={};c&1&&(V.functionId=(je=r[0])==null?void 0:je.function),c&1&&(V.disabled=!((ze=r[0])!=null&&ze.function)),c&1&&(V.onChange=r[13]),!s&&c&1&&(s=!0,V.value=r[0].department,L(()=>s=!1)),y.$set(V);const X={};c&1&&(X.department=(Ke=r[0])==null?void 0:Ke.department),c&1&&(X.disabled=!((Oe=r[0])!=null&&Oe.department)),c&1&&(X.onChange=r[15]),!ae&&c&1&&(ae=!0,X.value=r[0].section,L(()=>ae=!1)),E.$set(X);const oe={};c&1&&(oe.section=(We=r[0])==null?void 0:We.section),c&1&&(oe.disabled=!((Je=r[0])!=null&&Je.section)),!se&&c&1&&(se=!0,oe.value=r[0].unit,L(()=>se=!1)),B.$set(oe);const de={};c&4&&(de.isLoading=r[2]),c&2&&(de.onClick=r[1]),H.$set(de);const Ee={};c&4&&(Ee.isLoading=r[2]),j.$set(Ee);const re={};c&1&&(re.filter=r[0]),!le&&c&2&&(le=!0,re.search=r[1],L(()=>le=!1)),!ue&&c&4&&(ue=!0,re.isSearching=r[2],L(()=>ue=!1)),q.$set(re)},i(r){te||(h(t.$$.fragment,r),h(a.$$.fragment,r),h(u.$$.fragment,r),h(N.$$.fragment,r),h(D.$$.fragment,r),h(y.$$.fragment,r),h(E.$$.fragment,r),h(B.$$.fragment,r),h(H.$$.fragment,r),h(j.$$.fragment,r),h(q.$$.fragment,r),te=!0)},o(r){$(t.$$.fragment,r),$(a.$$.fragment,r),$(u.$$.fragment,r),$(N.$$.fragment,r),$(D.$$.fragment,r),$(y.$$.fragment,r),$(E.$$.fragment,r),$(B.$$.fragment,r),$(H.$$.fragment,r),$(j.$$.fragment,r),$(q.$$.fragment,r),te=!1},d(r){r&&J(o),S(t),S(a),S(u),S(N),S(D),S(y),S(E),S(B),S(H),S(j),S(q)}}}function nt(e){let o,t;return o=new Mn({props:{breadcrumbs:e[4],$$slots:{default:[et]},$$scope:{ctx:e}}}),{c(){C(o.$$.fragment)},m(i,p){R(o,i,p),t=!0},p(i,[p]){const n={};p&1048583&&(n.$$scope={dirty:p,ctx:i}),o.$set(n)},i(i){t||(h(o.$$.fragment,i),t=!0)},o(i){$(o.$$.fragment,i),t=!1},d(i){S(o,i)}}}function tt(e,o,t){const i=en[ie.giftRegistrationList].nameEN,p=[{route:pn.HOME,label:en[ie.home].nameEN},{label:i}];let n={ownerName:"",ownerId:"",company:void 0,function:void 0,department:void 0,section:void 0,unit:void 0};const _={count:T.GetAdminGiftReportListCount,list:T.GetAdminGiftReportList,resend:T.AdminResendReport,cancel:T.AdminCancelReport,reportDetail:T.GetReportWorkflow};let a,b;function m(){t(0,n={ownerName:"",ownerId:"",company:void 0,function:void 0,department:void 0,section:void 0,unit:void 0})}function d(l){e.$$.not_equal(n.ownerName,l)&&(n.ownerName=l,t(0,n))}function u(l){e.$$.not_equal(n.ownerId,l)&&(n.ownerId=l,t(0,n))}const G=l=>{l||(t(0,n.function=void 0,n),t(0,n.department=void 0,n),t(0,n.section=void 0,n),t(0,n.unit=void 0,n))};function g(l){e.$$.not_equal(n.company,l)&&(n.company=l,t(0,n))}const k=l=>{l||(t(0,n.department=void 0,n),t(0,n.section=void 0,n),t(0,n.unit=void 0,n))};function N(l){e.$$.not_equal(n.function,l)&&(n.function=l,t(0,n))}const M=l=>{l||(t(0,n.section=void 0,n),t(0,n.unit=void 0,n))};function F(l){e.$$.not_equal(n.department,l)&&(n.department=l,t(0,n))}const D=l=>{l||t(0,n.unit=void 0,n)};function U(l){e.$$.not_equal(n.section,l)&&(n.section=l,t(0,n))}function K(l){e.$$.not_equal(n.unit,l)&&(n.unit=l,t(0,n))}function y(l){a=l,t(1,a)}function s(l){b=l,t(2,b)}return[n,a,b,i,p,_,m,d,u,G,g,k,N,M,F,D,U,K,y,s]}class ot extends an{constructor(o){super(),sn(this,o,tt,nt,ln,{})}}un.currentMenu=ie.giftRegistrationList;new ot({target:document.getElementById("app")});