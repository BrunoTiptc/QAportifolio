# Guia de Integração: Playwright + Qase.io (TestOps)

Este documento registra o passo a passo técnico e as descobertas de arquitetura necessárias para garantir o envio correto dos relatórios automatizados do Playwright diretamente para a nuvem do Qase.io, tanto em ambiente local quanto via Pipeline de CI/CD.

---

## 1. Estrutura de Variáveis de Ambiente (.env)

O validador interno da biblioteca (`env-schema`) exige nomenclaturas estritas para o modo `testops`. A ausência do prefixo correto resulta em falha de autenticação upstream.

| Variável                     | Descrição                                                        | Valor/Exemplo        |
|------------------------------|------------------------------------------------------------------|----------------------|
| **QASE_MODE**                | Define o modo de reporte da biblioteca (obrigatório).            | `testops`            |
| **QASE_ENVIRONMENT**         | Identifica a origem da execução no painel do Qase.               | `local` ou `github-actions` |
| **QASE_TESTOPS_PROJECT**     | Código identificador do projeto no Qase (não aceita `_CODE`).     | `QP`                 |
| **QASE_TESTOPS_API_TOKEN**   | Token de autenticação gerado na plataforma (exige prefixo `TESTOPS`). | `3b3c501a4...`       |
| **QASE_TESTOPS_RUN_AUTO_CREATE** | Habilita a criação automática de uma nova execução (Test Run) via API. | `true`               |

---

## 2. Configuração Enxuta do Playwright (playwright.config.ts)

Para evitar conflitos de parâmetros obsoletos no código, o `playwright-qase-reporter` deve ser declarado de forma limpa, permitindo que a biblioteca herde as configurações diretamente do escopo global das variáveis de ambiente carregadas pelo `dotenv`:

```ts
reporter: [
  ['html'], 
  ['playwright-qase-reporter']
],
