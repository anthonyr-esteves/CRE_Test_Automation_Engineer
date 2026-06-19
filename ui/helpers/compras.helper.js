import LoginPage from "../paginas/login.page";

export async function criarCompraPendente(page) {
  const loginPage = new LoginPage(page);

  // Login como aluno
  await page.goto("/login.html");
  await loginPage.preencherCredenciais("aluna@teste.com", "123456");

  page.once("dialog", (dialog) => dialog.accept());
  await loginPage.clicarEntrar();
  await page.waitForURL("/dashboard.html");

  // Criar compra
  await page.goto("/compras.html");
  const primeiroCard = page.locator(".book-card").first();

  page.once("dialog", (dialog) => dialog.accept());
  await primeiroCard.getByRole("button", { name: "Comprar" }).click();

  // Obter ID da compra
  await page.goto("/minhas-compras.html");
  const ultimoCard = page.locator(".book-card").last();

  const texto = await ultimoCard.locator("h3").innerText();
  const idCompra = texto.replace("Compra #", "").trim();

  // Logout aluno
  await page.goto("/dashboard.html");
  await page.getByRole("button", { name: "Sair" }).click();

  return idCompra;
}
