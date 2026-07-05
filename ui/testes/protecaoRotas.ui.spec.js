import { test } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import ProtecaoRotasPage from "../paginas/protecaoRotas.page";

import { MENU_ALUNO, MENU_ADMIN } from "../../constantes/menus";
import { ROTAS } from "../utilitarios/rotas";
import {
  validarURL,
  validarHeading,
  limparLocalStorage,
} from "../utilitarios/testHelpers";

test.describe("Proteção de Rotas e Navegação", () => {
  test("CT-FE-005 - Proteção de Rotas sem Login", async ({ page }) => {
    await page.goto(ROTAS.login);

    await limparLocalStorage(page);

    await page.goto(ROTAS.dashboard);

    await validarURL(page, ROTAS.login);
  });

  test("CT-FE-006 - Menu Dinâmico - Aluno", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const protecaoRotasPage = new ProtecaoRotasPage(page);

    await loginPage.loginComoAluno();

    await validarURL(page, ROTAS.dashboard);

    await protecaoRotasPage.validarMenuItens(MENU_ALUNO);

    const rotasAluno = {
      Livros: ROTAS.livros,
      Favoritos: ROTAS.favoritos,
      "Meus Arrendamentos": ROTAS.arrendamentos,
      Compras: ROTAS.compras,
      "Minhas Compras": ROTAS.minhasCompras,
    };

    for (const item of MENU_ALUNO.filter((i) => i !== "Dashboard")) {
      await protecaoRotasPage.clicarMenu(item);
      await validarURL(page, rotasAluno[item]);
      await page.goto(ROTAS.dashboard);
    }
  });

  test("CT-FE-007 - Menu Dinâmico - Admin", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const protecaoRotasPage = new ProtecaoRotasPage(page);

    await loginPage.loginComoAdmin();

    await validarURL(page, ROTAS.dashboard);

    await protecaoRotasPage.validarMenuItens(MENU_ADMIN);

    await protecaoRotasPage.clicarMenu("Usuários (Admin)");
    await validarURL(page, ROTAS.adminUsuarios);

    await validarHeading(page, "Administração de Usuários");
  });
});
