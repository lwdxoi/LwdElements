class LwdImage extends LwdElement{constructor(a={}){const b=document.createElement("div"),c=document.createElement("img");b.append(c),super(b,a),this.frame=this.frame,this.image=this.image}static get observedAttributes(){return[...super.observedAttributes,"src","frame-color"]}get src(){return this.getAttribute("img")}set src(a){this.setAttribute("src",a),this.root.querySelector("img").src=a}get frameColor(){return this.getAttribute("frame-color")}set frameColor(a){!a?(this.removeAttribute("frame-color"),this.root.classList.remove("frame")):(this.setAttribute("frame-color",a),this.root.classList.add("frame"))}get styleSheet(){return`${super.styleSheet}
:host{
  display: block;
  max-height: 100%;
  max-width: 100%;
}
div{
  display: flex;
  flex-direction: column;
  max-height: var(--image-height);
  max-width: var(--image-width);
}
a.frame{
  background-color: ${this.frameColor};
  padding: 2px;
  font-size: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
img{
  max-height: var(--image-height);
  max-width: var(--image-width);
  object-fit: contain;
}
  max-height: calc( var(--image-height) - 0.5rem - 4px );
  max-width: calc( var(--image-width) - 4px );
}
   
`}}customElements.define("lwd-image",LwdImage);