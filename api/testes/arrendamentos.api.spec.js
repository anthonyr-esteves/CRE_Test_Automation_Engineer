const { test, expect } = require("@playwright/test");

// Funções simples e reutilizáveis
async function criarLivro(request, nome, estoque = 5) {
  const response = await request.post("/livros", {
    data: {
      nome,
      autor: "Sistema de Testes",
      paginas: 200,
      descricao: `Livro exclusivo para ${nome}`,
      imagemUrl: "https://exemplo.com/livro.jpg",
      estoque,
      preco: 10,
    },
  });

  expect(response.status()).toBe(201);
  return await response.json();
}

async function criarArrendamento(request, livroId) {
  const payload = {
    usuarioId: 3,
    livroId,
    dataInicio: "2025-12-20",
    dataFim: "2025-12-27",
  };

  const response = await request.post("/arrendamentos", { data: payload });
  expect(response.status()).toBe(201);

  return await response.json();
}

test.describe("Arrendamentos", () => {
  test("CT-API-018 - Criar Arrendamento Válido", async ({ request }) => {
    const livro = await criarLivro(request, "Livro CT-018");

    const arrendamento = await criarArrendamento(request, livro.id);

    expect(arrendamento).toHaveProperty("id");
    expect(arrendamento).toHaveProperty("usuarioId", 3);
    expect(arrendamento).toHaveProperty("livroId", livro.id);
    expect(arrendamento).toHaveProperty("status", "PENDENTE");
    expect(/\d{4}-\d{2}-\d{2}T/.test(arrendamento.criadoEm)).toBe(true);
  });

  test("CT-API-019 - Criar Arrendamento sem Estoque (Falha)", async ({
    request,
  }) => {
    const livro = await criarLivro(request, "Livro CT-019", 0);

    const payload = {
      usuarioId: 3,
      livroId: livro.id,
      dataInicio: "2025-12-20",
      dataFim: "2025-12-27",
    };

    const response = await request.post("/arrendamentos", { data: payload });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty(
      "mensagem",
      "Livro sem estoque para arrendamento",
    );
  });

  test("CT-API-020 - Atualizar Status de Arrendamento para APROVADO", async ({
    request,
  }) => {
    const livro = await criarLivro(request, "Livro CT-020");

    const arrendamento = await criarArrendamento(request, livro.id);

    const livroAntes = await (await request.get(`/livros/${livro.id}`)).json();
    const estoqueAntes = livroAntes.estoque;

    const atualizarResponse = await request.put(
      `/arrendamentos/${arrendamento.id}/status`,
      { data: { status: "APROVADO" } },
    );

    expect(atualizarResponse.status()).toBe(200);

    const atualizado = await atualizarResponse.json();
    expect(atualizado).toHaveProperty("status", "APROVADO");

    const livroDepois = await (await request.get(`/livros/${livro.id}`)).json();
    expect(livroDepois.estoque).toBe(estoqueAntes - 1);
  });

  test("CT-API-021 - Atualizar Status com Valor Inválido (Falha)", async ({
    request,
  }) => {
    const livro = await criarLivro(request, "Livro CT-021");

    const arrendamento = await criarArrendamento(request, livro.id);

    const response = await request.put(
      `/arrendamentos/${arrendamento.id}/status`,
      { data: { status: "EM_ANALISE" } },
    );

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("mensagem", "Status inválido");
  });

  test("CT-API-022 - Listar Arrendamentos do Usuário", async ({ request }) => {
    const livro = await criarLivro(request, "Livro CT-022");

    await criarArrendamento(request, livro.id);

    const response = await request.get("/arrendamentos/me?usuarioId=3");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);

    for (const item of body) {
      expect(item).toHaveProperty("usuarioId", 3);
    }
  });
});
