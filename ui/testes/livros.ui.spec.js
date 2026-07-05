import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";
import LivrosPage from "../paginas/livros.page";

import {
  preencherFormularioLivro,
  validarFormularioLimpo,
} from "../helpers/livros.helper";

import { validarDetalhesLivro } from "../helpers/livros.validacao";
import { LIVRO_PADRAO } from "../helpers/livros.dados";
import { ROTAS } from "../utilitarios/rotas";

test.describe("Livros", () => {
  test("CT-FE-010A - Cadastro de Livro via UI (Funcionário)", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);

    await loginPage.loginComoFuncionario();
    await page.goto(ROTAS.livros);

    await livrosPage.preencherFormulario(LIVRO_PADRAO);
    await livrosPage.submeterLivro();

    await validarFormularioLimpo(page);
    await livrosPage.validarCard(LIVRO_PADRAO.nome);
  });

  test("CT-FE-010B - Cadastro de Livro via UI (Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);

    await loginPage.loginComoAdmin();
    await page.goto(ROTAS.livros);

    await livrosPage.preencherFormulario(LIVRO_PADRAO);
    await livrosPage.submeterLivro();

    await validarFormularioLimpo(page);
    await livrosPage.validarCard(LIVRO_PADRAO.nome);
  });

  test("CT-FE-011 - Validação de Campos Obrigatórios no Livro", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);

    await loginPage.loginComoFuncionario();
    await page.goto(ROTAS.livros);

    // Submeter vazio
    await livrosPage.botaoAdicionar.click();

    await expect(livrosPage.nome).toHaveValue("");
    await expect(livrosPage.autor).toHaveValue("");
    await expect(livrosPage.paginas).toHaveValue("");

    // Preencher apenas um campo obrigatório
    await livrosPage.nome.fill("Teste Parcial");
    await livrosPage.botaoAdicionar.click();

    await expect(livrosPage.autor).toHaveValue("");
    await expect(livrosPage.paginas).toHaveValue("");
  });

  test("CT-FE-012 - Visualizar Detalhes de Livro", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);

    await loginPage.loginComoFuncionario();
    await page.goto(ROTAS.livros);

    await livrosPage.abrirPrimeiroLivro();

    await expect(page).toHaveURL(/detalhes\.html\?id=\d+/);

    await validarDetalhesLivro(page);
  });
});
