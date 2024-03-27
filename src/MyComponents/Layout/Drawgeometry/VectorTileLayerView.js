/**
 * The `VectorTileLayerView` component is a React component that renders a vector tile layer on an
 * OpenLayers map.
 */
import { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../../Map/MapContext";
import VectorTile from "ol/layer/VectorTile";
import Swipe from "ol-ext/control/Swipe";
import { Draw, Modify } from "ol/interaction";
import { Style, Stroke, Fill, Circle, Text } from "ol/style";
import { ImageWMS } from "ol/source";
import { Image as ImageLayer } from "ol/layer";
import { getArea, getLength } from "ol/sphere.js";
import { LineString, Polygon } from "ol/geom.js";
import { Overlay } from "ol";

const VectorTileLayerView = ({
  zIndex = 0,
  source,
  opacity,
  onData,
  geometryType,
  source2,
  styling,
  infoshow,
}) => {
  // console.log(geometryType, "this is child data");
  const { map } = useContext(MapContext);

  useEffect(() => {
    // console.log(onData)
    if (!map) return;

    let vectorTile = new VectorTile({
      source,
      zIndex,
      opacity,

      // for styling of geometry and text
      style: new Style({
        stroke: new Stroke({
          color: "rgba(50,50,50,0.9)",
          width: 1.2,
        }),
        fill: new Fill({
          color: "rgba(0,0,0,0)",
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: "transparent",
          }),
        }),
        text: new Text({
          font: "14px Arial",
          fill: new Fill({
            color: "transparent",
          }),
          backgroundFill: new Fill({
            color: "transparent",
          }),
          padding: [3, 3, 3, 3],
          overflow: true,
          offsetY: -20,
        }),
      }),
    });

    console.log(infoshow, "in layer");
    // example to swipe between two layers
    // const layer1 = new VectorTile({
    //   source: source,
    // });

    // const layer2 = new VectorTile({
    //   source: source2,
    // });

    // for displaying image in open layers
    // const imageWMSSource = new ImageWMS({
    //   url: "http://192.168.1.17:9022/geoserver/nmscdcl/wms",
    //   params: {
    //     LAYERS: "nmscdcl:burried_pillar",
    //     TILED: true,
    //   },
    // });

    const imageWMSSource = new ImageWMS({
      url: styling.url,
      params: {
        LAYERS: styling.params.LAYERS,
        TILED: true,
      },
    });

    const imageWMSLayer = new ImageLayer({
      opacity: opacity,
      source: imageWMSSource,
    });

    // map.addLayer(layer1);
    // map.addLayer(layer2);
    map.addLayer(vectorTile);
    // map.addLayer(imageWMSLayer);

    // Attribute Info for each layer Start

    // const handleClick = (e) => {
    //   console.log(e.pixel);
    //   const features = map.getFeaturesAtPixel(e.pixel);
    //   console.log(features);
    //   if (features.length > 0) {
    //     const feature = features[0];
    //     const attributes = feature.getProperties();
    //     onData(JSON.stringify(attributes));
    //     console.log(attributes);
    //   }
    // };
    // map.on("click", handleClick);

    //! Swipe feature for two layers
    // const swipe = new Swipe({
    //   layers: [layer1, layer2],
    //   position: "topright",
    //   orientation: "vertical",
    //   thumbColor: "#ffffff",
    //   label: "Swipe",
    //   collapsed: true,
    //   size: 20,
    // });
    // map.addControl(swipe);

    vectorTile.setZIndex(zIndex);
    vectorTile.setOpacity(opacity);
    return () => {
      if (map) {
        map.removeLayer(vectorTile);
        // map.removeControl(swipe);
      }
    };
  }, [map, opacity, geometryType, styling, infoshow]);
  return null;
};

export default VectorTileLayerView;
