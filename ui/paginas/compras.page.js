import { ROTAS } from "../utilitarios/rotas";

export default class ComprasPage {
  constructor(page) {
    this.page = page;

    // Cards de livros disponíveis para compra
    this.cards = page.locator(".book-card");

    // Botão "Comprar" dentro de um card
    this.botaoComprar = (card) => card.getByRole("button", { name: "Comprar" });

    // Input de quantidade dentro de um card
    this.inputQuantidade = (card) => card.getByLabel("Quantidade:");
  }

  // Navega para a página de compras
  async navegar() {
    await this.page.goto(ROTAS.compras);
  }

  // Obtém o primeiro card (livro mais acima)
  async obterPrimeiroCard() {
    return this.cards.first();
  }

  // Ajusta a quantidade de compra no card
  async ajustarQuantidade(card, quantidade) {
    await this.inputQuantidade(card).fill(String(quantidade));
  }

  // Clica no botão "Comprar" do card
  async comprar(card) {
    await this.botaoComprar(card).click();
  }
}
