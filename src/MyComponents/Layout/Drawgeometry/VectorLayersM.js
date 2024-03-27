/* The below code is a React component that creates vector layers on a map using OpenLayers library. It
imports various dependencies such as React, Redux, and OpenLayers modules. It defines a function
component called VectorLayersM that takes in props and returns null. */
import { useContext, useEffect, useRef } from "react";
import { connect } from "react-redux";
import MapContext from "../../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import axios from "axios";
import { Draw, Modify, Select } from "ol/interaction";
import {
    Style,
    Stroke,
    Fill,
    Circle,
    Text,
    Circle as CircleStyle,
    RegularShape,
} from "ol/style";
import { createStringXY } from "ol/coordinate";
import { formatLength } from "ol/geom/flat/length";
import { LineString, Polygon, Point } from "ol/geom.js";
import { Overlay } from "ol";
import { getLength, getArea } from "ol/sphere";
import { useState } from "react";
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
let axiosConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: sessionStorage.getItem("acessToken"),
    },
};

const VectorLayersM = (props) => {
    const [info, setInfo] = useState("");
    const { map } = useContext(MapContext);
    const showSegments = true; //document.getElementById('segments');
    const clearPrevious = false; //document.getElementById('clear');
    // const modifyInteraction = useRef(null);

    const vectorSource = useRef(new VectorSource({
        format: new GeoJSON(),
        url: props.urlpath,
    }));

    const style = new Style({
        fill: new Fill({
            color: props.myfillcolor,
            // color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
            color: props.mystrokecolor,
            // color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: props.mystrokewidth,
        }),
        image: new CircleStyle({
            radius: props.mystrokewidth,
            stroke: new Stroke({
                color: props.mystrokecolor,
                // color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
                color: props.myfillcolor,
                // color: "rgba(255, 255, 255, 0.2)",
            }),
        }),
    });

    const labelStyle = new Style({
        text: new Text({
            font: "14px Calibri,sans-serif",
            fill: new Fill({
                color: "rgba(255, 255, 255, 1)",
            }),
            backgroundFill: new Fill({
                color: "rgba(0, 0, 0, 0.7)",
            }),
            padding: [3, 3, 3, 3],
            textBaseline: "bottom",
            offsetY: -15,
        }),
        image: new RegularShape({
            radius: 8,
            points: 3,
            angle: Math.PI,
            displacement: [0, 10],
            fill: new Fill({
                color: "rgba(0, 0, 0, 0.7)",
            }),
        }),
    });

    const tipStyle = new Style({
        text: new Text({
            font: "12px Calibri,sans-serif",
            fill: new Fill({
                color: "rgba(255, 255, 255, 1)",
            }),
            backgroundFill: new Fill({
                color: "rgba(0, 0, 0, 0.4)",
            }),
            padding: [2, 2, 2, 2],
            textAlign: "left",
            offsetX: 15,
        }),
    });

    const modifyStyle = new Style({
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
                color: "rgba(0, 0, 0, 0.4)",
            }),
        }),
        text: new Text({
            text: "Drag to modify",
            font: "12px Calibri,sans-serif",
            fill: new Fill({
                color: "rgba(255, 255, 255, 1)",
            }),
            backgroundFill: new Fill({
                color: "rgba(0, 0, 0, 0.7)",
            }),
            padding: [2, 2, 2, 2],
            textAlign: "left",
            offsetX: 15,
        }),
    });

    const segmentStyle = new Style({
        text: new Text({
            font: "12px Calibri,sans-serif",
            fill: new Fill({
                color: "rgba(255, 255, 255, 1)",
            }),
            backgroundFill: new Fill({
                color: "rgba(0, 0, 0, 0.4)",
            }),
            padding: [2, 2, 2, 2],
            textBaseline: "bottom",
            offsetY: -12,
        }),
        image: new RegularShape({
            radius: 6,
            points: 3,
            angle: Math.PI,
            displacement: [0, 8],
            fill: new Fill({
                color: "rgba(0, 0, 0, 0.4)",
            }),
        }),
    });

    const segmentStyles = [segmentStyle];

    const formatLength = function (line) {
        const length = getLength(line);
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + " km";
        } else {
            output = Math.round(length * 100) / 100 + " m";
        }
        return output;
    };

    const formatArea = function (polygon) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
        } else {
            output = Math.round(area * 100) / 100 + " m\xB2";
        }
        return output;
    };

    const select = new Select({
        wrapX: false,
    });

    const modifyRef = useRef(null);
    // const modify = new Modify({ source: source, style: modifyStyle });
    modifyRef.current = new Modify({
        source: props.source,
        style: modifyStyle,
        features: select.getFeatures(),
    });

    let tipPoint;

    // map.addInteraction(modify)

    const styleFunction = (feature, segments, drawType, tip) => {
        // const styles = [style];
        const properties = feature.getProperties();

        const styles = [
            new Style({
                fill: new Fill({
                    color: properties.fillColor || props.myfillcolor,
                    // color: "rgba(255, 255, 255, 0.2)",
                }),
                stroke: new Stroke({
                    color: properties.strokeColor || props.mystrokecolor,
                    // color: "rgba(0, 0, 0, 0.5)",
                    lineDash: [10, 10],
                    width: properties.strokeWidth || props.mystrokewidth,
                }),
                image: new CircleStyle({
                    radius: properties.strokeWidth || props.mystrokewidth,
                    stroke: new Stroke({
                        color: properties.strokeColor || props.mystrokecolor,
                        // color: "rgba(0, 0, 0, 0.7)",
                    }),
                    fill: new Fill({
                        color: properties.fillColor || props.myfillcolor,
                        // color: "rgba(255, 255, 255, 0.2)",
                    }),
                }),
            }),
        ];

        const geometry = feature.getGeometry();
        const type = geometry.getType();
        let point, label, line;
        if (!drawType || drawType === type) {
            if (type === "Polygon") {
                point = geometry.getInteriorPoint();
                label = formatArea(geometry);
                line = new LineString(geometry.getCoordinates()[0]);
            } else if (type === "LineString") {
                point = new Point(geometry.getLastCoordinate());
                label = formatLength(geometry);
                line = geometry;
            }
        }
        if (segments && line) {
            let count = 0;
            line.forEachSegment(function (a, b) {
                const segment = new LineString([a, b]);
                const label = formatLength(segment);
                if (segmentStyles.length - 1 < count) {
                    segmentStyles.push(segmentStyle.clone());
                }
                const segmentPoint = new Point(segment.getCoordinateAt(0.5));
                segmentStyles[count].setGeometry(segmentPoint);
                segmentStyles[count].getText().setText(label);
                styles.push(segmentStyles[count]);
                count++;
            });
        }
        if (label) {
            labelStyle.setGeometry(point);
            labelStyle.getText().setText(label);
            styles.push(labelStyle);
        }
        if (
            tip &&
            type === "Point" &&
            !modifyRef.current.getOverlay().getSource().getFeatures().length
        ) {
            tipPoint = geometry;
            tipStyle.getText().setText(tip);
            styles.push(tipStyle);
        }
        return styles;
    };

    let draw; // global so we can remove it later
    const drawRef = useRef(null);

    const addInteraction = () => {
        const drawType = props.mygeometryType;
        const activeTip =
            "Click to continue drawing the " +
            (drawType === "Polygon" ? "polygon" : "line");
        const idleTip = "Click to start measuring";
        let tip = idleTip;

        if (drawType !== "None") {
            drawRef.current = new Draw({
                // source: props.source,
                source: vectorSource.current,
                type: drawType,
                style: function (feature) {
                    return styleFunction(feature, showSegments, drawType, tip);
                },
            });
            drawRef.current.on("drawstart", function () {
                if (clearPrevious) {
                    // props.source.clear();
                    vectorSource.current.clear();
                }
                modifyRef.current.setActive(false);
                tip = activeTip;
            });
            drawRef.current.on("drawend", function () {
                modifyStyle.setGeometry(tipPoint);
                modifyRef.current.setActive(true);
                map.once("pointermove", function () {
                    modifyStyle.setGeometry();
                });
                tip = idleTip;
            });
            modifyRef.current.setActive(true);
            map.addInteraction(drawRef.current);

            // const geoJSONFormat = new GeoJSON();
            // const features = vectorSource.current.getFeatures();
            // // Convert features to GeoJSON format
            // const geoJSONData = geoJSONFormat.writeFeaturesObject(features)
            // console.log(geoJSONData);
            //   modifyInteraction.current = new Modify({ source: drawRef.current });
            // map.addInteraction(modifyInteraction.current);
        }
        // const geoJSONFormat = new GeoJSON();
        // const features = vectorSource.current.getFeatures();
        // // Convert features to GeoJSON format
        // const geoJSONData = geoJSONFormat.writeFeaturesObject(features)
        // console.log(geoJSONData);
        // console.log(props.updatevectorlayerfalse);

        // if (props.myupdatevectorlayer) {
        //     updateVectorLayerToGeoJSON();
        //     props.changeupdatevectorlayer(!props.myupdatevectorlayer);
        // }
    };



    useEffect(() => {
        if (!map) return;
        // for styling of geometry and text
        let vectorLayer = new OLVectorLayer({
            // source,
            // source: source,
            source: vectorSource.current,
            type: props.mygeometryType,
            style: function (feature) {
                return styleFunction(feature, showSegments);
            },
        });

        map.addLayer(vectorLayer);
        // if (geometryType !== "None") {
        map.removeInteraction(drawRef.current);


        // const geoJSONFormat = new GeoJSON();
        // const features = vectorSource.current.getFeatures();
        // const geoJSONData = geoJSONFormat.writeFeaturesObject(features);
        // props.changegeometryType(geoJSONData.features[0].geometry.type || props.mygeometryType);

        // console.log(geoJSONData.features[0].geometry.type);




        addInteraction();
        // }

        // modifyInteraction.current.on('modifyend', (event) => {
        //   const modifiedFeatures = event.features.getArray();
        //   console.log('Modified Features:', modifiedFeatures);
        //   // Here, you can update your source data or perform any other actions with the modified features
        // });

        // Attribute Info for each layer Start
        // const handleClick = (e) => {
        //   console.log(e.pixel);
        //   const features = map.getFeaturesAtPixel(e.pixel);
        //   console.log(features);
        //   if (features.length > 0) {
        //     const feature = features[0];
        //     const attributes = feature.getProperties();
        //     // onData(JSON.stringify(attributes));
        //     console.log(attributes);
        //   }
        // };
        // map.on("click", handleClick);


        vectorLayer.setZIndex(props.zIndex);
        vectorLayer.setOpacity(props.opacity || 100);
        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map, props.mygeometryType, props.source, props.myupdatevectorlayer]);

    const updateVectorLayerToGeoJSON = () => {
        const geoJSONFormat = new GeoJSON();
        const features = vectorSource.current.getFeatures();

        // Convert features to GeoJSON format
        const geoJSONData = geoJSONFormat.writeFeaturesObject(features);

        // Now, you can save, send, or process the GeoJSON data as needed
        // console.log('GeoJSON data:', props.idOfLayer);
        // console.log('GeoJSON data:', geoJSONData);

        // FOR UPDATE SPATIAL EDITING
        // axios
        //     .post(
        //         `http://10.202.100.7:8000/nmscdcl/services/SpatialNonSpatialEditing/${props.idOfLayer}/`,
        //         {
        //             action: "Update",
        //             editType: "Spatial",
        //             Geojson: JSON.stringify(geoJSONData),
        //         },
        //         axiosConfig
        //     )
        //     .then((response) => {
        //         console.log(response.data.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // FOR UPDATE SPATIAL EDITING


    };

    return null;
};

const mapStateToProps = (state) => {
    return {
        myname: state.name,
        mygeometryType: state.geometryType,
        mystrokecolor: state.strokecolor,
        myfillcolor: state.fillcolor,
        mystrokewidth: state.strokewidth,
        myupdatevectorlayer: state.updatevectorlayer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changegeometryType: (name) => {
            dispatch({ type: "CHANGE_GEOMETRYTYPE", payload: name });
        },
        changestrokecolor: (strokecolor) => {
            dispatch({ type: "CHANGE_STROKECOLOR", payload: strokecolor });
        },
        changefillcolor: (fillcolor) => {
            dispatch({ type: "CHANGE_FILLCOLOR", payload: fillcolor });
        },
        changestrokewidth: (strokewidth) => {
            dispatch({ type: "CHANGE_STROKEWIDTH", payload: strokewidth });
        },
        changeupdatevectorlayer: (updatevectorlayer) => {
            dispatch({ type: "UPDATE_VECTORLAYER", payload: updatevectorlayer });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VectorLayersM);