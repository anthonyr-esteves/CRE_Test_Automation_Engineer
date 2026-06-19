const { test, expect } = require("@playwright/test");

test.describe("Favoritos", () => {
  test("CT-API-014 - Adicionar Livro aos Favoritos", async ({ request }) => {
    // Dados de entrada conforme PDF
    const payload = {
      usuarioId: 1,
      livroId: 1,
    };

    // Chamada POST /favoritos
    const response = await request.post("/favoritos", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(201);

    const body = await response.json();

    // Validação da mensagem esperada
    expect(body).toHaveProperty("mensagem", "Livro adicionado aos favoritos");
  });

  test("CT-API-015 - Adicionar Livro Já Favoritado (Falha)", async ({
    request,
  }) => {
    // Dados de entrada conforme PDF (mesmos dados do teste anterior)
    const payload = {
      usuarioId: 1,
      livroId: 1,
    };

    // Chamada POST /favoritos (tentativa de duplicar favorito)
    const response = await request.post("/favoritos", {
      data: payload,
    });

    // Status esperado para duplicidade
    expect(response.status()).toBe(400);

    const body = await response.json();

    // Validação da mensagem esperada (PDF não define texto exato)
    expect(body).toHaveProperty("mensagem");
    expect(body.mensagem.toLowerCase()).toContain("favorito");
  });

  test("CT-API-016 - Listar Favoritos de Usuário", async ({ request }) => {
    // Chamada GET /favoritos/1
    const response = await request.get("/favoritos/1");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Corpo deve ser um array
    expect(Array.isArray(body)).toBe(true);

    // Validar estrutura básica de cada livro favoritado
    for (const livro of body) {
      expect(livro).toHaveProperty("id");
      expect(livro).toHaveProperty("nome");
      expect(livro).toHaveProperty("autor");
      expect(livro).toHaveProperty("paginas");

      // paginas deve ser número positivo
      expect(typeof livro.paginas).toBe("number");
      expect(livro.paginas).toBeGreaterThan(0);
    }
  });

  test("CT-API-017 - Remover Livro dos Favoritos", async ({ request }) => {
    // Dados de entrada conforme PDF
    const payload = {
      usuarioId: 1,
      livroId: 1,
    };

    // Chamada DELETE /favoritos
    const response = await request.delete("/favoritos", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validação da mensagem esperada
    expect(body).toHaveProperty("mensagem", "Livro removido dos favoritos");
  });
});
