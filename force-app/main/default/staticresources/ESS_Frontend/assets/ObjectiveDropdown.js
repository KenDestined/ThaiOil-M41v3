import{S as v,i as h,s as j,O as f,B as w,F as k,w as O,x as y,P as M,Q as T,G as E,t as P,b as C,y as D,T as p,K as b,b2 as F,z as K,V as S,W as B}from"./MainLayout.js";import{D as V}from"./Dropdown.js";function q(t){let a,o,r;const s=[{clearable:!1},{searchable:!1},{options:t[2]},{valueKey:"key"},{labelKey:"value"},{label:t[1]},t[3]];function i(e){t[6](e)}let u={};for(let e=0;e<s.length;e+=1)u=f(u,s[e]);return t[0]!==void 0&&(u.value=t[0]),a=new V({props:u}),w.push(()=>k(a,"value",i)),a.$on("change",t[7]),{c(){O(a.$$.fragment)},m(e,l){y(a,e,l),r=!0},p(e,[l]){const c=l&14?M(s,[s[0],s[1],l&4&&{options:e[2]},s[3],s[4],l&2&&{label:e[1]},l&8&&T(e[3])]):{};!o&&l&1&&(o=!0,c.value=e[0],E(()=>o=!1)),a.$set(c)},i(e){r||(P(a.$$.fragment,e),r=!0)},o(e){C(a.$$.fragment,e),r=!1},d(e){D(a,e)}}}function z(t,a,o){const r=["value","label","typeOfService"];let s=p(a,r),{value:i=null}=a,{label:u="Objective"}=a,{typeOfService:e=void 0}=a,l;const c=Object.keys(b.ManpowerObjective).map(n=>({key:n,value:F[n]}));let d=[];function _(){o(2,d=[...c]),(e==null?void 0:e.key)===b.ManpowerTypeOfService.Permanent?o(2,d=[...c].filter(n=>n.key!==b.ManpowerObjective.ExtendFirstContract)):o(2,d=[...c].map(n=>(e==null?void 0:e.key)===b.ManpowerTypeOfService.ProjectBase&&n.key===b.ManpowerObjective.ExtendFirstContract?{...n,value:"ต่อสัญญา"}:n))}K(()=>{_()});function m(n){i=n,o(0,i)}function g(n){B.call(this,t,n)}return t.$$set=n=>{a=f(f({},a),S(n)),o(3,s=p(a,r)),"value"in n&&o(0,i=n.value),"label"in n&&o(1,u=n.label),"typeOfService"in n&&o(4,e=n.typeOfService)},t.$$.update=()=>{t.$$.dirty&48&&l!==(e==null?void 0:e.key)&&(o(5,l=e==null?void 0:e.key),_())},[i,u,d,s,e,l,m,g]}class L extends v{constructor(a){super(),h(this,a,z,q,j,{value:0,label:1,typeOfService:4})}}export{L as O};