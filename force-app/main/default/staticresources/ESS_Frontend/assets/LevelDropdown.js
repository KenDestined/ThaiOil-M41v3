import{S as c,i as m,s as g,B as h,F as w,w as v,x as z,G as C,t as j,b as H,y as V,z as L,W as D}from"./MainLayout.js";import{D as k}from"./Dropdown.js";function S(a){let l,s,o;function f(e){a[7](e)}let u={isPrimitive:!0,showAll:!0,clearable:!1,options:a[5],label:a[4],labelClass:a[3],isHorizontal:a[1],disabled:a[2],value:a[0]};return a[0]!==void 0&&(u.justValue=a[0]),l=new k({props:u}),h.push(()=>w(l,"justValue",f)),l.$on("change",a[8]),{c(){v(l.$$.fragment)},m(e,i){z(l,e,i),o=!0},p(e,[i]){const t={};i&32&&(t.options=e[5]),i&16&&(t.label=e[4]),i&8&&(t.labelClass=e[3]),i&2&&(t.isHorizontal=e[1]),i&4&&(t.disabled=e[2]),i&1&&(t.value=e[0]),!s&&i&1&&(s=!0,t.justValue=e[0],C(()=>s=!1)),l.$set(t)},i(e){o||(j(l.$$.fragment,e),o=!0)},o(e){H(l.$$.fragment,e),o=!1},d(e){V(l,e)}}}function q(a,l,s){let{service:o}=l,{isHorizontal:f=!0}=l,{value:u=void 0}=l,{disabled:e=!1}=l,{labelClass:i=""}=l,{label:t="Level"}=l,r=[];function b(){return o().then(n=>{s(5,r=n)})}L(()=>{b()});function d(n){u=n,s(0,u)}function _(n){D.call(this,a,n)}return a.$$set=n=>{"service"in n&&s(6,o=n.service),"isHorizontal"in n&&s(1,f=n.isHorizontal),"value"in n&&s(0,u=n.value),"disabled"in n&&s(2,e=n.disabled),"labelClass"in n&&s(3,i=n.labelClass),"label"in n&&s(4,t=n.label)},[u,f,e,i,t,r,o,d,_]}class F extends c{constructor(l){super(),m(this,l,q,S,g,{service:6,isHorizontal:1,value:0,disabled:2,labelClass:3,label:4})}}export{F as L};