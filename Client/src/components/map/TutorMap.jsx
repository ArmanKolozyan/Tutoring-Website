import React, { useEffect, createRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import * as L from "leaflet";

const center = [50.85045, 4.34878];
export const mapRef = createRef()
var MAPBOX_ACCESSTOKEN = "pk.eyJ1IjoiYXJtYW5jaG8iLCJhIjoiY2xiemZ5bTY0MDB5dTNxbXV1bzZ4bWowciJ9.cFYht2vS5UYOVxTPBXu5BQ";
const ZOOM_LEVEL = 12;


// returns all the regions drawn by the user
export const giveRegions = () => {
  const regions = [];
  mapRef.current.eachLayer(function (layer) {
    if (layer instanceof L.Circle && layer._mRadius !== undefined) {
      regions.push({ latitude: layer.getLatLng().lat, longitude: layer.getLatLng().lng, radius: layer.getRadius() });
    }
  });
  return regions;
};

/**
 * COMPONENT FOR EDITING THE MAP BY 
 * ADDING THE POSSIBLE TEACHING AREAS VIA CIRCLES.
 */
export function TutorMap({ regions }) {
  useEffect(() => {
    if (regions.length > 0 && mapRef.current !== null) {
      regions.forEach((region) => {
        L.circle([region.latitude, region.longitude], region.radius).addTo(mapRef.current);
      });
    } else {
    }
  }, [mapRef.current]);

  return (
    <>
      <div className="col d-flex justify-content-center">
        <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ width: "50vw", height: "50vh" }} ref={mapRef}>
          <FeatureGroup>
            <EditControl
              position="topright"
              draw={{ // only circles can be drawn
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
    </>
  );
}
