import {
  Ion,
  Viewer,
  createWorldTerrainAsync,
  //createOsmBuildingsAsync,
  Cartesian3,
  Math,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    let ignore = false;

    const initialize = async () => {
      // Your access token can be found at: https://cesium.com/ion/tokens.
      // This is the default access token
      Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk";

      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Viewer("cesiumContainer", {
        terrainProvider: await createWorldTerrainAsync(),
      });

      // Add Cesium OSM Buildings, a global 3D buildings layer.
      //viewer.scene.primitives.add(createOsmBuildingsAsync());

      // Fly the camera to San Francisco at the given longitude, latitude, and height.
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
          heading: Math.toRadians(0.0),
          pitch: Math.toRadians(-15.0),
        },
      });

      if (ignore) {
        viewer.destroy();
      }
    };

    initialize();
    return () => {
      ignore = true;
    };
  }, []);

  return <div className="container" id="cesiumContainer"></div>;
};

export default App;
