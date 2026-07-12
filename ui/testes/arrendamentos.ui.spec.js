import { test } from "@playwright/test";

import LoginPage from "../paginas/login.page";
import ArrendamentosPage from "../paginas/arrendamentos.page";
import AprovacoesPage from "../paginas/aprovacoes.page";

import {
  criarArrendamentoPendente,
  aprovarArrendamento,
} from "../helpers/arrendamentos.helper";
import {
  validarArrendamentoPendente,
  validarArrendamentoAprovado,
} from "../helpers/arrendamentos.validacao";

test.describe("Arrendamentos", () => {
  test("CT-FE-016 - Solicitar Novo Arrendamento", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const arrPage = new ArrendamentosPage(page);

    await loginPage.loginComoAluno();

    const card = await (async () => {
      await arrPage.navegar();
      await arrPage.selecionarLivroPorIndice(1);
      await arrPage.preencherDatas("2025-12-29", "2025-12-30");

      page.once("dialog", (dialog) => {
        dialog.accept();
      });

      await arrPage.solicitar();
      return await arrPage.obterUltimoCard();
    })();

    await validarArrendamentoPendente(card);
  });

  test("CT-FE-017 - Aprovar Arrendamento", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await criarArrendamentoPendente(page);

    await loginPage.loginComoFuncionario();

    const card = await aprovarArrendamento(page);

    await validarArrendamentoAprovado(card);
  });
});
