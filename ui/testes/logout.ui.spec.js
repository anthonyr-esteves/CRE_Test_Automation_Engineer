import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";

test.describe("Logout", () => {
  test("CT-FE-024 - Logout do Sistema", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login normal (usuário à escolha)
    await loginPage.loginComoAluno();

    // Clicar em Sair
    await page.getByRole("button", { name: "Sair" }).click();

    // Validar redirecionamento para login
    await expect(page).toHaveURL("/login.html");

    // Validar que o localStorage ficou limpo
    const usuario = await page.evaluate(() =>
      localStorage.getItem("usuarioAtual"),
    );
    expect(usuario).toBeNull();

    // Tentar aceder ao dashboard → deve voltar ao login
    await page.goto("/dashboard.html");
    await expect(page).toHaveURL("/login.html");
  });
});
