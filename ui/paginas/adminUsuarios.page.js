import { ROTAS } from "../utilitarios/rotas";

export default class AdminUsuariosPage {
  constructor(page) {
    this.page = page;

    // Menu
    this.linkMenu = page.getByRole("link", { name: "Usuários (Admin)" });

    // Heading principal
    this.heading = page.getByRole("heading", {
      name: "👨‍💻 Administração de Usuários",
    });

    // Áreas de conteúdo e bloqueio
    this.areaConteudo = page.locator("#area-admin-conteudo");
    this.areaBloqueio = page.locator("#area-admin-bloqueio");

    // Formulário de criação de usuário
    this.inputNome = page.getByRole("textbox", { name: "Nome:" });
    this.inputEmail = page.getByRole("textbox", { name: "Email:" });
    this.inputSenha = page.getByRole("textbox", { name: "Senha:" });
    this.selectTipo = page.getByRole("combobox", { name: "Tipo:" });
    this.botaoCriar = page.getByRole("button", { name: "Criar Usuário" });
  }

  // Navegar diretamente para a página
  async navegar() {
    await this.page.goto(ROTAS.adminUsuarios);
  }

  // Abrir via menu lateral
  async abrirViaMenu() {
    await this.linkMenu.click();
  }

  // Preencher formulário de criação
  async preencherFormulario(nome, email, senha, tipo) {
    await this.inputNome.fill(nome);
    await this.inputEmail.fill(email);
    await this.inputSenha.fill(senha);
    await this.selectTipo.selectOption(tipo);
  }

  // Submeter criação de usuário
  async criarUsuario() {
    await this.botaoCriar.click();
  }
}
