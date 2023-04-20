(()=>{
    let tag_sid=0;
    let mltags=[];
    let lang_text=navigator.language.toLowerCase().replace('_','-');
    console.log(lang_text);

    //テキスト文字列
    class MLText extends HTMLElement
    {
        constructor() {
            super();
            mltags.push(this);
        }
        _update(){
            //環境変数から言語を取得 {lang,locale}
            let lang = lang_text;
            //定義言語の一覧
            let langs=[];
            for(let i of this.attributes){
                langs.push(i.name);
            }
            if(langs.length==0){
                this.innerText="";
                console.log("MLText has not attribute(s)");
            }else{
                //言語の決定
                let lidx=langs.indexOf(lang);
                if(lidx<0){
                    lidx=langs.indexOf(lang.split('-')[0]);
                    if(lidx<0){
                        lidx=0;
                    }
                }
                //反映
                this.innerText=this.attributes[lidx].value;
            }
        }	
        connectedCallback()
        {
            this._update();
        }
    }
    customElements.define('ml-text', MLText);
    /**
     * ml-blockの中身は操作しないでください副作用が出ます。
     */
    class MLBlock extends HTMLElement{
        constructor() {
            super();
            mltags.push(this);
            let _t=this;
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length)
                    {
                        _t._update();
						//observer.disconnect();
                        break;
                    }
                }
            });
            observer.observe(this, { childList: true });
            this._cache=[];
            this._display=[];
            this._langs=[];
        }
        _update(){
            console.log("MachML update!");
            //タグリストを取得
            let current=[];
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].hasAttribute("data-lang")) {
                    current.push(this.children[i]);
                }
            }
            let cache=this._cache;
            let display=this._display;
            let langs=this._langs;
            //タグリストにないものをキャッシュから削除
            for (let i = cache.length-1; i>=0; i--) {
                let has=false;
                for(let j=0;j<current.length;j++){
                    if(Object.is(current[j],cache[i])){
                        has=true;
                    }
                }
                if (!has) {
                    cache.splice(i,1);
                    display.splice(i,1);
                    langs.splice(i,1);
                }
            }
            console.log(display);
            //タグリストにあってキャッシュにないものを追加
            for (let i = 0; i < current.length; i++) {
                let has=false;
                for(let j=0;j<cache.length;j++){
                    if(cache[j]===current[i]){
                        has=true;
                    }
                }
                if (!has) {
                    cache.push(current[i]);
                    display.push('');//初期値が取れないことがあるので''とする。
                    langs.push(current[i].attributes["data-lang"].value);
                    console.log("add");
                }
            }
            console.log(display);
            //言語を取得
            let lang = lang_text;
            if(cache.length<=1){//1個ならなんもしない
                return;
            }
            //表示する項目の決定
            let lidx=langs.indexOf(lang);//完全マッチ
            if(lidx<0){
                lidx=langs.indexOf(lang.split('-')[0]);//言語マッチ
                if(lidx<0){//マッチしない
                    lidx=0;
                }
            }
            for(let i=0;i<cache.length;i++){
                cache[i].style.display = i==lidx?display[i]:"none";
            }
            console.log(cache,current)

        }
    }
    customElements.define('ml-block', MLBlock);

    class MLSelector extends HTMLElement{
        connectedCallback()
        {
            let id=`_MLSelector-${tag_sid++}`;
            let langs=this.attributes["langs"].value.split(" ");
            let s=`<select id="${id}">`;
            for (let i = 0; i < langs.length; i++) {
                s+=`<option value="${langs[i]}">${langs[i]}</option>`;
            }
            s+="</select>";
            this.innerHTML=s;
            let tag=document.getElementById(id);
            tag.selectedIndex=langs.indexOf(lang_text);
            tag.addEventListener('change', () => {
                MachML.setLocale(tag.options[tag.selectedIndex].text);
            });
        }
    }
    customElements.define('ml-select', MLSelector);
    //globalAPI
    MachML={
        version:"MachML/0.1.0",
        setLocale:(locale)=>{
            lang_text=locale;
            for(let o of mltags){
                o._update();
            }
        }
    }
})();
