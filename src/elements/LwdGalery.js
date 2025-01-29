class LwdGalery extends LwdElement  {
  constructor(props = {}) {
    // super(document.createElement('div'), props);
    // this.root.append(new LwdSlot({name: 'image'}))
    super(undefined, props);
    this.shadowRoot.append(new LwdSlot({name: 'image'}))
    this.shadowRoot.append(this.focusSection = new LwdSection({className: 'focus'}))
    this.focusSection.append(this.focusSection.image = new LwdImage())

    this.focusSection.ondblclick = () => {this.focusSection.classList.remove('active'); this.focusSection.image.src=undefined;}

    this.addEventListener('attribute-changed', ({ detail: { name, newValue } }) => name == '_focus-image' ? this.renderFocus() : '')

  }

  static get observedAttributes() {
    return [...super.observedAttributes, '_image-list', '_focus-image'];
  }
  get reRenderOnChange() {
    return [...super.reRenderOnChange, '_image-list'];
  }

  renderFocus(){
    this.focusSection.image.src = this.focusImage.srcOriginal
    this.focusSection.classList.add('active')
  }


  render() {
    super.render()
    this.querySelectorAll('[slot=image]').forEach((el ) => el.remove())
    console.log('LwdGalery render', this.imageList)
    this.imageList?.forEach((image) => {
      this.append(new LwdImage({...image, src: image.srcThumb, slot: 'image', onclick: () => this.focusImage = image}))
    });
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: grid;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
  --image-width: ${this.imageWidth || '134px'};
  --image-height: ${this.imageHeight || '140px'};
  grid-template-columns: repeat(auto-fill, var(--image-width));
  grid-template-rows: repeat(auto-fill, var(--image-height));
  grid-gap: 8px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  overflow: auto;
  scrollbar-width: none;
}

  .focus{
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    --image-height: 100vh;
    --image-width: 100vw;
    background-color: var(--bg-1)
  }

  .focus.active{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
  }
}

customElements.define('lwd-galery', LwdGalery);
