import { expect } from "@playwright/test";

export default class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  // Valida que todos os itens do menu estão visíveis
  async validarMenuItens(itens) {
    for (const item of itens) {
      await expect(
        this.page.getByRole("link", { name: item, exact: true }),
      ).toBeVisible();
    }
  }

  // Clica num item do menu pelo nome
  async clicarMenu(item) {
    await this.page.getByRole("link", { name: item, exact: true }).click();
  }
}
