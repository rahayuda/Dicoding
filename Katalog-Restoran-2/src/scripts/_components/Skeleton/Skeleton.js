class Skeleton extends HTMLElement {
  connectedCallback() {
    this.height = this.getAttribute('height') || '';

    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        style="border-radius: 0.5rem; height: ${this.height}; width: 100%; background-color: #86919e"
      />
    `;
  }
}

customElements.define('skeleton-component', Skeleton);
