(()=>{let n=0,s=[],o=navigator.language.toLowerCase().replace("_","-");console.log(o);class e extends HTMLElement{
constructor(){super(),s.push(this)}_update(){var e,t=o,l=[];for(e of this.attributes)l.push(e.name);if(0==l.length)
this.innerText="",console.log("MLText has not attribute(s)");else{let e=l.indexOf(t);e<0&&(e=l.indexOf(t.split("-")[0])
)<0&&(e=0),this.innerText=this.attributes[e].value}}connectedCallback(){this._update()}}customElements.define("ml-text"
,e);class t extends HTMLElement{constructor(){super(),s.push(this);let l=this;new MutationObserver(e=>{for(const t of e
)if("childList"===t.type&&t.addedNodes.length){l._update();break}}).observe(this,{childList:!0}),this._cache=[],this.
_display=[],this._langs=[]}_update(){console.log("MachML update!");var s=[];for(let e=0;e<this.children.length;e++)this
.children[e].hasAttribute("data-lang")&&s.push(this.children[e]);var n=this._cache,i=this._display,e=this._langs;for(
let l=n.length-1;0<=l;l--){let t=!1;for(let e=0;e<s.length;e++)Object.is(s[e],n[l])&&(t=!0);t||(n.splice(l,1),i.splice
(l,1),e.splice(l,1))}console.log(i);for(let l=0;l<s.length;l++){let t=!1;for(let e=0;e<n.length;e++)n[e]===s[l]&&(t=!0)
;t||(n.push(s[l]),i.push(""),e.push(s[l].attributes["data-lang"].value),console.log("add"))}console.log(i);var l=o;
if(!(n.length<=1)){let t=e.indexOf(l);t<0&&(t=e.indexOf(l.split("-")[0]))<0&&(t=0);for(let e=0;e<n.length;e++)n[e].style.
display=e==t?i[e]:"none";console.log(n,s)}}}customElements.define("ml-block",t);class l extends HTMLElement{
connectedCallback(){var e="_MLSelector-"+n++,t=this.attributes.langs.value.split(" ");let l=`<select id="${e}">`;for(
let e=0;e<t.length;e++)l+=`<option value="${t[e]}">${t[e]}</option>`;l+="</select>",this.innerHTML=l;let s=document.
getElementById(e);s.selectedIndex=t.indexOf(o),s.addEventListener("change",()=>{MachML.setLocale(s.options[s.
selectedIndex].text)})}}customElements.define("ml-select",l),MachML={version:"MachML/0.1.0",setLocale:e=>{o=e;for(
var t of s)t._update()}}})();