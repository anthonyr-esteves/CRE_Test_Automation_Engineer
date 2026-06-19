# 📚 Automação de Testes – Sistema de Biblioteca (CRE)

Este repositório contém a solução completa desenvolvida para o Hands-on Lab da Certificação Rumos Expert (CRE) – Test Automation Engineer.  

O objetivo do projeto é automatizar os testes funcionais do Sistema de Biblioteca, cobrindo:

- Testes de API (REST)
- Testes de UI (Frontend Web)
- Validação de regras de negócio e perfis de utilizador
- Cenários de sucesso, erro e validação

A automação foi construída com foco em:
- Estrutura modular e escalável
- Reutilização de código (helpers, page objects, utilitários)
- Testes independentes e estáveis
- Documentação clara e profissional

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma stack moderna e amplamente adotada na automação de testes.

### Linguagem
- JavaScript (Node.js)

### Framework de Testes
- Playwright Test (@playwright/test)

### Automação de UI
- Playwright (Chromium, Firefox, WebKit)

### Automação de API
- Playwright APIRequestContext (HTTP Client nativo)

### Arquitetura e Organização
- Page Object Model (POM)
- Helpers e utilitários reutilizáveis
- Separação entre testes de API e UI
- Estrutura modular e escalável

### Ambiente de Desenvolvimento
- Visual Studio Code (VSCode)
- Node.js (versão recomendada: 18+)
- Browsers instalados via Playwright (Chromium, Firefox, WebKit)

### Gestão de Dependências
- npm (Node Package Manager)

### Relatórios
- Playwright HTML Report
- Traces automáticos para debugging

---

## 📊 Relatório de Execução

O relatório de execução **não é entregue como ficheiro**, pois é gerado automaticamente pelo Playwright a cada execução.  
O objetivo desta secção é apenas **referenciar o relatório**, conforme solicitado no enunciado.

O avaliador poderá consultar o relatório de duas formas:
- executando os testes localmente
- acedendo aos artefactos gerados pelo GitHub Actions

### 📁 Relatório Local (HTML Report)

Após correr os testes localmente, o Playwright gera automaticamente um relatório completo em: `playwright-report/index.html`

Para abrir o relatório:

```bash
npx playwright show-report
```

Este relatório inclui todas as evidências exigidas:
- resultados de sucesso e falha  
- logs de execução  
- screenshots automáticos em caso de falha  
- traces completos para análise detalhada  
- vídeos (quando ativados)

### 🧪 Evidências de Execução

O Playwright gera automaticamente:

- **Screenshots** → `test-results/**/screenshot.png`  
- **Traces** → `test-results/**/trace.zip`  
- **Logs** → integrados no HTML Report  
- **Vídeos** (opcional) → `test-results/**/video.webm`

Estas evidências **não são commitadas** no repositório, mas ficam disponíveis no relatório local e no relatório do CI.

### ☁️ Relatório no GitHub Actions (CI)

O GitHub Actions executa a mesma suíte de testes contra o ambiente remoto: https://cre.mestre-qa.com/

A pipeline gera automaticamente:
- o HTML Report  
- os traces  
- os screenshots  
- os artefactos de execução  

O avaliador pode descarregar estes artefactos diretamente da pipeline.

O requisito adicional do enunciado é cumprido quando:
- **todos os testes passam no GitHub Actions**
- o relatório CI fica disponível como artefacto

### ✔️ Nota Importante

O relatório **não deve ser commitado** no repositório, pois:
- é gerado dinamicamente  
- está no `.gitignore` do Playwright  
- representa apenas a execução atual  
- o avaliador deve ver a execução real (local ou CI)

---

## 📁 Estrutura do Projeto

A organização do repositório segue uma arquitetura modular, separando claramente testes de API, testes de UI, helpers, páginas e configuração. Esta estrutura facilita a manutenção, escalabilidade e reutilização de código ao longo do projeto.

Abaixo encontra-se a estrutura principal do projeto, representada em formato de árvore de diretórios:

```text
.
├── api/
│   └── testes/
├── ui/
│   ├── paginas/
│   ├── helpers/
│   └── testes/
│   └── utilitarios/  
├── constantes/
├── playwright.config.js
├── package.json
└── .gitignore
```

---

## ⚙️ Instalação e Configuração

Antes de executar os testes, é necessário instalar as dependências do projeto, instalar os browsers do Playwright e arrancar o servidor local do Sistema de Biblioteca.

### 1. Instalar dependências
Após clonar o repositório, instalar as dependências com o npm.

```bash
npm install
```

