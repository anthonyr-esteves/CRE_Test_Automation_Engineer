const { test, expect } = require("@playwright/test");

// Variáveis simples e reutilizáveis para dados de teste
const EMAIL_ADMIN = "admin@biblioteca.com";
const SENHA_ADMIN = "123456";

// Função simples para gerar email único
function gerarEmailUnico() {
  return `usuario.${Date.now()}@teste.com`;
}

test.describe("Autenticação e Perfis", () => {
  test("CT-API-001 - Registro de Novo Usuário Aluno (Sucesso)", async ({
    request,
  }) => {
    // Dados de entrada conforme PDF
    const payload = {
      nome: "Maria Silva",
      email: gerarEmailUnico(), // email dinâmico para evitar duplicação
      senha: "senha123",
    };

    // Chamada POST /registro
    const response = await request.post("/registro", {
      data: payload,
    });

    // Validação do status code
    expect(response.status()).toBe(201);

    const body = await response.json();

    // Validações do PDF
    expect(body).toHaveProperty("mensagem", "Usuário criado com sucesso");
    expect(body).toHaveProperty("usuario");

    // Validar campos do objeto usuario
    expect(body.usuario).toHaveProperty("id");
    expect(body.usuario).toHaveProperty("nome", "Maria Silva");
    expect(body.usuario.email).toBe(payload.email); // email deve ser igual ao enviado
    expect(body.usuario).toHaveProperty("tipo", 1); // 1 = Aluno

    // Validar que senha NÃO aparece na resposta
    expect(body.usuario).not.toHaveProperty("senha");

    // Validar que id é inteiro positivo
    expect(typeof body.usuario.id).toBe("number");
    expect(body.usuario.id).toBeGreaterThan(0);
  });

  test("CT-API-002 - Registro com Email Duplicado (Falha)", async ({
    request,
  }) => {
    // Dados de entrada conforme PDF
    const payload = {
      nome: "João Santos",
      email: EMAIL_ADMIN, // email já existente
      senha: "senha456",
    };

    // Chamada POST /registro
    const response = await request.post("/registro", {
      data: payload,
    });

    // Validação do status code
    expect(response.status()).toBe(400);

    const body = await response.json();

    // Validação da mensagem esperada
    expect(body).toHaveProperty("mensagem", "Email já cadastrado");
  });

  test("CT-API-003 - Login com Credenciais Válidas (Admin)", async ({
    request,
  }) => {
    // Dados de entrada conforme PDF
    const payload = {
      email: EMAIL_ADMIN,
      senha: SENHA_ADMIN,
    };

    const inicio = Date.now(); // medir tempo de resposta

    // Chamada POST /login
    const response = await request.post("/login", {
      data: payload,
    });

    const fim = Date.now();
    const tempoResposta = fim - inicio;

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validações do PDF
    expect(body).toHaveProperty("mensagem", "Login realizado com sucesso");
    expect(body).toHaveProperty("usuario");

    // usuario sem campo senha
    expect(body.usuario).not.toHaveProperty("senha");

    // tipo = 3 (Admin)
    expect(body.usuario).toHaveProperty("tipo", 3);

    // tempo de resposta < 2000 ms
    expect(tempoResposta).toBeLessThan(2000);
  });

  test("CT-API-004 - Login com Credenciais Inválidas", async ({ request }) => {
    // Dados de entrada conforme PDF
    const payload = {
      email: EMAIL_ADMIN,
      senha: "senhaerrada", // senha incorreta
    };

    // Chamada POST /login
    const response = await request.post("/login", {
      data: payload,
    });

    // Status esperado
    expect(response.status()).toBe(401);

    const body = await response.json();

    // Validação da mensagem esperada
    expect(body).toHaveProperty("mensagem", "Email ou senha incorretos");
  });
});
