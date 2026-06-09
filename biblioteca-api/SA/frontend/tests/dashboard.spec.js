import { test, expect } from '@playwright/test'

// Faz login antes de cada teste pois o dashboard é rota protegida
test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.fill('[data-testid="login-email"]', 'admin@gmail.com')
    await page.fill('[data-testid="login-senha"]', 'abcd1234')
    await page.click('[data-testid="login-btn"]')

    // Aguarda o redirecionamento para o dashboard
    await expect(page).toHaveURL('/dashboard', { timeout: 5000 })
})

test.describe('Dashboard', () => {

    // CT-23: Verificar se o dashboard carrega com os livros
    test('CT-23 — Deve exibir os livros no dashboard após o login', async ({ page }) => {
        // Verifica se o título da página está visível
        await expect(page.locator('h2')).toContainText('Minha Biblioteca')

        // Verifica se pelo menos um card de livro foi renderizado
        await expect(page.locator('a[href^="/livros/"]').first()).toBeVisible()
    })

    // CT-24: Usar a barra de pesquisa e filtrar livros
    test('CT-24 — Deve filtrar livros ao digitar na barra de pesquisa', async ({ page }) => {
        // Digita na barra de pesquisa
        await page.fill('input[placeholder="Pesquisar livro..."]', 'Senhor')

        // Verifica se aparece o livro filtrado
        await expect(page.getByText('Senhor dos an', { exact: false })).toBeVisible()

        // Verifica se livros que não batem com a busca somem
        await expect(page.getByText('Dom Casmurro', { exact: false })).not.toBeVisible()
    })

    // CT-25: Clicar em um livro e ir para a página de detalhes
    test('CT-25 — Deve ir para a página de detalhes ao clicar em um livro', async ({ page }) => {
        // Clica no primeiro card de livro
        await page.locator('a[href^="/livros/"]').first().click()

        // Verifica se foi para a página de detalhes
        await expect(page).toHaveURL(/\/livros\/\w+/)
    })

})