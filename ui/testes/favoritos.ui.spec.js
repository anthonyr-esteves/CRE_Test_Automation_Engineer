import { test, expect } from "@playwright/test";

import LoginPage from "../paginas/login.page";
import LivrosPage from "../paginas/livros.page";
import FavoritosPage from "../paginas/favoritos.page";

import {
  criarLivroUnico,
  preencherFormularioLivro,
} from "../helpers/livros.helper";
import {
  adicionarAosFavoritos,
  removerDosFavoritos,
} from "../helpers/favoritos.helper";
import {
  validarFavoritoExiste,
  validarFavoritoNaoExiste,
} from "../helpers/favoritos.validacao";

import { LIVRO_PADRAO } from "../helpers/livros.dados";
import { ROTAS } from "../utilitarios/rotas";

test.describe("Favoritos", () => {
  test("CT-FE-013 - Adicionar Livro aos Favoritos pela UI", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);
    const favoritosPage = new FavoritosPage(page);

    await loginPage.loginComoAdmin();
    await page.goto(ROTAS.livros);

    const nomeUnico = await criarLivroUnico(
      page,
      LIVRO_PADRAO,
      preencherFormularioLivro,
    );

    await livrosPage.abrirLivroPorNome(nomeUnico);
    await adicionarAosFavoritos(page);

    await favoritosPage.navegar();
    await validarFavoritoExiste(page, nomeUnico);
  });

  test("CT-FE-014 - Remover Livro dos Favoritos", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);
    const favoritosPage = new FavoritosPage(page);

    await loginPage.loginComoAdmin();
    await page.goto(ROTAS.livros);

    const nomeUnico = await criarLivroUnico(
      page,
      LIVRO_PADRAO,
      preencherFormularioLivro,
    );

    await livrosPage.abrirLivroPorNome(nomeUnico);
    await adicionarAosFavoritos(page);
    await removerDosFavoritos(page);

    await favoritosPage.navegar();
    await validarFavoritoNaoExiste(page, nomeUnico);
  });

  test("CT-FE-015 - Listar Livros Favoritos", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const livrosPage = new LivrosPage(page);
    const favoritosPage = new FavoritosPage(page);

    await loginPage.loginComoAdmin();
    await page.goto(ROTAS.livros);

    const nomeUnico = await criarLivroUnico(
      page,
      LIVRO_PADRAO,
      preencherFormularioLivro,
    );

    await livrosPage.abrirLivroPorNome(nomeUnico);
    await adicionarAosFavoritos(page);

    await favoritosPage.navegar();
    await validarFavoritoExiste(page, nomeUnico);
  });
});
