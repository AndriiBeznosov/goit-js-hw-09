!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var i=o("h6c0i"),r={onForm:document.querySelector(".form"),delay:document.querySelector('[name="delay"]'),step:document.querySelector('[name="step"]'),amout:document.querySelector('[name="amount"]'),submitBtn:document.querySelector(".btn-promises"),btnResetStop:document.querySelector(".btn-stop-reset")};r.onForm.addEventListener("input",(function(e){a[e.target.name]=e.target.value})),r.onForm.addEventListener("submit",(function(e){e.preventDefault(),console.log(a),r.submitBtn.disabled=!0,r.btnResetStop.disabled=!1,setTimeout((function(){r.submitBtn.disabled||(r.btnResetStop.disabled=!0),l=setInterval((function(){if(s!==Number(a.amount))return s+=1,d+=Number(a.step),(e=s,t=d,new Promise((function(n,o){Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}))).then((function(e){var t=e.position,n=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;i.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))}));var e,t;clearInterval(l),r.submitBtn.disabled=!1,s=0,d=Number(a.step)}),a.step)}),a.delay)})),r.btnResetStop.addEventListener("click",(function(){clearInterval(l),r.submitBtn.disabled=!1,r.btnResetStop.disabled=!0,s=0,d=Number(a.step),console.log(a)}));var a={},s=0,l=null,d=0;r.btnResetStop.disabled=!0}();
//# sourceMappingURL=03-promises.920b45cd.js.map