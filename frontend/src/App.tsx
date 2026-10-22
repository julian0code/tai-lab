
import { useEffect, useState } from 'react'
import type { HealthResponse } from './types/health'

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch('/api/health')

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const data: HealthResponse = await response.json()
        setHealth(data)
      } catch {
        setError('No se ha podido conectar con TAI Lab API.')
      } finally {
        setLoading(false)
      }
    }

    void fetchHealth()
  }, [])

  return (
    <main>
      <h1>TAI Lab</h1>

      {loading && <p>Conectando con la API...</p>}

      {error && <p role="alert">{error}</p>}

      {health && (
        <section>
          <h2>Estado de la aplicación</h2>
          <p>Estado: {health.status}</p>
          <p>Aplicación: {health.application}</p>
        </section>
      )}
    </main>
  )
}

export default App
