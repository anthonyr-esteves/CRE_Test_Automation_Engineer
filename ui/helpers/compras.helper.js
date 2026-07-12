import { expect } from "@playwright/test";

import LoginPage from "../paginas/login.page";
import ComprasPage from "../paginas/compras.page";
import { ROTAS } from "../utilitarios/rotas";
import { MENSAGENS_COMPRAS } from "../utilitarios/mensagens";

// Cria uma compra pendente como aluno e devolve o ID
export async function criarCompraPendente(page) {
  const loginPage = new LoginPage(page);
  const comprasPage = new ComprasPage(page);

  // Login como aluno
  await loginPage.loginComoAluno();

  // Navegar para compras e selecionar primeiro livro
  await comprasPage.navegar();
  const primeiroCard = await comprasPage.obterPrimeiroCard();

  // Alert de sucesso ao comprar
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(MENSAGENS_COMPRAS.sucessoRegistrar);
    dialog.accept();
  });

  await comprasPage.comprar(primeiroCard);

  // Obter ID da compra em Minhas Compras
  await page.goto(ROTAS.minhasCompras);
  const ultimoCard = page.locator(".book-card").last();

  const texto = await ultimoCard.locator("h3").innerText();
  const idCompra = texto.replace("Compra #", "").trim();

  // Logout aluno
  await loginPage.logout();

  return idCompra;
}
