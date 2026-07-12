import { expect } from "@playwright/test";
import FavoritosPage from "../paginas/favoritos.page";

// Valida que a página exibe a mensagem de "sem favoritos"
export async function validarMensagemVazio(page) {
  const favoritosPage = new FavoritosPage(page);
  await expect(favoritosPage.mensagemVazio).toBeVisible();
}

// Valida que a página contém exatamente N cards de livros favoritos
export async function validarQuantidadeFavoritos(page, quantidade) {
  const favoritosPage = new FavoritosPage(page);
  await expect(favoritosPage.cards).toHaveCount(quantidade);
}

// Valida que um livro específico aparece na lista de favoritos
export async function validarFavoritoExiste(page, nome) {
  const favoritosPage = new FavoritosPage(page);
  await favoritosPage.validarFavoritoExiste(nome);
}

// Valida que um livro específico NÃO aparece na lista de favoritos
export async function validarFavoritoNaoExiste(page, nome) {
  const favoritosPage = new FavoritosPage(page);
  await favoritosPage.validarFavoritoNaoExiste(nome);
}
