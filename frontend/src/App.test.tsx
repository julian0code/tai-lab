
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import App from './App'

afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
})

describe('App', () => {
    it('muestra el estado de la API cuando responde correctamente', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    status: 'UP',
                    application: 'TAI Lab',
                }),
            }),
        )

        render(<App />)

        expect(await screen.findByText('Estado: UP')).toBeInTheDocument()
        expect(screen.getByText('Aplicación: TAI Lab')).toBeInTheDocument()
        expect(fetch).toHaveBeenCalledWith('/api/health')
    })
})
