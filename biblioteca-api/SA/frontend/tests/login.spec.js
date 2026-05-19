import { test, expect } from '@playwright/test'

test.describe('Tela de Login', () => {

    // Vai para a tela de login antes de cada teste
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    // CT-18: Verificar se a tela de login aparece com os campos visíveis
    test('CT-18 — Deve exibir a tela de login com campos de e-mail e senha', async ({ page }) => {
        // Verifica se os campos de e-mail e senha estão visíveis
        await expect(page.locator('[data-testid="login-email"]')).toBeVisible()
        await expect(page.locator('[data-testid="login-senha"]')).toBeVisible()
        await expect(page.locator('[data-testid="login-btn"]')).toBeVisible()
    })

    // CT-19: Clicar em "Criar Conta" e ver o formulário de cadastro aparecer
    test('CT-19 — Deve abrir o formulário de cadastro ao clicar em Criar Conta', async ({ page }) => {
        // Clica no botão Criar Conta
        await page.click('[data-testid="goto-register"]')

        // Verifica se o formulário de cadastro apareceu (campo nome é exclusivo do cadastro)
        await expect(page.locator('#nome')).toBeVisible()
        await expect(page.locator('input[placeholder="exemplo123@gmail.com"]')).toBeVisible()
        await expect(page.locator('input[placeholder="abcd1234"]').first()).toBeVisible()
    })

    // CT-20: Estando no cadastro, fechar o modal clicando no X e voltar para o login
    test('CT-20 — Deve voltar para o login ao fechar o formulário de cadastro', async ({ page }) => {
        // Abre o modal de cadastro
        await page.click('[data-testid="goto-register"]')

        // Verifica se o formulário de cadastro apareceu
        await expect(page.locator('#nome')).toBeVisible()

        // Fecha o modal clicando no botão X
        await page.getByRole('button', { name: 'x' }).click()

        // Verifica se voltou para o login
        await expect(page.locator('[data-testid="login-form"]')).toBeVisible()
    })

    // CT-21: Ver erro ao errar a senha no login
    test('CT-21 — Deve exibir erro com credenciais inválidas', async ({ page }) => {
        await page.fill('[data-testid="login-email"]', 'errado@email.com')
        await page.fill('[data-testid="login-senha"]', 'senhaerrada')
        await page.click('[data-testid="login-btn"]')

        // Verifica se o toast de erro aparece
        await expect(page.locator('.Toastify')).toContainText('Usuário não encontrado', { timeout: 5000 })

        // Verifica se continua na tela de login
        await expect(page.locator('[data-testid="login-form"]')).toBeVisible()
    })

    // CT-22: Ir pro dashboard depois do login
    test('CT-22 — Deve realizar login com sucesso e ir para o dashboard', async ({ page }) => {
        await page.fill('[data-testid="login-email"]', 'joao@email.com')
        await page.fill('[data-testid="login-senha"]', 'abcd1234')
        await page.click('[data-testid="login-btn"]')

        // Verifica se redirecionou para o dashboard (timeout de 5s por causa do setTimeout do login)
        await expect(page).toHaveURL('/dashboard', { timeout: 5000 })
    })

})