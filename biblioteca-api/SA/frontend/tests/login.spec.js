import { test, expect } from '@playwright/test'

test.describe('Tela de Login', () => {

    // Vai para a tela de login antes de cada teste
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
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