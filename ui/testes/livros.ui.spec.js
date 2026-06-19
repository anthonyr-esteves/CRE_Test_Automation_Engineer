import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import {
  preencherFormularioLivro,
  validarFormularioLimpo,
} from "../helpers/livros.helper";
import { LIVRO_PADRAO } from "../helpers/livros.dados";

test.describe("Livros", () => {
  test("CT-FE-010A - Cadastro de Livro via UI (Funcionário)", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Login como funcionário
    await loginPage.loginComoFuncionario();

    // Aceder à página de livros
    await page.goto("/livros.html");

    // Preencher formulário com dados padrão
    await preencherFormularioLivro(page, LIVRO_PADRAO);

    // Submeter
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Livro adicionado com sucesso!");
      dialog.accept();
    });

    await page.getByRole("button", { name: "Adicionar Livro" }).click();

    // Validar reset
    await validarFormularioLimpo(page);

    // Validar card
    const card = page
      .locator(".book-card")
      .filter({ has: page.getByRole("heading", { name: LIVRO_PADRAO.nome }) });

    await expect(card.first()).toBeVisible();
  });

  test("CT-FE-010B - Cadastro de Livro via UI (Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como admin
    await loginPage.loginComoAdmin();

    // Aceder à página de livros
    await page.goto("/livros.html");

    // Preencher formulário com dados padrão
    await preencherFormularioLivro(page, LIVRO_PADRAO);

    // Submeter
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Livro adicionado com sucesso!");
      dialog.accept();
    });

    await page.getByRole("button", { name: "Adicionar Livro" }).click();

    // Validar reset
    await validarFormularioLimpo(page);

    // Validar card
    const card = page
      .locator(".book-card")
      .filter({ has: page.getByRole("heading", { name: LIVRO_PADRAO.nome }) });

    await expect(card.first()).toBeVisible();
  });

  test("CT-FE-011 - Validação de Campos Obrigatórios no Livro", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Login como funcionário
    await loginPage.loginComoFuncionario();

    // Aceder à página de livros
    await page.goto("/livros.html");

    // Tentar submeter o formulário vazio
    await page.getByRole("button", { name: "Adicionar Livro" }).click();

    // O formulário NÃO deve ser submetido → campos continuam vazios
    await expect(
      page.getByRole("textbox", { name: "Nome do Livro:" }),
    ).toHaveValue("");
    await expect(page.getByRole("textbox", { name: "Autor:" })).toHaveValue("");
    await expect(
      page.getByRole("spinbutton", { name: "Número de Páginas:" }),
    ).toHaveValue("");

    // Preencher apenas um campo obrigatório
    await page
      .getByRole("textbox", { name: "Nome do Livro:" })
      .fill("Teste Parcial");

    await page.getByRole("button", { name: "Adicionar Livro" }).click();

    // Continua inválido → campos obrigatórios continuam vazios
    await expect(page.getByRole("textbox", { name: "Autor:" })).toHaveValue("");
    await expect(
      page.getByRole("spinbutton", { name: "Número de Páginas:" }),
    ).toHaveValue("");
  });

  test("CT-FE-012 - Visualizar Detalhes de Livro", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como funcionário (ou qualquer usuário com acesso à lista de livros)
    await loginPage.loginComoFuncionario();

    // Aceder à página de livros
    await page.goto("/livros.html");

    // Garantir que existe pelo menos um livro
    const cards = page.locator(".book-card");
    await expect(cards.first()).toBeVisible();

    // Clicar no primeiro card
    await cards.first().click();

    // Validar redirecionamento para detalhes.html?id={id}
    await expect(page).toHaveURL(/detalhes\.html\?id=\d+/);

    // Validar container principal
    const detalhes = page.locator("#livro-detalhes");
    await expect(detalhes).toBeVisible();

    await expect(detalhes.locator(".book-image img")).toBeVisible();

    await expect(detalhes.locator(".book-info h2")).toBeVisible();

    await expect(detalhes.getByText("Autor:", { exact: false })).toBeVisible();
    await expect(
      detalhes.getByText("Páginas:", { exact: false }),
    ).toBeVisible();
    await expect(
      detalhes.getByText("Descrição:", { exact: false }),
    ).toBeVisible();
    await expect(
      detalhes.getByText("Data de Cadastro:", { exact: false }),
    ).toBeVisible();

    // Validar botões de ação
    await expect(
      detalhes.getByRole("button", { name: /favoritos/i }),
    ).toBeVisible(); // pode ser Adicionar ou Remover

    await expect(
      detalhes.getByRole("button", { name: /deletar livro/i }),
    ).toBeVisible();

    await expect(
      detalhes.getByRole("button", { name: /voltar/i }),
    ).toBeVisible();
  });
});
