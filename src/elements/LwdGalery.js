class LwdGalery extends LwdElement {
  constructor(props = {}) {
    // super(document.createElement('div'), props);
    // this.root.append(new LwdSlot({name: 'image'}))
    super(undefined, props);
    this.shadowRoot.append(new LwdSlot({ name: 'image' }))
    this.shadowRoot.append(this.focusSection = new LwdSection({ className: 'focus' }))
    this.focusSection.append(this.focusSection.image = new LwdImage())
    this.focusSection.append(this.focusSection.video = new LwdVideo())

    this.hideFocus()
    this.focusSection.ondblclick = () => this.hideFocus()

    this.addEventListener('attribute-changed', ({ detail: { name, newValue } }) => (name == '_focus-image' && newValue != undefined) ? this.renderFocus() : '')
  }

  static get observedAttributes() {
    return [...super.observedAttributes, '_image-list', '_focus-image'];
  }
  get reRenderOnChange() {
    return [...super.reRenderOnChange, '_image-list'];
  }

  renderFocus() {
    if (this.focusImage.srcOriginal.includes('.mp4')) {
      this.focusSection.video.style.display = ''
      this.focusSection.video.src = this.focusImage.srcOriginal
    } else {
      this.focusSection.image.style.display = ''
      this.focusSection.image.src = this.focusImage.srcOriginal

    }
    this.focusSection.classList.add('active')
  }

  hideFocus(){
    this.focusSection.classList.remove('active'); 
    this.focusImage = undefined;
    
    this.focusSection.video.src = undefined
    this.focusSection.video.style.display = 'none'
    this.focusSection.image.src = undefined
    this.focusSection.image.style.display = 'none'
  }


  render() {
    super.render()
    this.querySelectorAll('[slot=image]').forEach((el) => el.remove())
    console.log('LwdGalery render', this.imageList)
    this.imageList?.forEach((image) => {
      this.append(new LwdImage({ ...image, src: image.srcThumb, slot: 'image', onclick: () => this.focusImage = image }))
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
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, calc( 100% / 7 ));
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
