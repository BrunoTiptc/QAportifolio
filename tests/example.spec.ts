import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

const URL_PORTFOLIO = 'https://brunotiptc.github.io/Desenvolvimento-Web/';

test.describe('Testes de Validação do Portfólio - Modo Demonstração LinkedIn', () => {

  test.beforeEach(async ({ page, context }) => {
    // RESOLUÇÃO PERFEITA: Descobre e herda o tamanho máximo real da janela aberta
    await page.setViewportSize({ width: 1366, height: 728 }); 
    await page.goto(URL_PORTFOLIO);
  });

  test(qase(1, 'Deve carregar a página principal com o título correto'), async ({ page }) => {
    await expect(page).toHaveTitle('Bem-vindo | Bruno César'); 
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await page.waitForTimeout(2000); // Pausa para o vídeo
  });

  test(qase(2, 'Deve verificar se os links das redes sociais estão corretos'), async ({ page }) => {
    // EVITA TIMEOUT: Dá 60 segundos para esse teste específico rodar todas as redes reais com folga
    test.setTimeout(60000);

    const redesSociais = ['WhatsApp', 'E-mail', 'Meu Blog', 'GitHub', 'LinkedIn', 'Google Dev', 'Credly M.'];

    for (const rede of redesSociais) {
      // Sempre reinicia na página do portfólio
      await page.goto(URL_PORTFOLIO, { waitUntil: 'domcontentloaded' });

      // Localiza o botão na árvore
      const linkBotao = page.locator(`a:has-text("${rede}")`).first();
      await expect(linkBotao).toBeVisible();

      const href = await linkBotao.getAttribute('href');

      // Ignora o mailto de forma inteligente para não travar o fluxo
      if (href && href.startsWith('mailto:')) {
        console.log(`Link de E-mail verificado com sucesso: ${href}`);
        continue;
      }

      // Remove o target="_blank" para manter a navegação visível na mesma tela
      await linkBotao.evaluate(el => el.removeAttribute('target'));

      // Clica e aguarda o site externo começar a renderizar o esqueleto
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'commit', timeout: 20000 }).catch(() => {}),
        linkBotao.click()
      ]);

      // ⏱️ TEMPO DE EXIBIÇÃO: 4 segundos para a página carregar os detalhes e aparecer bem no vídeo
      await page.waitForTimeout(4000);

      // Valida que o redirecionamento ocorreu com sucesso
      await expect(page).not.toHaveURL(URL_PORTFOLIO);
    }
  });

  test(qase(3, 'Deve garantir que todos os cards de projetos possuem links válidos'), async ({ page }) => {
    const linksProjetos = page.locator('main a'); 
    const totalLinks = await linksProjetos.count();

    console.log(`Total de links de projetos encontrados: ${totalLinks}`);

    for (let i = 0; i < totalLinks; i++) {
      const href = await linksProjetos.nth(i).getAttribute('href');
      expect(href).not.toBeNull();
      expect(href).not.toBe('#');
    }
    await page.waitForTimeout(2000); // Pausa final antes do report
  });
});