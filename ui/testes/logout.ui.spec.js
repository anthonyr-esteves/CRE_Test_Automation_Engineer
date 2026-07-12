import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";

test.describe("Logout", () => {
  test("CT-FE-024 - Logout do Sistema", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginComoAluno();

    await loginPage.logout();

    const usuario = await page.evaluate(() =>
      localStorage.getItem("usuarioAtual"),
    );
    expect(usuario).toBeNull();

    await page.goto("/dashboard.html");
    await expect(page).toHaveURL("/login.html");
  });
});
