import{T as ma}from"./Tabs.js";import{S as ca,i as ua,s as Sa,e as g,t as r,a as Pt,j as e,E as aa,d as Ct,o as c,G as l,g as h,f as t,p as va,h as Ke,q as ga,l as zt,m as Qt,v as ba,w as ka,x as ya,y as Ma,H as Ve,r as wa,z as Pa,A as Ca,B as We}from"./vendor.js";function za(a,s){let i;return typeof s=="string"&&s.length===20&&(i=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.exec(s),i)?new Date(s):s}const Aa=["January","February","March","April","May","June","July","August","September","October","November","December"],Fa=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function na(a){return`${a.getDate()}-${Fa[a.getMonth()]}-${a.getFullYear().toString().substring(2)}`}function At(a){return a?a.toLocaleString():"0"}function sa(a,s,i){const n=a.slice();return n[21]=s[i],n}function oa(a,s,i){const n=a.slice();return n[24]=s[i],n}function ra(a,s,i){const n=a.slice();return n[27]=s[i],n[29]=i,n}function ia(a,s,i){const n=a.slice();return n[30]=s[i],n}function fa(a){let s,i=a[30]+"",n,p;return{c(){s=g("option"),n=r(i),s.__value=p=a[30],s.value=s.__value},m(d,_){Pt(d,s,_),e(s,n)},p:aa,d(d){d&&Ct(s)}}}function pa(a){let s,i=a[27]+"",n,p;return{c(){s=g("option"),n=r(i),s.__value=p=a[29],s.value=s.__value},m(d,_){Pt(d,s,_),e(s,n)},p:aa,d(d){d&&Ct(s)}}}function ha(a){let s,i=a[24].name+"",n,p;return{c(){s=g("option"),n=r(i),s.__value=p=a[24].id,s.value=s.__value},m(d,_){Pt(d,s,_),e(s,n)},p(d,_){_[0]&4&&i!==(i=d[24].name+"")&&c(n,i),_[0]&4&&p!==(p=d[24].id)&&(s.__value=p,s.value=s.__value)},d(d){d&&Ct(s)}}}function _a(a){let s,i,n,p,d,_,z,A,k,u,w,b,P,I,F,y,J,D,L,N,B,R,E,T,G,x,at,V,Y,Ft,W,pt,Tt,U,Z,ht,C,nt,j,M,ot,Dt,o,S,f,H,Lt,Xe,_t,Bt,$e,dt,Rt,xe,mt,Zt,tl,rt,It,el,it,Nt,ll,O,Et,Kt=At(a[5].personal.level5.unsafeAct+a[5].personal.level5.unsafeConditional)+"",ge,al,be,nl,sl,ke,Vt=At(a[5].personal.level5.unsafeAct)+"",ye,ol,Me,rl,il,we,Wt=At(a[5].personal.level5.unsafeConditional)+"",Pe,fl,q,yt,Xt=a[5].personal.level4.nearMiss+"",Ce,pl,hl,_l,ct,dl,$t=a[5].personal.level4.hpi+"",ze,ml,cl,tt,Mt,xt=a[5].personal.level3.firstAid+"",Ae,ul,ut,Sl,te=a[5].personal.level3.hpi+"",Fe,vl,gl,et,wt,ee=a[5].personal.level2.majorIncident+"",Te,bl,St,kl,le=a[5].personal.level2.hpi+"",De,yl,Ml,X,Ot,ae=a[5].personal.level1.fatality+"",Le,wl,Pl,Cl,Ht,zl,ne=a[5].personal.level1.hpi+"",Be,Al,Fl,Q,jt,se=a[5].process.level5.processSafetyChallenge+"",Re,Tl,Dl,Ll,vt,Bl,oe=a[5].process.level5.hpi+"",Ze,Rl,Zl,K,Jt,re=a[5].process.level4.nearMiss+"",Ie,Il,Nl,El,gt,Ol,ie=a[5].process.level4.hpi+"",Ne,Hl,jl,lt,Ut,fe=a[5].process.level3.pse+a[5].process.level3.smallFire+"",Ee,Jl,ft,Ul,pe=a[5].process.level3.hpi+"",Oe,Gl,he=a[5].process.level3.pse+"",He,Yl,_e=a[5].process.level3.smallFire+"",je,ql,$,Gt,de=a[5].process.level2.pse+a[5].process.level2.fireCase+"",Je,Ql,bt,Kl,me=a[5].process.level2.hpi+"",Ue,Vl,Wl,kt,Xl,ce=a[5].process.level2.pse+"",Ge,$l,ue=a[5].process.level2.fireCase+"",Ye,xl,st,Yt,Se=a[5].process.level1.pse+"",qe,ta,qt,ea,ve=a[5].process.level1.hpi+"",Qe,la;return{c(){s=g("div"),i=l("svg"),n=l("g"),p=l("path"),d=l("path"),_=l("path"),z=l("path"),A=l("path"),k=l("path"),u=l("path"),w=l("path"),b=l("path"),P=l("path"),I=l("path"),F=l("path"),y=l("path"),J=l("path"),D=l("path"),L=l("path"),N=l("path"),B=l("path"),R=l("path"),E=l("path"),T=l("path"),G=l("path"),x=l("path"),at=l("path"),V=l("text"),Y=l("tspan"),Ft=r("PSE Tier 2+Fire Severity > 2"),W=l("text"),pt=l("tspan"),Tt=r("Major Incident"),U=l("text"),Z=l("tspan"),ht=r("PSE Tier 1"),C=l("text"),nt=l("tspan"),j=r("Fatality"),M=l("text"),ot=l("tspan"),Dt=r("PSE Tier 3 + Small Fire"),o=l("text"),S=l("tspan"),f=r("First Aid"),H=l("text"),Lt=l("tspan"),Xe=r("Near Miss (Miss Operation)"),_t=l("text"),Bt=l("tspan"),$e=r("Near Miss"),dt=l("text"),Rt=l("tspan"),xe=r("Process Safety Challenge"),mt=l("text"),Zt=l("tspan"),tl=r("PIR (Unsafe Act + Unsafe Con)"),rt=l("text"),It=l("tspan"),el=r("Process Safety"),it=l("text"),Nt=l("tspan"),ll=r("Personal Safety"),O=l("text"),Et=l("tspan"),ge=r(Kt),al=h(),be=l("tspan"),nl=r("="),sl=h(),ke=l("tspan"),ye=r(Vt),ol=h(),Me=l("tspan"),rl=r("+"),il=h(),we=l("tspan"),Pe=r(Wt),fl=h(),q=l("text"),yt=l("tspan"),Ce=r(Xt),pl=h(),hl=l("tspan"),_l=h(),ct=l("tspan"),dl=r("("),ze=r($t),ml=r(")"),cl=h(),tt=l("text"),Mt=l("tspan"),Ae=r(xt),ul=h(),ut=l("tspan"),Sl=r("("),Fe=r(te),vl=r(")"),gl=h(),et=l("text"),wt=l("tspan"),Te=r(ee),bl=h(),St=l("tspan"),kl=r("("),De=r(le),yl=r(")"),Ml=h(),X=l("text"),Ot=l("tspan"),Le=r(ae),wl=h(),Pl=l("tspan"),Cl=h(),Ht=l("tspan"),zl=r("("),Be=r(ne),Al=r(")"),Fl=h(),Q=l("text"),jt=l("tspan"),Re=r(se),Tl=h(),Dl=l("tspan"),Ll=h(),vt=l("tspan"),Bl=r("("),Ze=r(oe),Rl=r(")"),Zl=h(),K=l("text"),Jt=l("tspan"),Ie=r(re),Il=h(),Nl=l("tspan"),El=h(),gt=l("tspan"),Ol=r("("),Ne=r(ie),Hl=r(")"),jl=h(),lt=l("text"),Ut=l("tspan"),Ee=r(fe),Jl=h(),ft=l("tspan"),Ul=r("("),Oe=r(pe),Gl=r(")="),He=r(he),Yl=r("+"),je=r(_e),ql=h(),$=l("text"),Gt=l("tspan"),Je=r(de),Ql=h(),bt=l("tspan"),Kl=r("("),Ue=r(me),Vl=r(")"),Wl=h(),kt=l("tspan"),Xl=r("="),Ge=r(ce),$l=r("+"),Ye=r(ue),xl=h(),st=l("text"),Yt=l("tspan"),qe=r(Se),ta=h(),qt=l("tspan"),ea=r("("),Qe=r(ve),la=r(")"),t(p,"id","Subtraction_267"),t(p,"data-name","Subtraction 267"),t(p,"d","M6839,14046l-163.137-81.989,25.159-29L6839,14004l138.334-69.171L7001,13962l-162,84Z"),t(p,"transform","translate(-20317 -27246.506)"),t(p,"fill","#48aaff"),t(p,"stroke","rgba(0,0,0,0)"),t(p,"stroke-miterlimit","10"),t(p,"stroke-width","1"),t(d,"id","Subtraction_270"),t(d,"data-name","Subtraction 270"),t(d,"d","M8605,12235h0l-.5-.261v-41.989l.5.251,138.278-69.144,24.975,28.691L8605,12235Z"),t(d,"transform","translate(-22082.5 -25435.506)"),t(d,"fill","#1380de"),t(d,"stroke","rgba(0,0,0,0)"),t(d,"stroke-miterlimit","10"),t(d,"stroke-width","1"),t(_,"id","Subtraction_271"),t(_,"data-name","Subtraction 271"),t(_,"d","M6815,13851.172,6677,13782h11.97L6815,13845.172,6941.03,13782H6953l-138,69.173Z"),t(_,"transform","translate(-20293 -27093.676)"),t(_,"fill","#005095"),t(z,"id","Subtraction_273"),t(z,"data-name","Subtraction 273"),t(z,"d","M6875.1,13998l-134.7-67.351,24.954-28.65h1.744l108,54,108-54h1.743l24.953,28.652L6875.1,13998Z"),t(z,"transform","translate(-20353.1 -27246.506)"),t(z,"fill","#4bba83"),t(z,"stroke","rgba(0,0,0,0)"),t(z,"stroke-miterlimit","10"),t(z,"stroke-width","1"),t(A,"id","Subtraction_276"),t(A,"data-name","Subtraction 276"),t(A,"d","M8605,12187h0l-.5-.249v-42l.5.25,108-54h1.741l24.953,28.651L8605,12187Z"),t(A,"transform","translate(-22082.5 -25435.506)"),t(A,"fill","#07914d"),t(A,"stroke","rgba(0,0,0,0)"),t(A,"stroke-miterlimit","10"),t(A,"stroke-width","1"),t(k,"id","Subtraction_285"),t(k,"data-name","Subtraction 285"),t(k,"d","M6875.1,13902l-76.449-38.225,25.484-29.261L6875.1,13860l50.966-25.485,25.485,29.259L6875.1,13902Z"),t(k,"transform","translate(-20353.1 -27246.506)"),t(k,"fill","#ffd067"),t(k,"stroke","rgba(0,0,0,0)"),t(k,"stroke-miterlimit","10"),t(k,"stroke-width","1"),t(u,"id","Subtraction_288"),t(u,"data-name","Subtraction 288"),t(u,"d","M8605,12091h0l-.5-.25v-42l.5.25,50.966-25.486,25.483,29.259L8605,12091Z"),t(u,"transform","translate(-22082.5 -25435.506)"),t(u,"fill","#f5b300"),t(u,"stroke","rgba(0,0,0,0)"),t(u,"stroke-miterlimit","10"),t(u,"stroke-width","1"),t(w,"id","Subtraction_291"),t(w,"data-name","Subtraction 291"),t(w,"d","M6875.1,13854l-47.325-23.662L6875.1,13776l47.325,54.337L6875.1,13854Z"),t(w,"transform","translate(-20353.1 -27246.506)"),t(w,"fill","#eb6a53"),t(w,"stroke","rgba(0,0,0,0)"),t(w,"stroke-miterlimit","10"),t(w,"stroke-width","1"),t(b,"id","Subtraction_294"),t(b,"data-name","Subtraction 294"),t(b,"d","M8605,12043h0l-.5-.25v-77.177l.5-.573,47.325,54.336L8605,12043Z"),t(b,"transform","translate(-22082.5 -25435.506)"),t(b,"fill","#cc3f26"),t(b,"stroke","rgba(0,0,0,0)"),t(b,"stroke-miterlimit","10"),t(b,"stroke-width","1"),t(P,"id","Subtraction_277"),t(P,"data-name","Subtraction 277"),t(P,"d","M6786.335,13837,6677,13783h14.175l95.161,47,94-47h14l-108,54Z"),t(P,"transform","translate(-20264.336 -27127.506)"),t(P,"fill","#006935"),t(I,"id","Subtraction_279"),t(I,"data-name","Subtraction 279"),t(I,"d","M6875.1,13950l-105.573-52.782L6794.1,13869l1-1,80,40,80-40,1.009,1.013,24.563,28.2L6875.1,13950Z"),t(I,"transform","translate(-20353.1 -27246.506)"),t(I,"fill","#f87bbf"),t(I,"stroke","rgba(0,0,0,0)"),t(I,"stroke-miterlimit","10"),t(I,"stroke-width","1"),t(F,"id","Subtraction_282"),t(F,"data-name","Subtraction 282"),t(F,"d","M8605,12139h0l-.5-.249v-42l.5.249,80-40,1.009,1.014,24.564,28.2L8605,12139Z"),t(F,"transform","translate(-22082.5 -25435.506)"),t(F,"fill","#d34a94"),t(F,"stroke","rgba(0,0,0,0)"),t(F,"stroke-miterlimit","10"),t(F,"stroke-width","1"),t(y,"id","Subtraction_283"),t(y,"data-name","Subtraction 283"),t(y,"d","M6756.933,13821.742,6677,13782c.387.106,4.607.187,12.545.236l67.387,33.5,67.66-33.691,11.547-.047.6,0-79.811,39.742Z"),t(y,"transform","translate(-20234.932 -27160.248)"),t(y,"fill","#8d004c"),t(J,"id","Subtraction_289"),t(J,"data-name","Subtraction 289"),t(J,"d","M6727.974,13807.43,6677,13782h12.031l38.942,19.427,38.8-19.427h11.987l-50.786,25.428Z"),t(J,"transform","translate(-20205.973 -27193.934)"),t(J,"fill","#cb8b00"),t(D,"id","Path_17409"),t(D,"data-name","Path 17409"),t(D,"d","M-7717-11427.854l-9.571-4.777h-81.973"),t(D,"transform","translate(-5791 -2019.874)"),t(D,"fill","none"),t(D,"stroke","#484848"),t(D,"stroke-width","0.5"),t(L,"id","Path_17406"),t(L,"data-name","Path 17406"),t(L,"d","M-7717-11427.854l-9.571-4.777h-81.973"),t(L,"transform","translate(-5831.455 -1976.651)"),t(L,"fill","none"),t(L,"stroke","#484848"),t(L,"stroke-width","0.5"),t(N,"id","Path_17397"),t(N,"data-name","Path 17397"),t(N,"d","M-7717-11427.854l-9.571-4.777h-81.973"),t(N,"transform","translate(-5858 -1941.874)"),t(N,"fill","none"),t(N,"stroke","#484848"),t(N,"stroke-width","0.5"),t(B,"id","Path_17389"),t(B,"data-name","Path 17389"),t(B,"d","M-7717-11427.854l-9.571-4.777h-81.973"),t(B,"transform","translate(-5887 -1911.651)"),t(B,"fill","none"),t(B,"stroke","#484848"),t(B,"stroke-width","0.5"),t(R,"id","Path_17384"),t(R,"data-name","Path 17384"),t(R,"d","M-7717-11427.854l-9.571-4.777h-81.973"),t(R,"transform","translate(-5916.455 -1875.874)"),t(R,"fill","none"),t(R,"stroke","#484848"),t(R,"stroke-width","0.5"),t(E,"id","Path_17407"),t(E,"data-name","Path 17407"),t(E,"d","M-7597-11413l9.721-6H-7513"),t(E,"transform","translate(-5815 -1991.506)"),t(E,"fill","none"),t(E,"stroke","#484848"),t(E,"stroke-width","0.5"),t(T,"id","Path_17408"),t(T,"data-name","Path 17408"),t(T,"d","M-7597-11413l9.721-6H-7513"),t(T,"transform","translate(-5851 -2033.506)"),t(T,"fill","none"),t(T,"stroke","#484848"),t(T,"stroke-width","0.5"),t(G,"id","Path_17396"),t(G,"data-name","Path 17396"),t(G,"d","M-7597-11413l9.721-6H-7513"),t(G,"transform","translate(-5784 -1955.506)"),t(G,"fill","none"),t(G,"stroke","#484848"),t(G,"stroke-width","0.5"),t(x,"id","Path_17385"),t(x,"data-name","Path 17385"),t(x,"d","M-7597-11413l9.721-6H-7513"),t(x,"transform","translate(-5727 -1889.506)"),t(x,"fill","none"),t(x,"stroke","#484848"),t(x,"stroke-width","0.5"),t(at,"id","Path_17386"),t(at,"data-name","Path 17386"),t(at,"d","M-7597-11413l9.721-6H-7513"),t(at,"transform","translate(-5758 -1925.506)"),t(at,"fill","none"),t(at,"stroke","#484848"),t(at,"stroke-width","0.5"),t(Y,"x","-174.678"),t(Y,"y","0"),t(V,"id","PSE_Tier_2_Fire_Severity_2"),t(V,"data-name","PSE Tier 2+Fire Severity > 2"),t(V,"transform","translate(-13651 -13404.506)"),t(V,"fill","#484848"),t(V,"font-size","14"),t(V,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(pt,"x","0"),t(pt,"y","0"),t(W,"id","Major_Incident"),t(W,"data-name","Major Incident"),t(W,"transform","translate(-13316 -13404.506)"),t(W,"fill","#e11383"),t(W,"font-size","14"),t(W,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(Z,"x","-63.994"),t(Z,"y","0"),t(U,"id","PSE_Tier_1"),t(U,"data-name","PSE Tier 1"),t(U,"transform","translate(-13610 -13447.506)"),t(U,"fill","#484848"),t(U,"font-size","14"),t(U,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(nt,"x","0"),t(nt,"y","0"),t(C,"id","Fatality"),t(C,"transform","translate(-13352 -13447.506)"),t(C,"fill","#484848"),t(C,"font-size","14"),t(C,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(ot,"x","-142.828"),t(ot,"y","0"),t(M,"id","PSE_Tier_3_Small_Fire"),t(M,"data-name","PSE Tier 3 + Small Fire"),t(M,"transform","translate(-13683 -13369.506)"),t(M,"fill","#484848"),t(M,"font-size","14"),t(M,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(S,"x","0"),t(S,"y","0"),t(o,"id","First_Aid"),t(o,"data-name","First Aid"),t(o,"transform","translate(-13286 -13369.506)"),t(o,"fill","#484848"),t(o,"font-size","14"),t(o,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(Lt,"x","-176.554"),t(Lt,"y","0"),t(H,"id","Near_Miss_Miss_Operation_"),t(H,"data-name","Near Miss (Miss Operation)"),t(H,"transform","translate(-13706 -13339.506)"),t(H,"fill","#484848"),t(H,"font-size","14"),t(H,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(Bt,"x","0"),t(Bt,"y","0"),t(_t,"id","Near_Miss"),t(_t,"data-name","Near Miss"),t(_t,"transform","translate(-13256 -13339.506)"),t(_t,"fill","#484848"),t(_t,"font-size","14"),t(_t,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(Rt,"x","-160.23"),t(Rt,"y","0"),t(dt,"id","Process_Safety_Challenge"),t(dt,"data-name","Process Safety Challenge"),t(dt,"transform","translate(-13736 -13303.506)"),t(dt,"fill","#484848"),t(dt,"font-size","14"),t(dt,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(Zt,"x","0"),t(Zt,"y","0"),t(mt,"id","PIR_Unsafe_Act_Unsafe_Con_"),t(mt,"data-name","PIR (Unsafe Act + Unsafe Con)"),t(mt,"transform","translate(-13227 -13303.506)"),t(mt,"fill","#484848"),t(mt,"font-size","14"),t(mt,"font-family","SalesforceSans-Regular, Salesforce Sans"),t(It,"x","-136.9"),t(It,"y","0"),t(rt,"id","Process_Safety"),t(rt,"data-name","Process Safety"),t(rt,"transform","translate(-13508 -13519.506)"),t(rt,"fill","#e11383"),t(rt,"font-size","20"),t(rt,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(rt,"font-weight","700"),t(Nt,"x","0"),t(Nt,"y","0"),t(it,"id","Personal_Safety"),t(it,"data-name","Personal Safety"),t(it,"transform","translate(-13448 -13519.506)"),t(it,"fill","#e11383"),t(it,"font-size","20"),t(it,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(it,"font-weight","700"),t(Et,"x","-61.223"),t(Et,"y","0"),t(O,"id","_2_935_1_935_1_000"),t(O,"data-name","2,935=1,935=1,000"),t(O,"transform","matrix(0.895, -0.446, 0.446, 0.895, -13401.767, -13253.766)"),t(O,"fill","#fff"),t(O,"font-size","13"),t(O,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(O,"font-weight","700"),t(yt,"x","-14.683"),t(yt,"y","0"),t(yt,"fill","#000"),t(ct,"y","0"),t(ct,"fill","#9a0000"),t(q,"id","_0_0_"),t(q,"data-name","0 (0)"),t(q,"transform","matrix(0.895, -0.446, 0.446, 0.895, -13411.452, -13297.179)"),t(q,"fill","#9a0000"),t(q,"font-size","13"),t(q,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(q,"font-weight","700"),t(Mt,"x","-14.683"),t(Mt,"y","0"),t(Mt,"fill","#000"),t(ut,"y","0"),t(ut,"fill","#9a0000"),t(tt,"id","_5_1_"),t(tt,"data-name","5 (1)"),t(tt,"transform","matrix(0.895, -0.446, 0.446, 0.895, -13426.094, -13335.179)"),t(tt,"fill","#9a0000"),t(tt,"font-size","13"),t(tt,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(tt,"font-weight","700"),t(wt,"x","-14.683"),t(wt,"y","0"),t(wt,"fill","#000"),t(St,"y","0"),t(St,"fill","#9a0000"),t(et,"id","_5_1_2"),t(et,"data-name","5 (1)"),t(et,"transform","matrix(0.895, -0.446, 0.446, 0.895, -13445.711, -13377.178)"),t(et,"fill","#9a0000"),t(et,"font-size","13"),t(et,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(et,"font-weight","700"),t(Ot,"x","-14.683"),t(Ot,"y","0"),t(X,"id","_0_0_2"),t(X,"data-name","0 (0)"),t(X,"transform","matrix(0.895, -0.446, 0.446, 0.895, -13458.434, -13422.179)"),t(X,"font-size","13"),t(X,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(X,"font-weight","700"),t(jt,"x","-14.683"),t(jt,"y","0"),t(vt,"y","0"),t(vt,"fill","#9a0000"),t(Q,"id","_0_0_3"),t(Q,"data-name","0 (0)"),t(Q,"transform","matrix(0.895, 0.446, -0.446, 0.895, -13563.707, -13261.033)"),t(Q,"fill","#fff"),t(Q,"font-size","13"),t(Q,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(Q,"font-weight","700"),t(Jt,"x","-14.683"),t(Jt,"y","0"),t(gt,"y","0"),t(gt,"fill","#9a0000"),t(K,"id","_0_0_4"),t(K,"data-name","0 (0)"),t(K,"transform","matrix(0.895, 0.446, -0.446, 0.895, -13544.722, -13297.178)"),t(K,"fill","#9a0000"),t(K,"font-size","13"),t(K,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(K,"font-weight","700"),t(Ut,"x","-38.473"),t(Ut,"y","0"),t(ft,"y","0"),t(ft,"fill","#d02000"),t(lt,"id","_21_1_14_7"),t(lt,"data-name","21 (1)=14+7"),t(lt,"transform","matrix(0.895, 0.446, -0.446, 0.895, -13523.907, -13335.916)"),t(lt,"fill","#9a0000"),t(lt,"font-size","13"),t(lt,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(lt,"font-weight","700"),t(Gt,"x","-30.544"),t(Gt,"y","0"),t(bt,"y","0"),t(bt,"fill","#9a0000"),t(kt,"x","-5"),t($,"id","_2_2_0_2"),t($,"data-name","2 (2)=0+2"),t($,"transform","matrix(0.895, 0.446, -0.446, 0.895, -13513.78, -13377.039)"),t($,"font-size","13"),t($,"font-family","SalesforceSans-Bold, Salesforce Sans"),t($,"font-weight","700"),t(Yt,"x","-14.683"),t(Yt,"y","0"),t(st,"id","_0_0_5"),t(st,"data-name","0 (0)"),t(st,"transform","matrix(0.895, 0.446, -0.446, 0.895, -13496.445, -13422.178)"),t(st,"font-size","13"),t(st,"font-family","SalesforceSans-Bold, Salesforce Sans"),t(st,"font-weight","700"),t(n,"id","Group_42879"),t(n,"data-name","Group 42879"),t(n,"transform","translate(13897 13539.506)"),t(i,"xmlns","http://www.w3.org/2000/svg"),t(i,"width","868"),t(i,"height","339.563"),t(i,"viewBox","0 0 868 339.563")},m(m,v){Pt(m,s,v),e(s,i),e(i,n),e(n,p),e(n,d),e(n,_),e(n,z),e(n,A),e(n,k),e(n,u),e(n,w),e(n,b),e(n,P),e(n,I),e(n,F),e(n,y),e(n,J),e(n,D),e(n,L),e(n,N),e(n,B),e(n,R),e(n,E),e(n,T),e(n,G),e(n,x),e(n,at),e(n,V),e(V,Y),e(Y,Ft),e(n,W),e(W,pt),e(pt,Tt),e(n,U),e(U,Z),e(Z,ht),e(n,C),e(C,nt),e(nt,j),e(n,M),e(M,ot),e(ot,Dt),e(n,o),e(o,S),e(S,f),e(n,H),e(H,Lt),e(Lt,Xe),e(n,_t),e(_t,Bt),e(Bt,$e),e(n,dt),e(dt,Rt),e(Rt,xe),e(n,mt),e(mt,Zt),e(Zt,tl),e(n,rt),e(rt,It),e(It,el),e(n,it),e(it,Nt),e(Nt,ll),e(n,O),e(O,Et),e(Et,ge),e(O,al),e(O,be),e(be,nl),e(O,sl),e(O,ke),e(ke,ye),e(O,ol),e(O,Me),e(Me,rl),e(O,il),e(O,we),e(we,Pe),e(O,fl),e(n,q),e(q,yt),e(yt,Ce),e(q,pl),e(q,hl),e(q,_l),e(q,ct),e(ct,dl),e(ct,ze),e(ct,ml),e(q,cl),e(n,tt),e(tt,Mt),e(Mt,Ae),e(tt,ul),e(tt,ut),e(ut,Sl),e(ut,Fe),e(ut,vl),e(tt,gl),e(n,et),e(et,wt),e(wt,Te),e(et,bl),e(et,St),e(St,kl),e(St,De),e(St,yl),e(et,Ml),e(n,X),e(X,Ot),e(Ot,Le),e(X,wl),e(X,Pl),e(X,Cl),e(X,Ht),e(Ht,zl),e(Ht,Be),e(Ht,Al),e(X,Fl),e(n,Q),e(Q,jt),e(jt,Re),e(Q,Tl),e(Q,Dl),e(Q,Ll),e(Q,vt),e(vt,Bl),e(vt,Ze),e(vt,Rl),e(Q,Zl),e(n,K),e(K,Jt),e(Jt,Ie),e(K,Il),e(K,Nl),e(K,El),e(K,gt),e(gt,Ol),e(gt,Ne),e(gt,Hl),e(K,jl),e(n,lt),e(lt,Ut),e(Ut,Ee),e(lt,Jl),e(lt,ft),e(ft,Ul),e(ft,Oe),e(ft,Gl),e(ft,He),e(ft,Yl),e(ft,je),e(lt,ql),e(n,$),e($,Gt),e(Gt,Je),e($,Ql),e($,bt),e(bt,Kl),e(bt,Ue),e(bt,Vl),e($,Wl),e($,kt),e(kt,Xl),e(kt,Ge),e(kt,$l),e(kt,Ye),e($,xl),e(n,st),e(st,Yt),e(Yt,qe),e(st,ta),e(st,qt),e(qt,ea),e(qt,Qe),e(qt,la)},p(m,v){v[0]&32&&Kt!==(Kt=At(m[5].personal.level5.unsafeAct+m[5].personal.level5.unsafeConditional)+"")&&c(ge,Kt),v[0]&32&&Vt!==(Vt=At(m[5].personal.level5.unsafeAct)+"")&&c(ye,Vt),v[0]&32&&Wt!==(Wt=At(m[5].personal.level5.unsafeConditional)+"")&&c(Pe,Wt),v[0]&32&&Xt!==(Xt=m[5].personal.level4.nearMiss+"")&&c(Ce,Xt),v[0]&32&&$t!==($t=m[5].personal.level4.hpi+"")&&c(ze,$t),v[0]&32&&xt!==(xt=m[5].personal.level3.firstAid+"")&&c(Ae,xt),v[0]&32&&te!==(te=m[5].personal.level3.hpi+"")&&c(Fe,te),v[0]&32&&ee!==(ee=m[5].personal.level2.majorIncident+"")&&c(Te,ee),v[0]&32&&le!==(le=m[5].personal.level2.hpi+"")&&c(De,le),v[0]&32&&ae!==(ae=m[5].personal.level1.fatality+"")&&c(Le,ae),v[0]&32&&ne!==(ne=m[5].personal.level1.hpi+"")&&c(Be,ne),v[0]&32&&se!==(se=m[5].process.level5.processSafetyChallenge+"")&&c(Re,se),v[0]&32&&oe!==(oe=m[5].process.level5.hpi+"")&&c(Ze,oe),v[0]&32&&re!==(re=m[5].process.level4.nearMiss+"")&&c(Ie,re),v[0]&32&&ie!==(ie=m[5].process.level4.hpi+"")&&c(Ne,ie),v[0]&32&&fe!==(fe=m[5].process.level3.pse+m[5].process.level3.smallFire+"")&&c(Ee,fe),v[0]&32&&pe!==(pe=m[5].process.level3.hpi+"")&&c(Oe,pe),v[0]&32&&he!==(he=m[5].process.level3.pse+"")&&c(He,he),v[0]&32&&_e!==(_e=m[5].process.level3.smallFire+"")&&c(je,_e),v[0]&32&&de!==(de=m[5].process.level2.pse+m[5].process.level2.fireCase+"")&&c(Je,de),v[0]&32&&me!==(me=m[5].process.level2.hpi+"")&&c(Ue,me),v[0]&32&&ce!==(ce=m[5].process.level2.pse+"")&&c(Ge,ce),v[0]&32&&ue!==(ue=m[5].process.level2.fireCase+"")&&c(Ye,ue),v[0]&32&&Se!==(Se=m[5].process.level1.pse+"")&&c(qe,Se),v[0]&32&&ve!==(ve=m[5].process.level1.hpi+"")&&c(Qe,ve)},d(m){m&&Ct(s)}}}function da(a,s){let i,n,p=s[21].no+"",d,_,z,A=na(s[21].date)+"",k,u,w,b=s[21].incidentName+"",P,I,F,y=s[21].incidentType+"",J,D,L,N=s[21].hpi+"",B,R;return{key:a,first:null,c(){i=g("tr"),n=g("td"),d=r(p),_=h(),z=g("td"),k=r(A),u=h(),w=g("td"),P=r(b),I=h(),F=g("td"),J=r(y),D=h(),L=g("td"),B=r(N),R=h(),this.first=i},m(E,T){Pt(E,i,T),e(i,n),e(n,d),e(i,_),e(i,z),e(z,k),e(i,u),e(i,w),e(w,P),e(i,I),e(i,F),e(F,J),e(i,D),e(i,L),e(L,B),e(i,R)},p(E,T){s=E,T[0]&16&&p!==(p=s[21].no+"")&&c(d,p),T[0]&16&&A!==(A=na(s[21].date)+"")&&c(k,A),T[0]&16&&b!==(b=s[21].incidentName+"")&&c(P,b),T[0]&16&&y!==(y=s[21].incidentType+"")&&c(J,y),T[0]&16&&N!==(N=s[21].hpi+"")&&c(B,N)},d(E){E&&Ct(i)}}}function Ta(a){let s,i,n,p,d,_,z,A,k,u,w,b,P,I,F,y,J,D,L,N,B,R,E,T,G,x,at,V,Y=[],Ft=new Map,W,pt,Tt;p=new ma({props:{tabs:a[10],isUnsavedChanges:!1}}),p.$on("tabChange",a[11]);let U=a[7],Z=[];for(let o=0;o<U.length;o+=1)Z[o]=fa(ia(a,U,o));let ht=a[9],C=[];for(let o=0;o<ht.length;o+=1)C[o]=pa(ra(a,ht,o));let nt=a[2],j=[];for(let o=0;o<nt.length;o+=1)j[o]=ha(oa(a,nt,o));let M=a[5]&&_a(a),ot=a[4];const Dt=o=>o[21].no;for(let o=0;o<ot.length;o+=1){let S=sa(a,ot,o),f=Dt(S);Ft.set(f,Y[o]=da(f,S))}return{c(){s=g("main"),i=g("div"),i.textContent=`QMOS Dashboard ${a[9][a[8]]}-${a[6]}`,n=h(),va(p.$$.fragment),d=h(),_=g("div"),z=g("div"),A=h(),k=g("div"),u=g("select");for(let o=0;o<Z.length;o+=1)Z[o].c();w=h(),b=g("div"),P=g("select");for(let o=0;o<C.length;o+=1)C[o].c();I=h(),F=g("div"),y=g("select");for(let o=0;o<j.length;o+=1)j[o].c();J=h(),D=g("div"),L=g("button"),L.textContent="Search",N=h(),B=g("button"),B.textContent="Clear",R=h(),M&&M.c(),E=h(),T=g("div"),G=g("table"),x=g("thead"),x.innerHTML=`<tr><th>No.</th> 
          <th>Date</th> 
          <th>Incident Name</th> 
          <th>Incident Type</th> 
          <th>HPI</th></tr>`,at=h(),V=g("tbody");for(let o=0;o<Y.length;o+=1)Y[o].c();t(u,"name","year"),a[0]===void 0&&Ke(()=>a[14].call(u)),t(P,"name","month"),a[1]===void 0&&Ke(()=>a[15].call(P)),t(y,"name","company"),a[3]===void 0&&Ke(()=>a[16].call(y)),t(_,"class","filter-wrapper svelte-1kmta3y")},m(o,S){Pt(o,s,S),e(s,i),e(s,n),ga(p,s,null),e(s,d),e(s,_),e(_,z),e(_,A),e(_,k),e(k,u);for(let f=0;f<Z.length;f+=1)Z[f].m(u,null);zt(u,a[0]),e(_,w),e(_,b),e(b,P);for(let f=0;f<C.length;f+=1)C[f].m(P,null);zt(P,a[1]),e(_,I),e(_,F),e(F,y);for(let f=0;f<j.length;f+=1)j[f].m(y,null);zt(y,a[3]),e(_,J),e(_,D),e(D,L),e(D,N),e(D,B),e(s,R),M&&M.m(s,null),e(s,E),e(s,T),e(T,G),e(G,x),e(G,at),e(G,V);for(let f=0;f<Y.length;f+=1)Y[f].m(V,null);W=!0,pt||(Tt=[Qt(u,"change",a[14]),Qt(P,"change",a[15]),Qt(y,"change",a[16]),Qt(L,"click",a[12]),Qt(B,"click",a[13])],pt=!0)},p(o,S){if(S[0]&128){U=o[7];let f;for(f=0;f<U.length;f+=1){const H=ia(o,U,f);Z[f]?Z[f].p(H,S):(Z[f]=fa(H),Z[f].c(),Z[f].m(u,null))}for(;f<Z.length;f+=1)Z[f].d(1);Z.length=U.length}if(S[0]&129&&zt(u,o[0]),S[0]&512){ht=o[9];let f;for(f=0;f<ht.length;f+=1){const H=ra(o,ht,f);C[f]?C[f].p(H,S):(C[f]=pa(H),C[f].c(),C[f].m(P,null))}for(;f<C.length;f+=1)C[f].d(1);C.length=ht.length}if(S[0]&2&&zt(P,o[1]),S[0]&4){nt=o[2];let f;for(f=0;f<nt.length;f+=1){const H=oa(o,nt,f);j[f]?j[f].p(H,S):(j[f]=ha(H),j[f].c(),j[f].m(y,null))}for(;f<j.length;f+=1)j[f].d(1);j.length=nt.length}S[0]&12&&zt(y,o[3]),o[5]?M?M.p(o,S):(M=_a(o),M.c(),M.m(s,E)):M&&(M.d(1),M=null),S[0]&16&&(ot=o[4],Y=ba(Y,S,Dt,1,o,ot,Ft,V,Ca,da,null,sa))},i(o){W||(ka(p.$$.fragment,o),W=!0)},o(o){ya(p.$$.fragment,o),W=!1},d(o){o&&Ct(s),Ma(p),Ve(Z,o),Ve(C,o),Ve(j,o),M&&M.d();for(let S=0;S<Y.length;S+=1)Y[S].d();pt=!1,wa(Tt)}}}function Da(a,s,i){const n=new Date,p=n.getFullYear(),d=[p,p-1,p-2,p-3,p-4];let _=p;const z=n.getMonth(),A=Aa;let k=z,u,w=[],b;""+n.getDate()+A[z]+p;let P=[{id:1,name:"SSHE Performance"},{id:2,name:"Incident and Accident Ratio"}],I=[],F;Pa(async()=>{window.getData=()=>{const R=JSON.parse(document.getElementById("rawData").innerText,za);i(4,I=R.tableData),i(5,F=R.graphData),i(2,w=R.companyOptions),w.length>0&&(u=w[0].id,i(3,b=u))},window.getData()});function y(R){}function J(){console.log("year",_),console.log("month",k),console.log("company",b)}function D(){i(0,_=p),i(1,k=z),u&&i(3,b=u)}function L(){_=We(this),i(0,_),i(7,d)}function N(){k=We(this),i(1,k)}function B(){b=We(this),i(3,b),i(2,w)}return[_,k,w,b,I,F,p,d,z,A,P,y,J,D,L,N,B]}class La extends ca{constructor(s){super();ua(this,s,Da,Ta,Sa,{},null,[-1,-1])}}new La({target:document.getElementById("app")});