!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(){r=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled",!0)})),e.addEventListener("click",(function(){clearInterval(r),t.removeAttribute("disabled")}));var r=null}();
//# sourceMappingURL=01-color-switcher.f7c3a7b1.js.map