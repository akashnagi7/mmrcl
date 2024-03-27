const iState = {
  name: [],
  opacityname: [],
  parentname: [],
  parentnamewater: [],
  drawerdata: "",
  leftdrawerdata: false,
  rightdrawerdata: "true",
  basemapname: "openstreetmap",
  geometryType: "None",
  editgeometryType: "None",
  // strokecolor: "#0A0A48",
  strokecolor: "#2CFF29",
  fillcolor: "#FCFF52",
  strokewidth: "2.5",
  vectordrawtoggle: false,
  vectoredittoggle: false,
  vectormeasuretoggle: false,
  firstname: "Arman",
  nonSpatialData: {
    type: "Point",
    crs: { type: "name", properties: { name: "EPSG:3857" } },
    coordinates: [6194701.21072391, -9751138.272307679],
  },
  nonSpatialQuery: "",
  nonSpatialQueryLayer: "",
  spQuery: "",
  updatevectorlayer: false,
  predefinedQuery: "",
};
const reducer = (state = iState, action) => {
  if (action.type == "CHANGE_NAME")
    return {
      ...state,
      name: action.payload,
    };
  if (action.type == "OPACITY_CHANGE_NAME")
    return {
      ...state,
      opacityname: action.payload,
    };
  if (action.type == "CHANGE_PARENT_NAME")
    return {
      ...state,
      parentname: action.payload,
    };
  if (action.type == "CHANGE_PARENT_NAME_WATER")
    return {
      ...state,
      parentnamewater: action.payload,
    };
  if (action.type == "CHANGE_DRAWER")
    return {
      ...state,
      drawerdata: action.payload,
    };
  if (action.type == "CHANGE_DRAWER_LEFT")
    return {
      ...state,
      leftdrawerdata: action.payload,
    };
  if (action.type == "CHANGE_DRAWER_RIGHT")
    return {
      ...state,
      rightdrawerdata: action.payload,
    };
  if (action.type == "BASEMAP_CHANGE_NAME")
    return {
      ...state,
      basemapname: action.payload,
    };
  if (action.type == "CHANGE_FIRSTNAME")
    return {
      ...state,
      firstname: action.payload,
    };
  if (action.type == "CHANGE_PREDEFINEDQUERY")
    return {
      ...state,
      predefinedQuery: action.payload,
    };
  if (action.type == "CHANGE_NONSPATIALDATA")
    return {
      ...state,
      nonSpatialData: action.payload,
    };
  if (action.type == "CHANGE_NONSPATIALQUERY")
    return {
      ...state,
      nonSpatialQuery: action.payload,
    };
  if (action.type == "CHANGE_NONSPATIALQUERY")
    return {
      ...state,
      nonSpatialQueryLayer: action.payload,
    };
  if (action.type == "CHANGE_SPATIALQUERY")
    return {
      ...state,
      spQuery: action.payload,
    };
  if (action.type == "CHANGE_GEOMETRYTYPE")
    return {
      ...state,
      geometryType: action.payload,
    };
  if (action.type == "CHANGE_EDITGEOMETRYTYPE")
    return {
      ...state,
      editgeometryType: action.payload,
    };
  if (action.type == "CHANGE_STROKECOLOR")
    return {
      ...state,
      strokecolor: action.payload,
    };
  if (action.type == "CHANGE_FILLCOLOR")
    return {
      ...state,
      fillcolor: action.payload,
    };
  if (action.type == "CHANGE_STROKEWIDTH")
    return {
      ...state,
      strokewidth: action.payload,
    };
  if (action.type == "CHANGE_VECTORDRAWTOGGLE")
    return {
      ...state,
      vectordrawtoggle: action.payload,
    };
  if (action.type == "CHANGE_VECTOREDITTOGGLE")
    return {
      ...state,
      vectoredittoggle: action.payload,
    };
  if (action.type == "CHANGE_VECTORMEASURETOGGLE")
    return {
      ...state,
      vectormeasuretoggle: action.payload,
    };
  if (action.type == "UPDATE_VECTORLAYER")
    return {
      ...state,
      updatevectorlayer: action.payload,
    };
  return state;
};
export default reducer;
