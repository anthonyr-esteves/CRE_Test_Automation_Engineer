import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import { MENU_ALUNO, MENU_ADMIN } from "../../constantes/menus";

test.describe("Proteção de Rotas e Navegação", () => {
  test("CT-FE-005 - Proteção de Rotas sem Login", async ({ page }) => {
    // Limpar sessão ANTES da página carregar
    await page.addInitScript(() => localStorage.clear());

    // Aceder diretamente ao dashboard
    await page.goto("/dashboard.html");

    // Validar redirecionamento automático
    await expect(page).toHaveURL("/login.html");
  });

  test("CT-FE-006 - Menu Dinâmico - Aluno", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como aluno
    await loginPage.loginComoAluno();

    // Garantir que estamos no dashboard
    await expect(page).toHaveURL("/dashboard.html");

    // Validar visibilidade dos itens
    for (const item of MENU_ALUNO) {
      await expect(
        page.getByRole("link", { name: item, exact: true }),
      ).toBeVisible();
    }

    // Validar navegação de cada item
    await page.getByRole("link", { name: "Livros", exact: true }).click();
    await expect(page).toHaveURL("/livros.html");

    await page.goto("/dashboard.html");
    await page.getByRole("link", { name: "Favoritos", exact: true }).click();
    await expect(page).toHaveURL("/favoritos.html");

    await page.goto("/dashboard.html");
    await page
      .getByRole("link", { name: "Meus Arrendamentos", exact: true })
      .click();
    await expect(page).toHaveURL("/arrendamentos.html");

    await page.goto("/dashboard.html");
    await page.getByRole("link", { name: "Compras", exact: true }).click();
    await expect(page).toHaveURL("/compras.html");

    await page.goto("/dashboard.html");
    await page
      .getByRole("link", { name: "Minhas Compras", exact: true })
      .click();
    await expect(page).toHaveURL("/minhas-compras.html");
  });

  test("CT-FE-007 - Menu Dinâmico - Admin", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como admin
    await loginPage.loginComoAdmin();

    // Validar visibilidade dos itens
    for (const item of MENU_ADMIN) {
      await expect(
        page.getByRole("link", { name: item, exact: true }),
      ).toBeVisible();
    }

    // Validar navegação do item exclusivo do admin
    await page
      .getByRole("link", { name: "Usuários (Admin)", exact: true })
      .click();
    await expect(page).toHaveURL("/admin-usuarios.html");

    // Validar header da página de administração
    await expect(
      page.getByRole("heading", { name: /Administração de Usuários/i }),
    ).toBeVisible();
  });
});
