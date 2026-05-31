# Playwright + Qase.io Integration (TestOps)

Este repositório demonstra como integrar testes automatizados do **Playwright** com o **Qase.io (TestOps)**, tanto em ambiente local quanto em pipelines CI/CD via GitHub Actions.

---

## 🚀 1. Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
QASE_MODE=testops
QASE_ENVIRONMENT=local
QASE_TESTOPS_PROJECT=QP
QASE_TESTOPS_API_TOKEN=seu_token_aqui
QASE_TESTOPS_RUN_AUTO_CREATE=true
