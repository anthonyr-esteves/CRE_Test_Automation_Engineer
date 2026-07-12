import { expect } from "@playwright/test";
import { ROTAS } from "../utilitarios/rotas";

export default class FavoritosPage {
  constructor(page) {
    this.page = page;

    // Botões de favoritação
    this.botaoAdicionar = page.getByRole("button", {
      name: "🤍 Adicionar aos Favoritos",
    });
    this.botaoRemover = page.getByRole("button", {
      name: "❤️ Remover dos Favoritos",
    });

    // Cards de livros
    this.cards = page.locator(".book-card");

    // Mensagem de vazio
    this.mensagemVazio = page.locator("#mensagem-vazio");
  }

  async navegar() {
    await this.page.goto(ROTAS.favoritos);
  }

  async adicionar() {
    await this.botaoAdicionar.click();
  }

  async remover() {
    await this.botaoRemover.click();
  }

  async validarAdicionado() {
    await expect(this.botaoRemover).toBeVisible();
  }

  async validarRemovido() {
    await expect(this.botaoAdicionar).toBeVisible();
  }

  async validarFavoritoExiste(nome) {
    const card = this.page.locator(".book-card").filter({
      has: this.page.getByRole("heading", { name: nome }),
    });

    await expect(card.first()).toBeVisible();
  }

  async validarFavoritoNaoExiste(nome) {
    const card = this.page.locator(".book-card").filter({
      has: this.page.getByRole("heading", { name: nome }),
    });

    await expect(card).toHaveCount(0);
  }
}
