class LwdElement extends HTMLElement {
  constructor(root, attrs = {}) {
    super()
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(this.styleElement = document.createElement('style'))
    this.root = root

    this.constructor.observedAttributes.forEach((observedAttribute) => {
      Object.defineProperty(this, LwdElement.attributeToProperty(observedAttribute), {
        get: this.createGetter(observedAttribute),
        set: this.createSetter(observedAttribute),
        // writable: true, 
        configurable: true
      });
    })

    Object.entries(attrs).forEach(([key, value]) => (this[key] = value));
  }

  static get observedAttributes() {
    return ['link']
  }
  get reRenderOnChange() {
    return []
  }

  connectedCallback() {
    this.ready = true
    this.render();
  }

  render() {
    this.styleElement.innerHTML = this.styleSheet;
    if (!!this.root) this.shadowRoot.append(this.root)
  }

  get styleSheet() {
    return `
:host{
  position: relative;
}
*{
      box-sizing: inherit;
      font-family: inherit;
      font-size: inherit;
}
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('attributeChangedCallback', this, name, oldValue, newValue)
    if (oldValue == newValue) return;
    if (!this.ready) return;

    this.dispatchEvent(new CustomEvent('attribute-changed', { detail: { name, oldValue, newValue }, }));

    if (this.reRenderOnChange.includes(name)) this.render();
  }

  disconnectedCallback() {
    this.ready = false
  }

  static attributeToProperty(attributeName) {
    // Remove _
    let propertyName = attributeName.replaceAll('_', '')
    // Convert from kebab-case to camelCase
    propertyName = propertyName.split('-').map((str, i) => i === 0 ? str : str[0].toUpperCase() + str.slice(1)).join('')
    return propertyName
  }

  createGetter(attributeName) {
    const propertyName = LwdElement.attributeToProperty(attributeName)
    const definedGetter = this.__lookupGetter__(propertyName)
    if (definedGetter) return definedGetter;
    if (attributeName[0] === '_') return () => this[`_${propertyName}`];
    return () => this.getAttribute(attributeName);
  }

  createSetter(attributeName) {
    const propertyName = LwdElement.attributeToProperty(attributeName)
    const definedSetter = this.__lookupSetter__(propertyName)

    if (definedSetter) return definedSetter;
    if (attributeName[0] === '_') {
      return (value) => {
        const oldValue = this[`_${propertyName}`]
        this[`_${propertyName}`] = value
        this.attributeChangedCallback(attributeName, oldValue, value)
      }
    }
    return (value) => this.setAttribute(attributeName, value);
  }
}
