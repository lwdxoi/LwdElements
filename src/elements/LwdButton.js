class LwdButton extends LwdElement  {
  constructor(props = {}) {
    super(undefined, props);
    this.shadowRoot.append(new LwdSlot())
    this.type ||= 'primary'
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'value', 'type', 'name'];
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px 0.5rem;
  border-radius: 0.4rem;
  cursor: pointer;
}
:host([type=primary]){
  background: var(--primary-bg, white);
  color: var(--primary-color, black);
  border: var(--primary-border, none);
}
:host([type=outline]){
  background: var(--outline-bg, none);
  color: var(--outline-color, white);
  border: var(--outline-color, white) var(--outline-border, solid 2px);
}
:host([type=ghost]){
  background: var(--ghost-bg, #88888820);
  color: var(--ghost-color, white);
  border: var(--ghost-border, none);
}
    `
  }
}

customElements.define('lwd-button', LwdButton);
