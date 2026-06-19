class RegistroPage {
  constructor(page) {
    this.page = page;

    // Campos do formulário
    this.nome = page.getByRole("textbox", { name: "Nome:" });
    this.email = page.getByRole("textbox", { name: "Email:" });
    this.senha = page.getByRole("textbox", { name: "Senha:", exact: true });
    this.confirmarSenha = page.getByRole("textbox", {
      name: "Confirmar Senha:",
    });

    // Botão de ação
    this.btnRegistrar = page.getByRole("button", { name: "Registrar" });
  }

  // Preenche todos os campos do formulário
  async preencherFormulario(nome, email, senha, confirmarSenha) {
    await this.nome.fill(nome);
    await this.email.fill(email);
    await this.senha.fill(senha);
    await this.confirmarSenha.fill(confirmarSenha);
  }

  // Clica no botão Registrar
  async clicarRegistrar() {
    await this.btnRegistrar.click();
  }
}

export default RegistroPage;
