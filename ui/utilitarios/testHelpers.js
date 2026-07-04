import { expect } from "@playwright/test";

export async function validarURL(page, url) {
  await expect(page).toHaveURL(url);
}

export async function obterUsuarioLocalStorage(page) {
  return await page.evaluate(() => JSON.parse(localStorage.getItem("usuario")));
}
