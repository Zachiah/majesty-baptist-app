let Q=G;const S={},a=1,b=2,D={owned:null,cleanups:null,context:null,owner:null};var u=null;let C=null,w=null,r=null,h=null,E=0;function V(e,s){s&&(u=s);const t=u,i=e.length===0?D:{owned:null,cleanups:null,context:null,owner:t};u=i;let l;try{m(()=>l=e(()=>N(i)),!0)}finally{u=t}return l}function T(e,s,t){const i=J(e,s,!1,a);L(i)}function W(e){if(w)return e();let s;const t=w=[];try{s=e()}finally{w=null}return m(()=>{for(let i=0;i<t.length;i+=1){const l=t[i];if(l.pending!==S){const o=l.pending;l.pending=S,I(l,o)}}},!1),s}function P(e){let s;return s=e(),s}function I(e,s,t){if(e.comparator&&e.comparator(e.value,s))return s;if(w)return e.pending===S&&w.push(e),e.pending=s,s;let i=!1;return e.value=s,e.observers&&e.observers.length&&m(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l];i&&C.disposed.has(o),o.pure?r.push(o):h.push(o),o.observers&&(i&&!o.tState||!i&&!o.state)&&O(o),i||(o.state=a)}if(r.length>1e6)throw r=[],new Error},!1),s}function L(e){if(!e.fn)return;N(e);const s=u,t=E;u=e,j(e,e.value,t),u=s}function j(e,s,t){let i;try{i=e.fn(s)}catch(l){q(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.observers&&e.observers.length?I(e,i):e.value=i,e.updatedAt=t)}function J(e,s,t,i=a,l){const o={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:u,context:null,pure:t};return u===null||u!==D&&(u.owned?u.owned.push(o):u.owned=[o]),o}function R(e){const s=C;if(e.state!==a)return e.state=0;if(e.suspense&&P(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<E);)(e.state||s)&&t.push(e);for(let i=t.length-1;i>=0;i--)if(e=t[i],e.state===a||s)L(e);else if(e.state===b||s){const l=r;r=null,M(e),r=l}}function m(e,s){if(r)return e();let t=!1;s||(r=[]),h?t=!0:h=[],E++;try{e()}catch(i){q(i)}finally{K(t)}}function K(e){r&&(G(r),r=null),!e&&(h.length?W(()=>{Q(h),h=null}):h=null)}function G(e){for(let s=0;s<e.length;s++)R(e[s])}function M(e){e.state=0;const s=C;for(let t=0;t<e.sources.length;t+=1){const i=e.sources[t];i.sources&&(i.state===a||s?R(i):(i.state===b||s)&&M(i))}}function O(e){const s=C;for(let t=0;t<e.observers.length;t+=1){const i=e.observers[t];(!i.state||s)&&(i.state=b,i.pure?r.push(i):h.push(i),i.observers&&O(i))}}function N(e){let s;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const o=l.pop(),n=t.observerSlots.pop();i<l.length&&(o.sourceSlots[n]=i,l[i]=o,t.observerSlots[i]=n)}}if(e.owned){for(s=0;s<e.owned.length;s++)N(e.owned[s]);e.owned=null}if(e.cleanups){for(s=0;s<e.cleanups.length;s++)e.cleanups[s]();e.cleanups=null}e.state=0,e.context=null}function q(e){throw e}function Y(e,s){return P(()=>e(s))}function v(e,s,t){let i=t.length,l=s.length,o=i,n=0,f=0,y=s[l-1].nextSibling,p=null;for(;n<l||f<o;){if(s[n]===t[f]){n++,f++;continue}for(;s[l-1]===t[o-1];)l--,o--;if(l===n){const c=o<i?f?t[f-1].nextSibling:t[o-f]:y;for(;f<o;)e.insertBefore(t[f++],c)}else if(o===f)for(;n<l;)(!p||!p.has(s[n]))&&e.removeChild(s[n]),n++;else if(s[n]===t[o-1]&&t[f]===s[l-1]){const c=s[--l].nextSibling;e.insertBefore(t[f++],s[n++].nextSibling),e.insertBefore(t[--o],c),s[l]=t[o]}else{if(!p){p=new Map;let g=f;for(;g<o;)p.set(t[g],g++)}const c=p.get(s[n]);if(c!=null)if(f<c&&c<o){let g=n,A=1,U;for(;++g<l&&g<o&&!((U=p.get(s[g]))==null||U!==c+A);)A++;if(A>c-f){const H=s[n];for(;f<c;)e.insertBefore(t[f++],H)}else e.replaceChild(t[f++],s[n++])}else n++;else e.removeChild(s[n++])}}}function Z(e,s,t){let i;return V(l=>{i=l,X(s,e(),s.firstChild?null:void 0,t)}),()=>{i(),s.textContent=""}}function _(e,s,t){const i=document.createElement("template");i.innerHTML=e;let l=i.content.firstChild;return t&&(l=l.firstChild),l}function X(e,s,t,i){if(t!==void 0&&!i&&(i=[]),typeof s!="function")return x(e,s,i,t);T(l=>x(e,s(),l,t),i)}function x(e,s,t,i,l){for(;typeof t=="function";)t=t();if(s===t)return t;const o=typeof s,n=i!==void 0;if(e=n&&t[0]&&t[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(s=s.toString()),n){let f=t[0];f&&f.nodeType===3?f.data=s:f=document.createTextNode(s),t=d(e,t,i,f)}else t!==""&&typeof t=="string"?t=e.firstChild.data=s:t=e.textContent=s;else if(s==null||o==="boolean")t=d(e,t,i);else{if(o==="function")return T(()=>{let f=s();for(;typeof f=="function";)f=f();t=x(e,f,t,i)}),()=>t;if(Array.isArray(s)){const f=[];if(B(f,s,l))return T(()=>t=x(e,f,t,i,!0)),()=>t;if(f.length===0){if(t=d(e,t,i),n)return t}else Array.isArray(t)?t.length===0?F(e,f,i):v(e,t,f):t==null||t===""?F(e,f):v(e,n&&t||[e.firstChild],f);t=f}else if(s instanceof Node){if(Array.isArray(t)){if(n)return t=d(e,t,i,s);d(e,t,null,s)}else t==null||t===""||!e.firstChild?e.appendChild(s):e.replaceChild(s,e.firstChild);t=s}}return t}function B(e,s,t){let i=!1;for(let l=0,o=s.length;l<o;l++){let n=s[l],f;if(n instanceof Node)e.push(n);else if(!(n==null||n===!0||n===!1))if(Array.isArray(n))i=B(e,n)||i;else if((f=typeof n)==="string")e.push(document.createTextNode(n));else if(f==="function")if(t){for(;typeof n=="function";)n=n();i=B(e,Array.isArray(n)?n:[n])||i}else e.push(n),i=!0;else e.push(document.createTextNode(n.toString()))}return i}function F(e,s,t){for(let i=0,l=s.length;i<l;i++)e.insertBefore(s[i],t)}function d(e,s,t,i){if(t===void 0)return e.textContent="";const l=i||document.createTextNode("");if(s.length){let o=!1;for(let n=s.length-1;n>=0;n--){const f=s[n];if(l!==f){const y=f.parentNode===e;!o&&!n?y?e.replaceChild(l,f):e.insertBefore(l,t):y&&e.removeChild(f)}else o=!0}}else e.insertBefore(l,t);return[l]}export{Y as c,Z as r,_ as t};
