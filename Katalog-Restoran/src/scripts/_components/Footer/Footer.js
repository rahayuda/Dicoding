import './Footer.scss';

class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="footer">
      <p>Copyright &copy; 2024 - Fork and Spoon</p>
    </footer>
    `;
  }
}

customElements.define('footer-app', Footer);
