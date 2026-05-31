import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* CONFIGURAÇÃO DO REPORTER ATUALIZADA PARA O QASE */
  reporter: [
    ['html'], // Mantém o seu relatório HTML padrão do Playwright
    ['playwright-qase-reporter', {
      apiToken: 'afe57d0cdfeb9c19bf7ef381358602f1e9fd2ca4cb620fcdce2657183a94124d', // Seu token adicionado com sucesso
      projectCode: 'QP', // Substitua pelas letras maiúsculas que aparecem na URL do seu projeto no Qase (Ex: PORT, PRF, etc)
      runComplete: true,
      logging: true,
    }],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
     /* FORÇA A GRAVAÇÃO DE VÍDEO EM TODOS OS TESTES */
    video: 'on', 
    headless: false,
    launchOptions: {
    args: ['--start-maximized']
    }
  },

  /* Configure projects for major browsers */
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
