class LwdPagination extends LwdElement {
  constructor(props = {}) {
    super(undefined, props);

    this.buttonConstructor = props.buttonConstructor || this.defaultButtonConstructor
    this.page ||= 1
    this.lastPage ||= 1
    this.pagePad ||= 4
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'page', 'last-page', 'page-pad', '_button-constructor'];
  }
  get reRenderOnChange() {
    return [...super.reRenderOnChange, 'page', 'last-page', 'page-pad', '_button-constructor'];
  }

  set page(value) {
    if (value == this.page || value == 0 || value > this.lastPage) return;
    this.setAttribute('page', value)
  }

  defaultButtonConstructor(props = { innerText, onclick, active: false }) {
    return new LwdButton({ ...props, type: props.active ? 'outline' : 'ghost' })
  }

  get styleSheet() {
    return `
    :host{
      display: grid;
      grid-template-columns: repeat(13, auto);
    }


    :host > div{
      display: flex;
      justify-content: space-evenly;
    }
`
  }

  render() {
    super.render()

    this.shadowRoot.querySelectorAll('lwd-button').forEach((lwdButton) => lwdButton.remove())

    console.log('numberOfPage min', (this.pagePad * 2) + 1, this.lastPage)
    const numberOfPage = Math.min((this.pagePad * 2) + 1, this.lastPage)
    const firstPage = Math.max(1, Math.min(this.page - this.pagePad, this.page - numberOfPage + 1))
    Array.from({ length: numberOfPage }, (_, i) => firstPage + i).forEach((thisPage) => {
      this.shadowRoot.append(this.buttonConstructor({ innerText: `${thisPage}`, onclick: () => this.page = thisPage, active: (thisPage == this.page) }))
    })

    this.renderArrows()
  }

  renderArrows() {
    this.shadowRoot.prepend(this.buttonConstructor({ innerText: '<', onclick: () => this.page = parseInt(this.page) - 1 }))
    this.shadowRoot.prepend(this.buttonConstructor({ innerText: '<<', onclick: () => this.page = 1 }))
    this.shadowRoot.append(this.buttonConstructor({ innerText: '>', onclick: () => this.page = parseInt(this.page) + 1 }))
    this.shadowRoot.append(this.buttonConstructor({ innerText: '>>', onclick: () => this.page = this.lastPage }))
  }
}

customElements.define('lwd-pagination', LwdPagination);
