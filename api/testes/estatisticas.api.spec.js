const { test, expect } = require("@playwright/test");

test.describe("Estatísticas", () => {
  test("CT-API-013 - Obter Estatísticas da Biblioteca", async ({ request }) => {
    // Chamada GET /estatisticas
    const response = await request.get("/estatisticas");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validar campos obrigatórios
    expect(body).toHaveProperty("totalLivros");
    expect(body).toHaveProperty("totalPaginas");
    expect(body).toHaveProperty("totalUsuarios");
    expect(body).toHaveProperty("usuariosPorTipo");
    expect(body).toHaveProperty("livrosDisponiveis");
    expect(body).toHaveProperty("arrendamentosPendentes");
    expect(body).toHaveProperty("comprasPendentes");

    // Validar que todos os valores numéricos são inteiros >= 0
    const camposNumericos = [
      "totalLivros",
      "totalPaginas",
      "totalUsuarios",
      "livrosDisponiveis",
      "arrendamentosPendentes",
      "comprasPendentes",
    ];

    for (const campo of camposNumericos) {
      expect(typeof body[campo]).toBe("number");
      expect(body[campo]).toBeGreaterThanOrEqual(0);
    }

    // Validar estrutura de usuariosPorTipo
    expect(body.usuariosPorTipo).toHaveProperty("alunos");
    expect(body.usuariosPorTipo).toHaveProperty("funcionarios");
    expect(body.usuariosPorTipo).toHaveProperty("admins");

    // Validar que cada tipo é inteiro >= 0
    const tipos = ["alunos", "funcionarios", "admins"];
    for (const tipo of tipos) {
      expect(typeof body.usuariosPorTipo[tipo]).toBe("number");
      expect(body.usuariosPorTipo[tipo]).toBeGreaterThanOrEqual(0);
    }

    // Validar soma dos tipos de usuários
    const somaTipos =
      body.usuariosPorTipo.alunos +
      body.usuariosPorTipo.funcionarios +
      body.usuariosPorTipo.admins;

    expect(somaTipos).toBe(body.totalUsuarios);
  });
});
