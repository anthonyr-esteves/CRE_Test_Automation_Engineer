import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import { criarCompraPendente } from "../helpers/compras.helper";

test.describe("Compras", () => {
  test("CT-FE-018 - Registrar Compra (Aluno)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como aluno
    await loginPage.loginComoAluno();

    // Aceder à página de compras
    await page.goto("/compras.html");

    // Selecionar o primeiro card de livro
    const primeiroCard = page.locator(".book-card").first();

    // Comprar (quantidade já é 1 por defeito)
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe(
        "Compra registrada com sucesso! Aguarde aprovação.",
      );
      dialog.accept();
    });

    await primeiroCard.getByRole("button", { name: "Comprar" }).click();

    // Validar que aparece em Minhas Compras como PENDENTE
    await page.goto("/minhas-compras.html");

    const ultimoCard = page.locator(".book-card").last();
    await expect(ultimoCard).toContainText("Status: PENDENTE");
  });

  test("CT-FE-019 - Aprovar Compra (Funcionário/Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // PRÉ-CONDIÇÃO: Criar compra pendente como aluno
    const idCompra = await criarCompraPendente(page);

    // Login como funcionário/admin
    await loginPage.loginComoFuncionario();

    // Aceder à página de administração de compras
    await page.goto("/compras-admin.html");

    // Localizar card pelo ID da compra
    const cardAprovado = page.locator(".book-card", {
      hasText: `Compra #${idCompra}`,
    });

    // Confirmação
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("Confirmar alteração da compra");
      dialog.accept();
    });

    await cardAprovado.getByRole("button", { name: "Aprovar" }).click();

    // Validar status APROVADA
    await expect(cardAprovado).toContainText("Status: APROVADA");
  });
});
