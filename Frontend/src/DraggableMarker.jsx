const DraggableMarker = ({ position, onDragEnd }) => {
    const markerRef = React.useRef(null);
  
    const eventHandlers = {
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng(); // Extract coordinates
          console.log('Marker position on drag end:', latLng); // Log coordinates
          onDragEnd(latLng);
        }
      },
    };
  
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  