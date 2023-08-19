require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (Map, MapView, FeatureLayer) {

  const map = new Map({
    basemap: "topo-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-77.0629, 38.8048],
    zoom: 14,
  });

  const restaurantsRenderer = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "https://i.ibb.co/TH6W2p5/clipart2012159.png",
      width: "23px",
      height: "33px",
    },
  };

  const restaurantsLabels = {
    symbol: {
      type: "text",
      color: "#004100",
      haloColor: "white",
      haloSize: "1.5px",
      font: {
        size: "13px",
        family: "Arial",
        style: "italic",
        weight: "normal",
      },
    },

    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: "$feature.Restaurant_Name",
    },
  };

  const popupRestaurants = {
    title: "{Restaurant_Name}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Address",
            label: "Address",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Menu_Image_URL",
            label: "Menu",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Restaurant_Category",
            label: "Food Style",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Dinner_Cost",
            label: "Cost of Meal ($)",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },

          {
            fieldName: "Number_of_Courses",
            label: "# of Courses",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Courses",
            label: "Course Options",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Includes_Drink",
            label: "Drink Included",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Website",
            label: "Website",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Phone_Number",
            label: "Phone",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Yelp",
            label: "Yelp",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Facebook",
            label: "Facebook",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "Instagram",
            label: "Instagram",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
        ],
      },
    ],
  };

  const restaurants = new FeatureLayer({
    url: "https://services7.arcgis.com/D3ldBDYkJEQ9Y4At/arcgis/rest/services/alexandria_va_restaurant_week_summer_2023/FeatureServer/0",
    renderer: restaurantsRenderer,
    labelingInfo: [restaurantsLabels],
    outFields: [
      "Restaurant_Name",
      "Address",
      "Restaurant_Category",
      "Cost_Rating",
      "Phone_Number",
      "Website",
      "Yelp",
      "Google_Rating",
      "Facebook",
      "Instagram",
      "Dinner_Cost",
      "Number_of_Courses",
      "Courses",
      "Can_Carryout",
      "Menu_Image_URL",
    ],
    popupTemplate: popupRestaurants,
  });

  map.add(restaurants);

  view.on("click", function (event) {
    var screenPoint = {
      x: event.x,
      y: event.y,
    };

    // Search for graphics at the clicked location
    view.hitTest(screenPoint).then(function (response) {
      if (response.results.length) {
        var graphic = response.results.filter(function (result) {
          // check if the graphic belongs to the layer of interest
          return result.graphic.layer === restaurants;
        })[0].graphic;
        // do something with the result graphic
        console.log(graphic.attributes);
      }
    });
  });
});