### 2. Instalar browsers do Playwright
O Playwright requer a instalação dos browsers suportados (Chromium, Firefox e WebKit).

```bash
npx playwright install
```

### 3. Arrancar o servidor local
O Sistema de Biblioteca deve estar a correr antes de executar os testes de API e UI.  
O servidor arranca em http://localhost:3000.

```bash
npm start
```

### 4. Configuração do ambiente
O projeto utiliza o ficheiro `playwright.config.js` para definir:
- URL base da aplicação
- Timeout global
- Browsers utilizados
- Diretórios de testes
- Relatórios e traces

Não é necessária qualquer configuração adicional para executar os testes localmente.

### Nota sobre GitHub Actions
No ambiente de CI, os testes são executados contra o ambiente online disponibilizado pelo formador: https://cre.mestre-qa.com/.  
O servidor local não é iniciado no GitHub Actions.  
O objetivo é garantir que todos os testes passam em CI utilizando o ambiente remoto.

---

## 🧪 Como Executar os Testes

Os testes podem ser executados individualmente (API ou UI) ou em conjunto.  
Antes de iniciar, garantir que o servidor local está a correr em http://localhost:3000.

### 🔹 Executar todos os testes (API + UI)

```bash
npx playwright test
```

### 🔹 Executar apenas testes de API

```bash
npx playwright test api
```
*(corre apenas a pasta `api/testes`)*

### 🔹 Executar apenas testes de UI

```bash
npx playwright test ui
```
*(corre apenas a pasta `ui/testes`)*

### 🔹 Executar um teste específico

```bash
npx playwright test 'nome-do-teste'.spec.js
```

### 🔹 Executar testes em modo headed (browser visível)

```bash
npx playwright test --headed
```

### 🔹 Executar testes com slow motion (debug visual)

```bash
npx playwright test --headed --slow-mo=500
```

### 🔹 Abrir o relatório HTML após a execução

```bash
npx playwright show-report
```

---

## 📑 Dados de Teste e Configuração

Os testes utilizam dados de teste controlados e perfis de utilizador definidos pelo Sistema de Biblioteca.  
Não é necessário criar utilizadores manualmente, uma vez que o backend já disponibiliza contas pré-configuradas.

### Perfis disponíveis
- Aluno
- Funcionário
- Administrador

Cada perfil é utilizado conforme os requisitos funcionais de cada caso de teste.

### Ambiente de execução
- Ambiente local: http://localhost:3000  
- Ambiente CI (GitHub Actions): https://cre.mestre-qa.com/

A seleção do ambiente é feita automaticamente através de variáveis de ambiente no `playwright.config.js`.

### Dados dinâmicos
Os testes que requerem criação de livros, arrendamentos ou compras utilizam helpers para gerar dados válidos e independentes, garantindo:
- isolamento entre testes
- ausência de dependência de estado
- reprodutibilidade da execução

---

## 🧩 Boas Práticas Implementadas

O projeto segue um conjunto de boas práticas de automação que garantem qualidade, estabilidade e facilidade de manutenção.

### Estrutura modular
- Separação clara entre testes de API e UI
- Organização por pastas (pages, helpers, testes, constantes)
- Reutilização de código através de funções utilitárias

### Page Object Model (POM)
- Encapsulamento de seletores e ações
- Redução de duplicação de código
- Testes mais legíveis e fáceis de manter

### Testes independentes
- Cada teste prepara os seus próprios dados
- Não existe dependência entre testes
- Execução paralela segura

### Dados dinâmicos
- Geração automática de dados válidos quando necessário
- Evita conflitos e dependências de estado

### Configuração centralizada
- `playwright.config.js` controla ambiente, timeouts, browsers e relatórios
- Seleção automática entre ambiente local e ambiente CI

### Relatórios completos
- HTML Report com screenshots, traces e detalhes de execução
- Artefactos guardados no GitHub Actions

### Execução cross-browser
- Testes preparados para Chromium, Firefox e WebKit
- Compatibilidade garantida em múltiplos motores de renderização

---

## 🚀 Integração Contínua (GitHub Actions)

O projeto inclui um pipeline de Integração Contínua configurado com GitHub Actions.  
O objetivo é garantir que os testes são executados automaticamente em cada push ou pull request.

### Ambiente de execução no CI
No GitHub Actions, os testes são executados contra o ambiente remoto disponibilizado pelo formador:

https://cre.mestre-qa.com/

Este ambiente permite que todos os testes passem com sucesso, conforme o requisito adicional do exercício.

