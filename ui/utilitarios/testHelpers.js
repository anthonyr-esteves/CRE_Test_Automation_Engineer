import { expect } from "@playwright/test";

export async function validarURL(page, url) {
  await expect(page).toHaveURL(url);
}

export async function validarHeading(page, texto) {
  await expect(page.getByRole("heading", { name: texto })).toBeVisible();
}

export async function limparLocalStorage(page) {
  await page.evaluate(() => localStorage.clear());
}

export async function obterUsuarioLocalStorage(page) {
  return await page.evaluate(() => JSON.parse(localStorage.getItem("usuario")));
}
