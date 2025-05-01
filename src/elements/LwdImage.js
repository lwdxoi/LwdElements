class LwdImage extends LwdElement  {
  constructor(props = {}) {
    const frame = document.createElement('div')
    const image = document.createElement('img')
    frame.append(image)
    super(frame, props);
    this.frame = this.frame
    this.image = this.image
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'src', 'frame-color'];
  }

  get src(){
    return this.getAttribute('img')
  }
  set src(value){
    this.setAttribute('src', value)
    this.root.querySelector('img').src = value
  }

  get frameColor(){
    return this.getAttribute('frame-color')
  }
  set frameColor(value){
    if(!!value){
      this.setAttribute('frame-color', value)
      this.root.classList.add('frame')
    }else{
      this.removeAttribute('frame-color')
      this.root.classList.remove('frame')
    }
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: flex;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
div{
  display: flex;
  flex-direction: column;
  // max-height: var(--image-height);
  // max-width: var(--image-width);
  max-height: 100%;
  max-width: 100%;
}
a.frame{
  background-color: ${this.frameColor};
  padding: 2px;
  font-size: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
img{
  // max-height: var(--image-height);
  // max-width: var(--image-width);
  object-fit: contain;
  width: 100%;
  height: 100%;
}
   
`
  }
}

customElements.define('lwd-image', LwdImage);
