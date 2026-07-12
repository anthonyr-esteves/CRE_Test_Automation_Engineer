import { ROTAS } from "../utilitarios/rotas";

export default class ComprasAdminPage {
  constructor(page) {
    this.page = page;

    // Cards de compras pendentes
    this.cards = page.locator(".book-card");

    // Botão "Aprovar" dentro de um card
    this.botaoAprovar = (card) => card.getByRole("button", { name: "Aprovar" });
  }

  // Navega para a página de administração de compras
  async navegar() {
    await this.page.goto(ROTAS.comprasAdmin);
  }

  // Obtém o último card (compra mais recente)
  async obterUltimoCard() {
    return this.cards.last();
  }

  // Aprova o último card pendente
  async aprovarUltimaCompra() {
    const card = await this.obterUltimoCard();
    await this.botaoAprovar(card).click(); // apenas 1 clique
    return card;
  }

  // Localiza card pelo ID da compra (ex: "Compra #12")
  async localizarCardPorId(idCompra) {
    return this.page.locator(".book-card", {
      hasText: `Compra #${idCompra}`,
    });
  }

  // Aprova um card específico pelo ID
  async aprovarCompraPorId(idCompra) {
    const card = await this.localizarCardPorId(idCompra);
    await this.botaoAprovar(card).click(); // apenas 1 clique
    return card;
  }
}
