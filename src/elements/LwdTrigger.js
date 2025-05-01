class LwdTrigger extends LwdElement {
  constructor(props = {}) {
    super(undefined, props);
    this.shadowRoot.append(this.root = new LwdSlot())
    this.addEventListener('mouseenter', () => { console.log('this', this); this.root.classList.add('visible')}  )
    this.addEventListener('mouseleave', () => this.root.classList.remove('visible'))
  }

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: block;
  position: fixed;
  z-index: 5;
}

slot:not(.visible, .pinned, :focus-within){
  display: none
}
    `
  }
}

customElements.define('lwd-trigger', LwdTrigger);
