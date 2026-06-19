// @ts-check
const { defineConfig, devices } = require("@playwright/test");

// Detecta automaticamente se está a correr no GitHub Actions
const isCI = !!process.env.CI;

module.exports = defineConfig({
  // 🌐 URL base da aplicação a testar
  use: {
    baseURL: isCI ? "https://cre.mestre-qa.com" : "http://localhost:3000",

    // 📸 Captura screenshots apenas quando o teste falha
    screenshot: "only-on-failure",

    // 🎥 Grava vídeos apenas quando o teste falha
    video: "retain-on-failure",

    // 🧪 Guarda trace para debugging quando falha
    trace: "on-first-retry",
  },

  // 🔁 Repetir testes falhados (útil em CI)
  retries: 1,

  // 🧭 Caminho onde ficam os testes (API + UI)
  testDir: "./",

  // 🧪 Reporter HTML (abre automaticamente no fim)
  reporter: [["html", { open: "never" }]],

  // 🖥️ Browsers a usar
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // ⚙️ Configuração para CI (GitHub Actions)
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : undefined,
});
