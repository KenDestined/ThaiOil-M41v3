import{S as H,i as N,s as P,w as g,x as b,t as u,b as p,y as $,h as c,o as q,j as d,a6 as L,a as h,p as _,g as W,c as Y,d as C,m as j,q as z,L as v,B as w,F as A,G as F}from"./MainLayout.js";import{B as T}from"./Button.js";import{T as G}from"./TextArea.js";import{M as R}from"./Modal.js";function k(s){let a,n,i,e;function r(t){s[9](t)}let o={label:s[4],labelClass:"text-gray-800",required:!!s[1].requiredComment};return s[3]!==void 0&&(o.value=s[3]),n=new G({props:o}),w.push(()=>A(n,"value",r)),{c(){a=c("div"),g(n.$$.fragment)},m(t,l){h(t,a,l),b(n,a,null),e=!0},p(t,l){const f={};l&16&&(f.label=t[4]),l&2&&(f.required=!!t[1].requiredComment),!i&&l&8&&(i=!0,f.value=t[3],F(()=>i=!1)),n.$set(f)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){p(n.$$.fragment,t),e=!1},d(t){t&&C(a),$(n)}}}function D(s){let a,n,i,e=s[1].detail+"",r,o,t=s[1].canComment&&k(s);return{c(){a=c("div"),n=c("div"),i=c("span"),r=q(),t&&t.c(),d(n,"class","text-size-xlarge text-center"),L(n,"mb-5",s[1].canComment),d(a,"class","max-w-[852px] mx-auto")},m(l,f){h(l,a,f),_(a,n),_(n,i),i.innerHTML=e,_(a,r),t&&t.m(a,null),o=!0},p(l,f){(!o||f&2)&&e!==(e=l[1].detail+"")&&(i.innerHTML=e),(!o||f&2)&&L(n,"mb-5",l[1].canComment),l[1].canComment?t?(t.p(l,f),f&2&&u(t,1)):(t=k(l),t.c(),u(t,1),t.m(a,null)):t&&(W(),p(t,1,1,()=>{t=null}),Y())},i(l){o||(u(t),o=!0)},o(l){p(t),o=!1},d(l){l&&C(a),t&&t.d()}}}function E(s){let a,n=s[1].title+"",i;return{c(){a=c("div"),i=j(n),d(a,"slot","title")},m(e,r){h(e,a,r),_(a,i)},p(e,r){r&2&&n!==(n=e[1].title+"")&&z(i,n)},d(e){e&&C(a)}}}function I(s){let a,n,i,e,r;return n=new T({props:{class:"mr-2 w-[96px]",label:s[1].isThai?"ใช่":"Yes",isLoading:s[0]}}),n.$on("click",s[7]),e=new T({props:{primary:!1,cancel:!0,class:"w-[96px]",label:s[1].isThai?"ไม่ใช่":"No",isLoading:s[0]}}),e.$on("click",s[8]),{c(){a=c("div"),g(n.$$.fragment),i=q(),g(e.$$.fragment),d(a,"slot","footer"),d(a,"class","flex")},m(o,t){h(o,a,t),b(n,a,null),_(a,i),b(e,a,null),r=!0},p(o,t){const l={};t&2&&(l.label=o[1].isThai?"ใช่":"Yes"),t&1&&(l.isLoading=o[0]),n.$set(l);const f={};t&2&&(f.label=o[1].isThai?"ไม่ใช่":"No"),t&1&&(f.isLoading=o[0]),e.$set(f)},i(o){r||(u(n.$$.fragment,o),u(e.$$.fragment,o),r=!0)},o(o){p(n.$$.fragment,o),p(e.$$.fragment,o),r=!1},d(o){o&&C(a),$(n),$(e)}}}function J(s){let a,n,i={maxWidth:s[1].canComment?"500px":"330px",$$slots:{footer:[I],title:[E],default:[D]},$$scope:{ctx:s}};return a=new R({props:i}),s[10](a),{c(){g(a.$$.fragment)},m(e,r){b(a,e,r),n=!0},p(e,[r]){const o={};r&2&&(o.maxWidth=e[1].canComment?"500px":"330px"),r&2079&&(o.$$scope={dirty:r,ctx:e}),a.$set(o)},i(e){n||(u(a.$$.fragment,e),n=!0)},o(e){p(a.$$.fragment,e),n=!1},d(e){s[10](null),$(a,e)}}}function K(s,a,n){let{isLoading:i=!1}=a,e={},r,o="",t="";function l(m){n(1,e=m),e.reasonLabel?n(4,t=e.reasonLabel):e.isThai?n(4,t="เหตุผล"):n(4,t="Reason"),n(3,o=""),r.open()}function f(){r.close()}const x=()=>{if(typeof e.requiredComment=="function"){if(e.requiredComment()&&o.trim()===""){v.error(e.emptyCommentText||"Please enter a reason");return}}else if(e.requiredComment&&o.trim()===""){v.error(e.emptyCommentText||"Please enter a reason");return}e.onConfirm(o)},M=()=>{var m;(m=e.onCancel)==null||m.call(e),r.close()};function B(m){o=m,n(3,o)}function S(m){w[m?"unshift":"push"](()=>{r=m,n(2,r)})}return s.$$set=m=>{"isLoading"in m&&n(0,i=m.isLoading)},[i,e,r,o,t,l,f,x,M,B,S]}class X extends H{constructor(a){super(),N(this,a,K,J,P,{isLoading:0,open:5,close:6})}get open(){return this.$$.ctx[5]}get close(){return this.$$.ctx[6]}}export{X as C};