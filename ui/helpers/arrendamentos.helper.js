import { expect } from "@playwright/test";

import LoginPage from "../paginas/login.page";
import ArrendamentosPage from "../paginas/arrendamentos.page";
import AprovacoesPage from "../paginas/aprovacoes.page";

import { MENSAGENS_ARRENDAMENTOS } from "../utilitarios/mensagens";

// Cria um arrendamento pendente
export async function criarArrendamentoPendente(page) {
  const loginPage = new LoginPage(page);
  const arrPage = new ArrendamentosPage(page);

  // Login como aluno (aluno é quem solicita arrendamentos)
  await loginPage.loginComoAluno();

  // Abrir página de arrendamentos
  await arrPage.navegar();

  // Preencher dados válidos para criar o arrendamento
  await arrPage.selecionarLivroPorIndice(1);
  await arrPage.preencherDatas("2025-12-29", "2025-12-30");

  // Validar o alert de sucesso
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(MENSAGENS_ARRENDAMENTOS.sucessoSolicitar);
    dialog.accept();
  });

  // Submeter o arrendamento
  await arrPage.solicitar();

  // Logout para permitir login como funcionário no teste seguinte
  await loginPage.logout();
}

// Aprova o último arrendamento pendente (fluxo do funcionário)
export async function aprovarArrendamento(page) {
  const aprovPage = new AprovacoesPage(page);

  // Abrir página de aprovações
  await aprovPage.navegar();

  // Obter o último card pendente
  const card = await aprovPage.obterUltimoCard();

  // Confirmar aprovação (primeiro diálogo)
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain(
      MENSAGENS_ARRENDAMENTOS.confirmarAprovacao,
    );
    dialog.accept();
  });

  // Clicar no botão "Aprovar"
  await aprovPage.aprovarUltimoArrendamento();

  // Validar sucesso da aprovação (segundo diálogo)
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(MENSAGENS_ARRENDAMENTOS.sucessoAprovar);
    dialog.accept();
  });

  return card; // devolve o card para validações no spec
}
