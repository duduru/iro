define(["vue","velocity"],function(n,o){"use strict";!function(){document.documentElement.classList.add(void 0===document.ontouchstart?"no-touch":"touch")}(),function(){new n({el:"#navigitor",data:{navigitorShow:!1,scrollY:window.scrollY,requestToken:null},ready:function(){window.addEventListener("scroll",this.windowOnScroll)},methods:{top:function(){this.scrollTo(document.documentElement)},pre:function(){var n=this.getCurrentPost(),o=n.previousElementSibling;this.scrollTo(o||n)},next:function(){var n=this.getCurrentPost(),o=n.nextElementSibling;this.scrollTo(o||n)},preventDefault:function(n){n.preventDefault()},scrollTo:function(n){var t=this;o(n,"scroll",{duration:1e3,mobileHA:!1,begin:function(){window.removeEventListener("scroll",t.windowOnScroll)},complete:function(){window.addEventListener("scroll",t.windowOnScroll)}}),t.navigitorShow=!1,t.scrollY=null},getCurrentPost:function(){var n,o=document.querySelectorAll("#main .post");for(console.log(o),n=0;n<o.length;n++){var t=o[n].getBoundingClientRect(o[n]).top;if(t>=0)return o[n-1]||o[n]}return o[o.length-1]},windowOnScroll:function(){var n=this;n.requestToken||(n.requestToken=setTimeout(function(){n.navigitorShow=window.scrollY<=n.scrollY,n.scrollY=window.scrollY,n.requestToken=null},100))}}})}()});