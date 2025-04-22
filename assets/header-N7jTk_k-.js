import{f as m,j as e,b as u,r as a}from"./index-B49es1wc.js";import{G as g,b as v}from"./index-CcE_i1sr.js";import{a as j}from"./index-DNEDt5V4.js";import{A as k,h as p,W as N,V as d}from"./footer-DRIY9sfi.js";import{R as L,a as C}from"./index-BTueGfFV.js";function z(t){return g({attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M16 9.226l-8-6.21-8 6.21v-2.532l8-6.21 8 6.21zM14 9v6h-4v-4h-4v4h-4v-6l6-4.5z"},child:[]}]})(t)}function M(t){return g({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"path",attr:{d:"m21 21-4.3-4.3"},child:[]}]})(t)}const _=()=>{const{login:t}=m(),s=()=>{t({name:"Guest User"})};return e.jsx(e.Fragment,{children:e.jsx(u,{to:"/login",children:e.jsxs("button",{onClick:s,className:"overflow-hidden md:w-26 p-2 md:h-10 sm:w-20 sm:h-9 bg-black text-white border-none rounded-md md:text-lg xs:text-md font-bold cursor-pointer relative z-10 group",children:["Login !",e.jsx("span",{className:"absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"}),e.jsx("span",{className:"absolute w-36 h-32 -top-8 -left-2 bg-c-l-grey rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"}),e.jsx("span",{className:"absolute w-36 h-32 -top-8 -left-2 bg-c-d-grey rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"}),e.jsx("span",{className:"group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute md:top-2.5 md:left-6 xs:top-1 xs:left-2 z-10",children:"Login !"})]})})})},A=()=>{const{user:t,logout:s}=m(),[o,r]=a.useState(!1),n=a.useRef(null);a.useEffect(()=>{const i=x=>{n.current&&!n.current.contains(x.target)&&r(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[]);const l=()=>r(!o),h=()=>{s(),r(!1)};return t?e.jsxs("div",{className:"relative",ref:n,children:[e.jsx("button",{onClick:l,className:"w-10 h-10 flex justify-center items-center p-1 rounded-full hover:bg-gray-700 transition-colors","aria-label":"User profile","aria-expanded":o,children:e.jsx(L,{className:"text-2xl text-white"})}),o&&e.jsxs("div",{className:"absolute right-0 mt-2 w-48 bg-c-d-grey rounded-md shadow-lg py-1 z-50 shadow-c-black/50",children:[e.jsxs("div",{className:"px-4 py-2 border-b border-c-l-grey",children:[e.jsx("p",{className:"text-sm text-white font-medium",children:(t==null?void 0:t.name)||"Guest"}),e.jsx("p",{className:"text-xs text-gray-400",children:(t==null?void 0:t.email)||""})]}),e.jsx(u,{to:"/profile",className:"block px-4 py-2 text-sm text-white hover:bg-c-d-grey",onClick:()=>r(!1),children:"Profile Settings"}),e.jsxs("button",{onClick:h,className:"w-full text-left px-4 py-2 text-sm text-white group hover:bg-gray-700 flex items-center",children:[e.jsx(C,{className:"mr-2"}),"Logout"]})]})]}):null};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),E=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,o,r)=>r?r.toUpperCase():o.toLowerCase()),f=t=>{const s=E(t);return s.charAt(0).toUpperCase()+s.slice(1)},b=(...t)=>t.filter((s,o,r)=>!!s&&s.trim()!==""&&r.indexOf(s)===o).join(" ").trim(),I=t=>{for(const s in t)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var S={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=a.forwardRef(({color:t="currentColor",size:s=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:n="",children:l,iconNode:h,...i},x)=>a.createElement("svg",{ref:x,...S,width:s,height:s,stroke:t,strokeWidth:r?Number(o)*24/Number(s):o,className:b("lucide",n),...!l&&!I(i)&&{"aria-hidden":"true"},...i},[...h.map(([w,y])=>a.createElement(w,y)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=(t,s)=>{const o=a.forwardRef(({className:r,...n},l)=>a.createElement(H,{ref:l,iconNode:s,className:b(`lucide-${$(f(t))}`,`lucide-${t}`,r),...n}));return o.displayName=f(t),o};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z",key:"169p4p"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]],B=c("bookmark-check",R);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],T=c("house",O);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],P=c("info",W);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]],q=c("list",U);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]],G=c("log-in",F);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],V=c("menu",Z);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],K=c("search",D);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Y=c("x",X),J=[{label:"Home",icon:e.jsx(T,{className:"w-5 h-5"}),path:"/home"},{label:"About",icon:e.jsx(P,{className:"w-5 h-5"}),path:"/about"},{label:"Categories",icon:e.jsx(q,{className:"w-5 h-5"}),path:"/categories"},{label:"Search",icon:e.jsx(K,{className:"w-5 h-5"}),path:"/search"},{label:"Login",icon:e.jsx(G,{className:"w-5 h-5"}),path:"/login"},{label:"Watchlist",icon:e.jsx(B,{className:"w-5 h-5"}),path:"/watchlist"}],Q=()=>{const[t,s]=a.useState(!1);return e.jsxs("div",{className:"relative z-50 bg-emerald-500",children:[e.jsx("button",{onClick:()=>s(!t),className:"p-3 rounded-full bg-black text-white fixed top-4 right-4 z-50",children:t?e.jsx(Y,{className:"w-6 h-6"}):e.jsx(V,{className:"w-6 h-6"})}),e.jsx(k,{children:t&&e.jsxs(p.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",stiffness:300,damping:30},className:"fixed top-0 right-0 w-64 h-full z-20 p-6 flex flex-col space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-white",children:"Navigation"}),e.jsx("nav",{className:"flex flex-col space-y-4 bg-c-black p-1 rounded-b-md relative z-50",children:J.map((o,r)=>e.jsx(p.div,{whileHover:{scale:1.05},whileTap:{scale:.95},children:e.jsxs(u,{to:o.path,onClick:()=>s(!1),className:"flex items-center gap-3 text-lg text-c-white font-medium hover:text-c-red active:text-c-red",children:[o.icon,o.label]})},r))})]})})]})},ae=()=>{const[t,s]=a.useState(!1);a.useEffect(()=>{const n=()=>{s(window.scrollY>0)};return window.addEventListener("scroll",n),()=>window.removeEventListener("scroll",n)},[]);const{user:o,isLoading:r}=m();return r?e.jsx("p",{children:"Loading..."}):e.jsx(e.Fragment,{children:e.jsx("header",{className:`Header w-full h-16 flex flex-col justify-center items-center sticky top-0 z-1 mb-2 py-10 transition-all duration-300 backdrop-blur-xl ${t?"bg-c-white/20 shadow-md":"bg-transparent"}`,children:e.jsxs("nav",{className:"Navbar w-full flex flex-row pl-2 pt-1.5 justify-between items-center relative",children:[e.jsx("div",{className:"hover:border-2 border-c-l-grey hover:bg-c-red rounded-lg p-1 w-auto h-auto justify-between items-center flex flex-row space-x-7 overflow-hidden bg-c-l-grey",children:e.jsx("img",{src:N,alt:"cinexist",className:"md:w-36 md:h-12 xs:w-26 xs:h-8 object-cover scale-150"})}),e.jsxs("div",{className:"hover:border-2 border-c-l-grey hover:bg-c-red rounded-lg md:px-4 md:py-2.5 xs:p-2 w-auto h-auto justify-between items-center flex-row md:space-x-7 xs:space-x-1.5 sm:hidden xs:hidden md:flex",children:[e.jsx(d,{href:"/home",icon:z,Text:"home"}),e.jsx(d,{href:"/search",icon:M,Text:"search"}),e.jsx(d,{href:"/categories",icon:j,Text:"categories"})]}),e.jsxs("div",{className:"hover:border-2 border-c-l-grey hover:bg-c-red sm:hidden xs:hidden md:flex rounded-lg md:px-4 md:py-2.5 xs:p-2 w-auto h-auto justify-between items-center flex-row md:space-x-7 xs:space-x-1.5",children:[o?e.jsx(A,{}):e.jsx(_,{}),e.jsx(d,{href:"/watchlist",icon:v,Text:"Watchlist"})]}),e.jsx("div",{className:"hover:border-2 border-c-l-grey hover:bg-c-red rounded-lg md:px-4 md:py-2.5 xs:p-2 w-auto h-auto justify-between items-center xs:flex flex-row md:space-x-7 xs:space-x-1.5 md:hidden absolute right-0 z-50",children:e.jsx(Q,{})})]})})})};export{ae as H,c};
