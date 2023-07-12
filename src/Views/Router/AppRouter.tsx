import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import HomeMaps1 from "../Pages/MapsGooglePage";
import HomeMapsWrapper from "../Pages/MapsAdvancedMarker";
import HomeMapsWrapperTS from "../Pages/MpasMarkerAdvanced";

export const AppRouter = () => {
  const PublicRoutes: RouteObject[] = [
    {
      path: "maps/*",
      children: [
        { path: "one", element: <HomeMaps1 /> },
        { path: "wrapper", element: <HomeMapsWrapper /> },
        { path: "wrapperTS", element: <HomeMapsWrapperTS /> },
      ],
    },
    { path: "/*", element: <Navigate to="/maps/one" replace /> },
  ];

  return useRoutes(PublicRoutes);
};
