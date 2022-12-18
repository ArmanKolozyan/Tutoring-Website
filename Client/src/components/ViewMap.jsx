import React, { useRef, useEffect, createRef, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import * as L from "leaflet";
import axios from "axios";


export function ViewMap({post_id}) {
  const center = [50.85045, 4.34878];
  const mapRef = useRef();
  const [regions, setRegions] = useState([]); // must be initialised by an empty array! otherwise not possible to call 'map' 

  var MAPBOX_ACCESSTOKEN = "pk.eyJ1IjoibWF4aW12ZHciLCJhIjoiY2szbHM0Zm5lMDY1bzNibzRuYWRuc3hjYiJ9.zBkCaknMTrrWIdTlURoBTA";
  const ZOOM_LEVEL = 12;

  useEffect(() => {
    if (mapRef.current !== null) {
        const fetchData = async () => {
            try {
              const res = await axios({
                method: "get",
                withCredentials: true,
                url: `http://localhost:8800/tutoringpostRegion/${post_id}`,
              });
              setRegions(res.data.data);
            } catch (err) {
              console.log(err.response.data.message);
            }
          };
          fetchData();}
  }, [mapRef.current]); 

  useEffect(() => {
    if (regions.length > 0) {
      regions.forEach(region => {
        L.circle([region.latitude, region.longitude], region.radius).addTo(mapRef.current)
      })
    }
  }, [regions]);

  return (
    <>
      <div className="col d-flex justify-content-center">
        <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ width: "50vw", height: "50vh" }} ref={mapRef}>
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
