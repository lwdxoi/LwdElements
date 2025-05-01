class LwdPageGalery extends LwdPage {
  constructor(props = {}) {
    const { pagination: paginationProps, galery: galeryProps, ...pageGaleryprops } = props
    super(pageGaleryprops);
    this.shadowRoot.querySelector('slot').name = 'galery'
    this.shadowRoot.append(new LwdSlot({ name: 'pagination' }))
    this.append(this.galery = new LwdGalery({ ...galeryProps, slot: 'galery' }))
    this.append(this.pagination = new LwdPagination({ ...paginationProps, slot: 'pagination' }))
    this.search ||= ''

    this.pagination.addEventListener('attribute-changed', ({ detail: { name } }) => name == 'page' ? this.render() : '');
    this.pagination.addEventListener('attribute-changed', ({ detail: { name, newValue } }) => name == 'page' && newValue > this.pagination.lastPage - this.pagination.pagePad - 2 ? this.fetchFurther() : '');
    this.addEventListener('attribute-changed', ({ detail: { name, newValue } }) => name == 'search' ? this.fetch(newValue) : '')

    if (!!this.fetchFunction) this.fetch(this.search).then(() => this.pagination.page = paginationProps.page)
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'page-size', '_fetch-function', 'search', '_fetched-images'];
  }
  get reRenderOnChange() {
    return [...super.reRenderOnChange, 'page-size', '_fetch-function'];
  }

  async fetch(search) {
    console.log('fetched', search)
    this.fetchedImages = this.serializeImages(await this.fetchFunction(this.serializeSearchString(search)))
    // this.lastSearch = search
    this.search = search
    this.galery.hideFocus()
    this.pagination.lastPage = Math.ceil(this.fetchedImages.length / this.pageSize)
    this.render()
  }

  async fetchFurther() {
    const search = this.search + ` id:<${this.fetchedImages[this.fetchedImages.length - 1].imageId}`
    this.fetchedImages = this.fetchedImages.concat(this.serializeImages(await this.fetchFunction(this.serializeSearchString(search))))
    this.pagination.lastPage = Math.ceil(this.fetchedImages.length / this.pageSize)
    this.render()
  }

  serializeImages(data) {
    return data.map((rr) => ({ ...rr, id: `i-${rr.id}`, imageId: rr.id }))
  }

  serializeSearchString(search) {
    return search.replaceAll(' ', '+')
  }

  paginate() {
    const offset = (pg.pagination.page - 1) * pg.pageSize
    return pg.fetchedImages?.slice(offset, offset + parseInt(pg.pageSize))
  }

  render() {
    super.render()
    this.galery.imageList = this.paginate()
    this.setHashParams()
  }

  setHashParams(){
    location.hashParams = {page: this.pagination.page, search: this.search}
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
