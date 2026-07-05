import { expect } from "@playwright/test";

// Valida toda a estrutura da página de detalhes de um livro.
export async function validarDetalhesLivro(page) {
  const detalhes = page.locator("#livro-detalhes");

  // Container principal
  await expect(detalhes).toBeVisible();

  // Imagem do livro
  await expect(detalhes.locator(".book-image img")).toBeVisible();

  // Título
  await expect(detalhes.locator(".book-info h2")).toBeVisible();

  // Campos informativos
  await expect(detalhes.getByText("Autor:", { exact: false })).toBeVisible();
  await expect(detalhes.getByText("Páginas:", { exact: false })).toBeVisible();
  await expect(
    detalhes.getByText("Descrição:", { exact: false }),
  ).toBeVisible();
  await expect(
    detalhes.getByText("Data de Cadastro:", { exact: false }),
  ).toBeVisible();

  // Botões de ação
  await expect(
    detalhes.getByRole("button", { name: /favoritos/i }),
  ).toBeVisible(); // Adicionar ou Remover

  await expect(
    detalhes.getByRole("button", { name: /deletar livro/i }),
  ).toBeVisible();

  await expect(detalhes.getByRole("button", { name: /voltar/i })).toBeVisible();
}
