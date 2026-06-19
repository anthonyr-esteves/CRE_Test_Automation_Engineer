import LoginPage from "../paginas/login.page";

export async function criarArrendamentoPendente(page) {
  const loginPage = new LoginPage(page);

  await page.goto("/login.html");
  await loginPage.preencherCredenciais("aluna@teste.com", "123456");

  page.once("dialog", (dialog) => dialog.accept());
  await loginPage.clicarEntrar();

  await page.goto("/arrendamentos.html");

  await page.getByLabel("Livro:").selectOption({ index: 1 });
  await page.getByLabel("Data Início:").fill("2025-12-29");
  await page.getByLabel("Data Fim:").fill("2025-12-30");

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Solicitar Arrendamento" }).click();

  await page.getByRole("button", { name: "Sair" }).click();
}
