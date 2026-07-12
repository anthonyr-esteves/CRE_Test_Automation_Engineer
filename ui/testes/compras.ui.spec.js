import { test } from "@playwright/test";
import { expect } from "@playwright/test";

import LoginPage from "../paginas/login.page";
import ComprasPage from "../paginas/compras.page";
import ComprasAdminPage from "../paginas/comprasAdmin.page";

import { criarCompraPendente } from "../helpers/compras.helper";
import {
  validarCompraPendente,
  validarCompraAprovada,
} from "../helpers/compras.validacao";

test.describe("Compras", () => {
  test("CT-FE-018 - Registrar Compra (Aluno)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const comprasPage = new ComprasPage(page);

    await loginPage.loginComoAluno();

    await comprasPage.navegar();
    const card = await comprasPage.obterPrimeiroCard();

    await comprasPage.comprar(card);

    await page.goto("/minhas-compras.html");
    const ultimoCard = page.locator(".book-card").last();
    await validarCompraPendente(ultimoCard);
  });

  test("CT-FE-019 - Aprovar Compra (Funcionário/Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const comprasAdminPage = new ComprasAdminPage(page);

    const idCompra = await criarCompraPendente(page);

    await loginPage.loginComoFuncionario();
    await comprasAdminPage.navegar();

    // Aceitar o confirm() ANTES do clique
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("Confirmar alteração da compra");
      dialog.accept();
    });

    const card = await comprasAdminPage.aprovarCompraPorId(idCompra);

    await validarCompraAprovada(card);
  });
});
