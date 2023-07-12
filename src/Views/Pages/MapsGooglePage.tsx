import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./../Styles/MapsStyles.css";

interface IMap {
  keyGoogleApi: string;
  center: ICoordinates;
  listCoordinatesOffice: ICoordinates[];
}
interface ICoordinates {
  lat: number;
  lng: number;
}

export default function HomeMaps1() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });
  const [center, setCenter] = useState<ICoordinates>({
    lat: -2.8949329,
    lng: -79.0041135,
  });
  const [listCoordinatesOffice, setListCoordinatesOffice] = useState<
    ICoordinates[]
  >([
    {
      lat: -2.1528576,
      lng: -79.9309824,
    },
    {
      lat: -2.9019113,
      lng: -79.0011752,
    },
    {
      lat: -2.8949329,
      lng: -79.0041135,
    },
    {
      lat: -2.8954469,
      lng: -79.0133706,
    },
    {
      lat: -2.894311,
      lng: -79.010457,
    },
    {
      lat: -2.8927513,
      lng: -79.0083495,
    },
    {
      lat: -2.8924232,
      lng: -79.0051553,
    },
    {
      lat: -2.8894765,
      lng: -79.0031574,
    },
    {
      lat: -2.8877397,
      lng: -79.0062896,
    },
  ]);

  //Interface for MapView
  if (!isLoaded) {
    return (
      <div>
        <p>No cargo el mapa</p>
      </div>
    );
  }
  return (
    <Maps
      keyGoogleApi={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
      center={center}
      listCoordinatesOffice={listCoordinatesOffice}
    />
  );
}

function Maps({ keyGoogleApi, center, listCoordinatesOffice }: IMap) {
  const onLoad = (marker: google.maps.Marker) => {
    console.log("marker: ", marker);
  };
  return (
    <>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
      >
        {/* <Marker position={center} /> */}
        {listCoordinatesOffice.map(
          (coordinate: ICoordinates, index: number) => (
            <MarkerF
              key={
                "index_" + coordinate.lat + "_" + coordinate.lng + "-" + index
              }
              onLoad={onLoad}
              position={coordinate}
            />
          )
        )}
      </GoogleMap>
      {listCoordinatesOffice.map((coordinate: ICoordinates, index: number) => (
        <p key={"index_" + coordinate.lat + "_" + coordinate.lng + "-" + index}>
          {"index_" + coordinate.lat + "_" + coordinate.lng + "-" + index}
        </p>
      ))}
    </>
  );
}
