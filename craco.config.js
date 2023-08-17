const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: {
    configure: {
      // https://github.com/CesiumGS/cesium-webpack-example/blob/main/webpack.config.js
      resolve: {
        fallback: { https: false, zlib: false, http: false, url: false },
      },
    },
    plugins: {
      add: [
        new CopyPlugin({
          patterns: [
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            {
              from: "node_modules/cesium/Build/Cesium/Workers",
              to: "cesium/Workers",
            },
            { from: "node_modules/cesium/Source/Assets", to: "cesium/Assets" },
            {
              from: "node_modules/cesium/Source/Widgets",
              to: "cesium/Widgets",
            },
            {
              from: "node_modules/cesium/Source/ThirdParty",
              to: "cesium/ThirdParty",
            },
          ],
        }),
        new webpack.DefinePlugin({
          // Define relative base path in cesium for loading assets
          CESIUM_BASE_URL: JSON.stringify("/cesium"),
        }),
      ],
    },
  },
};
