const { test, expect } = require("@playwright/test");

// Função simples e reutilizável para validar formato de data ISO
function isISODate(value) {
  return /\d{4}-\d{2}-\d{2}T/.test(value);
}

test.describe("Livros", () => {
  test("CT-API-005 - Listar Todos os Livros", async ({ request }) => {
    // Chamada GET /livros
    const response = await request.get("/livros");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Corpo deve ser array
    expect(Array.isArray(body)).toBe(true);

    // Validar estrutura de cada livro
    for (const livro of body) {
      expect(livro).toHaveProperty("id");
      expect(livro).toHaveProperty("nome");
      expect(livro).toHaveProperty("autor");
      expect(livro).toHaveProperty("paginas");
      expect(livro).toHaveProperty("descricao");
      expect(livro).toHaveProperty("imagemUrl");
      expect(livro).toHaveProperty("dataCadastro");
      expect(livro).toHaveProperty("estoque");
      expect(livro).toHaveProperty("preco");

      // paginas deve ser inteiro positivo
      expect(typeof livro.paginas).toBe("number");
      expect(livro.paginas).toBeGreaterThan(0);

      // dataCadastro deve estar em formato ISO
      expect(isISODate(livro.dataCadastro)).toBe(true);
    }
  });

  test("CT-API-006 - Listar Livros Disponíveis", async ({ request }) => {
    // Chamada GET /livros/disponiveis
    const response = await request.get("/livros/disponiveis");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Corpo deve ser array
    expect(Array.isArray(body)).toBe(true);

    // Validar que todos os livros têm estoque > 0
    for (const livro of body) {
      expect(livro).toHaveProperty("estoque");
      expect(livro.estoque).toBeGreaterThan(0);

      // Campo opcional "disponivel" pode existir
      if (livro.hasOwnProperty("disponivel")) {
        expect(livro.disponivel).toBe(true);
      }
    }
  });

  test("CT-API-007 - Buscar Livro por ID (Existente)", async ({ request }) => {
    // Chamada GET /livros/1
    const response = await request.get("/livros/1");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validar que o ID retornado é 1
    expect(body).toHaveProperty("id", 1);

    // Validar campos obrigatórios não vazios
    expect(body).toHaveProperty("nome");
    expect(body.nome).not.toBe("");

    expect(body).toHaveProperty("autor");
    expect(body.autor).not.toBe("");

    expect(body).toHaveProperty("paginas");
    expect(typeof body.paginas).toBe("number");
    expect(body.paginas).toBeGreaterThan(0);
  });

  test("CT-API-008 - Buscar Livro por ID (Inexistente)", async ({
    request,
  }) => {
    // Chamada GET /livros/9999 (ID inexistente)
    const response = await request.get("/livros/9999");

    // Status esperado
    expect(response.status()).toBe(404);

    const body = await response.json();

    // Validação da mensagem esperada
    expect(body).toHaveProperty("mensagem", "Livro não encontrado");
  });

  test("CT-API-009 - Adicionar Novo Livro", async ({ request }) => {
    // Dados de entrada conforme PDF
    const payload = {
      nome: "Código Limpo",
      autor: "Robert C. Martin",
      paginas: 425,
      descricao: "Manual de boas práticas",
      imagemUrl: "https://exemplo.com/imagem.jpg",
      estoque: 10,
      preco: 59.9,
    };

    // Chamada POST /livros
    const response = await request.post("/livros", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(201);

    const body = await response.json();

    // Validar que o livro retornado possui id gerado automaticamente
    expect(body).toHaveProperty("id");
    expect(typeof body.id).toBe("number");
    expect(body.id).toBeGreaterThan(0);

    // Validar que dataCadastro foi preenchido automaticamente (formato ISO)
    expect(body).toHaveProperty("dataCadastro");
    expect(isISODate(body.dataCadastro)).toBe(true);

    // Validar que os demais campos correspondem aos enviados
    expect(body.nome).toBe(payload.nome);
    expect(body.autor).toBe(payload.autor);
    expect(body.paginas).toBe(payload.paginas);
    expect(body.descricao).toBe(payload.descricao);
    expect(body.imagemUrl).toBe(payload.imagemUrl);
    expect(body.estoque).toBe(payload.estoque);
    expect(body.preco).toBe(payload.preco);
  });

  test("CT-API-010 - Adicionar Livro sem Campos Obrigatórios (Falha)", async ({
    request,
  }) => {
    // Dados de entrada conforme PDF (campos obrigatórios ausentes ou inválidos)
    const payload = {
      nome: "",
      autor: "",
      paginas: null,
    };

    // Chamada POST /livros
    const response = await request.post("/livros", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(400);

    const body = await response.json();

    // Validação da mensagem esperada
    expect(body).toHaveProperty("mensagem");
    expect(body.mensagem.toLowerCase()).toContain("obrigatório");
  });

  test("CT-API-011 - Atualizar Livro Existente", async ({ request }) => {
    // Dados de entrada conforme PDF
    const payload = {
      nome: "Clean Code - Edição Atualizada",
      autor: "Robert C. Martin",
      paginas: 464,
      descricao: "Guia completo atualizado",
      imagemUrl: "https://exemplo.com/nova-imagem.jpg",
      estoque: 7,
      preco: 79.9,
    };

    // Chamada PUT /livros/1
    const response = await request.put("/livros/1", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validar que o ID permanece 1
    expect(body).toHaveProperty("id", 1);

    // Validar que os campos foram atualizados corretamente
    expect(body.nome).toBe(payload.nome);
    expect(body.autor).toBe(payload.autor);
    expect(body.paginas).toBe(payload.paginas);
    expect(body.descricao).toBe(payload.descricao);
    expect(body.imagemUrl).toBe(payload.imagemUrl);
    expect(body.estoque).toBe(payload.estoque);
    expect(body.preco).toBe(payload.preco);
  });

  test("CT-API-012 - Deletar Livro", async ({ request }) => {
    // Chamada DELETE /livros/2
    const response = await request.delete("/livros/2");

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validar mensagem de remoção
    expect(body).toHaveProperty("mensagem", "Livro removido");

    // GET subsequente deve retornar 404
    const getResponse = await request.get("/livros/2");
    expect(getResponse.status()).toBe(404);

    const getBody = await getResponse.json();

    // Mensagem esperada após remoção
    expect(getBody).toHaveProperty("mensagem", "Livro não encontrado");
  });
});
