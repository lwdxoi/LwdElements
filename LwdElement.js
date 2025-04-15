class LwdElement extends HTMLElement{constructor(a,b={}){super(),this.attachShadow({mode:"open"}),this.shadowRoot.append(this.styleElement=document.createElement("style")),this.root=a,this.constructor.observedAttributes.forEach(a=>{Object.defineProperty(this,LwdElement.attributeToProperty(a),{get:this.createGetter(a),set:this.createSetter(a),configurable:!0})}),Object.entries(b).forEach(([a,b])=>this[a]=b)}static get observedAttributes(){return["link"]}get reRenderOnChange(){return[]}connectedCallback(){this.ready=!0,this.render()}render(){this.styleElement.innerHTML=this.styleSheet,!this.root||this.shadowRoot.append(this.root)}get styleSheet(){return`
:host{
  position: relative;
}
*{
      box-sizing: inherit;
      font-family: inherit;
      font-size: inherit;
}
    `}attributeChangedCallback(a,b,c){b!=c&&this.ready&&(this.dispatchEvent(new CustomEvent("attribute-changed",{detail:{name:a,oldValue:b,newValue:c}})),this.reRenderOnChange.includes(a)&&this.render())}disconnectedCallback(){this.ready=!1}static attributeToProperty(a){let b=a.replaceAll("_","");return b=b.split("-").map((a,b)=>0===b?a:a[0].toUpperCase()+a.slice(1)).join(""),b}createGetter(a){const b=LwdElement.attributeToProperty(a),c=this.__lookupGetter__(b);return c?c:"_"===a[0]?()=>this[`_${b}`]:()=>this.getAttribute(a)}createSetter(a){const b=LwdElement.attributeToProperty(a),c=this.__lookupSetter__(b);return c?c:"_"===a[0]?c=>{const d=this[`_${b}`];this[`_${b}`]=c,this.attributeChangedCallback(a,d,c)}:b=>this.setAttribute(a,b)}}