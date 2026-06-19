const { test, expect } = require("@playwright/test");

test.describe("Admin Usuários", () => {
  test("CT-API-029 - Listar Usuários", async ({ request }) => {
    // Listar todos os usuários
    const response = await request.get("/usuarios");

    // Status esperado
    expect(response.status()).toBe(200);

    const usuarios = await response.json();

    // Validar que é um array
    expect(Array.isArray(usuarios)).toBe(true);

    // Validar que nenhum usuário contém o campo 'senha'
    for (const usuario of usuarios) {
      expect(usuario).not.toHaveProperty("senha");
    }
  });

  test("CT-API-030 - Atualizar Usuário", async ({ request }) => {
    // Dados de atualização conforme PDF
    const payload = {
      nome: "João Funcionário Atualizado",
      email: "func.atualizado@biblio.com",
      tipo: 2,
    };

    // Atualizar usuário ID 2
    const response = await request.put("/usuarios/2", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(200);

    const usuario = await response.json();

    // Validar campos atualizados
    expect(usuario).toHaveProperty("nome", payload.nome);
    expect(usuario).toHaveProperty("email", payload.email);
    expect(usuario).toHaveProperty("tipo", payload.tipo);

    // Segurança: usuário não deve expor senha
    expect(usuario).not.toHaveProperty("senha");
  });

  test("CT-API-031 - Excluir Usuário (Não-Admin Principal)", async ({
    request,
  }) => {
    // Excluir usuário ID 3
    const response = await request.delete("/usuarios/3");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Mensagem esperada conforme PDF
    expect(body).toHaveProperty("mensagem", "Usuário deletado com sucesso");
  });

  test("CT-API-032 - Tentar Excluir Admin Principal (Falha)", async ({
    request,
  }) => {
    // Tentar excluir o admin principal (ID 1)
    const response = await request.delete("/usuarios/1");

    // Status esperado
    expect(response.status()).toBe(403);

    const body = await response.json();

    // A mensagem pode variar, mas deve indicar claramente que o admin principal não pode ser deletado
    expect(body.mensagem.toLowerCase()).toContain("não pode");
    expect(body.mensagem.toLowerCase()).toContain("admin");
  });
});
