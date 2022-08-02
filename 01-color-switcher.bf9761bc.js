const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(){o=setInterval((()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(o)}));let o=null;
//# sourceMappingURL=01-color-switcher.bf9761bc.js.map
