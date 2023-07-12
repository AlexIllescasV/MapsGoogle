import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom/client";
import "./../Styles/MapsStyles.css";

const locationDoctorData = {
  A: {
    name: "EJEMPLO 1",
    position: {
      lat: -2.1528576,
      lng: -79.9309824,
    },
    address: "Calle 123",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  B: {
    name: "EJEMPLO 2",
    position: {
      lat: -2.9019113,
      lng: -79.0011752,
    },
    address: "Calle 2",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  C: {
    name: "EJEMPLO 3",
    position: {
      lat: -2.8949329,
      lng: -79.0041135,
    },
    address: "Calle 3",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  D: {
    name: "EJEMPLO 4",
    position: {
      lat: -2.8954469,
      lng: -79.0133706,
    },
    address: "Calle 4",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  E: {
    name: "EJEMPLO 5",
    position: {
      lat: -2.894311,
      lng: -79.010457,
    },
    address: "Calle 5",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  F: {
    name: "EJEMPLO 6",
    position: {
      lat: -2.8927513,
      lng: -79.0083495,
    },
    address: "Calle 6",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  G: {
    name: "EJEMPLO 7",
    position: {
      lat: -2.8924232,
      lng: -79.0051553,
    },
    address: "Calle 7",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  H: {
    name: "EJEMPLO 8",
    position: {
      lat: -2.8894765,
      lng: -79.0031574,
    },
    address: "Calle 8",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
  I: {
    name: "EJEMPLO 9",
    position: {
      lat: -2.8877397,
      lng: -79.0062896,
    },
    address: "Calle 9",
    price: "100$",
    rating: "8.5",
    type: "search",
  },
};
const mapOptions = {
  center: { lat: -2.8949329, lng: -79.0041135 },
  zoom: 15,
  disableDefaultUI: true,
};


const render = (status) => {
  // eslint-disable-next-line default-case
  switch (status) {
    case Status.LOADING:
      return <h2>Loading</h2>;
    case Status.FAILURE:
      return <h2>Error</h2>;
    case Status.SUCCESS:
      return <MyMap />;
  }
};
export default function HomeMapsWrapper() {
  //Interface for MapView
  return (
    <>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
        version="beta"
        libraries={["marker"]}
        id="container_maps_wrapper"
        render={render}
      ></Wrapper>
      <h2>SI</h2>
    </>
  );
}
function MyMap() {
    const [map, setMap] = useState();
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: -2.8949329, lng: -79.0041135 },
        mapId: process.env.REACT_APP_GOOGLE_MAPS_ID ?? "",
      }));
    }
  }, []);
  return (
    <>
      <div ref={ref} id="map" style={{ width: "100%", height: "78vh" }} />
      {map && <LocationDoctor map={map} />}
    </>
  );
}

function LocationDoctor({ map }) {
  const [data, setData] = useState(locationDoctorData);
  return (
    <>
      {Object.entries(data).map(([key, location]) => (
        <Marker key={key} map={map} position={location.position}>
          <div>
            <h2>{location.address}</h2>
          </div>
        </Marker>
      ))}
    </>
  );
}

function Marker({ map, children, position }) {
  const markerRef = useRef();
  const rootRef = useRef();

  useEffect(() => {
    if (!rootRef.current) {
      const container= document.createElement("div");
      rootRef.current = createRoot(container);

      // eslint-disable-next-line no-undef
      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      });
    }
  }, []);

  useEffect(() => {
    rootRef.current.render(children);
    markerRef.current.position = position;
    markerRef.current.map = map;
  }, [map, position, children]);
}
