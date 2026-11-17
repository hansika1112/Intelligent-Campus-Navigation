const API_BASE_URL = 'http://localhost:5001/api'

export async function predictCrowd(data) {
  const response = await fetch(
    `${API_BASE_URL}/predict-crowd`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.detail || result.message || 'Crowd prediction failed'
    )
  }

  return result
}
