import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env com segurança
dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* Executa os testes em arquivos em paralelo */
  fullyParallel: true,
  /* Falha o build no CI se esquecer um test.only */
  forbidOnly: !!process.env.CI,
  /* Quantidade de retentativas */
  retries: process.env.CI ? 2 : 0,
  /* Quantidade de workers */
  workers: process.env.CI ? 1 : undefined,

  /* CONFIGURAÇÃO DO REPORTER ENXUTA (A biblioteca lê direto do .env) */
  reporter: [
    ['html'], // Relatório local padrão do Playwright
    ['playwright-qase-reporter'] // O reporter do Qase configurado de forma limpa
  ],

  /* Configurações globais para os testes */
  use: {
    trace: 'on-first-retry',
    video: 'on', // Força a gravação dos vídeos para o LinkedIn
    headless: false, // Abre o navegador na tela para você ver acontecer
    launchOptions: {
      args: ['--start-maximized'] // Abre o Chrome em tela cheia
    }
  },

  /* Configuração dos navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});