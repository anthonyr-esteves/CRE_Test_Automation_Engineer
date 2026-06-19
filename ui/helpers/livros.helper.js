import { expect } from "@playwright/test";

export async function preencherFormularioLivro(page, dados) {
  await page.getByRole("textbox", { name: "Nome do Livro:" }).fill(dados.nome);
  await page.getByRole("textbox", { name: "Autor:" }).fill(dados.autor);
  await page
    .getByRole("spinbutton", { name: "Número de Páginas:" })
    .fill(dados.paginas);
  await page.getByRole("textbox", { name: "Descrição:" }).fill(dados.descricao);
  await page
    .getByRole("textbox", { name: "URL da Imagem:" })
    .fill(dados.imagem);
  await page.getByRole("spinbutton", { name: "Estoque:" }).fill(dados.estoque);
  await page.getByRole("spinbutton", { name: "Preço (€):" }).fill(dados.preco);
}

export async function validarFormularioLimpo(page) {
  await expect(
    page.getByRole("textbox", { name: "Nome do Livro:" }),
  ).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Autor:" })).toHaveValue("");
  await expect(
    page.getByRole("spinbutton", { name: "Número de Páginas:" }),
  ).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Descrição:" })).toHaveValue(
    "",
  );
  await expect(
    page.getByRole("textbox", { name: "URL da Imagem:" }),
  ).toHaveValue("");

  // Valores default definidos no HTML
  await expect(page.getByRole("spinbutton", { name: "Estoque:" })).toHaveValue(
    "1",
  );
  await expect(
    page.getByRole("spinbutton", { name: "Preço (€):" }),
  ).toHaveValue("0");
}

export async function criarLivroUnico(
  page,
  LIVRO_PADRAO,
  preencherFormularioLivro,
) {
  const nomeUnico = `${LIVRO_PADRAO.nome} - ${Date.now()}`;

  await page.goto("/livros.html");

  await preencherFormularioLivro(page, {
    ...LIVRO_PADRAO,
    nome: nomeUnico,
  });

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Adicionar Livro" }).click();

  return nomeUnico;
}
