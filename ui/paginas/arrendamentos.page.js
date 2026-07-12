import { ROTAS } from "../utilitarios/rotas";

export default class ArrendamentosPage {
  constructor(page) {
    this.page = page;

    // Select de livros
    this.selectLivro = page.getByLabel("Livro:");

    // Campos de datas
    this.inputDataInicio = page.getByRole("textbox", { name: "Data Início:" });
    this.inputDataFim = page.getByRole("textbox", { name: "Data Fim:" });

    // Botão de solicitação
    this.botaoSolicitar = page.getByRole("button", {
      name: "Solicitar Arrendamento",
    });

    // Cards de "Meus Arrendamentos"
    this.cardsArrendamentos = page.locator(".book-card");
  }

  async navegar() {
    await this.page.goto(ROTAS.arrendamentos);
  }

  async selecionarLivroPorIndice(indice) {
    await this.selectLivro.selectOption({ index: indice });
  }

  async preencherDatas(inicio, fim) {
    await this.inputDataInicio.fill(inicio);
    await this.inputDataFim.fill(fim);
  }

  async solicitar() {
    await this.botaoSolicitar.click();
  }

  async obterUltimoCard() {
    return this.cardsArrendamentos.last();
  }
}
