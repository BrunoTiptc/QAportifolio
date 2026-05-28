# 🎭 Automação de Testes E2E - Portfólio Pessoal

Este projeto contém a suíte de testes automatizados de ponta a ponta (E2E) para o meu portfólio web pessoal, utilizando **Playwright** com **TypeScript** e gestão de casos de teste estruturada no **Qase.io**.

O objetivo principal é garantir a qualidade da aplicação, validando a integridade dos links, redirecionamentos de redes sociais e o correto carregamento dos elementos principais da página.

---

## 🛠️ Tecnologias e Ferramentas

*   **Framework de Automação:** [Playwright](https://playwright.dev/)
*   **Linguagem:** TypeScript
*   **Gestão de Testes (TMS):** [Qase.io](https://qase.io/)
*   **Ambiente de Execução:** Chromium (Headless / Headed para demonstração)

---

## 📋 Plano e Casos de Teste (Mapeamento Qase.io)

Os cenários foram documentados no Qase.io e integrados diretamente no código através do repórter oficial.

### **Suite: Validação do Portfólio**

#### **ID 1: Deve carregar a página principal com o título correto**
*   **Objetivo:** Verificar se o servidor está respondendo e a página inicial renderiza os componentes críticos.
*   **Passos:**
    1. Acessar a URL do portfólio.
    2. Validar se o título da aba contém "Bruno".
    3. Verificar se o cabeçalho (`<header>`) está visível.

#### **ID 2: Deve verificar se os links das redes sociais estão corretos**
*   **Objetivo:** Garantir que o usuário consegue navegar para os perfis externos sem links quebrados.
*   **Passos:**
    1. Localizar dinamicamente os botões (WhatsApp, Meu Blog, GitHub, LinkedIn, Google Dev, Credly).
    2. Remover o atributo `target="_blank"` para manter o fluxo na mesma aba.
    3. Clicar no link e aguardar a navegação.
    4. Validar se a URL foi alterada com sucesso saindo da rota padrão do portfólio.
    *Nota: Links do tipo `mailto:` (e-mail) são validados por atributo para evitar quebras de fluxo.*

#### **ID 3: Deve garantir que todos os cards de projetos possuem links válidos**
*   **Objetivo:** Evitar regressões visuais ou links nulos/âncoras vazias nos cards de portfólio.
*   **Passos:**
    1. Capturar todos os seletores de links dentro da seção principal de projetos.
    2. Realizar uma varredura (loop) validando se o atributo `href` não é nulo, vazio ou `#`.

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### **1. Instalar as dependências**
```bash
npm install