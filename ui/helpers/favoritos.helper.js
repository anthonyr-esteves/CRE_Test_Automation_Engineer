import { expect } from "@playwright/test";
import FavoritosPage from "../paginas/favoritos.page";
import { MENSAGENS_FAVORITOS } from "../utilitarios/mensagens";

// Função para adicionar um livro aos favoritos
export async function adicionarAosFavoritos(page) {
  const favoritosPage = new FavoritosPage(page);

  // Captura o dialog exibido pelo navegador
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(MENSAGENS_FAVORITOS.sucessoAdicionar);
    dialog.accept();
  });

  await favoritosPage.adicionar();
  await favoritosPage.validarAdicionado();
}

// Função para remover um livro dos favoritos
export async function removerDosFavoritos(page) {
  const favoritosPage = new FavoritosPage(page);

  // Captura o dialog exibido pelo navegador
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(MENSAGENS_FAVORITOS.sucessoRemover);
    dialog.accept();
  });

  await favoritosPage.remover();
  await favoritosPage.validarRemovido();
}

// Valida que o livro aparece na lista de favoritos
export async function validarFavoritoExiste(page, nome) {
  const favoritosPage = new FavoritosPage(page);
  await favoritosPage.validarFavoritoExiste(nome);
}

// Valida que o livro NÃO aparece na lista de favoritos
export async function validarFavoritoNaoExiste(page, nome) {
  const favoritosPage = new FavoritosPage(page);
  await favoritosPage.validarFavoritoNaoExiste(nome);
}
