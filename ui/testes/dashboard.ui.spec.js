import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import { CARDS_ADMIN, CARDS_ALUNO } from "../../constantes/dashboard";

test.describe("Dashboard", () => {
  test("CT-FE-008 - Dashboard - Visão Admin", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como admin
    await loginPage.loginComoAdmin();

    // Validar headings dos cards
    for (const card of CARDS_ADMIN) {
      await expect(
        page.locator("#stats").getByRole("heading", { name: card }),
      ).toBeVisible();
    }

    // Validar que a grid de livros existe
    await expect(page.locator("#livros-recentes")).toBeVisible();

    // Validar que a grid tem no máximo 5 livros
    const livros = page.locator("#livros-recentes .book-card");
    const total = await livros.count();

    expect(total).toBeLessThanOrEqual(5);
  });

  test("CT-FE-009 - Dashboard - Visão Aluno", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como aluno
    await loginPage.loginComoAluno();

    // Validar headings dos cards
    for (const card of CARDS_ALUNO) {
      await expect(
        page.locator("#stats").getByRole("heading", { name: card }),
      ).toBeVisible();
    }

    // Validar que a grid de livros recentes existe
    await expect(page.locator("#livros-recentes")).toBeVisible();

    // Validar que a grid tem no máximo 5 livros
    const livros = page.locator("#livros-recentes .book-card");
    const total = await livros.count();

    expect(total).toBeLessThanOrEqual(5);
  });
});
