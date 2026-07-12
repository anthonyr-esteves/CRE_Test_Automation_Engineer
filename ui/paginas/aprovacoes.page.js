import { ROTAS } from "../utilitarios/rotas";

export default class AprovacoesPage {
  constructor(page) {
    this.page = page;

    // Cards de arrendamentos pendentes
    this.cards = page.locator(".book-card");

    // Botão "Aprovar" dentro de um card
    this.botaoAprovar = (card) => card.getByRole("button", { name: "Aprovar" });
  }

  // Navega para a página de aprovações
  async navegar() {
    await this.page.goto(ROTAS.aprovacoes);
  }

  // Obtém o último card (mais recente)
  async obterUltimoCard() {
    return this.cards.last();
  }

  // Clica no botão "Aprovar" do último card
  async aprovarUltimoArrendamento() {
    const card = await this.obterUltimoCard();
    await this.botaoAprovar(card).click();
  }
}
