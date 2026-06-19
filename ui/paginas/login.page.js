import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;

    // Campos do formulário
    this.email = page.getByRole("textbox", { name: "Email:" });
    this.senha = page.getByRole("textbox", { name: "Senha:" });

    // Botão de ação
    this.btnEntrar = page.getByRole("button", { name: "Entrar" });
  }

  // Preenche os campos de login
  async preencherCredenciais(email, senha) {
    await this.email.fill(email);
    await this.senha.fill(senha);
  }

  // Clica no botão Entrar
  async clicarEntrar() {
    await this.btnEntrar.click();
  }

  // Login genérico
  async login(email, senha) {
    await this.page.goto("/login.html");
    await this.preencherCredenciais(email, senha);

    this.page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Login realizado com sucesso!");
      dialog.accept();
    });

    await this.clicarEntrar();
    await expect(this.page).toHaveURL("/dashboard.html");
  }

  // Login específico por perfil
  async loginComoAdmin() {
    await this.login("admin@biblioteca.com", "123456");
  }

  async loginComoFuncionario() {
    await this.login("func@biblio.com", "123456");
  }

  async loginComoAluno() {
    await this.login("aluna@teste.com", "123456");
  }
}

export default LoginPage;
