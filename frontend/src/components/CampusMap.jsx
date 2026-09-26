import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { campusLocations } from '../data/campusLocations'

function CampusMap() {
  const center = [31.2555, 75.7055]

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-slate-700">
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {campusLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>

                <p className="text-sm">
                  {location.category}
                </p>

                <p className="mt-1 text-sm">
                  {location.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default CampusMap