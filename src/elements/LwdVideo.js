class LwdVideo extends LwdElement {
  constructor(props = {}) {
    super(undefined, props);
    this.block = document.createElement('div')
    this.shadowRoot.append(this.block)
    this.block.onclick = () => this.video.paused ? this.video.play() : this.video.pause()
    this.video = document.createElement('video')
    this.video.controls = true
    this.shadowRoot.append(this.video)
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'src'];
  }

  set src(value) {
    this.setAttribute('src', value)
    this.video.src = value
  }

  get styleSheet() {
    return `${super.styleSheet}
    :host{
      display: contents;
    }

    video{
      width: 100%;
      height: 100%;
    }

    div{
      position: absolute;
      height: calc(100% - 40px);
      width: 100%;
    }
  `
  }
}

customElements.define('lwd-video', LwdVideo);
