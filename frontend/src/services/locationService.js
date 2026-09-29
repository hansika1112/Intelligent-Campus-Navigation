const API_BASE_URL = 'http://localhost:5001/api'

export async function getLocations() {
  const response = await fetch(
    `${API_BASE_URL}/locations`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch campus locations')
  }

  return response.json()
}

export async function getLocationById(id) {
  const response = await fetch(
    `${API_BASE_URL}/locations/${id}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch campus location')
  }

  return response.json()
}

export async function createLocation(location) {
  const response = await fetch(
    `${API_BASE_URL}/locations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create campus location')
  }

  return response.json()
}
