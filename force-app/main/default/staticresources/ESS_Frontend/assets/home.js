import{v as ee,E as te,S as V,i as X,s as Y,e as y,a as v,t as _,g as B,b,c as D,d as I,f as ne,h as w,j as k,n as L,u as se,k as oe,l as le,m as z,o as $,p as R,q as G,r as P,w as S,x as M,y as C,M as ie,z as ae}from"./MainLayout.js";import{M as x}from"./MenuItem.js";class re{static GetMenuLists(){return ee({remoteAction:"ESS_Menu.GetMenuLists",params:[],responseFormatter:t=>t.map(l=>te.MenuListDTOFormatter(l,!0))})}}function W(r,t,l){const e=r.slice();return e[8]=t[l],e}function Z(r){let t,l,e;const s=r[7].default,m=ne(s,r,r[6],null),o=m||me(r);return{c(){t=w("div"),o&&o.c(),k(t,"class",l=L(`_section ${r[3]} ${r[0]}`)+" svelte-1wt3bci")},m(i,u){v(i,t,u),o&&o.m(t,null),e=!0},p(i,u){m?m.p&&(!e||u&64)&&se(m,s,i,i[6],e?le(s,i[6],u,null):oe(i[6]),null):o&&o.p&&(!e||u&6)&&o.p(i,e?u:-1),(!e||u&1&&l!==(l=L(`_section ${i[3]} ${i[0]}`)+" svelte-1wt3bci"))&&k(t,"class",l)},i(i){e||(_(o,i),e=!0)},o(i){b(o,i),e=!1},d(i){i&&I(t),o&&o.d(i)}}}function F(r){let t,l;return t=new x({props:{menuItem:r[8],class:r[2]}}),{c(){S(t.$$.fragment)},m(e,s){M(t,e,s),l=!0},p(e,s){const m={};s&2&&(m.menuItem=e[8]),s&4&&(m.class=e[2]),t.$set(m)},i(e){l||(_(t.$$.fragment,e),l=!0)},o(e){b(t.$$.fragment,e),l=!1},d(e){C(t,e)}}}function H(r){let t,l,e=r[8].isShow&&F(r);return{c(){e&&e.c(),t=y()},m(s,m){e&&e.m(s,m),v(s,t,m),l=!0},p(s,m){s[8].isShow?e?(e.p(s,m),m&2&&_(e,1)):(e=F(s),e.c(),_(e,1),e.m(t.parentNode,t)):e&&(B(),b(e,1,1,()=>{e=null}),D())},i(s){l||(_(e),l=!0)},o(s){b(e),l=!1},d(s){e&&e.d(s),s&&I(t)}}}function me(r){let t,l=r[1].name+"",e,s,m,o,i,u=r[1].menuItems,f=[];for(let n=0;n<u.length;n+=1)f[n]=H(W(r,u,n));const a=n=>b(f[n],1,1,()=>{f[n]=null});return{c(){t=w("div"),e=z(l),m=$(),o=w("div");for(let n=0;n<f.length;n+=1)f[n].c();k(t,"class",s=L(`text-size-large font-weight-bold mb-1.5 desktop:text-size-xlarge ${r[1].nameClass}`)+" svelte-1wt3bci"),k(o,"class","space-y-1")},m(n,c){v(n,t,c),R(t,e),v(n,m,c),v(n,o,c);for(let p=0;p<f.length;p+=1)f[p]&&f[p].m(o,null);i=!0},p(n,c){if((!i||c&2)&&l!==(l=n[1].name+"")&&G(e,l),(!i||c&2&&s!==(s=L(`text-size-large font-weight-bold mb-1.5 desktop:text-size-xlarge ${n[1].nameClass}`)+" svelte-1wt3bci"))&&k(t,"class",s),c&6){u=n[1].menuItems;let p;for(p=0;p<u.length;p+=1){const g=W(n,u,p);f[p]?(f[p].p(g,c),_(f[p],1)):(f[p]=H(g),f[p].c(),_(f[p],1),f[p].m(o,null))}for(B(),p=u.length;p<f.length;p+=1)a(p);D()}},i(n){if(!i){for(let c=0;c<u.length;c+=1)_(f[c]);i=!0}},o(n){f=f.filter(Boolean);for(let c=0;c<f.length;c+=1)b(f[c]);i=!1},d(n){n&&I(t),n&&I(m),n&&I(o),P(f,n)}}}function fe(r){let t,l,e=r[1].menuItems.length&&Z(r);return{c(){e&&e.c(),t=y()},m(s,m){e&&e.m(s,m),v(s,t,m),l=!0},p(s,[m]){s[1].menuItems.length?e?(e.p(s,m),m&2&&_(e,1)):(e=Z(s),e.c(),_(e,1),e.m(t.parentNode,t)):e&&(B(),b(e,1,1,()=>{e=null}),D())},i(s){l||(_(e),l=!0)},o(s){b(e),l=!1},d(s){e&&e.d(s),s&&I(t)}}}var h;(function(r){r.All="All",r.Approval="Approval",r.PersonalInformation="Personal Information",r.TimeBenefit="TimeBenefit",r.CompanyService="Company Service",r.Learning="Learning",r.Workforce="Workforce",r.TrackingReport="Tracking Report",r.Administration="Administration",r.MasterData="Master Data"})(h||(h={}));function ue(r,t,l){let{$$slots:e={},$$scope:s}=t,{class:m=""}=t,{section:o}=t,{isEven:i=!1}=t,{isZebra:u=!1}=t,{itemClass:f=void 0}=t,a=u?i?"bg-home-bg-2":"bg-home-bg-3":o.bg;return r.$$set=n=>{"class"in n&&l(0,m=n.class),"section"in n&&l(1,o=n.section),"isEven"in n&&l(4,i=n.isEven),"isZebra"in n&&l(5,u=n.isZebra),"itemClass"in n&&l(2,f=n.itemClass),"$$scope"in n&&l(6,s=n.$$scope)},[m,o,f,a,i,u,s,e]}class A extends V{constructor(t){super(),X(this,t,ue,fe,Y,{class:0,section:1,isEven:4,isZebra:5,itemClass:2})}}function O(r,t,l){const e=r.slice();return e[5]=t[l],e}function j(r,t,l){const e=r.slice();return e[8]=t[l],e}function U(r){let t,l=r[5].name+"",e;return{c(){t=w("div"),e=z(l),k(t,"class","text-white")},m(s,m){v(s,t,m),R(t,e)},p(s,m){m&2&&l!==(l=s[5].name+"")&&G(e,l)},d(s){s&&I(t)}}}function J(r){let t,l;return t=new x({props:{menuItem:r[8]}}),{c(){S(t.$$.fragment)},m(e,s){M(t,e,s),l=!0},p(e,s){const m={};s&2&&(m.menuItem=e[8]),t.$set(m)},i(e){l||(_(t.$$.fragment,e),l=!0)},o(e){b(t.$$.fragment,e),l=!1},d(e){C(t,e)}}}function K(r){let t,l,e,s,m=r[5].menuItems.length&&U(r),o=r[5].menuItems,i=[];for(let f=0;f<o.length;f+=1)i[f]=J(j(r,o,f));const u=f=>b(i[f],1,1,()=>{i[f]=null});return{c(){t=w("div"),m&&m.c(),l=$();for(let f=0;f<i.length;f+=1)i[f].c();e=$(),k(t,"class","space-y-1")},m(f,a){v(f,t,a),m&&m.m(t,null),R(t,l);for(let n=0;n<i.length;n+=1)i[n]&&i[n].m(t,null);R(t,e),s=!0},p(f,a){if(f[5].menuItems.length?m?m.p(f,a):(m=U(f),m.c(),m.m(t,l)):m&&(m.d(1),m=null),a&2){o=f[5].menuItems;let n;for(n=0;n<o.length;n+=1){const c=j(f,o,n);i[n]?(i[n].p(c,a),_(i[n],1)):(i[n]=J(c),i[n].c(),_(i[n],1),i[n].m(t,e))}for(B(),n=o.length;n<i.length;n+=1)u(n);D()}},i(f){if(!s){for(let a=0;a<o.length;a+=1)_(i[a]);s=!0}},o(f){i=i.filter(Boolean);for(let a=0;a<i.length;a+=1)b(i[a]);s=!1},d(f){f&&I(t),m&&m.d(),P(i,f)}}}function ce(r){let t,l=r[1].approval.name+"",e,s,m,o,i=r[1].approval.subGroup,u=[];for(let a=0;a<i.length;a+=1)u[a]=K(O(r,i,a));const f=a=>b(u[a],1,1,()=>{u[a]=null});return{c(){t=w("div"),e=z(l),s=$(),m=w("div");for(let a=0;a<u.length;a+=1)u[a].c();k(t,"class","text-size-large font-weight-bold mb-1.5 text-white desktop:text-size-xlarge"),k(m,"class","grid gap-2 desktop:grid-cols-3 desktop:gap-x-[90px]")},m(a,n){v(a,t,n),R(t,e),v(a,s,n),v(a,m,n);for(let c=0;c<u.length;c+=1)u[c]&&u[c].m(m,null);o=!0},p(a,n){if((!o||n&2)&&l!==(l=a[1].approval.name+"")&&G(e,l),n&2){i=a[1].approval.subGroup;let c;for(c=0;c<i.length;c+=1){const p=O(a,i,c);u[c]?(u[c].p(p,n),_(u[c],1)):(u[c]=K(p),u[c].c(),_(u[c],1),u[c].m(m,null))}for(B(),c=i.length;c<u.length;c+=1)f(c);D()}},i(a){if(!o){for(let n=0;n<i.length;n+=1)_(u[n]);o=!0}},o(a){u=u.filter(Boolean);for(let n=0;n<u.length;n+=1)b(u[n]);o=!1},d(a){a&&I(t),a&&I(s),a&&I(m),P(u,a)}}}function Q(r){let t,l,e,s,m,o,i,u,f;return s=new A({props:{section:r[1].administration}}),o=new A({props:{section:r[1].trackingReport}}),u=new A({props:{section:r[1].masterData}}),{c(){t=w("div"),t.textContent="For Administration",l=$(),e=w("div"),S(s.$$.fragment),m=$(),S(o.$$.fragment),i=$(),S(u.$$.fragment),k(t,"class","divider my-2 text-primary desktop:my-3"),k(e,"class","grid gap-0.5 desktop:grid-cols-3 desktop:gap-2")},m(a,n){v(a,t,n),v(a,l,n),v(a,e,n),M(s,e,null),R(e,m),M(o,e,null),R(e,i),M(u,e,null),f=!0},p(a,n){const c={};n&2&&(c.section=a[1].administration),s.$set(c);const p={};n&2&&(p.section=a[1].trackingReport),o.$set(p);const g={};n&2&&(g.section=a[1].masterData),u.$set(g)},i(a){f||(_(s.$$.fragment,a),_(o.$$.fragment,a),_(u.$$.fragment,a),f=!0)},o(a){b(s.$$.fragment,a),b(o.$$.fragment,a),b(u.$$.fragment,a),f=!1},d(a){a&&I(t),a&&I(l),a&&I(e),C(s),C(o),C(u)}}}function pe(r){let t,l,e,s,m,o,i,u,f,a,n,c;t=new A({props:{class:"mb-1",section:r[1].approval,$$slots:{default:[ce]},$$scope:{ctx:r}}}),s=new A({props:{class:"bg-home-bg-2",itemClass:"h-[64px] text-[11.5px] desktop:text-size-normal",section:r[1].personalInformation}}),o=new A({props:{class:"bg-home-bg-2",itemClass:"h-[64px] text-[11.5px] desktop:text-size-normal",section:r[1].companyService}}),f=new A({props:{class:"bg-home-bg-2",itemClass:"h-[64px] text-[11.5px] !w-[calc(50%-0.6rem)] desktop:!w-auto desktop:text-size-normal",section:r[1].workforce}});let p=(r[1].administration.menuItems.length||r[1].trackingReport.menuItems.length||r[1].masterData.menuItems.length)&&Q(r);return{c(){S(t.$$.fragment),l=$(),e=w("div"),S(s.$$.fragment),m=$(),S(o.$$.fragment),i=$(),u=w("div"),S(f.$$.fragment),a=$(),p&&p.c(),n=y(),k(u,"class","col-span-2 desktop:col-span-1"),k(e,"class","grid grid-cols-2 gap-0.5 desktop:grid-cols-3 desktop:gap-2")},m(g,d){M(t,g,d),v(g,l,d),v(g,e,d),M(s,e,null),R(e,m),M(o,e,null),R(e,i),R(e,u),M(f,u,null),v(g,a,d),p&&p.m(g,d),v(g,n,d),c=!0},p(g,d){const T={};d&2&&(T.section=g[1].approval),d&2050&&(T.$$scope={dirty:d,ctx:g}),t.$set(T);const q={};d&2&&(q.section=g[1].personalInformation),s.$set(q);const N={};d&2&&(N.section=g[1].companyService),o.$set(N);const E={};d&2&&(E.section=g[1].workforce),f.$set(E),g[1].administration.menuItems.length||g[1].trackingReport.menuItems.length||g[1].masterData.menuItems.length?p?(p.p(g,d),d&2&&_(p,1)):(p=Q(g),p.c(),_(p,1),p.m(n.parentNode,n)):p&&(B(),b(p,1,1,()=>{p=null}),D())},i(g){c||(_(t.$$.fragment,g),_(s.$$.fragment,g),_(o.$$.fragment,g),_(f.$$.fragment,g),_(p),c=!0)},o(g){b(t.$$.fragment,g),b(s.$$.fragment,g),b(o.$$.fragment,g),b(f.$$.fragment,g),b(p),c=!1},d(g){C(t,g),g&&I(l),g&&I(e),C(s),C(o),C(f),g&&I(a),p&&p.d(g),g&&I(n)}}}function ge(r){let t,l;return t=new ie({props:{isHome:!0,isShowLoading:r[0],$$slots:{default:[pe]},$$scope:{ctx:r}}}),{c(){S(t.$$.fragment)},m(e,s){M(t,e,s),l=!0},p(e,[s]){const m={};s&1&&(m.isShowLoading=e[0]),s&2050&&(m.$$scope={dirty:s,ctx:e}),t.$set(m)},i(e){l||(_(t.$$.fragment,e),l=!0)},o(e){b(t.$$.fragment,e),l=!1},d(e){C(t,e)}}}function _e(r,t,l){let e=!0,s=[],m=[],o={approval:{name:"Approval",bg:"bg-gradient-to-b from-home-bg-main to-home-bg-main-2",section:h.Approval,menuItems:[],subGroup:[]},personalInformation:{name:"Personal Information",bg:"bg-home-bg-2",section:h.PersonalInformation,menuItems:[]},timeBenefit:{name:"Time & Benefit",bg:"bg-home-bg-3",section:h.TimeBenefit,menuItems:[]},companyService:{name:"Company Service",bg:"bg-home-bg-2",section:h.CompanyService,menuItems:[]},learning:{name:"Learning",bg:"bg-home-bg-3",section:h.Learning,menuItems:[]},workforce:{name:"Request Manpower Service Requisition",bg:"bg-home-bg-2",section:h.Workforce,menuItems:[]},trackingReport:{name:"Tracking Report",bg:"bg-home-bg-4",section:h.TrackingReport,menuItems:[]},administration:{name:"Administration",bg:"bg-home-bg-4",section:h.Administration,menuItems:[]},masterData:{name:"Master Data",bg:"bg-home-bg-4",section:h.MasterData,menuItems:[]}};function i(u){return s.filter(f=>f.menuGroup===u)}return ae(()=>{re.GetMenuLists().then(u=>{if(l(0,e=!1),s=u,l(1,o.approval.menuItems=i(h.Approval),o),o.approval.menuItems.length){const f={personalInformation:["Employee Basic & Tax Information Update","Employee 180 days Probationary Period","Employee Retirement Date Confirmation"],companyService:["Stationery"],workforce:["Request Manpower Service Requisition"]};o.approval.subGroup.push({name:"Personal Information",menuItems:o.approval.menuItems.filter(a=>f.personalInformation.includes(a.menuName))}),o.approval.subGroup.push({name:"Company Service",menuItems:o.approval.menuItems.filter(a=>f.companyService.includes(a.menuName))}),o.approval.subGroup.push({name:"Request Manpower Service Requisition",menuItems:o.approval.menuItems.filter(a=>f.workforce.includes(a.menuName))})}l(1,o.personalInformation.menuItems=i(h.PersonalInformation),o),l(1,o.timeBenefit.menuItems=i(h.TimeBenefit),o),l(1,o.companyService.menuItems=i(h.CompanyService),o),l(1,o.learning.menuItems=i(h.Learning),o),l(1,o.workforce.menuItems=i(h.Workforce),o),l(1,o.trackingReport.menuItems=i(h.TrackingReport),o),l(1,o.administration.menuItems=i(h.Administration),o),l(1,o.masterData.menuItems=i(h.MasterData),o),m=[],o.personalInformation.menuItems.length&&m.push("personalInformation"),o.timeBenefit.menuItems.length&&m.push("timeBenefit"),o.companyService.menuItems.length&&m.push("companyService"),o.learning.menuItems.length&&m.push("learning"),o.workforce.menuItems.length&&m.push("workforce")}).catch(()=>{l(0,e=!1)})}),[e,o]}class be extends V{constructor(t){super(),X(this,t,_e,ge,Y,{})}}new be({target:document.getElementById("app")});