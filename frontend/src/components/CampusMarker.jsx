import { useEffect, useRef } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { FiMapPin } from 'react-icons/fi'

function CampusMarker({
  location,
  isSelected,
  onSelect
}) {
  const markerRef = useRef(null)

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup()
    }
  }, [isSelected])

  return (
    <Marker
      ref={markerRef}
      position={[
        location.latitude,
        location.longitude
      ]}
      eventHandlers={{
        click: () => onSelect(location)
      }}
    >
      <Tooltip
        permanent
        direction="top"
        offset={[0, -10]}
        className="campus-label"
      >
        <div>
          <div className="font-semibold">
            {location.name}
          </div>

          <div className="text-xs text-slate-500">
            {location.category}
          </div>
        </div>
      </Tooltip>

      <Popup>
        <div className="min-w-[200px]">

          <div className="flex items-center gap-2">
            <FiMapPin className="text-blue-600" />

            <h3 className="font-bold text-slate-900">
              {location.name}
            </h3>
          </div>

          <p className="mt-1 text-sm font-medium text-blue-600">
            {location.category}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {location.description}
          </p>

          {location.wheelchairAccess && (
            <p className="mt-2 text-sm font-medium text-green-600">
              ♿ Wheelchair Accessible
            </p>
          )}

          {location.emergency && (
            <p className="mt-1 text-sm font-medium text-red-600">
              🚨 Emergency Facility
            </p>
          )}

        </div>
      </Popup>
    </Marker>
  )
}

export default CampusMarker