class LwdPageGalery extends LwdPage {
  constructor(props = {}) {
    const { pagination: paginationProps, galery: galeryProps, ...pageGaleryprops } = props
    super(pageGaleryprops);
    this.shadowRoot.querySelector('slot').name = 'galery'
    this.shadowRoot.append(new LwdSlot({ name: 'pagination' }))
    this.append(this.galery = new LwdGalery({ ...galeryProps, slot: 'galery' }))
    this.append(this.pagination = new LwdPagination({ ...paginationProps, slot: 'pagination' }))
    if (!!this.fetchFunction) this.fetch(this.search || '')

    this.pagination.addEventListener('attribute-changed', ({ detail: { name } }) => name == 'page' ? this.render() : '');
    this.addEventListener('attribute-changed', ({ detail: { name, newValue } }) => name == 'search' ? this.fetch(newValue) : '')

  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'page-size', '_fetch-function', 'search', '_fetched-images'];
  }
  get reRenderOnChange() {
    return [...super.reRenderOnChange, 'page-size', '_fetch-function'];
  }


  // get imageList(){
  //   return this._imageList
  // }
  // set imageList(value){
  //   const oldValue = this._imageList
  //   this._imageList = value
  //   this.attributeChangedCallback('image-list', oldValue, value)
  //   this.render();
  // }

  async fetch(search) {
    console.log('fetched', search)
    this.fetchedImages = this.serialize(await this.fetchFunction(search))
    // this.lastSearch = search
    this.pagination.lastPage = Math.ceil(this.fetchedImages.length / this.pageSize)
    this.pagination.page = 1
    this.render()
  }

  serialize(data) {
    return data.map((rr) => ({ ...rr, id: `i-${rr.id}` }))
  }

  paginate() {
    const offset = (pg.pagination.page - 1) * pg.pageSize
    return pg.fetchedImages?.slice(offset, offset + parseInt(pg.pageSize))
  }

  render() {
    super.render()
    this.galery.imageList = this.paginate()
  }

  get styleSheet() {
    return `${super.styleSheet}
:host{
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: calc(100% - 50px) 50px;
}
`
  }
}

customElements.define('lwd-page-galery', LwdPageGalery);
