import { test, expect } from "@playwright/test";

import LoginPage from "../paginas/login.page";
import AdminUsuariosPage from "../paginas/adminUsuarios.page";

test.describe("Admin Usuários", () => {
  test("CT-FE-020 - Acessar Tela de Usuários (Admin)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPage = new AdminUsuariosPage(page);

    await loginPage.loginComoAdmin();
    await adminPage.abrirViaMenu();

    await expect(page).toHaveURL("/admin-usuarios.html");
    await expect(adminPage.heading).toBeVisible();
    await expect(adminPage.areaConteudo).toBeVisible();
    await expect(adminPage.areaBloqueio).toBeHidden();

    await loginPage.logout();
    await loginPage.loginComoAluno();

    await adminPage.navegar();

    await expect(adminPage.areaBloqueio).toBeVisible();
    await expect(adminPage.areaBloqueio).toContainText(
      "Somente administradores podem acessar esta página.",
    );
    await expect(adminPage.areaConteudo).toBeHidden();
  });

  test("CT-FE-021 - Criar Funcionário pela UI Admin", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPage = new AdminUsuariosPage(page);

    await loginPage.loginComoAdmin();
    await adminPage.abrirViaMenu();

    const emailUnico = `novo.func${Date.now()}@teste.com`;

    await adminPage.preencherFormulario(
      "Teste Func",
      emailUnico,
      "123456",
      "2",
    );

    // Validar apenas o alert (tabela não carrega sem backend)
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Usuário criado com sucesso!");
      dialog.accept();
    });

    await adminPage.criarUsuario();
  });

  test.skip("CT-FE-022 - Editar Usuário na Tabela", async () => {
    // Tabela depende do backend (/usuarios)
    // Sem backend → tabela vazia → impossível editar
  });

  test.skip("CT-FE-023 - Excluir Usuário", async () => {
    // Tabela depende do backend (/usuarios)
    // Sem backend → tabela vazia → impossível excluir
  });
});
