class StatusMessage extends HTMLElement {
  constructor() {
    super();
    this.message = this.getAttribute('message') || 'No data available';
    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        style="display: flex; justify-content: center; align-items: center; padding: 3rem;"
      >
        <p class="text-center text-lg font-bold">${this.message}</p>
      </div>
    `;
  }
}

customElements.define('status-message', StatusMessage);
