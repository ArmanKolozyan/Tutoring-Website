import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import getUserLocation from "./GetUserLocation";
import * as L from "leaflet";

const center = [50.85045, 4.34878];

var MAPBOX_ACCESSTOKEN = "pk.eyJ1IjoibWF4aW12ZHciLCJhIjoiY2szbHM0Zm5lMDY1bzNibzRuYWRuc3hjYiJ9.zBkCaknMTrrWIdTlURoBTA";
const ZOOM_LEVEL = 12;

function TutorMap() {
  const location = getUserLocation();
  const mapRef = useRef();

  const jumpToUserLocation = () => {
    if (location.loaded && !location.error) {
      const newZoom = 16;
      mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], newZoom, { animate: true });
    } else {
      alert(location.error.message);
    }
  };
  
  const handleRegions = (e) => {
    console.log(
      mapRef.current.eachLayer(function (layer) {
        console.log(layer instanceof L.Circle)
      })
    );
  };

  useEffect(() => {
    if (mapRef.current !== null) {
      L.circle([50.8702367476435, 4.324935177007504], 1401.8123385792328).addTo(mapRef.current);
    }
  }, [mapRef.current]); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  return (
    <>
      <div className="col d-flex justify-content-center">
        <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ width: "50vw", height: "50vh" }} ref={mapRef}>
          <FeatureGroup>
            <EditControl
              position="topright"
           //   onCreated={created}
           //   onEdited={edited}
              draw={{
                rectangle: false,
                polygon: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox/streets-v11"
            accessToken={MAPBOX_ACCESSTOKEN}
          />
        </MapContainer>
      </div>
      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary small" style={{ width: "10vw" }} onClick={jumpToUserLocation}>
            Locate Me
          </button>
        </div>
      </div>
    </>
  );
}

export default TutorMap;
