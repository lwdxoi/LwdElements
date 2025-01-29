class LwdPage extends LwdElement {
  constructor(props ={}) {
    super(undefined, props);
    this.shadowRoot.append(new LwdSlot())
  }
  static get observedAttributes() {
    return ['active'];
  }

  static get active(){
    return this.getAttribute('active')
  }
  static set active(value){
    this.setAttribute('active', value)
  }

  render() {
    // if(this.active){
      super.render()
    // }
  }

  get styleSheet(){
    return `${super.styleSheet}
    `
  }
}

customElements.define('lwd-page', LwdPage);
