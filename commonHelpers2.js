import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as o}from"./assets/vendor-77e16229.js";const t=document.querySelector(".form");t.addEventListener("submit",c);function c(){event.preventDefault();const s=Number(t.elements.delay.value),i=t.elements.state.value;function r(e,n){return new Promise((m,u)=>{setTimeout(()=>{n==="fulfilled"?m(e):u(e)},e)})}r(s,i).then(e=>{o.success({title:"OK",message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter",timeout:2e3})}).catch(e=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topCenter",timeout:2e3})})}
//# sourceMappingURL=commonHelpers2.js.map
