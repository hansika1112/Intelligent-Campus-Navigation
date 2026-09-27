import { campusPaths } from '../data/campusPaths'



function buildGraph(paths, options) {
  const graph = {}

  paths.forEach((path) => {
    const blocked =
      (options.wheelchair &&
        !path.wheelchairAccessible) ||
      (options.avoidStairs &&
        path.hasStairs) ||
      (options.avoidRestrictedPaths &&
        path.restricted)

    if (blocked) {
      return
    }

    if (!graph[path.start]) {
      graph[path.start] = []
    }

    if (!graph[path.end]) {
      graph[path.end] = []
    }

    graph[path.start].push({
      node: path.end,
      distance: path.distance,
      pathId: path.id
    })

    graph[path.end].push({
      node: path.start,
      distance: path.distance,
      pathId: path.id
    })
  })

  return graph
}

function findShortestPath(
  graph,
  startId,
  destinationId
) {
  const distances = {}
  const previous = {}
  const visited = new Set()

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity
    previous[node] = null
  })

  distances[startId] = 0

  while (true) {
    let currentNode = null
    let smallestDistance = Infinity

    Object.keys(distances).forEach((node) => {
      if (
        !visited.has(node) &&
        distances[node] < smallestDistance
      ) {
        smallestDistance = distances[node]
        currentNode = node
      }
    })

    if (currentNode === null) {
      break
    }

    if (
      Number(currentNode) ===
      Number(destinationId)
    ) {
      break
    }

    visited.add(currentNode)

    const neighbors =
      graph[currentNode] || []

    neighbors.forEach((neighbor) => {
      const newDistance =
        distances[currentNode] +
        neighbor.distance

      if (
        newDistance <
        (distances[neighbor.node] ??
          Infinity)
      ) {
        distances[neighbor.node] =
          newDistance

        previous[neighbor.node] = {
          node: currentNode,
          pathId: neighbor.pathId
        }
      }
    })
  }

  if (
    distances[destinationId] === undefined ||
    distances[destinationId] === Infinity
  ) {
    return null
  }

  const nodes = []
  let current = Number(destinationId)

  while (current !== Number(startId)) {
    nodes.unshift(current)

    const previousNode =
      previous[current]

    if (!previousNode) {
      return null
    }

    current = Number(
      previousNode.node
    )
  }

  nodes.unshift(Number(startId))

  return {
    nodes,
    distance: distances[destinationId]
  }
}

function getLocationCoordinates(
  nodes,
  locations
) {
  return nodes.map((nodeId) => {
    const location = locations.find(
      (item) => item.id === nodeId
    )

    return [
      location.latitude,
      location.longitude
    ]
  })
}

export async function getRoute(
  start,
  destination,
  options = {},
  locations = []
) {
  const hasAccessibilityOptions =
    options.wheelchair ||
    options.avoidStairs ||
    options.avoidRestrictedPaths

  if (
    hasAccessibilityOptions &&
    locations.length > 0
  ) {
    const graph = buildGraph(
      campusPaths,
      options
    )

    const campusRoute =
      findShortestPath(
        graph,
        start.id,
        destination.id
      )

    if (campusRoute) {
      return {
        distance:
          campusRoute.distance,
        duration:
          (campusRoute.distance / 80) *
          60,
        coordinates:
          getLocationCoordinates(
            campusRoute.nodes,
            locations
          ),
        source: 'campus',
        pathNodes:
          campusRoute.nodes
      }
    }

    throw new Error(
      'No accessible campus route found for the selected preferences.'
    )
  }

  const coordinates =
    `${start.longitude},${start.latitude};` +
    `${destination.longitude},${destination.latitude}`

  const url =
    `https://router.project-osrm.org/route/v1/driving/${coordinates}` +
    `?overview=full&geometries=geojson`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      'Unable to connect to routing service'
    )
  }

  const data =
    await response.json()

  if (
    data.code !== 'Ok' ||
    !data.routes?.length
  ) {
    throw new Error(
      'No route found'
    )
  }

  const route =
    data.routes[0]

  return {
    distance:
      route.distance,
    duration:
      route.duration,
    coordinates:
      route.geometry.coordinates.map(
        ([longitude, latitude]) => [
          latitude,
          longitude
        ]
      ),
    source: 'osrm'
  }
}