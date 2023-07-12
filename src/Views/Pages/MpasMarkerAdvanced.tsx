import React, { useEffect, useRef, useState, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createRoot, Root } from "react-dom/client";
import "./../Styles/MapsStyles.css";
interface ILocationDoctor {
  [key: string]: IDataLocation;
}
interface IDataLocation {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  price: string;
  rating: string;
  type: string;
}
const locationDoctor: ILocationDoctor = {
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
    type: "paid",
  },
};
interface ICoordinates {
  lat: number;
  lng: number;
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <h2>Loading</h2>;
    case Status.FAILURE:
      return <h2>Error</h2>;
    case Status.SUCCESS:
      return <MyMap />;
  }
};
export default function HomeMapsWrapperTS() {
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
    </>
  );
}
interface MapConfig {
  center: google.maps.LatLngLiteral;
  zoom: number;
}
function MyMap() {
  const [map, setMap] = useState<google.maps.Map | undefined>();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const mapConfig: MapConfig = {
        center: { lat: -2.8949329, lng: -79.0041135 },
        zoom: 13,
      };

      //   const styledMapType = new google.maps.StyledMapType(
      //     [
      //       {
      //         featureType: "poi",
      //         stylers: [{ visibility: "off" }],
      //       },
      //       {
      //         featureType: "transit",
      //         stylers: [{ visibility: "off" }],
      //       },
      //       {
      //         featureType: "road",
      //         elementType: "labels.icon",
      //         stylers: [{ visibility: "off" }],
      //       },
      //       {
      //         featureType: "road",
      //         elementType: "labels.text",
      //         stylers: [{ visibility: "on" }],
      //       },
      //     ],
      //     { name: "Styled Map" }
      //   );

      const mapOptions: google.maps.MapOptions = {
        ...mapConfig,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },

        streetViewControl: false,
        fullscreenControl: false,
        mapId: process.env.REACT_APP_GOOGLE_MAPS_ID ?? "",
      };

      const googleMap = new google.maps.Map(ref.current, mapOptions);
      //   googleMap.mapTypes.set("styled_map", styledMapType);
      //   googleMap.setMapTypeId("styled_map");
      // Agregar control de posición actual
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(
      //       (position) => {
      //         const { latitude, longitude } = position.coords;
      //         const currentPosition = new google.maps.LatLng(latitude, longitude);
      //         new google.maps.Marker({
      //           position: currentPosition,
      //           map: googleMap,
      //           icon: {
      //             url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      //           },
      //         });
      //         googleMap.setCenter(currentPosition);
      //       },
      //       (error) => {
      //         console.error("Error al obtener la posición actual:", error);
      //       }
      //     );
      //   }

      setMap(googleMap);
    }
  }, []);
  return (
    <>
      <div ref={ref} id="map" style={{ width: "100%", height: "78vh" }} />
      {map && <LocationDoctor map={map} />}
    </>
  );
}
interface ZoomControlProps {
  map: google.maps.Map;
}

interface ILocationDoctorProps {
  map: google.maps.Map | undefined;
  children?: React.ReactNode;
  position?: ICoordinates;
  onClick?: any;
}
function LocationDoctor({ map }: ILocationDoctorProps) {
  const [data, setData] = useState(locationDoctor);
  const [highlight, setHighlight] = useState<string>();
  return (
    <>
      {Object.entries(data).map(([key, location]) => (
        <Marker
          key={key}
          map={map}
          position={location.position}
          onClick={() => console.log("siii")}
        >
          <div
            className={`marker ${location.type.toLocaleLowerCase()} ${
              highlight === key ? "highlight" : ""
            }`}
            onMouseEnter={() => {
              setHighlight(key);
            }}
            onMouseLeave={() => setHighlight("")}
          >
            <h2>{location.address}</h2>
            <p>{location.type.toLocaleLowerCase()}</p>
          </div>
        </Marker>
      ))}
    </>
  );
}

function Marker({
  map,
  children,
  position,
  onClick,
}: ILocationDoctorProps): JSX.Element {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerView | undefined>();
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      const container: HTMLDivElement = document.createElement("div");
      rootRef.current = createRoot(container);

      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      });
    }
  }, []);

  useEffect(() => {
    rootRef.current?.render(children);
    (markerRef.current as google.maps.marker.AdvancedMarkerView).position =
      position;
    (markerRef.current as google.maps.marker.AdvancedMarkerView).map = map;
    markerRef.current?.addListener("click", onClick);
  }, [map, position, children]);
  return <></>;
}
