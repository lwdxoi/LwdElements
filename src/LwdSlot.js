class LwdSlot extends HTMLSlotElement {
  constructor(props ={}){
    super()
    Object.entries(props).forEach(([key, value]) => (this[key] = value));
  }
}
customElements.define('lwd-slot', LwdSlot, {extends: 'slot'});