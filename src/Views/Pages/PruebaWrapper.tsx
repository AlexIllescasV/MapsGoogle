import React, { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// export default function MapContainer({ center, zoomLevel, markerList, icon }) {
//   const googleMapRef = useRef(null);
//   let googleMap = null;

//   useEffect(() => {
//     try {
//       let bounds = new window.google.maps.LatLngBounds();

//       const initGoogleMap = () => {
//         return new window.google.maps.Map(googleMapRef.current, {
//           center: center,
//           zoom: zoomLevel,
//           styles: [{ stylers: [{ saturation: -100 }] }],
//         });
//       };

//       const createMarker = (markerObj) =>
//         new window.google.maps.Marker({
//           position: {
//             lat: parseFloat(markerObj.lat),
//             lng: parseFloat(markerObj.lng),
//           },
//           map: googleMap,
//           icon: {
//             url: icon,
//             scaledSize: new window.google.maps.Size(80, 80),
//           },
//         });

//       googleMap = initGoogleMap();

//       markerList.map((x) => {
//         const marker = createMarker(x);
//         bounds.extend(marker.position);
//       });

//       if (markerList.length === 0) {
//         initGoogleMap();
//         bounds = new window.google.maps.LatLngBounds();
//       }
//       googleMap.fitBounds(bounds);
//     } catch (e) {
//       console.log("maps", e);
//     }
//   });

//   const render = (status: Status) => {
//     if (status === Status.LOADING) return <h2>Loading...</h2>;
//     if (status === Status.FAILURE) return <h2>Error...</h2>;
//     return <h2></h2>;
//   };

//   return (
//     <div>
//       <div>
//         <Wrapper apiKey={TOKEN} render={render}>
//           {/* <GISTrackingMap zoomLevel={props.zoomLevel} mapFilterByVal={props.mapFilterByVal} center={props.center} gisTrackingData={props.gisTrackingData} /> */}
//           <div ref={googleMapRef} style={{ width: "100%", height: "78vh" }} />
//         </Wrapper>
//       </div>
//     </div>
//   );
// }
