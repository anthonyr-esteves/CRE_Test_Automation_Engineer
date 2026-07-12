import { expect } from "@playwright/test";
import { MENSAGENS_LIVROS } from "../utilitarios/mensagens";

export default class LivrosPage {
  constructor(page) {
    this.page = page;

    // Campos do formulário
    this.nome = page.getByRole("textbox", { name: "Nome do Livro:" });
    this.autor = page.getByRole("textbox", { name: "Autor:" });
    this.paginas = page.getByRole("spinbutton", { name: "Número de Páginas:" });
    this.descricao = page.getByRole("textbox", { name: "Descrição:" });
    this.imagem = page.getByRole("textbox", { name: "URL da Imagem:" });
    this.estoque = page.getByRole("spinbutton", { name: "Estoque:" });
    this.preco = page.getByRole("spinbutton", { name: "Preço (€):" });

    // Botões
    this.botaoAdicionar = page.getByRole("button", { name: "Adicionar Livro" });

    // Cards
    this.cards = page.locator(".book-card");
  }

  async preencherFormulario(dados) {
    await this.nome.fill(dados.nome);
    await this.autor.fill(dados.autor);
    await this.paginas.fill(dados.paginas);
    await this.descricao.fill(dados.descricao);
    await this.imagem.fill(dados.imagem);
    await this.estoque.fill(dados.estoque);
    await this.preco.fill(dados.preco);
  }

  async submeterLivro() {
    this.page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe(MENSAGENS_LIVROS.sucessoCadastro);
      dialog.accept();
    });

    await this.botaoAdicionar.click();
  }

  async validarCard(nome) {
    const card = this.page
      .locator(".book-card")
      .filter({ has: this.page.getByRole("heading", { name: nome }) });

    await expect(card.first()).toBeVisible();
  }

  async abrirPrimeiroLivro() {
    await expect(this.cards.first()).toBeVisible();
    await this.cards.first().click();
  }

  async abrirLivroPorNome(nome) {
    const card = this.page.locator(".book-card").filter({
      has: this.page.getByRole("heading", { name: nome }),
    });

    await card.first().click();
  }
}
