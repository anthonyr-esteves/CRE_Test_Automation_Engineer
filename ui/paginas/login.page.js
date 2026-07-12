import { expect } from "@playwright/test";
import { ROTAS } from "../utilitarios/rotas";
import { MENSAGENS_LOGIN } from "../utilitarios/mensagens";
import { CREDENCIAIS } from "../utilitarios/credenciais";

class LoginPage {
  constructor(page) {
    this.page = page;

    // Campos do formulário
    this.email = page.getByRole("textbox", { name: "Email:" });
    this.senha = page.getByRole("textbox", { name: "Senha:" });

    // Botão de ação
    this.btnEntrar = page.getByRole("button", { name: "Entrar" });
  }

  // Valida que a página de login carregou
  async validarPaginaLogin() {
    await expect(
      this.page.getByRole("heading", { name: "Login" }),
    ).toBeVisible();
  }

  // Valida que os campos estão vazios
  async validarCamposVazios() {
    await expect(this.email).toHaveValue("");
    await expect(this.senha).toHaveValue("");
  }

  // Valida o dialog com mensagem dinâmica
  validarDialog(mensagem) {
    this.page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe(mensagem);
      dialog.accept();
    });
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
    await this.page.goto(ROTAS.login);
    await this.validarPaginaLogin();
    await this.preencherCredenciais(email, senha);

    this.validarDialog(MENSAGENS_LOGIN.sucesso);

    await this.clicarEntrar();
    await expect(this.page).toHaveURL(ROTAS.dashboard);
  }

  // Login específico por perfil (sem hardcode)
  async loginComoAdmin() {
    await this.login(CREDENCIAIS.admin.email, CREDENCIAIS.admin.senha);
  }

  async loginComoFuncionario() {
    await this.login(
      CREDENCIAIS.funcionario.email,
      CREDENCIAIS.funcionario.senha,
    );
  }

  async loginComoAluno() {
    await this.login(CREDENCIAIS.aluno.email, CREDENCIAIS.aluno.senha);
  }

  // Logout clicando no botão "Sair"
  async logout() {
    await this.page.getByRole("button", { name: "Sair" }).click();
  }
}

export default LoginPage;
