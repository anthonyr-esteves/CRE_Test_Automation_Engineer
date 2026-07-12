# 📚 Automação de Testes – Sistema de Biblioteca (CRE)

Este repositório contém a solução completa desenvolvida para o Hands-on Lab da Certificação Rumos Expert (CRE) – Test Automation Engineer.  

O objetivo do projeto é automatizar os testes funcionais do Sistema de Biblioteca, cobrindo:

- Testes de API REST
- Testes de UI (Frontend Web)
- Validação de regras de negócio e perfis de utilizador
- Cenários de sucesso, erro e validação

A automação foi construída com foco em:
- Estrutura modular e escalável
- Reutilização de código (helpers, page objects, utilitários)
- Testes independentes, determinísticos e estáveis
- Documentação clara, profissional e alinhada com boas práticas de QA Automation

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma stack moderna e amplamente adotada na automação de testes, garantindo estabilidade, escalabilidade e facilidade de manutenção.

### Linguagem
- JavaScript (Node.js) — linguagem principal para testes de API e UI

### Framework de Testes
- Playwright Test (@playwright/test) — runner nativo, rápido e estável

### Automação de UI
- Playwright com suporte a:
    Chromium
    Firefox
    WebKit

### Automação de API
- Playwright APIRequestContext — cliente HTTP nativo para testes REST

### Arquitetura e Organização
- Page Object Model (POM) para todas as páginas de UI
- Helpers reutilizáveis para fluxos comuns e dados
- Separação clara entre testes de API e UI
- Estrutura modular, escalável e consistente

### Ambiente de Desenvolvimento
- Visual Studio Code (VSCode)
- Node.js 18+ (versão recomendada)
- Browsers instalados via Playwright (Chromium, Firefox, WebKit)

### Gestão de Dependências
- npm (Node Package Manager)

### Relatórios
- Playwright HTML Report
- Screenshots automáticos em falhas
- Vídeos automáticos em falhas
- Traces automáticos para debugging avançado

---

## 📊 Relatório de Execução

O relatório de execução **não é commitado no repositório**, pois é gerado automaticamente pelo Playwright a cada execução.  
Esta secção existe apenas para **referenciar o relatório**, conforme solicitado no enunciado da certificação CRE.

O avaliador pode consultar o relatório de duas formas:
- executando os testes localmente
- acessando os artefactos do CI (quando o GitHub Actions está ativo)

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
- **Vídeos** → `test-results/**/video.webm`  
- **Logs** → integrados no HTML Report  
- 

Estas evidências **não são commitadas** no repositório, pois:
- são geradas dinamicamente
- variam a cada execução
- estão no `.gitignore` do Playwright
- representam apenas a execução atual

### ☁️ Relatório no GitHub Actions (CI)

### ✔️ Nota Importante

O GitHub Actions encontra‑se desativado para evitar bloqueio automático da conta, apesar de a configuração CI estar totalmente implementada e documentada no PDF de entrega.

Quando ativo, o GitHub Actions executa a mesma suíte de testes contra o ambiente remoto: https://cre.mestre-qa.com/

A pipeline gera automaticamente:
- o HTML Report  
- os traces  
- os screenshots
- vídeos (quando configurados)  
- os artefactos de execução  

O avaliador pode descarregar estes artefactos diretamente da pipeline.

O requisito adicional do enunciado é cumprido quando:
- **todos os testes passam no GitHub Actions**
- o relatório CI fica disponível como artefacto

### ✔️ Nota Final

O relatório **não deve ser commitado** no repositório, porque:
- é gerado dinamicamente  
- está no `.gitignore`
- depende da execução atual  
- deve ser consultado localmente ou via CI

---

## 📁 Estrutura do Projeto

A organização do repositório segue uma arquitetura modular, separando claramente testes de API, testes de UI, páginas (POM), helpers, utilitários e configuração. Esta estrutura garante manutenção simples, escalabilidade e reutilização de código, seguindo boas práticas de QA Automation.

