import { test, expect } from "@playwright/test";

import RegistroPage from "../paginas/registro.page";
import LoginPage from "../paginas/login.page";

import gerarEmailUnico from "../utilitarios/geradorEmail";
import { ROTAS } from "../utilitarios/rotas";
import { MENSAGENS_LOGIN, MENSAGENS_REGISTRO } from "../utilitarios/mensagens";
import {
  validarURL,
  obterUsuarioLocalStorage,
} from "../utilitarios/testHelpers";
import { DADOS_TESTE } from "../utilitarios/dadosTeste";
import { CREDENCIAIS_INVALIDAS } from "../utilitarios/dadosInvalidos";

test.describe("Registro e Login", () => {
  test("CT-FE-001 - Fluxo Completo de Registro (Aluno)", async ({ page }) => {
    const registroPage = new RegistroPage(page);
    const loginPage = new LoginPage(page);
    const email = gerarEmailUnico();

    await page.goto(ROTAS.registro);
    await registroPage.validarPaginaRegistro();

    await registroPage.preencherFormulario(
      DADOS_TESTE.nome,
      email,
      DADOS_TESTE.senhaValida,
      DADOS_TESTE.senhaValida,
    );

    registroPage.validarDialog(MENSAGENS_REGISTRO.sucesso);

    await registroPage.clicarRegistrar();
    await validarURL(page, ROTAS.login);

    await loginPage.validarPaginaLogin();
    await loginPage.validarCamposVazios();
  });

  test("CT-FE-002 - Validação de Senhas Não Correspondentes", async ({
    page,
  }) => {
    const registroPage = new RegistroPage(page);
    const email = gerarEmailUnico();

    await page.goto(ROTAS.registro);
    await registroPage.validarPaginaRegistro();

    await registroPage.preencherFormulario(
      DADOS_TESTE.nome,
      email,
      DADOS_TESTE.senhaValida,
      DADOS_TESTE.senhaInvalida,
    );

    registroPage.validarDialog(MENSAGENS_REGISTRO.senhasDiferentes);

    await registroPage.clicarRegistrar();
    await validarURL(page, ROTAS.registro);
  });

  test("CT-FE-003 - Login com Sucesso (Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginComoAdmin();

    await expect(page.locator("#msg-tipo")).toHaveText(
      "Olá, Admin Master! Você está logado como ADMINISTRADOR.",
    );

    const usuario = await obterUsuarioLocalStorage(page);
    expect(usuario.tipo).toBe(3);
  });

  test("CT-FE-004 - Login Inválido (Credenciais Erradas)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(ROTAS.login);
    await loginPage.validarPaginaLogin();

    await loginPage.preencherCredenciais(
      CREDENCIAIS_INVALIDAS.adminSenhaErrada.email,
      CREDENCIAIS_INVALIDAS.adminSenhaErrada.senha,
    );

    loginPage.validarDialog(MENSAGENS_LOGIN.erroCredenciais);

    await loginPage.clicarEntrar();
    await validarURL(page, ROTAS.login);

    const usuario = await obterUsuarioLocalStorage(page);
    expect(usuario).toBeNull();
  });
});
