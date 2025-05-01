class LwdInput extends LwdElement{constructor(a={}){super(void 0,a),this.shadowRoot.append(this.input=document.createElement("input")),this.autocomplete=document.createElement("div"),this.autocomplete.className="autocomplete",this.input.addEventListener("input",a=>this.value=a.target.value),this.addEventListener("input",this.fetchAutocompleteOptions)}static get observedAttributes(){return[...super.observedAttributes,"value","type","_autocomplete-options","_autocomplete-fetch"]}get reRenderOnChange(){return[...super.reRenderOnChange,"_autocomplete-options"]}get type(){return this.getAttribute("type")}set type(a){this.setAttribute("type",a),this.input.setAttribute("type",a)}get value(){return this.getAttribute("value")}set value(a){this.setAttribute("value",a),this.input.value=a}async fetchAutocompleteOptions(a){if(!this.autocompleteFetch)return;const b=a.target.value,c=this.input.selectionEnd;let d=b.slice(0,c).split(" ");d=d[d.length-1],this.autocompleteOptions=await this.autocompleteFetch(d)}defaultAutocompleteOnClick(a){console.log("defaultAutocompleteOnClick",this,this.lwdInput);const b=this.lwdInput,c=b.value.split(" "),d=b.input.selectionEnd,e=a.target.value,f=c.reduce((a,b)=>a.length<d&&a.length+b.length+1>d?a+e+" ":a+b+" ","");b.value=f,b.autocompleteOptions=void 0,b.input.focus()}render(){super.render(),this.autocomplete.innerHTML="",this.autocompleteOptions&&0!=this.autocompleteOptions?.length?(this.shadowRoot.append(this.autocomplete),this.autocompleteOptions.forEach(({innerText:a,value:b,className:c,onclick:d})=>{const e=document.createElement("div");e.lwdInput=this,e.innerText=a,e.value=b||a,e.className=c||"",e.onclick=d||this.defaultAutocompleteOnClick,this.autocomplete.append(e)})):this.autocomplete.remove()}get styleSheet(){return`${super.styleSheet}
:host{
  display: inline-grid;
  color: white;
}
input, .autocomplete{
  background: #3d3d3d;
  width: 100%;
  border-radius: 0.4rem;
  outline: none;
  color: inherit;
}

input{
  border: #cacaca solid 1px;
  padding: 0 0.4rem;
}

.autocomplete{
  position: absolute;
  top: 100%;
  padding: 0.2rem 0;
}
.autocomplete > div{
  height: ${this.clientHeight}px;
  padding: 0 0.4rem;
  align-content: center;
}
.autocomplete > div:hover{
  background: #4400DD30
}
    `}}customElements.define("lwd-input",LwdInput);