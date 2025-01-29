class LwdSection extends LwdElement  {
  constructor(props = {}) {
    super(undefined, props);
    this.shadowRoot.append(new LwdSlot())
  }

  static get observedAttributes() {
    return [...super.observedAttributes,];
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: block;
  position: fixed;
  background-color: var(--bg-2);
  z-index: 10;
}
    `
  }
}

customElements.define('lwd-section', LwdSection);
