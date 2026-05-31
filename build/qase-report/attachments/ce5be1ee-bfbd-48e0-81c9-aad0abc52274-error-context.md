# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Testes de Validação do Portfólio - Modo Demonstração LinkedIn >> Deve carregar a página principal com o título correto (Qase ID: 1)
- Location: tests\example.spec.ts:14:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('header')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('header')

```

```yaml
- img "Bruno César"
- heading "Bruno César" [level=1]
- text: QA Júnior | Engenharia de Software Engenheiro de Software em evolução e Pai do Arthur. Focado em garantir
- strong: qualidade, automação e sistemas confiáveis
- text: através de ferramentas robustas, atuando com
- strong: QA, Python, Java, C++ e Cloud
- text: . Orgulhoso membro da comunidade do
- strong: Google Developer Program
- text: "!"
- link "QA":
  - /url: paginas/projetos-qa.html
- link "Projetos Pessoais":
  - /url: paginas/outros-projetos.html
- link "Sobre Mim":
  - /url: paginas/sobre.html
- heading "Conecte-se Comigo" [level=2]
- link " WhatsApp":
  - /url: https://wa.me/5534999467838
- link " E-mail":
  - /url: mailto:brunocesarti95@gmail.com
- link " Meu Blog":
  - /url: https://dasnuvensblog.blogspot.com
- link " GitHub":
  - /url: https://github.com/BrunoTiptc
- link " LinkedIn":
  - /url: https://www.linkedin.com/in/bruno-césar-0b54091b0
- link " Google Dev":
  - /url: https://g.dev/brunoti
- link " Credly M.":
  - /url: https://www.credly.com/users/bruno-cesar-alves/badges#credly
- text: 🦉
- heading "Duolingo Status" [level=3]
- link "Acessar Perfil":
  - /url: https://pt.duolingo.com/profile/BrunoTi1
- text: "Idioma : Inglês US Nível 32 🔥"
- strong: "378"
- text: Ofensiva ⚡
- strong: "67.630"
- text: "XP Total Idioma: Espanhol Idioma: Inglês"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { qase } from 'playwright-qase-reporter';
  3  | 
  4  | const URL_PORTFOLIO = 'https://brunotiptc.github.io/Desenvolvimento-Web/';
  5  | 
  6  | test.describe('Testes de Validação do Portfólio - Modo Demonstração LinkedIn', () => {
  7  | 
  8  |   test.beforeEach(async ({ page, context }) => {
  9  |     // RESOLUÇÃO PERFEITA: Descobre e herda o tamanho máximo real da janela aberta
  10 |     await page.setViewportSize({ width: 1366, height: 728 }); 
  11 |     await page.goto(URL_PORTFOLIO);
  12 |   });
  13 | 
  14 |   test(qase(1, 'Deve carregar a página principal com o título correto'), async ({ page }) => {
  15 |     await expect(page).toHaveTitle(/Bruno/i); 
  16 |     const header = page.locator('header');
> 17 |     await expect(header).toBeVisible();
     |                          ^ Error: expect(locator).toBeVisible() failed
  18 |     await page.waitForTimeout(2000); // Pausa para o vídeo
  19 |   });
  20 | 
  21 |   test(qase(2, 'Deve verificar se os links das redes sociais estão corretos'), async ({ page }) => {
  22 |     // EVITA TIMEOUT: Dá 60 segundos para esse teste específico rodar todas as redes reais com folga
  23 |     test.setTimeout(60000);
  24 | 
  25 |     const redesSociais = ['WhatsApp', 'E-mail', 'Meu Blog', 'GitHub', 'LinkedIn', 'Google Dev', 'Credly M.'];
  26 | 
  27 |     for (const rede of redesSociais) {
  28 |       // Sempre reinicia na página do portfólio
  29 |       await page.goto(URL_PORTFOLIO, { waitUntil: 'domcontentloaded' });
  30 | 
  31 |       // Localiza o botão na árvore
  32 |       const linkBotao = page.locator(`a:has-text("${rede}")`).first();
  33 |       await expect(linkBotao).toBeVisible();
  34 | 
  35 |       const href = await linkBotao.getAttribute('href');
  36 | 
  37 |       // Ignora o mailto de forma inteligente para não travar o fluxo
  38 |       if (href && href.startsWith('mailto:')) {
  39 |         console.log(`Link de E-mail verificado com sucesso: ${href}`);
  40 |         continue;
  41 |       }
  42 | 
  43 |       // Remove o target="_blank" para manter a navegação visível na mesma tela
  44 |       await linkBotao.evaluate(el => el.removeAttribute('target'));
  45 | 
  46 |       // Clica e aguarda o site externo começar a renderizar o esqueleto
  47 |       await Promise.all([
  48 |         page.waitForNavigation({ waitUntil: 'commit', timeout: 20000 }).catch(() => {}),
  49 |         linkBotao.click()
  50 |       ]);
  51 | 
  52 |       // ⏱️ TEMPO DE EXIBIÇÃO: 4 segundos para a página carregar os detalhes e aparecer bem no vídeo
  53 |       await page.waitForTimeout(4000);
  54 | 
  55 |       // Valida que o redirecionamento ocorreu com sucesso
  56 |       await expect(page).not.toHaveURL(URL_PORTFOLIO);
  57 |     }
  58 |   });
  59 | 
  60 |   test(qase(3, 'Deve garantir que todos os cards de projetos possuem links válidos'), async ({ page }) => {
  61 |     const linksProjetos = page.locator('main a'); 
  62 |     const totalLinks = await linksProjetos.count();
  63 | 
  64 |     console.log(`Total de links de projetos encontrados: ${totalLinks}`);
  65 | 
  66 |     for (let i = 0; i < totalLinks; i++) {
  67 |       const href = await linksProjetos.nth(i).getAttribute('href');
  68 |       expect(href).not.toBeNull();
  69 |       expect(href).not.toBe('#');
  70 |     }
  71 |     await page.waitForTimeout(2000); // Pausa final antes do report
  72 |   });
  73 | });
```