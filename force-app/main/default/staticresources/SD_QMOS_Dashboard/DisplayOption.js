import{S as d,i as D,s as S,e as p,t as h,f as m,a as k,j as r,m as y,E as f,d as _,r as b}from"./vendor.js";function g(i){let e,t,a,s,o,c,n;return{c(){e=p("div"),t=p("input"),a=h(`\r
  Display Sub Total\r
  `),s=p("input"),o=h(" Display from System"),m(t,"type","checkbox"),m(s,"type","checkbox")},m(l,u){k(l,e,u),r(e,t),t.checked=i[0],r(e,a),r(e,s),s.checked=i[1],r(e,o),c||(n=[y(t,"change",i[2]),y(s,"change",i[3])],c=!0)},p(l,[u]){u&1&&(t.checked=l[0]),u&2&&(s.checked=l[1])},i:f,o:f,d(l){l&&_(e),c=!1,b(n)}}}function T(i,e,t){let{isDisplaySubTotal:a}=e,{isDisplayFromSystem:s}=e;function o(){a=this.checked,t(0,a)}function c(){s=this.checked,t(1,s)}return i.$$set=n=>{"isDisplaySubTotal"in n&&t(0,a=n.isDisplaySubTotal),"isDisplayFromSystem"in n&&t(1,s=n.isDisplayFromSystem)},[a,s,o,c]}class j extends d{constructor(e){super();D(this,e,T,g,S,{isDisplaySubTotal:0,isDisplayFromSystem:1})}}export{j as D};