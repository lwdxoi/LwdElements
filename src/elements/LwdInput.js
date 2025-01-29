class LwdInput extends LwdElement {
  constructor(props = {}) {
    super(undefined, props);
    this.shadowRoot.append(this.input = document.createElement('input'))
    this.autocomplete = document.createElement('div')
    this.autocomplete.className = 'autocomplete'
    this.input.addEventListener('input', (e) => this.value = e.target.value)
    this.addEventListener('input', this.fetchAutocompleteOptions)

    // setTimeout(() => 
    // this.autocompleteOptions = [
    //   { innerText: 'Lana (1234)', value: 'lana' },
    //   { innerText: 'Shantae (55)', value: 'shantae' },
    //   { innerText: 'amphibian (12872)', value: 'amphibian' },
    //   { innerText: 'sonic the hedgehog (series) (82674)', value: 'sonic_the_hedgehog_(series)' }]
    // , 8000)
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'value', 'type', '_autocomplete-options', '_autocomplete-fetch'];
  }
  get reRenderOnChange() {
    return [...super.reRenderOnChange, '_autocomplete-options']
  }

  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    this.setAttribute('type', value)
    this.input.setAttribute('type', value)
  }

  get value() {
    return this.getAttribute('value')
  }
  set value(value) {
    this.setAttribute('value', value)
    this.input.value = value
  }

  async fetchAutocompleteOptions(event) {
    if (!this.autocompleteFetch) return;
    const completeSearch = event.target.value
    const cursorPosition = this.input.selectionEnd
    let search = completeSearch.slice(0, cursorPosition).split(' ')
    search = search[search.length - 1]

    // console.log('fetchAutocompleteOptions', search,  await this.autocompleteFetch(search))
    this.autocompleteOptions = await this.autocompleteFetch(search)
  }

  defaultAutocompleteOnClick(event) {
    console.log('defaultAutocompleteOnClick', this,  this.lwdInput)
    // options trigger the event
    const lwdInput = this.lwdInput
    const searchWords = lwdInput.value.split(' ')
    const cursorPosition = lwdInput.input.selectionEnd
    const selectedValue = event.target.value


    const completedSearch = searchWords.reduce((completedSearch, word) =>
      completedSearch.length < cursorPosition && completedSearch.length + word.length + 1 > cursorPosition ?
        completedSearch + selectedValue + ' ' : completedSearch + word + ' '
      , '')

    lwdInput.value = completedSearch
    lwdInput.autocompleteOptions = undefined
    lwdInput.input.focus()
  }

  render() {
    super.render()

    this.autocomplete.innerHTML = ''
    if (!this.autocompleteOptions || this.autocompleteOptions?.length == 0) {
      this.autocomplete.remove()
    } else {
      this.shadowRoot.append(this.autocomplete)

      this.autocompleteOptions.forEach(({ innerText, value, className, onclick }) => {
        const option = document.createElement('div')
        option.lwdInput = this
        option.innerText = innerText
        option.value = value || innerText
        option.className = className || ''
        option.onclick = onclick || this.defaultAutocompleteOnClick
        this.autocomplete.append(option)
      })
    }
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: inline-grid;
  color: white;
}
input, .autocomplete{
  background: #3d3d3d;
  width: 100%;
  border-radius: 0.4rem;
  outline: none;
  color: inherit;
}

input{
  border: #cacaca solid 1px;
  padding: 0 0.4rem;
}

.autocomplete{
  position: absolute;
  top: 100%;
  padding: 0.2rem 0;
}
.autocomplete > div{
  height: ${this.clientHeight}px;
  padding: 0 0.4rem;
  align-content: center;
}
.autocomplete > div:hover{
  background: #4400DD30
}
    `
  }
}
customElements.define('lwd-input', LwdInput);
