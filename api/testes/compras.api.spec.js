const { test, expect } = require("@playwright/test");

// Funções simples e reutilizáveis

// Criar livro exclusivo para cada teste
async function criarLivro(request, nome, estoque = 10, preco = 5) {
  const response = await request.post("/livros", {
    data: {
      nome,
      autor: "Sistema de Testes",
      paginas: 200,
      descricao: `Livro exclusivo para ${nome}`,
      imagemUrl: "https://exemplo.com/livro.jpg",
      estoque,
      preco,
    },
  });

  expect(response.status()).toBe(201);
  return await response.json();
}

// Criar compra válida
async function criarCompra(request, usuarioId, livroId, quantidade) {
  const response = await request.post("/compras", {
    data: { usuarioId, livroId, quantidade },
  });

  return response;
}

// Atualizar status da compra
async function atualizarStatusCompra(request, compraId, status) {
  const response = await request.put(`/compras/${compraId}/status`, {
    data: { status },
  });

  return response;
}

test.describe("Compras", () => {
  test("CT-API-023 - Criar Compra com Estoque Suficiente", async ({
    request,
  }) => {
    const livro = await criarLivro(request, "Livro CT-023", 10, 5);

    const payload = {
      usuarioId: 3,
      livroId: livro.id,
      quantidade: 2,
    };

    const response = await criarCompra(
      request,
      payload.usuarioId,
      payload.livroId,
      payload.quantidade,
    );

    expect(response.status()).toBe(201);

    const compra = await response.json();

    expect(compra).toHaveProperty("id");
    expect(compra).toHaveProperty("usuarioId", payload.usuarioId);
    expect(compra).toHaveProperty("livroId", payload.livroId);
    expect(compra).toHaveProperty("quantidade", payload.quantidade);
    expect(compra).toHaveProperty("status", "PENDENTE");
    expect(compra).toHaveProperty("total", livro.preco * payload.quantidade);
    expect(/\d{4}-\d{2}-\d{2}T/.test(compra.criadoEm)).toBe(true);
  });

  test("CT-API-024 - Criar Compra com Estoque Insuficiente (Falha)", async ({
    request,
  }) => {
    const livro = await criarLivro(request, "Livro CT-024", 5, 5);

    const response = await criarCompra(request, 3, livro.id, 100);

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("mensagem", "Estoque insuficiente");
  });

  test("CT-API-025 - Aprovar Compra", async ({ request }) => {
    const livro = await criarLivro(request, "Livro CT-025", 10, 5);

    const criarResponse = await criarCompra(request, 3, livro.id, 2);
    expect(criarResponse.status()).toBe(201);

    const compraCriada = await criarResponse.json();
    const compraId = compraCriada.id;

    const livroAntes = await (await request.get(`/livros/${livro.id}`)).json();
    const estoqueAntes = livroAntes.estoque;

    const atualizarResponse = await atualizarStatusCompra(
      request,
      compraId,
      "APROVADA",
    );
    expect(atualizarResponse.status()).toBe(200);

    const compraAprovada = await atualizarResponse.json();
    expect(compraAprovada).toHaveProperty("status", "APROVADA");

    const livroDepois = await (await request.get(`/livros/${livro.id}`)).json();
    expect(livroDepois.estoque).toBe(estoqueAntes - compraCriada.quantidade);

    expect(compraAprovada).toHaveProperty("id", compraId);
    expect(compraAprovada).toHaveProperty("usuarioId", 3);
    expect(compraAprovada).toHaveProperty("livroId", livro.id);
    expect(compraAprovada).toHaveProperty(
      "quantidade",
      compraCriada.quantidade,
    );
    expect(compraAprovada).toHaveProperty(
      "total",
      livro.preco * compraCriada.quantidade,
    );
    expect(/\d{4}-\d{2}-\d{2}T/.test(compraAprovada.criadoEm)).toBe(true);
  });

  test("CT-API-026 - Cancelar Compra", async ({ request }) => {
    const livro = await criarLivro(request, "Livro CT-026", 10, 5);

    const criarResponse = await criarCompra(request, 3, livro.id, 2);
    expect(criarResponse.status()).toBe(201);

    const compraCriada = await criarResponse.json();
    const compraId = compraCriada.id;

    const livroAntes = await (await request.get(`/livros/${livro.id}`)).json();
    const estoqueAntes = livroAntes.estoque;

    const cancelarResponse = await atualizarStatusCompra(
      request,
      compraId,
      "CANCELADA",
    );
    expect(cancelarResponse.status()).toBe(200);

    const compraCancelada = await cancelarResponse.json();
    expect(compraCancelada).toHaveProperty("status", "CANCELADA");

    const livroDepois = await (await request.get(`/livros/${livro.id}`)).json();
    expect(livroDepois.estoque).toBe(estoqueAntes);

    expect(compraCancelada).toHaveProperty("id", compraId);
    expect(compraCancelada).toHaveProperty("usuarioId", 3);
    expect(compraCancelada).toHaveProperty("livroId", livro.id);
    expect(compraCancelada).toHaveProperty(
      "quantidade",
      compraCriada.quantidade,
    );
    expect(compraCancelada).toHaveProperty(
      "total",
      livro.preco * compraCriada.quantidade,
    );
    expect(/\d{4}-\d{2}-\d{2}T/.test(compraCancelada.criadoEm)).toBe(true);
  });

  test("CT-API-027 - Listar Compras do Usuário", async ({ request }) => {
    const livro = await criarLivro(request, "Livro CT-027", 10, 5);

    const criarResponse = await criarCompra(request, 3, livro.id, 1);
    expect(criarResponse.status()).toBe(201);

    const compraCriada = await criarResponse.json();

    const response = await request.get("/compras/me?usuarioId=3");
    expect(response.status()).toBe(200);

    const compras = await response.json();
    expect(Array.isArray(compras)).toBe(true);

    for (const compra of compras) {
      expect(compra).toHaveProperty("usuarioId", 3);
    }

    const encontrada = compras.some((c) => c.id === compraCriada.id);
    expect(encontrada).toBe(true);
  });

  test("CT-API-028 - Listar Todas as Compras", async ({ request }) => {
    const livro = await criarLivro(request, "Livro CT-028", 10, 5);

    const criarResponse = await criarCompra(request, 3, livro.id, 1);
    expect(criarResponse.status()).toBe(201);

    const compraCriada = await criarResponse.json();

    const response = await request.get("/compras");
    expect(response.status()).toBe(200);

    const compras = await response.json();
    expect(Array.isArray(compras)).toBe(true);

    const encontrada = compras.some((c) => c.id === compraCriada.id);
    expect(encontrada).toBe(true);
  });
});
