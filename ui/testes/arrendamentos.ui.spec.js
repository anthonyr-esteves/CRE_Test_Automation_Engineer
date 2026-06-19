import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import { criarArrendamentoPendente } from "../helpers/arrendamentos.helper";

test.describe("Arrendamentos", () => {
  test("CT-FE-016 - Solicitar Novo Arrendamento", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como aluno
    await loginPage.loginComoAluno();

    // Aceder à página de arrendamentos
    await page.goto("/arrendamentos.html");

    // Preencher o formulário de arrendamento
    await page.getByLabel("Livro:").selectOption({ index: 1 });
    await page
      .getByRole("textbox", { name: "Data Início:" })
      .fill("2025-12-29");
    await page.getByRole("textbox", { name: "Data Fim:" }).fill("2025-12-30");

    // Solicitar arrendamento
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Arrendamento solicitado com sucesso!");
      dialog.accept();
    });

    await page.getByRole("button", { name: "Solicitar Arrendamento" }).click();

    // Validar que aparece em "Meus Arrendamentos"
    const ultimoCard = page.locator(".book-card").last();

    await expect(ultimoCard).toContainText("PENDENTE");
  });

  test("CT-FE-017 - Aprovar Arrendamento", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Pré-condição: arrendamento pendente criado
    await criarArrendamentoPendente(page);

    // Login como funcionário
    await loginPage.loginComoFuncionario();

    // Aceder à página de aprovações
    await page.goto("/aprovacoes.html");

    const ultimoCard = page.locator(".book-card").last();
    await expect(ultimoCard).toContainText("PENDENTE");

    // Diálogo 1: confirmação
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("Confirmar aprovação");
      dialog.accept();
    });

    await ultimoCard.getByRole("button", { name: "Aprovar" }).click();

    // Diálogo 2: sucesso
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Arrendamento aprovado!");
      dialog.accept();
    });

    await expect(ultimoCard).toContainText("APROVADO");
  });
});