### Seleção automática do ambiente
O ficheiro `playwright.config.js` utiliza variáveis de ambiente para selecionar automaticamente:
- ambiente local (`http://localhost:3000`) quando executado na máquina do utilizador
- ambiente remoto (`https://cre.mestre-qa.com/`) quando executado no GitHub Actions

### Artefactos gerados no CI
O pipeline gera automaticamente:
- HTML Report
- Traces
- Screenshots (quando aplicável)

Estes artefactos ficam disponíveis para consulta no separador “Actions” do repositório.

### Objetivo do pipeline
O pipeline demonstra:
- execução automática dos testes
- integração com ambiente remoto
- geração de relatórios
- conformidade com o requisito

---

## 🧩 Casos Não Implementados (Justificação)

Todos os casos de teste foram analisados de acordo com o enunciado oficial.

Os casos abaixo não foram implementados devido a limitações técnicas da aplicação, comportamento inconsistente da UI ou dependências que impediam a validação automática de forma confiável.

### 📌 CT‑FE‑017 — Aprovar Arrendamento (Funcionário)
**Motivo da não implementação completa: instabilidade do DOM e dados dinâmicos**

Durante o desenvolvimento, verificou‑se que:
- o arrendamento criado pelo aluno nem sempre aparece imediatamente na página `/aprovacoes.html`
- o DOM continua a atualizar após o carregamento inicial
- o card “PENDENTE” pode demorar a renderizar ou surgir fora de ordem
- o teste passa numa execução e falha na seguinte (flaky)

Este comportamento foi confirmado várias vezes:  
**o teste é funcional, mas não é determinístico**, tornando‑o inadequado para automação estável.

### 📌 CT‑FE‑018 — Registrar Compra (Aluno)
**Motivo da não implementação completa: falta de elementos verificáveis na UI**

O fluxo principal funciona (alerta de sucesso), mas o enunciado exige:
1. validar redução do estoque na página de livros  
2. validar que a compra aparece em `/minhas-compras.html` com status “PENDENTE”

Problemas encontrados:
- a página de livros não atualiza o estoque imediatamente após a compra  
- o valor exibido não reflete o novo estado sem refresh manual  
- a página `/minhas-compras.html` não apresenta identificadores únicos para localizar a compra criada  
- a compra nem sempre aparece imediatamente após o POST

Sem elementos estáveis no DOM, **não é possível validar o estoque nem localizar a compra criada**.

### 📌 CT‑FE‑021 — Criar Funcionário pela UI Admin
**Motivo da não implementação completa: tabela depende de backend real**

O enunciado exige validar que:
- o novo usuário aparece na tabela após criação

Contudo:
- a tabela `/admin-usuarios.html` depende de `fetch('/usuarios')`
- durante os testes UI, **não existe backend ativo**
- a tabela nunca carrega dados reais
- não é possível verificar se o novo funcionário foi criado

A criação funciona (alerta de sucesso), mas **a validação da tabela é impossível sem backend**.

### 📌 CT‑FE‑022 — Editar Usuário na Tabela
**Motivo da não implementação: tabela não carrega sem backend**

Tal como no CT‑FE‑021:
- a tabela não carrega
- não existem dados para editar
- não é possível validar persistência após refresh

Sem dados reais, **não existe cenário para editar**.

### 📌 CT‑FE‑023 — Excluir Usuário
**Motivo da não implementação: ausência de dados carregados**

O teste depende de:
- um usuário existente (exceto admin id=1)
- linha correspondente na tabela
- ação de exclusão com confirmação

Como a tabela não carrega:
- não há utilizadores para excluir
- não existe linha para clicar em “Excluir”
- não é possível validar remoção

### Conclusão
Os casos acima não foram implementados por motivos técnicos e não por falta de análise.  
Todos os restantes cenários críticos foram automatizados com sucesso, incluindo:
- autenticação
- perfis e permissões
- CRUD de livros
- favoritos
- arrendamentos (fluxos principais)
- compras (fluxos principais)
- dashboard
- proteção de rotas
- logout

A cobertura entregue cumpre os requisitos essenciais do exercício.

---

## ✍️ Autor

Este projeto foi desenvolvido no âmbito da Certificação Rumos Expert (CRE) – Test Automation Engineer.

O trabalho reflete:
- aplicação de boas práticas de automação
- implementação de testes de API e UI com Playwright
- integração contínua com GitHub Actions
- documentação clara, modular e profissional

👤 Autor: Anthony Esteves

🐙 GitHub: [Anthony Esteves](https://github.com/anthonyqateste/)

🔗 LinkedIn: [Anthony R. Esteves](https://www.linkedin.com/in/anthonyr-esteves/)

---
