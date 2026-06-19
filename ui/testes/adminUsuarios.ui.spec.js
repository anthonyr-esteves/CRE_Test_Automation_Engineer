import { test, expect } from "@playwright/test";
import LoginPage from "../paginas/login.page";

test.describe("Admin Usuários", () => {
  test("CT-FE-020 - Acessar Tela de Usuários (Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // PARTE A — Aceder à página como admin e validar conteúdo
    await loginPage.loginComoAdmin();

    // Clicar no menu "Usuários (Admin)"
    await page.getByRole("link", { name: "Usuários (Admin)" }).click();

    // Validar URL
    await expect(page).toHaveURL("/admin-usuarios.html");

    // Validar heading da página
    await expect(
      page.getByRole("heading", { name: "👨‍💻 Administração de Usuários" }),
    ).toBeVisible();

    // Validar que área admin está visível
    await expect(page.locator("#area-admin-conteudo")).toBeVisible();
    await expect(page.locator("#area-admin-bloqueio")).toBeHidden();

    // PARTE B — Não-admin é bloqueado ao tentar aceder diretamente
    // Logout admin
    await page.getByRole("button", { name: "Sair" }).click();

    // Login como aluno (mesmo flow para o user 'funcionário')
    await loginPage.loginComoAluno();

    // Tentar aceder diretamente à página admin
    await page.goto("/admin-usuarios.html");

    // Validar mensagem de bloqueio
    await expect(page.locator("#area-admin-bloqueio")).toBeVisible();
    await expect(page.locator("#area-admin-bloqueio")).toContainText(
      "Somente administradores podem acessar esta página.",
    );

    // Validar que conteúdo admin NÃO aparece
    await expect(page.locator("#area-admin-conteudo")).toBeHidden();
  });

  test("CT-FE-021 - Criar Funcionário pela UI Admin", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login como admin
    await loginPage.loginComoAdmin();

    // Aceder à página de administração de usuários
    await page.getByRole("link", { name: "Usuários (Admin)" }).click();
    await expect(page).toHaveURL("/admin-usuarios.html");

    // Criar novo funcionário (sem validar tabela)

    const emailUnico = `novo.func${Date.now()}@teste.com`;

    await page.getByRole("textbox", { name: "Nome:" }).fill("Teste Func");
    await page.getByRole("textbox", { name: "Email:" }).fill(emailUnico);
    await page.getByRole("textbox", { name: "Senha:" }).fill("123456");
    await page.getByRole("combobox", { name: "Tipo:" }).selectOption("2");

    // Validar apenas o alert
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Usuário criado com sucesso!");
      dialog.accept();
    });

    await page.getByRole("button", { name: "Criar Usuário" }).click();
  });

  test.skip("CT-FE-022 - Editar Usuário na Tabela", async ({ page }) => {
    // Nota: Não consegui validar este teste pela tabela.
    // A tabela de utilizadores só carrega quando o servidor backend está ativo.
    // Durante os testes UI, o backend não está a correr, por isso a tabela fica sempre vazia.
    // Sem tabela, não é possível editar um utilizador pela interface.
    // Mantido apenas para referência no módulo.
  });

  test.skip("CT-FE-023 - Excluir Usuário", async ({ page }) => {
    // Nota: Não consegui validar este teste pela tabela.
    // A lista de utilizadores depende de uma chamada ao backend (/usuarios).
    // Como o backend não está ativo durante os testes UI, a tabela não carrega.
    // Sem tabela, não é possível eliminar um utilizador pela interface.
    // Mantido apenas para referência no módulo.
  });
});
