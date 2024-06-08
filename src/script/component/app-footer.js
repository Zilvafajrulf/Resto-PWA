class FooterApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      
                
        <footer>
            <h3 tabindex="0" >Copyright &copy; 2024 <span class="logo">DeliciousEats </span> </h3>
        </footer>
            
        `;
  }
}

customElements.define('app-footer', FooterApp);
