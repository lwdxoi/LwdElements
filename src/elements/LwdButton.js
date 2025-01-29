class LwdButton extends LwdElement  {
  constructor(props = {}) {
    const btn = document.createElement('button')
    btn.append(new LwdSlot())
    super(btn, props);
    this.type ||= 'primary'
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'value', 'type', 'name'];
  }

  get name(){
    return this.getAttribute('name')
  }
  set name(value){
    this.setAttribute('name', value)
    this.root.setAttribute('name', value)
  }

  get type(){
    return this.getAttribute('type')
  }
  set type(value){
    this.setAttribute('type', value)
    this.root.setAttribute('type', value)
  }

  get value(){
    return this.getAttribute('value')
  }
  set value(value){
    this.setAttribute('value', value)
    this.root.value = value
  }


  get styleSheet() {
    return `${super.styleSheet}

:host{
  --primary-color: black;
  --primary-bg: white;
  --primary-border: none;
  --ghost-color: white;
  --ghost-bg:rgba(0, 0, 0, 0);
  --ghost-border: none;
  --outline-color: white;
  --outline-bg:none;
  --outline-border: white solid 2px;
}
:host{
  display: inline-grid;
  color: var(--${this.type}-color);
  backgroud: var(--${this.type}-bg);
  border: var(--${this.type}-border);
}

:host > button {
  height: 100%;
  width: 100%; 
  border-radius: 0.4rem;
  padding: 2px 0.5rem;
  color: inherit;
  background: inherit;
  border: inherit;
}
    `
  }
}

customElements.define('lwd-button', LwdButton);