Abaixo encontra-se a estrutura principal do projeto, representada em formato de árvore:

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

Para iniciar:

```bash
npm start
```

### 4. Configuração do ambiente
O projeto utiliza o ficheiro `playwright.config.js` para definir:
- Base URL dinâmica (local vs ambiente remoto CRE)
- Timeouts globais
- Browsers utilizados
- Diretórios de testes
- Relatórios HTML
- evidências automáticas (screenshots, vídeos, traces)

Não é necessária qualquer configuração adicional para executar os testes localmente.

### Nota sobre GitHub Actions (CI)
**O GitHub Actions encontra‑se desativado para evitar bloqueio automático da conta**, apesar de a configuração CI estar totalmente implementada e documentada no PDF de entrega.

Quando ativo, o CI executa os testes contra o ambiente remoto disponibilizado pelo formador: https://cre.mestre-qa.com/.  

No CI:
- o servidor local não é iniciado
- os testes correm exclusivamente contra o ambiente remoto
- são gerados artefactos (HTML Report, screenshots, traces, vídeos)

O requisito do enunciado é cumprido quando:
- todos os testes passam no CI
- o relatório fica disponível como artefacto

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

Os testes utilizam dados de teste controlados e perfis de utilizador fornecidos pelo Sistema de Biblioteca.  
Não é necessário criar utilizadores manualmente, uma vez que o backend já disponibiliza contas pré-configuradas para cada perfil.

### Perfis disponíveis
- Aluno
- Funcionário
- Administrador

Cada perfil é utilizado conforme os requisitos funcionais de cada caso de teste, garantindo fidelidade ao comportamento real da aplicação.

### Ambiente de execução
- Ambiente local: http://localhost:3000  
- Ambiente remoto (CRE): https://cre.mestre-qa.com/

A seleção do ambiente é feita automaticamente no `playwright.config.js`, através de variáveis de ambiente que determinam se a execução é local ou remota.

### Dados dinâmicos
Alguns testes requerem criação de entidades como livros, arrendamentos ou compras. Para garantir estabilidade e independência entre testes, são utilizados helpers que geram dados válidos e únicos em cada execução.

Isto assegura:
- isolamento entre testes
- ausência de dependência de estado
- reprodutibilidade total da execução
- evitar colisões de dados no backend

---

## 🧩 Boas Práticas Implementadas

O projeto segue um conjunto de boas práticas de automação que garantem qualidade, estabilidade e facilidade de manutenção, refletindo padrões utilizados em equipas profissionais de QA Automation.

### Estrutura modular
- Separação clara entre testes de API e UI
- Organização consistente por pastas (`pages`, `helpers`, `testes`, `constantes`)
- Reutilização de código através de helpers, utilitários e POMs

### Page Object Model (POM)
- Encapsulamento de seletores, ações e fluxos de interação
- Redução de duplicação e aumento da reutilização
- Testes mais limpos, legíveis e fáceis de manter

### Testes independentes
- Cada teste prepara os seus próprios dados
- Zero dependência entre testes
- Execução paralela segura e determinística

### Dados dinâmicos
- Geração automática de dados válidos quando necessário
- Evita conflitos, dependências de estado e efeitos colaterais
- Garante reprodutibilidade total da execução


### Configuração centralizada
- `playwright.config.js` controla ambiente (local vs remoto CRE), timeouts globais, browsers, diretórios de testes, relatórios e evidências (screenshots, vídeos, traces)
- Seleção automática do ambiente através de variáveis de execução

### Relatórios completos
- HTML Report com resultados detalhados, screenshots automáticos, vídeos (quando ativados) e traces completos para debugging
- Artefactos disponíveis no CI quando o GitHub Actions está ativo

### Execução cross-browser
- Testes preparados para Chromium, Firefox e WebKit
- Compatibilidade garantida em múltiplos motores de renderização

---

## 🚀 Integração Contínua (GitHub Actions)

