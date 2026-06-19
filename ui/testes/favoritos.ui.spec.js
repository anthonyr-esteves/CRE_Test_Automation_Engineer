import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import {
  preencherFormularioLivro,
  validarFormularioLimpo,
  criarLivroUnico,
} from "../helpers/livros.helper";
import { LIVRO_PADRAO } from "../helpers/livros.dados";

test.describe("Favoritos", () => {
  test("CT-FE-013 - Adicionar Livro aos Favoritos pela UI", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Login como ADMIN (Aluna não tem permissão para adicionar livros)
    await loginPage.loginComoAdmin();

    // Criar livro único via helper
    const nomeUnico = await criarLivroUnico(
      page,
      LIVRO_PADRAO,
      preencherFormularioLivro,
    );

    // Validar card do livro criado
    const card = page
      .locator(".book-card")
      .filter({ has: page.getByRole("heading", { name: nomeUnico }) });

    await expect(card.first()).toBeVisible();

    // Clicar no card → navega automaticamente para detalhes.html?id={id}
    await card.first().click();

    // Validar que estamos na página de detalhes
    await expect(page).toHaveURL(/detalhes\.html\?id=\d+/);

    // Clicar em "Adicionar aos Favoritos"
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Adicionado aos favoritos!");
      dialog.accept();
    });

    await page
      .getByRole("button", { name: "🤍 Adicionar aos Favoritos" })
      .click();

    // Validar que o botão mudou para "Remover"
    await expect(
      page.getByRole("button", { name: "❤️ Remover dos Favoritos" }),
    ).toBeVisible();

    // Aceder à página de favoritos
    await page.goto("/favoritos.html");

    // Validar que o livro aparece na lista de favoritos
    const favorito = page
      .locator(".book-card")
      .filter({ has: page.getByRole("heading", { name: nomeUnico }) });

    await expect(favorito.first()).toBeVisible();
  });

  test("CT-FE-014 - Remover Livro dos Favoritos", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como ADMIN (para criar livro)
    await loginPage.loginComoAdmin();

    // Criar livro único via helper
    const nomeUnico = await criarLivroUnico(
      page,
      LIVRO_PADRAO,
      preencherFormularioLivro,
    );

    // Validar card do livro criado
    const card = page
      .locator(".book-card")
      .filter({ has: page.getByRole("heading", { name: nomeUnico }) });

    await expect(card.first()).toBeVisible();

    // Clicar no card → navega para detalhes
    await card.first().click();
    await expect(page).toHaveURL(/detalhes\.html\?id=\d+/);

    // Adicionar aos favoritos (estado inicial)
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Adicionado aos favoritos!");
      dialog.accept();
    });

    await page
      .getByRole("button", { name: "🤍 Adicionar aos Favoritos" })
      .click();

    await expect(
      page.getByRole("button", { name: "❤️ Remover dos Favoritos" }),
    ).toBeVisible();

    // Agora sim → Remover dos favoritos
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Removido dos favoritos!");
      dialog.accept();
    });

    await page
      .getByRole("button", { name: "❤️ Remover dos Favoritos" })
      .click();

    // Validar que o botão voltou ao estado inicial
    await expect(
      page.getByRole("button", { name: "🤍 Adicionar aos Favoritos" }),
    ).toBeVisible();

    // Aceder à página de favoritos
    await page.goto("/favoritos.html");

    // Validar que o livro NÃO aparece na lista
    const favorito = page
      .locator(".book-card")
      .filter({ has: page.getByRole("heading", { name: nomeUnico }) });

    await expect(favorito).toHaveCount(0);
  });

  test("CT-FE-015 - Listar Livros Favoritos", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como aluno
    await loginPage.loginComoAluno();

    // FASE 1 — Sem favoritos (mock API)

    await page.route("http://localhost:3000/favoritos/*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" },
      });
    });

    await page.goto("/favoritos.html");

    await expect(page.locator("#mensagem-vazio")).toBeVisible();
    await expect(page.locator(".book-card")).toHaveCount(0);

    // FASE 2 — Com 1 favorito (mock API)

    await page.route("http://localhost:3000/favoritos/*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          {
            id: 9999,
            nome: "Livro Favorito Teste",
            autor: "Autor Teste",
            paginas: 123,
            descricao: "Teste",
            imagemUrl: "https://picsum.photos/200",
          },
        ]),
        headers: { "Content-Type": "application/json" },
      });
    });

    await page.goto("/favoritos.html");

    const cards = page.locator(".book-card");
    await expect(cards).toHaveCount(1);

    await expect(
      page.getByRole("heading", { name: "Livro Favorito Teste" }),
    ).toBeVisible();
  });
});
