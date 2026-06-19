import { test, expect } from "@playwright/test";
import RegistroPage from "../paginas/registro.page";
import gerarEmailUnico from "../utilitarios/geradorEmail";
import LoginPage from "../paginas/login.page";

test.describe("Registro e Login", () => {
  test("CT-FE-001 - Fluxo Completo de Registro (Aluno)", async ({ page }) => {
    const registroPage = new RegistroPage(page);
    const email = gerarEmailUnico();

    // Acessar página de registro
    await page.goto("/registro.html");

    // Preencher formulário
    await registroPage.preencherFormulario(
      "Carlos Oliveira",
      email,
      "senha123",
      "senha123",
    );

    // Listener do alert
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe(
        "Cadastro realizado com sucesso! Faça login.",
      );
      dialog.accept();
    });

    // Clicar em Registrar
    await registroPage.clicarRegistrar();

    // Validar redirecionamento
    await expect(page).toHaveURL("/login.html");

    // Validar que estamos na página de login
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    // Validar que os campos de login estão vazios
    await expect(page.getByRole("textbox", { name: "Email:" })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: "Senha:" })).toHaveValue("");
  });

  test("CT-FE-002 - Validação de Senhas Não Correspondentes", async ({
    page,
  }) => {
    const registroPage = new RegistroPage(page);
    const email = gerarEmailUnico();

    // Acessar página de registro
    await page.goto("/registro.html");

    // Preencher formulário com senhas diferentes
    await registroPage.preencherFormulario(
      "Carlos Oliveira",
      email,
      "senha123",
      "senhaErrada",
    );

    // Listener do alert
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("As senhas não conferem.");
      dialog.accept();
    });

    // Clicar em Registrar
    await registroPage.clicarRegistrar();

    // Validar que NÃO houve redirecionamento
    await expect(page).toHaveURL("/registro.html");
  });

  test("CT-FE-003 - Login com Sucesso (Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como Admin
    await loginPage.loginComoAdmin();

    // Validar mensagem de boas-vindas do Admin
    await expect(page.locator("#msg-tipo")).toHaveText(
      "Olá, Admin Master! Você está logado como ADMINISTRADOR.",
    );

    // Validar tipo de utilizador no localStorage
    const usuario = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("usuario")),
    );

    expect(usuario.tipo).toBe(3);
  });

  test("CT-FE-004 - Login Inválido (Credenciais Erradas)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Acessar página de login
    await page.goto("/login.html");

    // Preencher credenciais inválidas
    await loginPage.preencherCredenciais("admin@biblioteca.com", "errada");

    // Listener do alert
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Email ou senha incorretos");
      dialog.accept();
    });

    // Clicar em Entrar
    await loginPage.clicarEntrar();

    // Validar que NÃO houve redirecionamento
    await expect(page).toHaveURL("/login.html");

    // Validar que NÃO existe usuário no localStorage
    const usuario = await page.evaluate(() => localStorage.getItem("usuario"));
    expect(usuario).toBeNull();
  });
});