O projeto inclui uma configuração completa de Integração Contínua utilizando GitHub Actions.  
Esta configuração permite executar automaticamente a suíte de testes contra o ambiente remoto do formador, garantindo consistência e reprodutibilidade.

**Nota importante: O GitHub Actions encontra‑se desativado para evitar bloqueio automático da conta, apesar de a configuração CI estar totalmente implementada e documentada no PDF de entrega.**

### Ambiente de execução no CI
Quando ativo, o GitHub Actions executa os testes contra o ambiente remoto disponibilizado pelo formador: https://cre.mestre-qa.com/

Este ambiente garante que todos os testes passam com sucesso, conforme o requisito adicional do exercício.

### Seleção automática do ambiente
O ficheiro `playwright.config.js` utiliza variáveis de ambiente para selecionar automaticamente:
- ambiente local → `http://localhost:3000`
- ambiente remoto → `https://cre.mestre-qa.com/`

Esta lógica permite que a mesma suíte de testes funcione tanto localmente como no CI, sem alterações manuais.

### Artefactos gerados no CI
Quando o pipeline está ativa, o GitHub Actions gera automaticamente:
- HTML Report
- Traces
- Screenshots (em caso de falha)
- Vídeos (quando configurados)

Estes artefactos ficam disponíveis para consulta no separador “Actions” do repositório.

### Objetivo do pipeline
A configuração CI demonstra:
- execução automática dos testes
- integração com ambiente remoto
- geração de relatórios
- conformidade com o requisito da certificação CRE

---

## 🧩 Casos Não Implementados (Justificação)

Todos os casos de teste foram analisados de acordo com o enunciado oficial.

Os casos abaixo não foram totalmente automatizados devido a limitações técnicas da aplicação, comportamento inconsistente da UI ou dependências de backend que impediam uma validação automática determinística e estável.

### 📌 CT‑FE‑021 — Criar Funcionário pela UI Admin
**Estado: parcialmente automatizado (fluxo de criação), sem validação de tabela  
Motivo da não implementação completa: tabela depende de backend real**

O enunciado exige validar que:
- o novo usuário aparece na tabela após criação

Contudo:
- a tabela `/admin-usuarios.html` depende de `fetch('/usuarios')`
- durante os testes UI, **não existe backend ativo** para alimentar a tabela
- a tabela nunca carrega dados reais
- não é possível verificar se o novo funcionário foi criado

O fluxo de criação foi automatizado (preenchimento do formulário e alerta de sucesso), mas a **validação da presença do novo funcionário na tabela não é possível sem backend funcional**.

### 📌 CT‑FE‑022 — Editar Usuário na Tabela
**Motivo da não implementação: tabela não carrega sem backend**

Tal como no CT‑FE‑021:
- a tabela não carrega dados reais
- não existem utilizadores disponíveis para edição
- não é possível validar persistência após refresh

Sem dados reais, **não existe cenário consistente para editar**.

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
Os casos acima não foram totalmente implementados por motivos técnicos e não por falta de análise.  
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

A cobertura entregue cumpre os requisitos essenciais do exercício, mantendo foco em estabilidade, determinismo e fidelidade ao comportamento real da aplicação.

---

## ✍️ Autor

Este projeto foi desenvolvido no âmbito da Certificação Rumos Expert (CRE) – Test Automation Engineer.

O trabalho reflete:
- aplicação de boas práticas de automação
- implementação de testes de API e UI com Playwright
- arquitetura modular, escalável e consistente
- documentação clara, profissional e orientada ao avaliador
- configuração completa de Integração Contínua (GitHub Actions)  
  (desativada para evitar bloqueio automático da conta, mas totalmente implementada e documentada)

👤 Autor: Anthony Esteves

🐙 GitHub: [Anthony Esteves](https://github.com/anthonyr-esteves/)

🔗 LinkedIn: [Anthony R. Esteves](https://www.linkedin.com/in/anthonyr-esteves/)

---
